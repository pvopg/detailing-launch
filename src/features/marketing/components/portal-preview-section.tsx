import type { ReactNode } from 'react';

import { Container } from '@/components/container';

import { landingContent } from '../content';

import { BrowserFrame, DashboardPreview, GuidePreview, SearchPreview, ToolsPreview } from './portal-previews';
import { Reveal } from './reveal';
import { TrackInView } from './track-in-view';

const PREVIEW_BODY: Record<string, { url: string; node: ReactNode }> = {
  dashboard: { url: 'detailbusiness.com/portal', node: <DashboardPreview /> },
  guide: { url: 'detailbusiness.com/portal/domain-email', node: <GuidePreview /> },
  tools: { url: 'detailbusiness.com/portal/pricing-calculator', node: <ToolsPreview /> },
  search: { url: 'detailbusiness.com/portal?q=deposit', node: <SearchPreview /> },
};

/**
 * Portal previews — real UI recreated with demo data. Each preview is a <figure> whose accessible
 * label is the descriptive `alt` copy; the mock internals are aria-hidden so the summary is what a
 * screen reader announces. Fires `portal_preview_view` when the section scrolls into view.
 */
export function PortalPreviewSection() {
  const { portalPreviews } = landingContent;
  return (
    <Container id='portal-preview' className='scroll-mt-24'>
      <TrackInView event='portal_preview_view' meta={{ placement: 'section' }}>
        <div className='flex flex-col gap-10'>
          <Reveal className='max-w-2xl'>
            <h2>{portalPreviews.heading}</h2>
            <p className='mt-4 text-lg text-muted-foreground'>{portalPreviews.intro}</p>
          </Reveal>
          <div className='grid gap-6 lg:grid-cols-2'>
            {portalPreviews.previews.map((preview, i) => {
              const body = PREVIEW_BODY[preview.id];
              if (!body) return null;
              return (
                <Reveal
                  as='figure'
                  key={preview.id}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  className='flex flex-col gap-3'
                  role='group'
                  aria-label={preview.alt}
                >
                  <BrowserFrame url={body.url}>{body.node}</BrowserFrame>
                  <figcaption className='px-1'>
                    <span className='font-semibold text-foreground'>{preview.title}</span>
                    <span className='block text-sm text-muted-foreground'>{preview.caption}</span>
                  </figcaption>
                </Reveal>
              );
            })}
          </div>
        </div>
      </TrackInView>
    </Container>
  );
}
