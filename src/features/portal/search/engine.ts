import type {
  MatchedField,
  PortalSearchResult,
  ProtectedSearchDocument,
  SearchDiscoveryItem,
} from './types';

/**
 * Pure search primitives — no protected data lives here, and nothing in this file reaches the
 * network on its own. It is imported by the server action (`./search.ts`) and is safe to unit-test
 * in isolation. Matching is plain substring/word matching over normalized text; the query is always
 * treated as text, never as a pattern or executable syntax.
 */

const MAX_QUERY_LENGTH = 100;
const SNIPPET_RADIUS = 60;
export const MIN_QUERY_LENGTH = 2;
export const MAX_RESULTS = 20;

/** Trim, collapse internal whitespace, lowercase, and cap length. Returns a safe match token. */
export function normalizeSearchQuery(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_QUERY_LENGTH)
    .toLowerCase();
}

/**
 * Ranking weights (higher = better), following the spec order:
 * exact title > title-prefix > title-contains > checklist/section title > keyword > description > body.
 * `access` is applied on top by `rankAndLimitResults` so unlocked beats locked on ties.
 */
const RANK = {
  titleExact: 100,
  titlePrefix: 90,
  titleContains: 80,
  childTitle: 70, // checklist-item / guide-section title contains
  keyword: 60,
  description: 50,
  body: 40,
} as const;

const CHILD_TYPES = new Set(['checklist-item', 'checklist-example', 'guide-section']);

interface ScoredDocument {
  doc: ProtectedSearchDocument;
  score: number;
  matchedField: MatchedField;
}

function scoreDocument(doc: ProtectedSearchDocument, query: string): ScoredDocument | null {
  const title = doc.title.toLowerCase();

  if (title === query) return { doc, score: RANK.titleExact, matchedField: 'title' };
  if (title.startsWith(query)) return { doc, score: RANK.titlePrefix, matchedField: 'title' };
  if (title.includes(query)) {
    const score = CHILD_TYPES.has(doc.type) ? RANK.childTitle : RANK.titleContains;
    return { doc, score, matchedField: 'title' };
  }

  if (doc.keywords?.some((keyword) => keyword.toLowerCase().includes(query))) {
    return { doc, score: RANK.keyword, matchedField: 'keyword' };
  }

  if (doc.description && doc.description.toLowerCase().includes(query)) {
    return { doc, score: RANK.description, matchedField: 'description' };
  }

  if (doc.body.toLowerCase().includes(query)) {
    return { doc, score: RANK.body, matchedField: 'body' };
  }

  return null;
}

/**
 * Extract a plain-text snippet around the first match in `body`. The result is never rendered as
 * HTML — the UI highlights the match by splitting the string in React. Only used for unlocked hits.
 */
function extractSnippet(body: string, query: string): string {
  const normalizedBody = body.replace(/\s+/g, ' ').trim();
  const index = normalizedBody.toLowerCase().indexOf(query);
  if (index === -1) return normalizedBody.slice(0, SNIPPET_RADIUS * 2).trim();

  const start = Math.max(0, index - SNIPPET_RADIUS);
  const end = Math.min(normalizedBody.length, index + query.length + SNIPPET_RADIUS);
  const core = normalizedBody.slice(start, end).trim();

  return `${start > 0 ? '…' : ''}${core}${end < normalizedBody.length ? '…' : ''}`;
}

/**
 * Match a set of ALREADY-AUTHORIZED protected documents against the query. Callers must filter by
 * entitlement before calling this — matching a document the user can't access would leak its
 * existence and could surface a protected snippet.
 */
export function searchDocuments(
  authorizedDocuments: ProtectedSearchDocument[],
  query: string
): Array<{ result: PortalSearchResult; score: number }> {
  const matches: Array<{ result: PortalSearchResult; score: number }> = [];

  for (const doc of authorizedDocuments) {
    const scored = scoreDocument(doc, query);
    if (!scored) continue;

    // A snippet is only meaningful (and only safe) when the match came from the body; title and
    // description matches are self-evident from the title/description already shown.
    const snippet = scored.matchedField === 'body' ? extractSnippet(doc.body, query) : undefined;

    matches.push({
      score: scored.score,
      result: {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        href: doc.href,
        type: doc.type,
        requiredTier: doc.requiredTier,
        access: 'unlocked',
        matchedField: scored.matchedField,
        snippet,
      },
    });
  }

  return matches;
}

/** Whether a locked discovery item matches — only its intentionally public metadata is consulted. */
export function matchesDiscoveryMetadata(item: SearchDiscoveryItem, query: string): boolean {
  if (item.title.toLowerCase().includes(query)) return true;
  if (item.marketingDescription.toLowerCase().includes(query)) return true;
  return Boolean(item.keywords?.some((keyword) => keyword.toLowerCase().includes(query)));
}

/** Map a matched discovery item to a locked result carrying only approved public metadata. */
export function toLockedResult(
  item: SearchDiscoveryItem,
  query: string
): { result: PortalSearchResult; score: number } {
  const score = item.title.toLowerCase().includes(query) ? RANK.titleContains : RANK.description;
  return {
    score,
    result: {
      id: item.id,
      title: item.title,
      description: item.marketingDescription,
      href: item.href,
      type: item.type,
      requiredTier: item.requiredTier,
      access: 'locked',
      // No snippet: locked results never carry a matched protected phrase.
    },
  };
}

/**
 * Sort by relevance, break ties in favor of unlocked results, dedupe to the canonical destination,
 * and cap the list. Dedupe prefers a parent guide/tool over its child hits pointing at the same
 * route, and drops repeated hits for the same (href,type).
 */
export function rankAndLimitResults(
  scored: Array<{ result: PortalSearchResult; score: number }>
): PortalSearchResult[] {
  const accessRank = (access: PortalSearchResult['access']) => (access === 'unlocked' ? 1 : 0);
  const typeRank = (type: PortalSearchResult['type']) =>
    type === 'guide' || type === 'tool' || type === 'feature' ? 1 : 0;

  const sorted = [...scored].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (accessRank(b.result.access) !== accessRank(a.result.access)) {
      return accessRank(b.result.access) - accessRank(a.result.access);
    }
    // Prefer the canonical parent (guide/tool/feature) over child section/checklist hits on ties.
    return typeRank(b.result.type) - typeRank(a.result.type);
  });

  const seen = new Set<string>();
  const deduped: PortalSearchResult[] = [];
  for (const { result } of sorted) {
    const key = `${result.href}::${result.type}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(result);
    if (deduped.length >= MAX_RESULTS) break;
  }

  return deduped;
}
