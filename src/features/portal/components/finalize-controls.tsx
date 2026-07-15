'use client';

import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoEllipseOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

/**
 * Shared finalize/draft UI for the list-based Business Systems tools (services, pricing scenarios,
 * messages, workflow stages). Each item is a draft while the member shapes it and is "finalized"
 * (active) once they're happy with it; a tool counts as complete only when every item is finalized.
 * Centralizing the control keeps the interaction and the completion signal identical across tools.
 */

/** A row-level "Finalized / Draft" badge plus a toggle button, shown in an item card footer. */
export function FinalizeControls({
  active,
  onToggle,
  noun,
  canFinalize = true,
  finalizeHint,
}: {
  active: boolean;
  onToggle: () => void;
  /** Singular item noun for the button, e.g. "package", "scenario", "message", "stage". */
  noun: string;
  /** When false, finalizing is blocked (item is incomplete) and the button is disabled. */
  canFinalize?: boolean;
  /** Explanation shown when finalizing is blocked. */
  finalizeHint?: string;
}) {
  const blocked = !active && !canFinalize;
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4'>
      <span
        className={cn(
          'flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold',
          active ? 'bg-feature-green text-feature-green-ink' : 'bg-muted text-muted-foreground'
        )}
      >
        {active ? <IoCheckmarkCircle aria-hidden /> : <IoEllipseOutline aria-hidden />}
        {active ? 'Finalized' : 'Draft'}
      </span>
      <div className='flex flex-col items-end gap-1'>
        <Button
          type='button'
          variant={active ? 'outline' : 'brand'}
          size='sm'
          onClick={onToggle}
          disabled={blocked}
        >
          <IoCheckmarkCircleOutline aria-hidden />
          {active ? `Move back to draft` : `Finalize ${noun}`}
        </Button>
        {blocked && finalizeHint && <span className='text-xs text-muted-foreground'>{finalizeHint}</span>}
      </div>
    </div>
  );
}

/** A banner summarizing how many items are finalized, and what completion means for the tool. */
export function FinalizeSummary({
  finalized,
  total,
  noun,
  hint,
}: {
  finalized: number;
  total: number;
  /** Plural item noun for the count, e.g. "packages", "scenarios", "messages", "stages". */
  noun: string;
  hint: string;
}) {
  const complete = total > 0 && finalized === total;
  const label = `${finalized} of ${total} ${noun} finalized`;
  return (
    <div className='flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm'>
      {complete ? (
        <IoCheckmarkCircle className='text-feature-green-ink' aria-hidden />
      ) : (
        <IoEllipseOutline className='text-muted-foreground' aria-hidden />
      )}
      <span className='text-muted-foreground'>
        <span className='font-semibold text-foreground'>{label}</span>. {hint}
      </span>
    </div>
  );
}
