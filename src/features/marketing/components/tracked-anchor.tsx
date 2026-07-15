'use client';

import Link from 'next/link';

import { Button, type ButtonProps } from '@/components/ui/button';

import { type LandingEvent, track } from '../analytics';

/**
 * A button-styled anchor/link that emits a landing analytics event on click. Used for non-checkout
 * CTAs (hero anchors, consultation, sign-in) where the destination is a same-page anchor, an inquiry
 * route, or an app route rather than a Stripe checkout.
 */
export function TrackedAnchor({
  href,
  event,
  placement,
  children,
  variant = 'brand',
  size,
  className,
}: {
  href: string;
  event: LandingEvent;
  placement: string;
  children: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}) {
  const external = href.startsWith('mailto:') || href.startsWith('http');
  return (
    <Button asChild variant={variant} size={size} className={className}>
      {external ? (
        <a href={href} onClick={() => track(event, { placement })}>
          {children}
        </a>
      ) : (
        <Link href={href} onClick={() => track(event, { placement })}>
          {children}
        </Link>
      )}
    </Button>
  );
}
