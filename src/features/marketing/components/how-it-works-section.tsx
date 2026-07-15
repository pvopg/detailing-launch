import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';

/**
 * How it works — three plain steps. Deliberately makes no completion-time promise.
 */
export function HowItWorksSection() {
  const { howItWorks } = landingContent;
  return (
    <Container>
      <div className='flex flex-col gap-10'>
        <h2 className='max-w-2xl'>{howItWorks.heading}</h2>
        <ol className='grid gap-4 md:grid-cols-3'>
          {howItWorks.steps.map((step, i) => (
            <Reveal as='li' key={step.title} delay={i * 90} className='flex flex-col gap-3 rounded-lg border border-border bg-card p-6'>
              <span className='flex size-9 items-center justify-center rounded-full bg-brand-50 font-display text-lg font-semibold text-brand-600'>
                {i + 1}
              </span>
              <h3 className='text-lg'>{step.title}</h3>
              <p className='text-sm text-muted-foreground'>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Container>
  );
}
