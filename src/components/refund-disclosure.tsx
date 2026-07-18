import Link from 'next/link';

import { refundPolicy } from '@/features/marketing/content';
import { cn } from '@/utils/cn';

/**
 * Point-of-sale refund disclosure (handoff Part 2). Rendered once per pricing section, beside the
 * purchase CTAs rather than only in the footer — but not repeated on every card.
 */
export function RefundDisclosure({ className }: { className?: string }) {
  return (
    <p className={cn('max-w-2xl text-center text-sm text-muted-foreground', className)}>
      {refundPolicy.checkoutDisclosure}{' '}
      <Link href={refundPolicy.route} className='underline hover:text-brand'>
        Read the Refund Policy.
      </Link>
    </p>
  );
}
