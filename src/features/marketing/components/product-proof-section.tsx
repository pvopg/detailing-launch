import { IoCheckmarkCircle } from 'react-icons/io5';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';

/**
 * Product proof — demonstrable facts about what the product is and does, in place of testimonials or
 * performance claims (none are approved yet). The testimonial slot exists in content but stays
 * disabled until real, permissioned quotes exist. Engineering-internal metrics (e.g. test counts)
 * are intentionally excluded here.
 */
export function ProductProofSection() {
  const { proof } = landingContent;
  return (
    <Container className='px-0'>
      <section className='rounded-2xl bg-navy-950 px-6 py-16 text-white lg:px-16'>
        <Reveal className='max-w-2xl'>
          <h2 className='text-white'>{proof.heading}</h2>
          <p className='mt-4 text-lg text-ink-300'>{proof.intro}</p>
        </Reveal>
        <ul className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {proof.items.map((item, i) => (
            <Reveal
              as='li'
              key={item.label}
              delay={(i % 3) * 70}
              className='flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-5'
            >
              <span className='flex items-center gap-2 font-semibold text-white'>
                <IoCheckmarkCircle className='flex-shrink-0 text-brand-300' aria-hidden />
                {item.label}
              </span>
              <span className='text-sm text-ink-200'>{item.detail}</span>
            </Reveal>
          ))}
        </ul>

        {/* Testimonial slot — intentionally not rendered until real, permissioned testimonials exist. */}
        {proof.testimonialsEnabled && null}
      </section>
    </Container>
  );
}
