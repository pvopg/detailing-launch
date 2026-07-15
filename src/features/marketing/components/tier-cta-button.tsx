'use client';

import { useTransition } from 'react';
import Link from 'next/link';

import { Button, type ButtonProps } from '@/components/ui/button';
import type { Price } from '@/features/pricing/types';
import { cn } from '@/utils/cn';

import { type LandingEvent, track } from '../analytics';
import type { TierCtaState } from '../cta';

/**
 * Entitlement-aware tier CTA. Renders either a checkout trigger (for purchasable states) or a plain
 * link into the portal (for owned states) from a pre-resolved `TierCtaState`, so a purchased tier
 * never shows another purchase button. Checkout uses the existing server action and guards against
 * duplicate submissions with a pending state.
 */
export function TierCtaButton({
  state,
  price,
  createCheckoutAction,
  event,
  placement,
  variant = 'brand',
  size,
  className,
}: {
  state: TierCtaState;
  price: Price | null;
  createCheckoutAction: ({ price }: { price: Price }) => void;
  event: Extract<LandingEvent, 'pricing_foundation_click' | 'pricing_business_systems_click' | 'final_cta_click'>;
  placement: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (state.mode === 'link') {
    return (
      <Button asChild variant={variant} size={size} className={cn('w-full', className)}>
        <Link href={state.href} onClick={() => track(event, { placement, action: 'open' })}>
          {state.label}
        </Link>
      </Button>
    );
  }

  const disabled = isPending || !price;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('w-full', className)}
      disabled={disabled}
      aria-busy={isPending}
      onClick={() => {
        if (!price || isPending) return;
        track(event, { placement, action: 'checkout' });
        startTransition(() => createCheckoutAction({ price }));
      }}
    >
      {isPending ? 'Starting checkout…' : state.label}
    </Button>
  );
}
