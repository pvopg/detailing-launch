/**
 * Persisted state shapes for the Business Systems interactive tools. Each shape is serialized as
 * the `state` JSON blob in `portal_module_state` (module_key = the tool's slug). Keep these
 * backward-compatible or version them — old saved blobs must still normalize cleanly (see
 * `./normalize.ts`).
 */

/**
 * Draft while the member is still shaping an item; active once they finalize it. A list-based tool
 * counts as complete only when every item is finalized (active). Shared by services, pricing
 * scenarios, saved messages, and workflow stages.
 */
export type DraftStatus = 'draft' | 'active';

/** A reusable, named service or package the detailer offers. */
export interface ServicePackage {
  id: string;
  name: string;
  /** Free-form grouping, e.g. "Exterior", "Interior", "Full detail", "Add-on". */
  category: string;
  /** What the customer pays, in dollars. */
  price: number;
  /** Estimated time on the job, in minutes. */
  durationMinutes: number;
  description: string;
  /** Line items included in the package. */
  includes: string[];
  status: DraftStatus;
}

export interface ServiceBuilderState {
  packages: ServicePackage[];
}

/** How a scenario arrives at a price: work back from a target margin, or set the price directly. */
export type PricingMode = 'margin' | 'price';

/** A single saved pricing/profitability model for one job or package. */
export interface PricingScenario {
  id: string;
  name: string;
  laborHours: number;
  /** What the detailer pays themselves (or a helper) per hour. */
  laborRate: number;
  /** Consumables for this job: soap, wax, pads, etc. */
  supplies: number;
  /** Fuel / vehicle cost to reach and work the job. */
  travel: number;
  /** Share of fixed monthly costs (insurance, subscriptions, phone) allocated to this job. */
  overhead: number;
  /** Payment-processing fee as a percent of the price charged. */
  feePercent: number;
  mode: PricingMode;
  /** Used in `price` mode: the price the detailer intends to charge. */
  price: number;
  /** Used in `margin` mode: the net profit margin to target, as a percent. */
  targetMargin: number;
  status: DraftStatus;
}

export interface PricingCalculatorState {
  scenarios: PricingScenario[];
}

/** One thing the detailer does at a stage of the customer journey — a call, text, email, or task. */
export interface WorkflowTouchpoint {
  id: string;
  /** How it happens, e.g. "Text", "Email", "Phone call", "In person". */
  channel: string;
  /** What the detailer does or says at this touch point. */
  action: string;
  /** When it happens relative to the stage, e.g. "Within 1 hour", "Day before", "48h after". */
  timing: string;
}

/** Whether a stage is still being drafted, or has been finalized as part of the active workflow. */
export type WorkflowStageStatus = 'draft' | 'active';

/** A stage in the lead-to-review journey, with the touch points that move a customer through it. */
export interface WorkflowStage {
  id: string;
  name: string;
  /** What "done" looks like for this stage. */
  goal: string;
  touchpoints: WorkflowTouchpoint[];
  /** Draft while the member is still shaping it; active once they finalize it into their workflow. */
  status: WorkflowStageStatus;
}

export interface WorkflowPlannerState {
  stages: WorkflowStage[];
}

/** Which part of the customer journey a saved message is for. Drives grouping and filtering. */
export type MessageCategory = 'inquiry' | 'quote' | 'reminder' | 'review' | 'follow-up' | 'other';

/** A reusable message written in the detailer's own voice, with optional {placeholders}. */
export interface SavedMessage {
  id: string;
  /** Short name for finding it later, e.g. "First reply to a DM". */
  label: string;
  category: MessageCategory;
  body: string;
  status: DraftStatus;
}

export interface MessageLibraryState {
  messages: SavedMessage[];
}

/** The detailer's saved decision for one software use case (see `./software-catalog.ts`). */
export interface SoftwareChoice {
  /** Id of the chosen catalog option, or '' when nothing is picked yet or a custom tool is used. */
  optionId: string;
  /** Free-form: a custom tool the detailer already uses, or notes on why they chose this. */
  notes: string;
}

export interface SoftwareFinderState {
  /** Map from catalog use-case id → the saved choice for it. */
  choices: Record<string, SoftwareChoice>;
}
