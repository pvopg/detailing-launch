import { Container } from '@/components/container';

import { landingContent } from '../content';

import { BrowserFrame, DashboardPreview } from './portal-previews';
import { TrackedAnchor } from './tracked-anchor';

/**
 * Hero — retains the existing brand-panel design system, with all copy read from centralized
 * content (the working headline is not permanently approved). The visual is a live demo-data
 * recreation of the portal dashboard, never a screenshot of a real account.
 */
export function HeroSection() {
  const { hero } = landingContent;

  return (
    <Container className='px-0'>
      <section className='relative overflow-hidden rounded-2xl bg-brand-500 px-6 py-14 text-white shadow-md lg:px-16 lg:py-20'>
        <div className='relative z-10 grid items-center gap-12 lg:grid-cols-2'>
          <div className='flex max-w-xl flex-col gap-6'>
            <span className='label w-fit animate-fade-rise rounded-pill bg-white/15 px-3 py-2 text-white'>
              {hero.eyebrow}
            </span>
            <h1 className='animate-fade-rise text-white' style={{ animationDelay: '80ms' }}>
              {hero.headline}
            </h1>
            <p className='max-w-lg animate-fade-rise text-lg text-brand-100' style={{ animationDelay: '160ms' }}>
              {hero.description}
            </p>
            <div className='flex animate-fade-rise flex-wrap items-center gap-3' style={{ animationDelay: '240ms' }}>
              <TrackedAnchor href='#pricing' event='landing_primary_cta_click' placement='hero' variant='light'>
                {hero.primaryCta}
              </TrackedAnchor>
              <TrackedAnchor
                href='#portal-preview'
                event='portal_preview_view'
                placement='hero-secondary'
                variant='outline'
                className='border-white/40 bg-transparent text-white hover:bg-white/10'
              >
                {hero.secondaryCta}
              </TrackedAnchor>
            </div>
            <p className='animate-fade-rise text-sm text-brand-100' style={{ animationDelay: '320ms' }}>
              {hero.microcopy}
            </p>
          </div>

          <div className='relative animate-fade-rise' style={{ animationDelay: '200ms' }}>
            <BrowserFrame url='detailbusiness.com/portal'>
              <DashboardPreview />
            </BrowserFrame>
          </div>
        </div>
      </section>
    </Container>
  );
}
