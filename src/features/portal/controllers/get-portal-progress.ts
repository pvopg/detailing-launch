import { type Entitlements, getEntitlements } from '@/features/account/controllers/get-entitlements';
import type { EntitlementTier } from '@/features/pricing/models/product-metadata';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Json } from '@/libs/supabase/types';

import { getGuide } from '../guides';
import { computeGuideProgress } from '../guides/types';
import {
  BUSINESS_SYSTEMS_MODULES,
  FOUNDATION_MODULES,
  isModuleUnlocked,
  type PortalModule,
  type PortalModuleKind,
} from '../portal-navigation';
import { type ToolCompletion, toolCompletion } from '../tools/completion';

import 'server-only';

/**
 * Server-only view model for the portal home page. Everything a returning member sees — progress
 * summaries, per-tile state, the "Continue where you left off" card, and the single recommended
 * next action — is derived here from the authenticated user's server-side saved state.
 *
 * Access is enforced with the same entitlement gate as the rest of the portal: locked modules carry
 * only their public marketing metadata (title/description) and never any saved state or paid body.
 */
export type ModuleStatusKind = 'not_started' | 'in_progress' | 'complete' | 'locked';

export interface ModuleProgress {
  slug: string;
  title: string;
  description: string;
  tier: EntitlementTier;
  kind: PortalModuleKind;
  href: string;
  status: ModuleStatusKind;
  /** Numeric progress where a meaningful denominator exists (Foundation Essential steps); else null. */
  completed: number | null;
  total: number | null;
  percent: number | null;
  /** Ready-to-render progress sentence, e.g. "3 of 8 Essential steps" or "2 of 5 stages finalized". */
  progressLabel: string | null;
  actionLabel: string;
}

export interface PortalDestination {
  slug: string;
  title: string;
  href: string;
  kind: PortalModuleKind;
  /** Human-readable current status, e.g. "3 of 8 Essential steps" or "In progress". */
  statusLabel: string;
  actionLabel: string;
}

export interface PortalNextAction {
  kind: 'guide' | 'tool' | 'locked' | 'complete';
  locked: boolean;
  /** Headline of the recommendation (a step title, a tool name, or a completion message). */
  title: string;
  /** Parent context, e.g. the guide title or "Business Systems". */
  context: string;
  /** Supporting copy. For locked recommendations this is public marketing metadata only. */
  description: string;
  href: string;
  actionLabel: string;
}

export interface PortalHomeProgress {
  entitlements: Entitlements;
  foundation: { completedEssential: number; totalEssential: number; percent: number };
  businessSystems: { completedTools: number; totalTools: number; percent: number; accessible: boolean };
  lastActivity: PortalDestination | null;
  nextAction: PortalNextAction;
  foundationModules: ModuleProgress[];
  businessModules: ModuleProgress[];
}

/** Canonical order of the Business Systems tool progression used by the next-action rules. */
const BUSINESS_TOOL_ORDER = [
  'service-builder',
  'pricing-calculator',
  'workflow-planner',
  'message-library',
  'software-finder',
] as const;

function baseModule(mod: PortalModule) {
  return {
    slug: mod.slug,
    title: mod.title,
    description: mod.description,
    tier: mod.tier,
    kind: mod.kind,
  };
}

function lockedModule(mod: PortalModule): ModuleProgress {
  return {
    ...baseModule(mod),
    // Locked tiles route to the pricing page; the module page itself stays server-side gated.
    href: '/pricing',
    status: 'locked',
    completed: null,
    total: null,
    percent: null,
    progressLabel: null,
    actionLabel: 'Upgrade to access',
  };
}

/** Noun used in a tool's "X of Y ___" progress sentence, when it exposes numeric progress. */
const TOOL_PROGRESS_NOUN: Record<string, string> = {
  'service-builder': 'packages finalized',
  'pricing-calculator': 'scenarios finalized',
  'workflow-planner': 'stages finalized',
  'message-library': 'messages finalized',
  'software-finder': 'decisions saved',
};

function toolActionLabel(status: ToolCompletion['status']): string {
  if (status === 'complete') return 'Review';
  if (status === 'in_progress') return 'Continue';
  return 'Open tool';
}

function guideActionLabel(status: ModuleStatusKind): string {
  if (status === 'complete') return 'Review';
  if (status === 'in_progress') return 'Continue';
  return 'Start';
}

export async function getPortalHomeProgress(): Promise<PortalHomeProgress> {
  const entitlements = await getEntitlements();
  const supabase = await createSupabaseServerClient();

  // Two scoped reads (RLS limits both to the current user) give us everything we need to render.
  const [checklistResult, moduleStateResult] = await Promise.all([
    supabase.from('checklist_progress').select('item_key, completed, updated_at'),
    supabase.from('portal_module_state').select('module_key, state, updated_at'),
  ]);

  if (checklistResult.error) console.error(checklistResult.error);
  if (moduleStateResult.error) console.error(moduleStateResult.error);

  // Group checklist rows by guide slug: completed item ids, and most-recent activity timestamp.
  const completedByGuide = new Map<string, Set<string>>();
  const guideActivityAt = new Map<string, number>();
  for (const row of checklistResult.data ?? []) {
    const separator = row.item_key.indexOf(':');
    if (separator === -1) continue;
    const slug = row.item_key.slice(0, separator);
    const itemId = row.item_key.slice(separator + 1);
    if (row.completed) {
      const set = completedByGuide.get(slug) ?? new Set<string>();
      set.add(itemId);
      completedByGuide.set(slug, set);
    }
    const at = row.updated_at ? Date.parse(row.updated_at) : NaN;
    if (Number.isFinite(at)) guideActivityAt.set(slug, Math.max(guideActivityAt.get(slug) ?? 0, at));
  }

  // Map tool module state by slug, with its last-saved timestamp.
  const stateByModule = new Map<string, { state: Json | null; activityAt: number }>();
  for (const row of moduleStateResult.data ?? []) {
    const at = row.updated_at ? Date.parse(row.updated_at) : NaN;
    stateByModule.set(row.module_key, {
      state: (row.state ?? null) as Json | null,
      activityAt: Number.isFinite(at) ? at : 0,
    });
  }

  // ---- Foundation modules + summary (Essential items only) ----
  let completedEssential = 0;
  let totalEssential = 0;

  const foundationModules: ModuleProgress[] = FOUNDATION_MODULES.map((mod) => {
    if (!isModuleUnlocked(mod, entitlements)) return lockedModule(mod);

    const guide = getGuide(mod.slug);
    if (!guide) {
      // Scaffolded Foundation module without authored content yet — no meaningful denominator.
      return {
        ...baseModule(mod),
        href: `/portal/${mod.slug}`,
        status: 'not_started',
        completed: null,
        total: null,
        percent: null,
        progressLabel: null,
        actionLabel: 'Open guide',
      };
    }

    const progress = computeGuideProgress(guide, completedByGuide.get(mod.slug) ?? new Set());
    totalEssential += progress.total;
    completedEssential += progress.done;

    const status: ModuleStatusKind = progress.complete ? 'complete' : progress.done > 0 ? 'in_progress' : 'not_started';
    return {
      ...baseModule(mod),
      href: `/portal/${mod.slug}`,
      status,
      completed: progress.done,
      total: progress.total,
      percent: progress.percent,
      progressLabel: progress.total > 0 ? `${progress.done} of ${progress.total} Essential steps` : null,
      actionLabel: guideActionLabel(status),
    };
  });

  // ---- Business Systems modules + summary (meaningful saved-output rules) ----
  let completedTools = 0;
  const totalTools = BUSINESS_SYSTEMS_MODULES.length;

  const businessModules: ModuleProgress[] = BUSINESS_SYSTEMS_MODULES.map((mod) => {
    if (!isModuleUnlocked(mod, entitlements)) return lockedModule(mod);

    const completion = toolCompletion(mod.slug, stateByModule.get(mod.slug)?.state ?? null);
    if (completion.status === 'complete') completedTools += 1;

    const noun = TOOL_PROGRESS_NOUN[mod.slug];
    const hasNumeric = completion.total !== null && completion.total > 0 && completion.completed !== null;

    return {
      ...baseModule(mod),
      href: `/portal/${mod.slug}`,
      status: completion.status,
      completed: completion.completed,
      total: completion.total,
      percent: hasNumeric ? Math.round((completion.completed! / completion.total!) * 100) : null,
      progressLabel: hasNumeric && noun ? `${completion.completed} of ${completion.total} ${noun}` : null,
      actionLabel: toolActionLabel(completion.status),
    };
  });

  const foundation = {
    completedEssential,
    totalEssential,
    percent: totalEssential > 0 ? Math.round((completedEssential / totalEssential) * 100) : 0,
  };
  const businessSystems = {
    completedTools,
    totalTools,
    percent: totalTools > 0 ? Math.round((completedTools / totalTools) * 100) : 0,
    accessible: entitlements.hasBusinessSystems,
  };

  const lastActivity = computeLastActivity(
    entitlements,
    guideActivityAt,
    stateByModule,
    foundationModules,
    businessModules
  );

  const nextAction = computeNextAction(entitlements, completedByGuide, stateByModule);

  return {
    entitlements,
    foundation,
    businessSystems,
    lastActivity,
    nextAction,
    foundationModules,
    businessModules,
  };
}

/** Most recently touched accessible guide or tool, for the "Continue where you left off" card. */
function computeLastActivity(
  entitlements: Entitlements,
  guideActivityAt: Map<string, number>,
  stateByModule: Map<string, { state: Json | null; activityAt: number }>,
  foundationModules: ModuleProgress[],
  businessModules: ModuleProgress[]
): PortalDestination | null {
  const bySlug = new Map<string, ModuleProgress>();
  for (const mod of [...foundationModules, ...businessModules]) bySlug.set(mod.slug, mod);

  let best: { at: number; mod: ModuleProgress } | null = null;

  for (const mod of FOUNDATION_MODULES) {
    if (!isModuleUnlocked(mod, entitlements)) continue;
    const at = guideActivityAt.get(mod.slug) ?? 0;
    if (at > 0 && (!best || at > best.at)) best = { at, mod: bySlug.get(mod.slug)! };
  }
  for (const mod of BUSINESS_SYSTEMS_MODULES) {
    if (!isModuleUnlocked(mod, entitlements)) continue;
    const at = stateByModule.get(mod.slug)?.activityAt ?? 0;
    if (at > 0 && (!best || at > best.at)) best = { at, mod: bySlug.get(mod.slug)! };
  }

  if (!best) return null;

  const mod = best.mod;
  const statusLabel = mod.progressLabel ?? (mod.status === 'complete' ? 'Completed' : 'In progress');

  return {
    slug: mod.slug,
    title: mod.title,
    href: mod.href,
    kind: mod.kind,
    statusLabel,
    actionLabel: mod.kind === 'guide' ? 'Continue guide' : 'Continue tool',
  };
}

/**
 * The single deterministic recommended next action. Rules run in a fixed order and read only from
 * server-authorized data. If the logical next step is a locked tier, the recommendation degrades to
 * an approved discovery/upgrade CTA carrying marketing metadata only.
 */
function computeNextAction(
  entitlements: Entitlements,
  completedByGuide: Map<string, Set<string>>,
  stateByModule: Map<string, { state: Json | null; activityAt: number }>
): PortalNextAction {
  // Rule 1: earliest incomplete Essential step across accessible Foundation guides, in canonical order.
  for (const mod of FOUNDATION_MODULES) {
    if (!isModuleUnlocked(mod, entitlements)) continue;
    const guide = getGuide(mod.slug);
    if (!guide) continue;

    const completed = completedByGuide.get(mod.slug) ?? new Set<string>();
    const essentials = guide.checklist.filter((item) => item.priority === 'essential');
    const firstIncomplete = essentials.find((item) => !completed.has(item.id));
    if (firstIncomplete) {
      const started = essentials.some((item) => completed.has(item.id));
      return {
        kind: 'guide',
        locked: false,
        title: firstIncomplete.title,
        context: guide.title,
        description: firstIncomplete.description ?? '',
        href: `/portal/${mod.slug}`,
        actionLabel: started ? 'Continue guide' : 'Start guide',
      };
    }
  }

  const serviceModule = BUSINESS_SYSTEMS_MODULES.find((mod) => mod.slug === 'service-builder')!;

  // Foundation Essentials are done. The next step is the Business Systems progression, which requires
  // that tier — if it is locked, recommend upgrading with approved marketing copy only.
  if (!entitlements.hasBusinessSystems) {
    return {
      kind: 'locked',
      locked: true,
      title: serviceModule.title,
      context: 'Business Systems',
      description: serviceModule.description,
      href: '/pricing',
      actionLabel: 'Unlock Business Systems',
    };
  }

  // Rules 2–6: recommend the first Business Systems tool whose saved output is not yet complete.
  for (const slug of BUSINESS_TOOL_ORDER) {
    const mod = BUSINESS_SYSTEMS_MODULES.find((candidate) => candidate.slug === slug);
    if (!mod) continue;
    const status = toolCompletion(slug, stateByModule.get(slug)?.state ?? null).status;
    if (status !== 'complete') {
      return {
        kind: 'tool',
        locked: false,
        title: mod.title,
        context: 'Business Systems',
        description: mod.description,
        href: `/portal/${slug}`,
        actionLabel: status === 'in_progress' ? 'Continue tool' : 'Open tool',
      };
    }
  }

  // Rule 7: all accessible work is complete.
  return {
    kind: 'complete',
    locked: false,
    title: 'You’re all set up',
    context: 'Nice work',
    description:
      'You’ve completed the foundation and configured every business system. Revisit any guide or tool to refine it as your business grows.',
    href: '/portal/roadmap',
    actionLabel: 'Review your roadmap',
  };
}
