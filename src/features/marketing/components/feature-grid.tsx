import { Container } from '@/components/container';
import { cn } from '@/utils/cn';

import { type FeatureCard, landingContent } from '../content';

import { Reveal } from './reveal';

/** Cards cascade in from alternating directions for a lively but tasteful bento reveal. */
const DIRECTIONS = ['left', 'up', 'right'] as const;

/** Feature surface → bento tint classes. `plain` keeps a neutral card for hierarchy variation. */
const SURFACE: Record<FeatureCard['surface'], { surface: string; accent: string }> = {
  brand: { surface: 'bg-brand-50', accent: 'text-brand-600' },
  purple: { surface: 'bg-feature-purple', accent: 'text-feature-purple-ink' },
  cyan: { surface: 'bg-feature-cyan', accent: 'text-feature-cyan-ink' },
  green: { surface: 'bg-feature-green', accent: 'text-feature-green-ink' },
  amber: { surface: 'bg-feature-amber', accent: 'text-feature-amber-ink' },
  plain: { surface: 'bg-card', accent: 'text-brand-600' },
};

/**
 * Feature overview — a bento-style grid over centralized content. Avoids implementation jargon
 * (RLS, JSONB, webhooks) in favor of buyer-facing outcomes.
 */
export function FeatureGrid() {
  const { features } = landingContent;
  return (
    <Container id='what-you-get' className='scroll-mt-24'>
      <div className='flex flex-col gap-10'>
        <Reveal className='max-w-2xl'>
          <h2>{features.heading}</h2>
          <p className='mt-4 text-lg text-muted-foreground'>{features.intro}</p>
        </Reveal>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {features.cards.map((card, i) => {
            const visual = SURFACE[card.surface];
            return (
              <Reveal
                key={card.title}
                direction={DIRECTIONS[i % DIRECTIONS.length]}
                delay={(i % 3) * 80}
                className={cn(
                  'flex flex-col gap-3 rounded-lg border border-border/60 p-6',
                  visual.surface,
                  card.wide && 'sm:col-span-2 lg:col-span-2'
                )}
              >
                <h3 className={cn('text-lg', visual.accent)}>{card.title}</h3>
                <p className='text-sm text-foreground/80'>{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
