/**
 * Content model for Foundation guides. Each guide is authored once as a `GuideContent` object and
 * rendered through a single template (see GuideTemplate). Adding a guide = adding a content object;
 * rendering, persistence, and navigation are untouched.
 *
 * Authored content is static. Per-user runtime state (completed / completedAt) lives in the
 * `checklist_progress` table, keyed `${slug}:${itemId}`.
 */
export type GuideTint = 'blue' | 'purple' | 'cyan' | 'green' | 'amber';

export type ChecklistPriority = 'essential' | 'recommended' | 'later';

export interface GuideChecklistItem {
  id: string; // stable within the guide, e.g. 'define-service-area'
  title: string;
  description?: string;
  // Optional instructional example shown via a help control. Plain text only; content metadata,
  // never persisted to user progress and never counted toward completion.
  example?: string;
  // Optional customer-facing "done when …" guidance. Informational only — it describes what a
  // completed step looks like; it is never a portal-side upload/verification gate and never affects
  // progress (only the deliberate checkbox does).
  completionEvidence?: string;
  priority: ChecklistPriority;
}

export interface GuideVendorLink {
  label: string;
  href: string;
}

/** A titled group of official links, e.g. "Google Workspace". Used when a guide has enough
 * references that a flat list would be hard to scan. */
export interface GuideVendorLinkGroup {
  heading: string;
  links: GuideVendorLink[];
}

export interface GuideCallout {
  tone: 'note' | 'warning';
  body: string;
}

export interface GuideExample {
  label: string;
  value: string;
}

/** A single "key term" definition, rendered as a description list (term → definition). */
export interface GuideTerm {
  term: string;
  definition: string;
}

/** A titled reason under "Why it matters", used when a guide explains several distinct benefits. */
export interface GuideReason {
  heading: string;
  body: string;
}

/**
 * A generic titled content block for reference material that does not fit the fixed sections
 * (e.g. provider-selection guidance, edge-case guidance). A block may carry intro prose, a flat
 * bullet list, and/or a set of sub-items with their own headings — any combination.
 */
export interface GuideDetailBlock {
  title: string;
  body?: string;
  bullets?: string[];
  items?: { heading: string; body: string }[];
}

/**
 * A semantic reference table (e.g. a starter scorecard). Rendered as a real `<table>` with scoped
 * column headers and a caption, so it stays accessible and scrolls horizontally on narrow screens.
 * Every row must have exactly `columns.length` cells.
 */
export interface GuideTable {
  title?: string;
  caption?: string; // accessible caption / summary
  columns: string[]; // column headers, in order
  rows: string[][]; // each inner array is one row, aligned to `columns`
  note?: string; // guidance rendered below the table (e.g. ratio cautions)
}

/** One phase of a phased plan/timeline: a heading and its ordered steps. */
export interface GuidePhase {
  heading: string;
  bullets: string[];
}

/** A titled, phased plan (e.g. a 30-day cycle) rendered as an ordered sequence of phases. */
export interface GuideTimeline {
  title: string;
  intro?: string;
  phases: GuidePhase[];
}

export interface GuideContent {
  slug: string; // matches the Foundation portal module slug
  title: string;
  shortTitle?: string; // condensed title for compact surfaces; falls back to `title`
  outcome: string; // short outcome line
  estimatedMinutes: number;
  tint: GuideTint;

  whatItDoes: string; // "What this system does"
  // "Why it matters" — a single paragraph, or several titled reasons rendered as a list.
  whyItMatters: string | GuideReason[];
  goodEnoughToLaunch: string[]; // "What 'good enough to launch' looks like"
  checklist: GuideChecklistItem[]; // "Interactive checklist"
  commonMistakes?: string[]; // "Common mistakes"
  vendorLinks?: GuideVendorLink[]; // official instructions, linked not recreated
  nextGuideSlug?: string; // "Recommended next guide"

  // Optional rich blocks used by some guides.
  terms?: GuideTerm[]; // short "key terms to understand" definitions
  diagram?: string[]; // ordered flow steps
  callouts?: GuideCallout[];
  examples?: GuideExample[]; // "Recommended result"
  notRequiredYet?: string[]; // explicit "not required yet" list, shown under good-enough
  tables?: GuideTable[]; // semantic reference tables (e.g. a starter scorecard)
  timeline?: GuideTimeline; // a phased plan (e.g. a 30-day cycle)
  detailBlocks?: GuideDetailBlock[]; // reference guidance (provider selection, edge cases, …)
  vendorLinkGroups?: GuideVendorLinkGroup[]; // grouped official instructions
  disclaimer?: string; // editorial guardrail footnote
  // Extra authorized full-text search terms indexed for entitled users (never public discovery).
  searchKeywords?: string[];
}

export interface GuideProgress {
  done: number;
  total: number;
  percent: number;
  complete: boolean;
}

/** Progress is computed from ESSENTIAL items only; recommended/later never block completion. */
export function computeGuideProgress(guide: GuideContent, completedItemIds: Set<string>): GuideProgress {
  const essentials = guide.checklist.filter((item) => item.priority === 'essential');
  const total = essentials.length;
  const done = essentials.filter((item) => completedItemIds.has(item.id)).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0, complete: total > 0 && done === total };
}
