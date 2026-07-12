import type { Json } from '@/libs/supabase/types';

import type {
  MessageCategory,
  MessageLibraryState,
  PricingCalculatorState,
  PricingMode,
  PricingScenario,
  SavedMessage,
  ServiceBuilderState,
  ServicePackage,
  SoftwareChoice,
  SoftwareFinderState,
  WorkflowPlannerState,
  WorkflowStage,
  WorkflowTouchpoint,
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

export function createWorkflowTouchpoint(): WorkflowTouchpoint {
  return { id: newId(), channel: '', action: '', timing: '' };
}

export function createWorkflowStage(): WorkflowStage {
  return { id: newId(), name: '', goal: '', touchpoints: [] };
}

/** A sensible starting pipeline so a new planner is a prompt to edit, not a blank page. */
export function defaultWorkflowStages(): WorkflowStage[] {
  const stage = (name: string, goal: string, touchpoints: Array<[string, string, string]>): WorkflowStage => ({
    id: newId(),
    name,
    goal,
    touchpoints: touchpoints.map(([channel, action, timing]) => ({ id: newId(), channel, action, timing })),
  });

  return [
    stage('New inquiry', 'Reply fast and capture the details you need to quote.', [
      ['Text', 'Thank them and ask for vehicle, service, and location', 'Within 1 hour'],
    ]),
    stage('Quote & book', 'Turn the inquiry into a confirmed appointment.', [
      ['Text', 'Send the quote and a booking link', 'Same day'],
      ['Text', 'Collect a deposit to lock the slot', 'On booking'],
    ]),
    stage('Before the appointment', 'Cut no-shows and set expectations.', [
      ['Text', 'Confirm time, address, and where to park / water access', 'Day before'],
    ]),
    stage('Day of service', 'Deliver and get paid without friction.', [
      ['In person', 'Walk the finished car with the customer', 'At completion'],
      ['Text', 'Send the invoice / payment link', 'At completion'],
    ]),
    stage('After the job', 'Turn a happy customer into a review and a rebook.', [
      ['Text', 'Thank them and send your Google review link', '48h after'],
      ['Text', 'Offer a maintenance rebook reminder', '6 weeks after'],
    ]),
  ];
}

export function normalizeWorkflowState(raw: Json | null): WorkflowPlannerState {
  const record = toRecord(raw);
  if (!Array.isArray(record.stages)) {
    return { stages: defaultWorkflowStages() };
  }

  return {
    stages: record.stages.map((entry) => {
      const stage = entry as Record<string, unknown>;
      const touchpoints = Array.isArray(stage.touchpoints) ? stage.touchpoints : [];
      return {
        id: toString(stage.id) || newId(),
        name: toString(stage.name),
        goal: toString(stage.goal),
        touchpoints: touchpoints.map((tpEntry) => {
          const tp = tpEntry as Record<string, unknown>;
          return {
            id: toString(tp.id) || newId(),
            channel: toString(tp.channel),
            action: toString(tp.action),
            timing: toString(tp.timing),
          };
        }),
      };
    }),
  };
}

const MESSAGE_CATEGORIES: MessageCategory[] = ['inquiry', 'quote', 'reminder', 'review', 'follow-up', 'other'];

function toMessageCategory(value: unknown): MessageCategory {
  return MESSAGE_CATEGORIES.includes(value as MessageCategory) ? (value as MessageCategory) : 'other';
}

export function createSavedMessage(category: MessageCategory = 'inquiry'): SavedMessage {
  return { id: newId(), label: '', category, body: '' };
}

export function normalizeMessageLibraryState(raw: Json | null): MessageLibraryState {
  const record = toRecord(raw);
  const messages = Array.isArray(record.messages) ? record.messages : [];

  return {
    messages: messages.map((entry) => {
      const message = entry as Record<string, unknown>;
      return {
        id: toString(message.id) || newId(),
        label: toString(message.label),
        category: toMessageCategory(message.category),
        body: toString(message.body),
      };
    }),
  };
}

export function normalizeSoftwareFinderState(raw: Json | null): SoftwareFinderState {
  const record = toRecord(raw);
  const rawChoices = toRecord(record.choices as Json | null);
  const choices: Record<string, SoftwareChoice> = {};

  for (const [useCaseId, value] of Object.entries(rawChoices)) {
    const choice = value as Record<string, unknown>;
    choices[useCaseId] = {
      optionId: toString(choice.optionId),
      notes: toString(choice.notes),
    };
  }

  return { choices };
}
