import { ImageResponse } from 'next/og';

import { landingContent } from '@/features/marketing/content';

// Route segment config for the generated share image.
export const alt = landingContent.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Self-contained Open Graph / social share image. Rendered from the design-system brand color and
 * approved marketing copy — no external assets, no private data — so it stays a clean product card.
 */
export default function OpengraphImage() {
  const { hero, pricing } = landingContent;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1268f3',
          color: '#ffffff',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 600 }}>
          DetailBusiness.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 40, color: '#dbeaff' }}>{hero.eyebrow}</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 960 }}>{hero.headline}</div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 30, color: '#dbeaff' }}>
          <span>Foundation {pricing.foundationOffer.price}</span>
          <span>·</span>
          <span>Business Systems {pricing.businessSystemsOffer.price}</span>
          <span>·</span>
          <span>One-time founding access</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
