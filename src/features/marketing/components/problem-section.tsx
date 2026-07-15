import { IoAlertCircleOutline } from 'react-icons/io5';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';

/**
 * Problem framing — names the disconnected starting state, then positions the product as the
 * organizing layer (not a promise that software creates demand).
 */
export function ProblemSection() {
  const { problem } = landingContent;
  return (
    <Container>
      <div className='flex flex-col gap-10'>
        <div className='max-w-2xl'>
          <h2>{problem.heading}</h2>
          <p className='mt-4 text-lg text-muted-foreground'>{problem.intro}</p>
        </div>
        <ul className='grid gap-3 sm:grid-cols-2'>
          {problem.painPoints.map((point, i) => (
            <Reveal
              as='li'
              key={point}
              direction={i % 2 === 0 ? 'left' : 'right'}
              delay={Math.floor(i / 2) * 70}
              className='flex items-start gap-3 rounded-lg border border-border bg-card p-4'
            >
              <IoAlertCircleOutline className='mt-0.5 flex-shrink-0 text-xl text-feature-amber-ink' aria-hidden />
              <span className='text-sm text-foreground'>{point}</span>
            </Reveal>
          ))}
        </ul>
        <p className='max-w-3xl text-lg text-foreground'>{problem.resolution}</p>
      </div>
    </Container>
  );
}
