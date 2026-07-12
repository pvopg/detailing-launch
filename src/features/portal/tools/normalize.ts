import type { Json } from '@/libs/supabase/types';

import type {
  PricingCalculatorState,
  PricingMode,
  PricingScenario,
  ServiceBuilderState,
  ServicePackage,
} from './types';

/**
 * Coerce raw JSON loaded from `portal_module_state` into a known-good tool state. Saved blobs may
 * be `null` (never saved), partial, or from an older shape, so every field falls back to a default.
 */

function toNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function toRecord(value: Json | null): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function newId(): string {
  // Client-only tools; crypto.randomUUID is available in the browser and in modern Node.
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function createServicePackage(): ServicePackage {
  return {
    id: newId(),
    name: '',
    category: '',
    price: 0,
    durationMinutes: 0,
    description: '',
    includes: [],
  };
}

export function normalizeServiceBuilderState(raw: Json | null): ServiceBuilderState {
  const record = toRecord(raw);
  const packages = Array.isArray(record.packages) ? record.packages : [];

  return {
    packages: packages.map((entry) => {
      const pkg = entry as Record<string, unknown>;
      return {
        id: toString(pkg.id) || newId(),
        name: toString(pkg.name),
        category: toString(pkg.category),
        price: toNumber(pkg.price),
        durationMinutes: toNumber(pkg.durationMinutes),
        description: toString(pkg.description),
        includes: Array.isArray(pkg.includes) ? pkg.includes.map((item) => toString(item)) : [],
      };
    }),
  };
}

export function createPricingScenario(): PricingScenario {
  return {
    id: newId(),
    name: '',
    laborHours: 2,
    laborRate: 35,
    supplies: 15,
    travel: 10,
    overhead: 10,
    feePercent: 2.9,
    mode: 'margin',
    price: 150,
    targetMargin: 50,
  };
}

export function normalizePricingState(raw: Json | null): PricingCalculatorState {
  const record = toRecord(raw);
  const scenarios = Array.isArray(record.scenarios) ? record.scenarios : [];

  return {
    scenarios: scenarios.map((entry) => {
      const scenario = entry as Record<string, unknown>;
      const mode: PricingMode = scenario.mode === 'price' ? 'price' : 'margin';
      return {
        id: toString(scenario.id) || newId(),
        name: toString(scenario.name),
        laborHours: toNumber(scenario.laborHours),
        laborRate: toNumber(scenario.laborRate),
        supplies: toNumber(scenario.supplies),
        travel: toNumber(scenario.travel),
        overhead: toNumber(scenario.overhead),
        feePercent: toNumber(scenario.feePercent),
        mode,
        price: toNumber(scenario.price),
        targetMargin: toNumber(scenario.targetMargin),
      };
    }),
  };
}
