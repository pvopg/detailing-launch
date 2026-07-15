import type { Json } from '@/libs/supabase/types';

import {
  defaultWorkflowStages,
  normalizeMessageLibraryState,
  normalizePricingState,
  normalizeServiceBuilderState,
  normalizeSoftwareFinderState,
  normalizeWorkflowState,
} from './normalize';
import { SOFTWARE_CATALOG } from './software-catalog';
import type { WorkflowStage } from './types';

/**
 * Meaningful, tool-level completion rules for the Business Systems tools. These are the single
 * source of truth for "has the member actually finished this tool", used by the portal home
 * progress summary, tile states, and next-action recommendation.
 *
 * Rules are about real saved *output* from the member's perspective, not raw field counts: a
 * package needs a name and a price, a workflow needs every stage finalized, the software finder
 * needs every use case decided. Each function is pure and takes the raw `portal_module_state` JSON
 * blob (or `null` when the tool was never saved), so it can be reasoned about and tested
 * independently of the database and React.
 */
export type ToolStatus = 'not_started' | 'in_progress' | 'complete';

export interface ToolCompletion {
  status: ToolStatus;
  /** Numeric progress toward completion where a real denominator exists (else null). */
  completed: number | null;
  total: number | null;
}

const NONE: ToolCompletion = { status: 'not_started', completed: null, total: null };

/**
 * Generic completion for a list-based tool whose items carry a draft/active status: not started when
 * empty, complete only when every item is finalized (active), in progress otherwise. `completed /
 * total` is the finalized-vs-total count so tiles can show "N of M … finalized".
 */
function finalizeCompletion(items: Array<{ status: 'draft' | 'active' }>): ToolCompletion {
  const total = items.length;
  if (total === 0) return NONE;
  const finalized = items.filter((item) => item.status === 'active').length;
  return { status: finalized === total ? 'complete' : 'in_progress', completed: finalized, total };
}

/** Complete when every saved package is finalized. */
export function serviceBuilderCompletion(raw: Json | null): ToolCompletion {
  return finalizeCompletion(normalizeServiceBuilderState(raw).packages);
}

/** Complete when every saved pricing scenario is finalized. */
export function pricingCalculatorCompletion(raw: Json | null): ToolCompletion {
  return finalizeCompletion(normalizePricingState(raw).scenarios);
}

/** Stable content signature for a set of workflow stages, ignoring generated ids and finalize status. */
function workflowSignature(stages: WorkflowStage[]): string {
  return JSON.stringify(
    stages.map((stage) => ({
      name: stage.name.trim(),
      goal: stage.goal.trim(),
      touchpoints: stage.touchpoints.map((tp) => ({
        channel: tp.channel.trim(),
        action: tp.action.trim(),
        timing: tp.timing.trim(),
      })),
    }))
  );
}

const DEFAULT_WORKFLOW_SIGNATURE = workflowSignature(defaultWorkflowStages());

/**
 * Complete only when the planner has at least one stage and every stage is finalized (active). A
 * never-saved planner (`null`), an empty planner, or the seeded starter with no stage finalized
 * (including after a reset to defaults) is not started; a partly-finalized or customized-but-not-yet
 * -finalized planner is in progress. `completed / total` is the finalized-stage count.
 */
export function workflowPlannerCompletion(raw: Json | null): ToolCompletion {
  if (raw === null) return NONE;
  const { stages } = normalizeWorkflowState(raw);
  const total = stages.length;
  if (total === 0) return NONE;

  const finalized = stages.filter((stage) => stage.status === 'active').length;
  if (finalized === total) return { status: 'complete', completed: finalized, total };
  if (finalized > 0) return { status: 'in_progress', completed: finalized, total };

  // No stage finalized: distinguish the untouched seeded starter from a customized draft.
  const status: ToolStatus = workflowSignature(stages) === DEFAULT_WORKFLOW_SIGNATURE ? 'not_started' : 'in_progress';
  return { status, completed: finalized, total };
}

/** Complete when every saved message is finalized. */
export function messageLibraryCompletion(raw: Json | null): ToolCompletion {
  return finalizeCompletion(normalizeMessageLibraryState(raw).messages);
}

/**
 * Complete only when every use case has a decision (a chosen option or a written note). A partial
 * set is in progress; `completed / total` is the decided-vs-total use-case count.
 */
export function softwareFinderCompletion(raw: Json | null): ToolCompletion {
  const { choices } = normalizeSoftwareFinderState(raw);
  const total = SOFTWARE_CATALOG.length;
  const decided = SOFTWARE_CATALOG.filter((useCase) => {
    const choice = choices[useCase.id];
    return choice && (choice.optionId !== '' || choice.notes.trim() !== '');
  }).length;

  const status: ToolStatus = decided === 0 ? 'not_started' : decided === total ? 'complete' : 'in_progress';
  return { status, completed: decided, total };
}

/** Completion rule per Business Systems tool slug. Slugs without an entry have no completion signal. */
export const TOOL_COMPLETION_BY_SLUG: Record<string, (raw: Json | null) => ToolCompletion> = {
  'service-builder': serviceBuilderCompletion,
  'pricing-calculator': pricingCalculatorCompletion,
  'workflow-planner': workflowPlannerCompletion,
  'message-library': messageLibraryCompletion,
  'software-finder': softwareFinderCompletion,
};

/** The completion state for a tool slug, or a not-started default when the slug has no rule. */
export function toolCompletion(slug: string, raw: Json | null): ToolCompletion {
  const rule = TOOL_COMPLETION_BY_SLUG[slug];
  return rule ? rule(raw) : NONE;
}

/** Whether a tool's saved output counts as done, per its completion rule. */
export function isToolComplete(slug: string, raw: Json | null): boolean {
  return toolCompletion(slug, raw).status === 'complete';
}
