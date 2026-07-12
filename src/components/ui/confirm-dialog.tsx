'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { cn } from '@/utils/cn';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { Button } from './button';

/**
 * A focus-trapped confirmation modal for a deliberate, hard-to-undo action.
 *
 * When `requireDoubleConfirm` is set, the confirm button is *armed* on the first click and only
 * fires on a second, distinct click — so opening the dialog and confirming take two separate,
 * intentional actions and a stray click can't go through. Cancelling or closing disarms it.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  armedLabel = 'Click again to confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  destructive = false,
  requireDoubleConfirm = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  armedLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
  requireDoubleConfirm?: boolean;
}) {
  const [armed, setArmed] = useState(false);

  // Always start disarmed each time the dialog opens, and reset once it closes.
  useEffect(() => {
    if (!open) setArmed(false);
  }, [open]);

  function handleConfirm() {
    if (requireDoubleConfirm && !armed) {
      setArmed(true);
      return;
    }
    onConfirm();
    onOpenChange(false);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <DialogPrimitive.Content
          className='fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg border border-border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          onOpenAutoFocus={(event) => {
            // Land focus on Cancel, not the destructive button, so Enter/Space is safe.
            event.preventDefault();
          }}
        >
          <div className='flex flex-col gap-1.5'>
            <DialogPrimitive.Title className='text-lg font-semibold text-foreground'>{title}</DialogPrimitive.Title>
            <DialogPrimitive.Description className='text-sm text-muted-foreground'>
              {description}
            </DialogPrimitive.Description>
          </div>

          <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <DialogPrimitive.Close asChild>
              <Button variant='secondary' autoFocus>
                {cancelLabel}
              </Button>
            </DialogPrimitive.Close>
            <Button variant={destructive ? 'destructive' : 'brand'} onClick={handleConfirm} className={cn(armed && 'animate-pulse')}>
              {armed ? armedLabel : confirmLabel}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
