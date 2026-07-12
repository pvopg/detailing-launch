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
  priority: ChecklistPriority;
}

export interface GuideVendorLink {
  label: string;
  href: string;
}

export interface GuideCallout {
  tone: 'note' | 'warning';
  body: string;
}

export interface GuideExample {
  label: string;
  value: string;
}

export interface GuideContent {
  slug: string; // matches the Foundation portal module slug
  title: string;
  outcome: string; // short outcome line
  estimatedMinutes: number;
  tint: GuideTint;

  whatItDoes: string; // "What this system does"
  whyItMatters: string; // "Why it matters"
  goodEnoughToLaunch: string[]; // "What 'good enough to launch' looks like"
  checklist: GuideChecklistItem[]; // "Interactive checklist"
  commonMistakes?: string[]; // "Common mistakes"
  vendorLinks?: GuideVendorLink[]; // official instructions, linked not recreated
  nextGuideSlug?: string; // "Recommended next guide"

  // Optional rich blocks used by some guides.
  diagram?: string[]; // ordered flow steps
  callouts?: GuideCallout[];
  examples?: GuideExample[]; // "Recommended result"
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
