import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { Reveal } from './reveal';

/**
 * Buyer fit — an honest two-column "Built for / Not built for". Fit is communicated with an icon +
 * text (not color alone) and includes the scope disclosure that the portal covers digital business
 * systems, not detailing technique.
 */
export function BuyerFitSection() {
  const { buyerFit } = landingContent;
  return (
    <Container>
      <div className='flex flex-col gap-10'>
        <h2 className='max-w-2xl'>{buyerFit.heading}</h2>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Reveal direction='left' className='flex flex-col gap-4 rounded-lg border border-feature-green-ink/30 bg-feature-green p-6 lg:p-8'>
            <h3 className='text-lg text-feature-green-ink'>{buyerFit.builtForLabel}</h3>
            <ul className='flex flex-col gap-3'>
              {buyerFit.builtFor.map((item) => (
                <li key={item.text} className='flex items-start gap-2.5 text-sm text-foreground'>
                  <IoCheckmarkCircle className='mt-0.5 flex-shrink-0 text-feature-green-ink' aria-hidden />
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction='right' delay={80} className='flex flex-col gap-4 rounded-lg border border-border bg-muted/40 p-6 lg:p-8'>
            <h3 className='text-lg text-ink-700'>{buyerFit.notBuiltForLabel}</h3>
            <ul className='flex flex-col gap-3'>
              {buyerFit.notBuiltFor.map((item) => (
                <li key={item.text} className='flex items-start gap-2.5 text-sm text-muted-foreground'>
                  <IoCloseCircle className='mt-0.5 flex-shrink-0 text-ink-500' aria-hidden />
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className='max-w-3xl text-sm text-muted-foreground'>{buyerFit.disclosure}</p>
      </div>
    </Container>
  );
}
