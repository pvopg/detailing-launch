import { IoArrowForward } from 'react-icons/io5';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';

/**
 * Connected-system outcome — a deep-navy narrative section (used sparingly for pacing) showing the
 * single path from online presence to repeat business, plus how Foundation vs Business Systems map
 * onto it.
 */
export function ConnectedSystemSection() {
  const { connectedSystem } = landingContent;
  return (
    <Container className='px-0'>
      <section className='rounded-2xl bg-navy-950 px-6 py-16 text-white lg:px-16'>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
          <h2 className='text-white'>{connectedSystem.heading}</h2>
          <p className='text-lg text-ink-300'>{connectedSystem.intro}</p>
        </div>

        <ol className='mt-12 flex flex-wrap items-stretch justify-center gap-3'>
          {connectedSystem.steps.map((step, i) => (
            <Reveal as='li' key={step.label} delay={i * 70} className='flex items-center gap-3'>
              <span className='flex h-full items-center rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white'>
                {step.label}
              </span>
              {i < connectedSystem.steps.length - 1 && (
                <IoArrowForward className='hidden flex-shrink-0 text-brand-300 sm:block' aria-hidden />
              )}
            </Reveal>
          ))}
        </ol>

        <div className='mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2'>
          <Reveal direction='left' className='rounded-lg border border-white/15 bg-white/5 p-5'>
            <span className='label text-brand-300'>Foundation</span>
            <p className='mt-2 text-sm text-ink-200'>{connectedSystem.foundationNote}</p>
          </Reveal>
          <Reveal direction='right' delay={80} className='rounded-lg border border-white/15 bg-white/5 p-5'>
            <span className='label text-brand-300'>Business Systems</span>
            <p className='mt-2 text-sm text-ink-200'>{connectedSystem.businessNote}</p>
          </Reveal>
        </div>
      </section>
    </Container>
  );
}
