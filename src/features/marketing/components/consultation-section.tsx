import { IoCheckmark } from 'react-icons/io5';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';
import { TrackedAnchor } from './tracked-anchor';

/**
 * Consultation — a distinct offer, visually separate from the portal tiers. Clearly states it is not
 * included with either kit. The unresolved $25 Business Systems credit stays behind
 * `creditEnabled` (default false) and is only rendered when both the flag and approved copy exist.
 */
export function ConsultationSection() {
  const { consultation } = landingContent;
  if (!consultation.enabled) return null;

  const showCredit = consultation.creditEnabled && Boolean(consultation.creditCopy?.trim());

  return (
    <Container>
      <section className='flex flex-col gap-8 rounded-2xl border border-border bg-card p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12'>
        <Reveal direction='left' className='flex max-w-xl flex-col gap-4'>
          <span className='label text-brand'>1:1 help</span>
          <h2 className='text-2xl lg:text-3xl'>{consultation.title}</h2>
          <div className='flex items-baseline gap-2'>
            <span className='font-display text-3xl font-semibold'>{consultation.price}</span>
            <span className='text-sm text-muted-foreground'>· {consultation.format}</span>
          </div>
          <ul className='flex flex-col gap-2'>
            {consultation.includes.map((item) => (
              <li key={item} className='flex items-start gap-2 text-sm text-foreground'>
                <IoCheckmark className='mt-0.5 flex-shrink-0 text-brand' aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className='text-sm text-muted-foreground'>{consultation.separateNote}</p>
          {showCredit && <p className='text-sm font-medium text-brand'>{consultation.creditCopy}</p>}
        </Reveal>
        <Reveal direction='right' delay={100} className='flex-shrink-0'>
          <TrackedAnchor
            href={consultation.ctaHref}
            event='consultation_cta_click'
            placement='consultation'
            variant='brand'
            size='lg'
          >
            {consultation.ctaLabel}
          </TrackedAnchor>
        </Reveal>
      </section>
    </Container>
  );
}
