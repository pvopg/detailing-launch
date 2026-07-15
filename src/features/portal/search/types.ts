import type { EntitlementTier } from '@/features/pricing/models/product-metadata';

/**
 * Types for portal-wide search. This module contains NO data and NO protected content — only
 * shapes — so it is safe to import from client components for typing. The actual protected index
 * lives in `./documents.ts` (server-only); the public catalog lives in `./discovery.ts`.
 *
 * Two datasets are kept deliberately separate:
 *
 * - `ProtectedSearchDocument` — the real, paid content. Full-text searchable, but only ever
 *   returned to a browser that holds the required entitlement. Never serialized to the client.
 * - `SearchDiscoveryItem` — intentionally public feature metadata (title + marketing copy + route)
 *   used to let lower tiers discover locked features without receiving protected content.
 *
 * A `PortalSearchResult` is the minimized, entitlement-safe shape actually sent to the browser.
 */

/** The kind of thing a search hit points at. `feature` is only used for locked discovery results. */
export type SearchResultType =
  | 'guide'
  | 'guide-section'
  | 'checklist-item'
  | 'checklist-example'
  | 'resource'
  | 'message'
  | 'tool'
  | 'feature';

/** Field that produced the match — used for ranking and (for unlocked hits) snippet selection. */
export type MatchedField = 'title' | 'description' | 'body' | 'keyword';

/**
 * A single searchable unit of PAID content. Built from authored guide/tool content objects in
 * `./documents.ts`. `body` may contain protected prose, so a document is only ever matched (and its
 * snippet only ever surfaced) after the caller has confirmed the user holds `requiredTier`.
 */
export interface ProtectedSearchDocument {
  id: string;
  title: string;
  description?: string;
  /** Full searchable text. Protected — never sent to an unauthorized browser. */
  body: string;
  href: string;
  type: Exclude<SearchResultType, 'feature'>;
  requiredTier: EntitlementTier;
  /** Owning guide slug, when this document is a child of a guide (section, checklist item, etc.). */
  guideSlug?: string;
  keywords?: string[];
}

/**
 * Intentionally public metadata for a feature, shown to users who lack the required entitlement so
 * they can discover (and upgrade to) locked content. `marketingDescription` is written and reviewed
 * as public copy — it must NOT be derived from a protected body.
 */
export interface SearchDiscoveryItem {
  id: string;
  title: string;
  marketingDescription: string;
  href: string;
  type: 'guide' | 'tool' | 'feature';
  requiredTier: EntitlementTier;
  keywords?: string[];
}

/**
 * The minimized result shape returned to the browser. `snippet` may contain protected content ONLY
 * when `access === 'unlocked'`; locked results carry the approved marketing description and never a
 * matched protected phrase.
 */
export interface PortalSearchResult {
  id: string;
  title: string;
  description?: string;
  href: string;
  type: SearchResultType;
  requiredTier: EntitlementTier;
  access: 'unlocked' | 'locked';
  matchedField?: MatchedField;
  /** Plain text. Present only for unlocked results. Rendered as text, never as HTML. */
  snippet?: string;
}
