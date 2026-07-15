import type { PricingScenario } from './types';

export interface ScenarioResult {
  laborCost: number;
  /** Labor + supplies + travel + overhead, before payment-processing fees. */
  baseCost: number;
  feeCost: number;
  totalCost: number;
  price: number;
  profit: number;
  /** Net profit as a percent of price. */
  margin: number;
  /** What the detailer actually keeps per labor hour: their own pay plus profit. */
  takeHomePerHour: number;
  /** True when a target-margin scenario can't be priced (fees + margin ≥ 100%). */
  unpriceable: boolean;
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Derives the full cost/price/profit breakdown for a scenario. Pure and synchronous so it can
 * drive live UI on every keystroke.
 *
 * Fees are charged on the final price, which makes target-margin mode circular. Solving
 * `margin = 1 - baseCost/price - fee` for price gives `price = baseCost / (1 - margin - fee)`.
 */
export function computeScenario(scenario: PricingScenario): ScenarioResult {
  const laborCost = Math.max(scenario.laborHours, 0) * Math.max(scenario.laborRate, 0);
  const baseCost = laborCost + Math.max(scenario.supplies, 0) + Math.max(scenario.travel, 0) + Math.max(scenario.overhead, 0);
  const fee = clamp(scenario.feePercent, 0, 100) / 100;

  let price: number;
  let unpriceable = false;

  if (scenario.mode === 'margin') {
    const target = clamp(scenario.targetMargin, 0, 99) / 100;
    const denominator = 1 - target - fee;
    if (denominator <= 0) {
      unpriceable = true;
      price = 0;
    } else {
      price = baseCost / denominator;
    }
  } else {
    price = Math.max(scenario.price, 0);
  }

  const feeCost = price * fee;
  const totalCost = baseCost + feeCost;
  const profit = price - totalCost;
  const margin = price > 0 ? (profit / price) * 100 : 0;
  const takeHomePerHour = scenario.laborHours > 0 ? (laborCost + profit) / scenario.laborHours : laborCost + profit;

  return { laborCost, baseCost, feeCost, totalCost, price, profit, margin, takeHomePerHour, unpriceable };
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value: number): string {
  return `${(Number.isFinite(value) ? value : 0).toFixed(1)}%`;
}

/** Renders a minute count as e.g. "1h 30m", "45m", or "2h". */
export function formatDuration(minutes: number): string {
  const total = Math.max(Math.round(minutes), 0);
  if (total === 0) return '—';
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
