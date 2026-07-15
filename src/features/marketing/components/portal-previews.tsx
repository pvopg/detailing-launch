import type { ReactNode } from 'react';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoLockClosed,
  IoSearch,
  IoSparkles,
  IoTimeOutline,
} from 'react-icons/io5';

import { cn } from '@/utils/cn';

/**
 * Product previews for the landing page.
 *
 * These are live, demo-data recreations of real portal UI — not bitmap screenshots of real
 * accounts — so they carry no user emails, names, tokens, or IDs, stay responsive, and remain crisp
 * at any zoom. Each preview is wrapped by the section in a <figure> whose accessible label is the
 * descriptive copy from content; the mock internals are marked aria-hidden so screen readers get the
 * summary rather than a flood of decorative demo values.
 *
 * All data here is intentional marketing demo data. Do not wire these to real portal state.
 */

/** Minimal, non-obscuring browser chrome. Deliberately thin so the portal UI stays legible. */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card shadow-md'>
      <div className='flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2'>
        <span className='flex gap-1.5' aria-hidden>
          <span className='size-2.5 rounded-full bg-ink-200' />
          <span className='size-2.5 rounded-full bg-ink-200' />
          <span className='size-2.5 rounded-full bg-ink-200' />
        </span>
        <span className='ml-2 truncate rounded-pill bg-card px-3 py-1 text-xs text-muted-foreground' aria-hidden>
          {url}
        </span>
      </div>
      <div className='p-4 sm:p-5'>{children}</div>
    </div>
  );
}

function MiniProgress({ percent, barClass = 'bg-brand' }: { percent: number; barClass?: string }) {
  return (
    <div className='h-2 w-full overflow-hidden rounded-pill bg-muted'>
      <div className={cn('h-full rounded-pill', barClass)} style={{ width: `${percent}%` }} />
    </div>
  );
}

const statusChip: Record<'complete' | 'in_progress' | 'not_started' | 'locked', { label: string; className: string; Icon: typeof IoCheckmarkCircle }> = {
  complete: { label: 'Complete', className: 'bg-feature-green text-feature-green-ink', Icon: IoCheckmarkCircle },
  in_progress: { label: 'In progress', className: 'bg-feature-amber text-feature-amber-ink', Icon: IoTimeOutline },
  not_started: { label: 'Not started', className: 'bg-muted text-muted-foreground', Icon: IoEllipseOutline },
  locked: { label: 'Locked', className: 'bg-muted text-muted-foreground', Icon: IoLockClosed },
};

function StatusChip({ status }: { status: keyof typeof statusChip }) {
  const { label, className, Icon } = statusChip[status];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[0.65rem] font-semibold', className)}>
      <Icon className='text-[0.7rem]' />
      {label}
    </span>
  );
}

export function DashboardPreview() {
  return (
    <div aria-hidden className='flex flex-col gap-4 text-sm'>
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-lg border border-border bg-card p-3'>
          <div className='flex items-baseline justify-between'>
            <span className='font-semibold'>Foundation</span>
            <span className='text-xs text-muted-foreground'>38%</span>
          </div>
          <p className='mb-2 mt-1 text-xs text-muted-foreground'>3 of 8 Essential steps</p>
          <MiniProgress percent={38} />
        </div>
        <div className='rounded-lg border border-border bg-card p-3'>
          <div className='flex items-baseline justify-between'>
            <span className='font-semibold'>Business Systems</span>
            <span className='text-xs text-muted-foreground'>40%</span>
          </div>
          <p className='mb-2 mt-1 text-xs text-muted-foreground'>2 of 5 tools configured</p>
          <MiniProgress percent={40} barClass='bg-feature-green-ink' />
        </div>
      </div>

      <div className='flex items-center justify-between gap-3 rounded-lg border border-brand bg-brand-50 p-3'>
        <div>
          <span className='flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-600'>
            <IoSparkles /> Recommended next
          </span>
          <p className='mt-0.5 font-semibold'>Set up a business email address</p>
          <p className='text-xs text-muted-foreground'>Domain &amp; business email</p>
        </div>
        <span className='flex-shrink-0 rounded-sm bg-brand px-3 py-1.5 text-xs font-semibold text-white'>Continue</span>
      </div>

      <div className='grid grid-cols-3 gap-2'>
        {[
          { t: 'Roadmap', s: 'complete' as const },
          { t: 'Domain & email', s: 'in_progress' as const },
          { t: 'Website & GBP', s: 'not_started' as const },
        ].map((m) => (
          <div key={m.t} className='rounded-lg border border-border bg-card p-2.5'>
            <StatusChip status={m.s} />
            <p className='mt-2 text-xs font-medium leading-snug'>{m.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GuidePreview() {
  const items = [
    { t: 'Choose a domain name', p: 'Essential', done: true },
    { t: 'Register the domain', p: 'Essential', done: true },
    { t: 'Set up business email', p: 'Essential', done: false },
    { t: 'Add an email signature', p: 'Recommended', done: false },
    { t: 'Set up email forwarding', p: 'Later', done: false },
  ];
  const priorityClass: Record<string, string> = {
    Essential: 'bg-brand-50 text-brand-700',
    Recommended: 'bg-feature-purple text-feature-purple-ink',
    Later: 'bg-muted text-muted-foreground',
  };
  return (
    <div aria-hidden className='flex flex-col gap-3 text-sm'>
      <div>
        <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Foundation · Guide 2</span>
        <h4 className='mt-1 text-base font-semibold'>Domain &amp; business email</h4>
      </div>
      <div className='flex flex-col gap-2'>
        {items.map((item) => (
          <div key={item.t} className='flex items-center gap-2 rounded-lg border border-border bg-card p-2.5'>
            {item.done ? (
              <IoCheckmarkCircle className='flex-shrink-0 text-feature-green-ink' />
            ) : (
              <IoEllipseOutline className='flex-shrink-0 text-muted-foreground' />
            )}
            <span className={cn('flex-1 text-xs', item.done && 'text-muted-foreground line-through')}>{item.t}</span>
            <span className={cn('rounded-pill px-2 py-0.5 text-[0.6rem] font-semibold', priorityClass[item.p])}>{item.p}</span>
          </div>
        ))}
      </div>
      <span className='w-fit rounded-sm border border-border px-2.5 py-1 text-xs font-medium text-brand'>Show example</span>
    </div>
  );
}

export function ToolsPreview() {
  return (
    <div aria-hidden className='flex flex-col gap-3 text-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Business Systems</span>
          <h4 className='mt-1 text-base font-semibold'>Pricing &amp; profitability calculator</h4>
        </div>
        <StatusChip status='in_progress' />
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {[
          { l: 'Supplies', v: '$18' },
          { l: 'Time', v: '2.5 hrs' },
          { l: 'Target margin', v: '55%' },
        ].map((f) => (
          <div key={f.l} className='rounded-lg border border-border bg-card p-2.5'>
            <p className='text-[0.65rem] text-muted-foreground'>{f.l}</p>
            <p className='mt-1 font-mono text-sm font-semibold'>{f.v}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between rounded-lg border border-brand bg-brand-50 p-3'>
        <span className='text-xs font-medium text-muted-foreground'>Suggested price</span>
        <span className='font-mono text-lg font-semibold text-brand-700'>$140</span>
      </div>
      <div className='flex gap-2'>
        <span className='rounded-sm bg-brand px-3 py-1.5 text-xs font-semibold text-white'>Finalize</span>
        <span className='rounded-sm border border-border px-3 py-1.5 text-xs font-medium'>Save draft</span>
      </div>
    </div>
  );
}

export function SearchPreview() {
  return (
    <div aria-hidden className='flex flex-col gap-3 text-sm'>
      <div className='flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2'>
        <IoSearch className='text-muted-foreground' />
        <span className='text-muted-foreground'>deposit</span>
      </div>
      <div className='rounded-lg border border-border bg-card p-3'>
        <span className='text-[0.65rem] font-semibold uppercase tracking-wide text-feature-green-ink'>Foundation · Unlocked</span>
        <p className='mt-1 font-semibold'>Deposits &amp; payments</p>
        <p className='text-xs text-muted-foreground'>
          Make payment expectations clear before the appointment and decide when a <mark className='bg-brand-100'>deposit</mark> is required.
        </p>
      </div>
      <div className='rounded-lg border border-dashed border-border bg-muted/40 p-3'>
        <span className='flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground'>
          <IoLockClosed /> Business Systems · Locked
        </span>
        <p className='mt-1 font-semibold'>Pricing &amp; profitability calculator</p>
        <p className='text-xs text-muted-foreground'>Model deposits, costs, and margin for each package.</p>
        <span className='mt-2 inline-block rounded-sm bg-brand px-2.5 py-1 text-[0.7rem] font-semibold text-white'>
          Upgrade to unlock
        </span>
      </div>
    </div>
  );
}
