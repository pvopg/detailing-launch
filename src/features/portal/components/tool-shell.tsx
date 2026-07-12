'use client';

import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { IoArrowBack, IoCheckmarkCircle, IoCloudOfflineOutline, IoRefreshOutline, IoSyncOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import type { SaveStatus } from '../hooks/use-module-state';

/**
 * Chrome shared by every Business Systems tool: back link, title, and a live save indicator.
 * Pass `onReset` to surface a guarded "Reset to defaults" action for the tool.
 */
export function ToolShell({
  title,
  description,
  status,
  onReset,
  children,
}: {
  title: string;
  description: string;
  status: SaveStatus;
  onReset?: () => void;
  children: ReactNode;
}) {
  return (
    <section className='flex flex-col gap-8 py-10'>
      <Link href='/portal' className='flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-brand'>
        <IoArrowBack /> Back to portal
      </Link>

      <header className='flex flex-col gap-3'>
        <span className='label w-fit rounded-pill bg-brand-50 px-3 py-1.5 text-brand-600'>
          Business Systems · Interactive tool
        </span>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <h1>{title}</h1>
            <p className='max-w-2xl text-lg text-muted-foreground'>{description}</p>
          </div>
          <div className='flex items-center gap-4'>
            <SaveIndicator status={status} />
            {onReset && <ResetControl title={title} onReset={onReset} />}
          </div>
        </div>
      </header>

      {children}
    </section>
  );
}

function ResetControl({ title, onReset }: { title: string; onReset: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
        <IoRefreshOutline aria-hidden /> Reset to defaults
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title='Reset to defaults?'
        description={
          <>
            This clears everything you&rsquo;ve saved in <span className='font-medium text-foreground'>{title}</span> and
            restores it to how it started. This can&rsquo;t be undone.
          </>
        }
        confirmLabel='Reset to defaults'
        onConfirm={onReset}
        destructive
      />
    </>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  const config: Record<SaveStatus, { label: string; icon: ReactNode; className: string } | null> = {
    idle: null,
    saving: {
      label: 'Saving…',
      icon: <IoSyncOutline className='animate-spin' aria-hidden />,
      className: 'text-muted-foreground',
    },
    saved: {
      label: 'All changes saved',
      icon: <IoCheckmarkCircle aria-hidden />,
      className: 'text-feature-green-ink',
    },
    error: {
      label: 'Could not save — retrying on next change',
      icon: <IoCloudOfflineOutline aria-hidden />,
      className: 'text-destructive',
    },
  };

  const current = config[status];
  if (!current) return null;

  return (
    <span className={`flex items-center gap-1.5 text-sm ${current.className}`} aria-live='polite'>
      {current.icon}
      {current.label}
    </span>
  );
}
