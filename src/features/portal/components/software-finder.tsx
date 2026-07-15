'use client';

import { IoCheckmarkCircle, IoOpenOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import type { Json } from '@/libs/supabase/types';
import { cn } from '@/utils/cn';

import { useModuleState } from '../hooks/use-module-state';
import { getPortalModule } from '../portal-navigation';
import { normalizeSoftwareFinderState } from '../tools/normalize';
import { SOFTWARE_CATALOG, type SoftwareOption, type SoftwareUseCase } from '../tools/software-catalog';
import type { SoftwareChoice, SoftwareFinderState } from '../tools/types';

import { ToolShell } from './tool-shell';

export function SoftwareFinder({ moduleKey, initialState }: { moduleKey: string; initialState: Json | null }) {
  const portalModule = getPortalModule(moduleKey);
  const { state, setState, status, reset } = useModuleState<SoftwareFinderState>(
    moduleKey,
    normalizeSoftwareFinderState(initialState),
    () => normalizeSoftwareFinderState(null)
  );

  const decidedCount = SOFTWARE_CATALOG.filter((useCase) => {
    const choice = state.choices[useCase.id];
    return choice && (choice.optionId || choice.notes.trim());
  }).length;

  function updateChoice(useCaseId: string, patch: Partial<SoftwareChoice>) {
    setState((prev) => {
      const existing = prev.choices[useCaseId] ?? { optionId: '', notes: '' };
      return { choices: { ...prev.choices, [useCaseId]: { ...existing, ...patch } } };
    });
  }

  return (
    <ToolShell
      title={portalModule?.title ?? 'Software finder & saved choices'}
      description={portalModule?.description ?? ''}
      status={status}
      onReset={reset}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm'>
          <IoCheckmarkCircle className='text-feature-green-ink' aria-hidden />
          <span className='text-muted-foreground'>
            <span className='font-semibold text-foreground'>
              {decidedCount} of {SOFTWARE_CATALOG.length}
            </span>{' '}
            decisions saved. Pick a tool per use case, or note the one you already use — nothing here is set in stone.
          </span>
        </div>

        <div className='flex flex-col gap-6'>
          {SOFTWARE_CATALOG.map((useCase) => (
            <UseCaseCard
              key={useCase.id}
              useCase={useCase}
              choice={state.choices[useCase.id] ?? { optionId: '', notes: '' }}
              onChange={(patch) => updateChoice(useCase.id, patch)}
            />
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

function UseCaseCard({
  useCase,
  choice,
  onChange,
}: {
  useCase: SoftwareUseCase;
  choice: SoftwareChoice;
  onChange: (patch: Partial<SoftwareChoice>) => void;
}) {
  function selectOption(optionId: string) {
    // Toggle off if the currently-selected option is clicked again.
    onChange({ optionId: choice.optionId === optionId ? '' : optionId });
  }

  return (
    <div className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-lg'>{useCase.title}</h3>
        <p className='text-sm text-muted-foreground'>{useCase.need}</p>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {useCase.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={choice.optionId === option.id}
            onSelect={() => selectOption(option.id)}
          />
        ))}
      </div>

      <label className='flex flex-col gap-1.5'>
        <span className='label text-foreground'>Your notes</span>
        <input
          value={choice.notes}
          onChange={(event) => onChange({ notes: event.target.value })}
          placeholder='Already using something else? Note it here.'
          className='flex h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground'
        />
      </label>
    </div>
  );
}

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: SoftwareOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-md border p-4 transition-colors',
        selected ? 'border-brand bg-brand-50' : 'border-border bg-background'
      )}
    >
      <div className='flex items-start justify-between gap-2'>
        <span className='font-semibold text-foreground'>{option.name}</span>
        {selected && <IoCheckmarkCircle className='mt-0.5 flex-shrink-0 text-brand' aria-hidden />}
      </div>
      <span className='rounded-pill bg-muted px-2 py-0.5 text-xs font-medium text-foreground w-fit'>{option.cost}</span>
      <p className='text-xs text-muted-foreground'>{option.note}</p>
      <div className='mt-auto flex items-center justify-between gap-2 pt-2'>
        <Button type='button' variant={selected ? 'brand' : 'outline'} size='sm' onClick={onSelect}>
          {selected ? 'Selected' : 'Choose'}
        </Button>
        <a
          href={option.href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-xs font-medium text-brand hover:underline'
        >
          Visit site <IoOpenOutline aria-hidden />
        </a>
      </div>
    </div>
  );
}
