import { BadgeCheck, Link2, Save, ShieldCheck, User } from 'lucide-react';

import { Container } from '@/components/container';

import { landingContent, type TrustItem } from '../content';

import { Reveal } from './reveal';

const ICONS: Record<TrustItem['icon'], typeof BadgeCheck> = {
  'badge-check': BadgeCheck,
  'shield-check': ShieldCheck,
  save: Save,
  user: User,
  link: Link2,
};

/**
 * Trust strip — transparent product/transaction facts only. No fabricated logos, testimonials,
 * counts, or ratings. "Secure checkout through Stripe" names the provider without implying
 * endorsement.
 */
export function TrustStrip() {
  const { trustItems } = landingContent;
  return (
    <Container>
      <ul className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-lg border border-border bg-muted/40 px-6 py-5'>
        {trustItems.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal as='li' key={item.label} delay={i * 60} className='flex items-center gap-2 text-sm font-medium text-foreground'>
              <Icon className='size-4 flex-shrink-0 text-brand' aria-hidden />
              {item.label}
            </Reveal>
          );
        })}
      </ul>
    </Container>
  );
}
