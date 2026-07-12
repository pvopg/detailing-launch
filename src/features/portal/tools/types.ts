/**
 * Persisted state shapes for the Business Systems interactive tools. Each shape is serialized as
 * the `state` JSON blob in `portal_module_state` (module_key = the tool's slug). Keep these
 * backward-compatible or version them — old saved blobs must still normalize cleanly (see
 * `./normalize.ts`).
 */

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
}

export interface PricingCalculatorState {
  scenarios: PricingScenario[];
}
