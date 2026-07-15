import Link from 'next/link';
import type { ComponentType } from 'react';
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoLockClosed,
  IoSparkles,
  IoTimeOutline,
} from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import type {
  ModuleProgress,
  ModuleStatusKind,
  PortalDestination,
  PortalNextAction,
} from '../controllers/get-portal-progress';

/**
 * Presentational layer for the portal home. Every piece is server-rendered from the
 * `PortalHomeProgress` view model — no client state — so progress, tile status, the Continue card,
 * and the next-action recommendation stay a thin, deterministic view over server-authorized data.
 *
 * Status is never communicated by color alone: each state pairs a text label with an icon.
 */

const FOCUS_RING = 'outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

type StatusVisual = {
  label: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  badgeClass: string;
  barClass: string;
  cardClass: string;
};

const STATUS_VISUAL: Record<ModuleStatusKind, StatusVisual> = {
  not_started: {
    label: 'Not started',
    icon: IoEllipseOutline,
    badgeClass: 'bg-muted text-muted-foreground',
    barClass: 'bg-muted-foreground/40',
    cardClass: 'border-border',
  },
  in_progress: {
    label: 'In progress',
    icon: IoTimeOutline,
    badgeClass: 'bg-feature-amber text-feature-amber-ink',
    barClass: 'bg-feature-amber-ink',
    cardClass: 'border-feature-amber-ink/40',
  },
  complete: {
    label: 'Complete',
    icon: IoCheckmarkCircle,
    badgeClass: 'bg-feature-green text-feature-green-ink',
    barClass: 'bg-feature-green-ink',
    cardClass: 'border-feature-green-ink/40',
  },
  locked: {
    label: 'Locked',
    icon: IoLockClosed,
    badgeClass: 'bg-muted text-muted-foreground',
    barClass: 'bg-muted-foreground/40',
    cardClass: 'border-dashed border-border',
  },
};

/** Accessible meter. Exposes name + min/max/now; the visible text carries the same information. */
function ProgressBar({
  value,
  max,
  label,
  barClass = 'bg-brand',
}: {
  value: number;
  max: number;
  label: string;
  barClass?: string;
}) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      className='h-2 w-full overflow-hidden rounded-pill bg-muted'
    >
      <div className={cn('h-full rounded-pill transition-all', barClass)} style={{ width: `${percent}%` }} />
    </div>
  );
}

function StatusBadge({ status }: { status: ModuleStatusKind }) {
  const visual = STATUS_VISUAL[status];
  const Icon = visual.icon;
  return (
    <span
      className={cn(
        'flex flex-shrink-0 items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold',
        visual.badgeClass
      )}
    >
      <Icon aria-hidden className='text-sm' />
      {visual.label}
    </span>
  );
}

export function ProgressSummary({
  foundation,
  businessSystems,
}: {
  foundation: { completedEssential: number; totalEssential: number; percent: number };
  businessSystems: { completedTools: number; totalTools: number; percent: number; accessible: boolean };
}) {
  const foundationLabel = `${foundation.completedEssential} of ${foundation.totalEssential} Essential steps complete`;
  const businessLabel = `${businessSystems.completedTools} of ${businessSystems.totalTools} tools configured`;

  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      <div className='flex flex-col gap-3 rounded-lg border border-border bg-card p-5'>
        <div className='flex items-baseline justify-between gap-2'>
          <h2 className='text-lg'>Foundation</h2>
          <span className='text-sm font-medium text-muted-foreground'>{foundation.percent}%</span>
        </div>
        <p className='text-sm text-muted-foreground'>{foundationLabel}</p>
        <ProgressBar
          value={foundation.completedEssential}
          max={foundation.totalEssential}
          label={foundationLabel}
        />
      </div>

      <div
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-5',
          !businessSystems.accessible && 'opacity-90'
        )}
      >
        <div className='flex items-baseline justify-between gap-2'>
          <h2 className='text-lg'>Business Systems</h2>
          {businessSystems.accessible ? (
            <span className='text-sm font-medium text-muted-foreground'>{businessSystems.percent}%</span>
          ) : (
            <span className='flex items-center gap-1 text-sm font-medium text-muted-foreground'>
              <IoLockClosed aria-hidden /> Locked
            </span>
          )}
        </div>
        {businessSystems.accessible ? (
          <>
            <p className='text-sm text-muted-foreground'>{businessLabel}</p>
            <ProgressBar
              value={businessSystems.completedTools}
              max={businessSystems.totalTools}
              label={businessLabel}
            />
          </>
        ) : (
          <>
            <p className='text-sm text-muted-foreground'>
              Interactive tools to price jobs, plan your workflow, and save your systems. Unlock to start configuring.
            </p>
            <Button asChild variant='sexy' size='sm' className={cn('w-fit', FOCUS_RING)}>
              <Link href='/pricing'>Unlock Business Systems</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function NextActionCard({ nextAction }: { nextAction: PortalNextAction }) {
  const isComplete = nextAction.kind === 'complete';
  return (
    <div className='flex flex-col gap-4 rounded-lg border border-brand bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-1.5'>
        <span className='flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600'>
          <IoSparkles aria-hidden /> {isComplete ? 'You’re all set' : nextAction.locked ? 'Recommended upgrade' : 'Recommended next'}
        </span>
        <h3 className='text-lg text-foreground'>{nextAction.title}</h3>
        <p className='max-w-xl text-sm text-muted-foreground'>
          {nextAction.context && !isComplete && (
            <span className='font-medium text-foreground'>{nextAction.context}. </span>
          )}
          {nextAction.description}
        </p>
      </div>
      <Button asChild variant={nextAction.locked ? 'sexy' : 'brand'} className={cn('w-fit flex-shrink-0', FOCUS_RING)}>
        <Link href={nextAction.href}>
          {nextAction.actionLabel}
          <IoArrowForward aria-hidden />
        </Link>
      </Button>
    </div>
  );
}

export function ContinueCard({ destination }: { destination: PortalDestination }) {
  return (
    <div className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
          Continue where you left off
        </span>
        <h3 className='text-lg'>{destination.title}</h3>
        <p className='text-sm text-muted-foreground'>{destination.statusLabel}</p>
      </div>
      <Button asChild variant='secondary' className={cn('w-fit flex-shrink-0', FOCUS_RING)}>
        <Link href={destination.href}>
          {destination.actionLabel}
          <IoArrowForward aria-hidden />
        </Link>
      </Button>
    </div>
  );
}

function ModuleProgressTile({ mod }: { mod: ModuleProgress }) {
  const visual = STATUS_VISUAL[mod.status];
  const locked = mod.status === 'locked';
  const hasNumeric = mod.total !== null && mod.total > 0 && mod.completed !== null && mod.progressLabel !== null;
  const numericLabel = mod.progressLabel;

  const content = (
    <div
      className={cn(
        'flex h-full flex-col gap-4 rounded-lg border bg-card p-5 transition-colors',
        visual.cardClass,
        locked ? 'opacity-75 hover:border-brand' : 'hover:border-brand'
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-base leading-snug'>{mod.title}</h3>
        <StatusBadge status={mod.status} />
      </div>

      <p className='flex-1 text-sm text-muted-foreground'>{mod.description}</p>

      {hasNumeric && numericLabel && (
        <div className='flex flex-col gap-1.5'>
          <span className='text-xs font-medium text-muted-foreground'>{numericLabel}</span>
          <ProgressBar
            value={mod.completed as number}
            max={mod.total as number}
            label={`${mod.title}: ${numericLabel}`}
            barClass={visual.barClass}
          />
        </div>
      )}

      <span className={cn('flex items-center gap-1.5 text-sm font-medium', locked ? 'text-muted-foreground' : 'text-brand')}>
        {locked ? <IoLockClosed aria-hidden /> : null}
        {mod.actionLabel}
        {!locked && <IoArrowForward aria-hidden />}
      </span>
    </div>
  );

  return (
    <Link href={mod.href} className={cn('rounded-lg', FOCUS_RING)} aria-label={`${mod.title} — ${visual.label}`}>
      {content}
    </Link>
  );
}

export function ModuleGrid({
  title,
  subtitle,
  modules,
  showUpgrade,
}: {
  title: string;
  subtitle: string;
  modules: ModuleProgress[];
  showUpgrade?: boolean;
}) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h2>{title}</h2>
          <p className='mt-1 text-muted-foreground'>{subtitle}</p>
        </div>
        {showUpgrade && (
          <Button asChild variant='sexy' className={FOCUS_RING}>
            <Link href='/pricing'>Unlock Business Systems</Link>
          </Button>
        )}
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {modules.map((mod) => (
          <ModuleProgressTile key={mod.slug} mod={mod} />
        ))}
      </div>
    </div>
  );
}
