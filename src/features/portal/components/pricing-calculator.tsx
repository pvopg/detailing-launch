'use client';

import { useState } from 'react';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import type { Json } from '@/libs/supabase/types';
import { cn } from '@/utils/cn';

import { useModuleState } from '../hooks/use-module-state';
import { getPortalModule } from '../portal-navigation';
import { createPricingScenario, normalizePricingState } from '../tools/normalize';
import { computeScenario, formatCurrency, formatPercent } from '../tools/pricing';
import type { PricingCalculatorState, PricingScenario } from '../tools/types';

import { Field, NumberInput, TextInput } from './tool-fields';
import { ToolShell } from './tool-shell';

export function PricingCalculator({ moduleKey, initialState }: { moduleKey: string; initialState: Json | null }) {
  const portalModule = getPortalModule(moduleKey);
  const { state, setState, status, reset } = useModuleState<PricingCalculatorState>(
    moduleKey,
    normalizePricingState(initialState),
    () => normalizePricingState(null)
  );

  const [activeId, setActiveId] = useState<string | null>(state.scenarios[0]?.id ?? null);
  const active = state.scenarios.find((scenario) => scenario.id === activeId) ?? null;

  function addScenario() {
    const scenario = createPricingScenario();
    scenario.name = `Scenario ${state.scenarios.length + 1}`;
    setState((prev) => ({ scenarios: [...prev.scenarios, scenario] }));
    setActiveId(scenario.id);
  }

  function updateScenario(id: string, patch: Partial<PricingScenario>) {
    setState((prev) => ({
      scenarios: prev.scenarios.map((scenario) => (scenario.id === id ? { ...scenario, ...patch } : scenario)),
    }));
  }

  function removeScenario(id: string) {
    setState((prev) => {
      const scenarios = prev.scenarios.filter((scenario) => scenario.id !== id);
      if (id === activeId) setActiveId(scenarios[0]?.id ?? null);
      return { scenarios };
    });
  }

  return (
    <ToolShell
      title={portalModule?.title ?? 'Pricing & profitability calculator'}
      description={portalModule?.description ?? ''}
      status={status}
      onReset={reset}
    >
      {state.scenarios.length === 0 ? (
        <EmptyState onCreate={addScenario} />
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-wrap items-center gap-2'>
            {state.scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type='button'
                onClick={() => setActiveId(scenario.id)}
                className={cn(
                  'rounded-pill border px-4 py-2 text-sm transition-colors',
                  scenario.id === activeId
                    ? 'border-brand bg-brand-50 font-medium text-brand-600'
                    : 'border-border text-muted-foreground hover:border-brand'
                )}
              >
                {scenario.name.trim() || 'Untitled scenario'}
              </button>
            ))}
            <Button variant='secondary' size='sm' onClick={addScenario}>
              <IoAddOutline /> New scenario
            </Button>
          </div>

          {active && (
            <div className='grid gap-6 lg:grid-cols-[1fr_360px]'>
              <ScenarioEditor
                scenario={active}
                onChange={(patch) => updateScenario(active.id, patch)}
                onRemove={() => removeScenario(active.id)}
              />
              <ScenarioResults scenario={active} />
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className='flex flex-col items-start gap-4 rounded-lg border border-dashed border-border bg-card p-8'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-lg'>Model your first job</h3>
        <p className='text-muted-foreground'>
          Enter your costs and target margin to see the price you need to charge — and what you actually take home per
          hour.
        </p>
      </div>
      <Button variant='brand' onClick={onCreate}>
        <IoAddOutline /> New scenario
      </Button>
    </div>
  );
}

function ScenarioEditor({
  scenario,
  onChange,
  onRemove,
}: {
  scenario: PricingScenario;
  onChange: (patch: Partial<PricingScenario>) => void;
  onRemove: () => void;
}) {
  return (
    <div className='flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <Field label='Scenario name' htmlFor={`name-${scenario.id}`}>
        <TextInput
          id={`name-${scenario.id}`}
          value={scenario.name}
          onValueChange={(name) => onChange({ name })}
          placeholder='e.g. Full detail — mid-size SUV'
        />
      </Field>

      <fieldset className='flex flex-col gap-4'>
        <legend className='label mb-1 text-foreground'>Your costs for this job</legend>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Field label='Labor — hours' htmlFor={`hours-${scenario.id}`} hint='Time on the job'>
            <NumberInput
              id={`hours-${scenario.id}`}
              value={scenario.laborHours}
              onValueChange={(laborHours) => onChange({ laborHours })}
              suffix='hrs'
            />
          </Field>
          <Field label='Labor — pay rate' htmlFor={`rate-${scenario.id}`} hint='What you pay yourself / helper per hour'>
            <NumberInput
              id={`rate-${scenario.id}`}
              value={scenario.laborRate}
              onValueChange={(laborRate) => onChange({ laborRate })}
              prefix='$'
              suffix='/hr'
            />
          </Field>
          <Field label='Supplies' htmlFor={`supplies-${scenario.id}`} hint='Consumables used on this job'>
            <NumberInput
              id={`supplies-${scenario.id}`}
              value={scenario.supplies}
              onValueChange={(supplies) => onChange({ supplies })}
              prefix='$'
            />
          </Field>
          <Field label='Travel' htmlFor={`travel-${scenario.id}`} hint='Fuel & vehicle cost to reach the job'>
            <NumberInput
              id={`travel-${scenario.id}`}
              value={scenario.travel}
              onValueChange={(travel) => onChange({ travel })}
              prefix='$'
            />
          </Field>
          <Field label='Overhead' htmlFor={`overhead-${scenario.id}`} hint='Share of fixed monthly costs'>
            <NumberInput
              id={`overhead-${scenario.id}`}
              value={scenario.overhead}
              onValueChange={(overhead) => onChange({ overhead })}
              prefix='$'
            />
          </Field>
          <Field label='Processing fee' htmlFor={`fee-${scenario.id}`} hint='Card / payment fee on the price'>
            <NumberInput
              id={`fee-${scenario.id}`}
              value={scenario.feePercent}
              onValueChange={(feePercent) => onChange({ feePercent })}
              suffix='%'
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className='flex flex-col gap-4'>
        <legend className='label mb-1 text-foreground'>Pricing goal</legend>
        <div className='flex flex-wrap gap-2'>
          <ModeToggle
            active={scenario.mode === 'margin'}
            label='Target a margin'
            onClick={() => onChange({ mode: 'margin' })}
          />
          <ModeToggle active={scenario.mode === 'price'} label='Set my price' onClick={() => onChange({ mode: 'price' })} />
        </div>
        {scenario.mode === 'margin' ? (
          <Field
            label='Target profit margin'
            htmlFor={`margin-${scenario.id}`}
            hint='We work back to the price you need to charge'
          >
            <NumberInput
              id={`margin-${scenario.id}`}
              value={scenario.targetMargin}
              onValueChange={(targetMargin) => onChange({ targetMargin })}
              suffix='%'
            />
          </Field>
        ) : (
          <Field label='Price you’ll charge' htmlFor={`price-${scenario.id}`} hint='We show the resulting profit & margin'>
            <NumberInput
              id={`price-${scenario.id}`}
              value={scenario.price}
              onValueChange={(price) => onChange({ price })}
              prefix='$'
            />
          </Field>
        )}
      </fieldset>

      <button
        type='button'
        onClick={onRemove}
        className='flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive'
      >
        <IoTrashOutline /> Delete scenario
      </button>
    </div>
  );
}

function ModeToggle({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-sm border px-4 py-2 text-sm transition-colors',
        active ? 'border-brand bg-brand-50 font-medium text-brand-600' : 'border-border text-muted-foreground hover:border-brand'
      )}
    >
      {label}
    </button>
  );
}

function ScenarioResults({ scenario }: { scenario: PricingScenario }) {
  const result = computeScenario(scenario);
  const profitPositive = result.profit >= 0;

  return (
    <aside className='flex h-fit flex-col gap-5 rounded-lg border border-border bg-navy-900 p-6 text-white shadow-float lg:sticky lg:top-6'>
      <div className='flex flex-col gap-1'>
        <span className='label text-white/60'>{scenario.mode === 'margin' ? 'Price to charge' : 'Your price'}</span>
        {result.unpriceable ? (
          <span className='text-lg font-medium text-amber-300'>Fees + margin ≥ 100%</span>
        ) : (
          <span className='font-display text-4xl font-semibold'>{formatCurrency(result.price)}</span>
        )}
      </div>

      <dl className='flex flex-col gap-2 border-t border-white/10 pt-4 text-sm'>
        <Row label='Labor' value={formatCurrency(result.laborCost)} />
        <Row label='Supplies' value={formatCurrency(scenario.supplies)} />
        <Row label='Travel' value={formatCurrency(scenario.travel)} />
        <Row label='Overhead' value={formatCurrency(scenario.overhead)} />
        <Row label='Processing fee' value={formatCurrency(result.feeCost)} />
        <Row label='Total cost' value={formatCurrency(result.totalCost)} strong />
      </dl>

      <dl className='flex flex-col gap-3 border-t border-white/10 pt-4'>
        <div className='flex items-baseline justify-between gap-2'>
          <dt className='text-sm text-white/60'>Net profit</dt>
          <dd className={cn('font-display text-2xl font-semibold', profitPositive ? 'text-green-300' : 'text-red-300')}>
            {formatCurrency(result.profit)}
          </dd>
        </div>
        <div className='flex items-baseline justify-between gap-2'>
          <dt className='text-sm text-white/60'>Profit margin</dt>
          <dd className={cn('text-lg font-medium', profitPositive ? 'text-green-300' : 'text-red-300')}>
            {formatPercent(result.margin)}
          </dd>
        </div>
        <div className='flex items-baseline justify-between gap-2'>
          <dt className='text-sm text-white/60'>Take-home / labor hr</dt>
          <dd className='text-lg font-medium text-white'>{formatCurrency(result.takeHomePerHour)}</dd>
        </div>
      </dl>

      {!profitPositive && !result.unpriceable && (
        <p className='rounded-sm bg-red-500/15 p-3 text-sm text-red-200'>
          This job loses money at the current price. Raise the price or trim costs.
        </p>
      )}
    </aside>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className='flex items-center justify-between gap-2'>
      <dt className={cn('text-white/60', strong && 'text-white')}>{label}</dt>
      <dd className={cn('tabular-nums', strong ? 'font-medium text-white' : 'text-white/90')}>{value}</dd>
    </div>
  );
}
