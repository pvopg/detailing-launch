import type { Metadata } from 'next';

import { BuyerFitSection } from '@/features/marketing/components/buyer-fit-section';
import { ConnectedSystemSection } from '@/features/marketing/components/connected-system-section';
import { ConsultationSection } from '@/features/marketing/components/consultation-section';
import { FaqSection } from '@/features/marketing/components/faq-section';
import { FeatureGrid } from '@/features/marketing/components/feature-grid';
import { FinalCtaSection } from '@/features/marketing/components/final-cta-section';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { HowItWorksSection } from '@/features/marketing/components/how-it-works-section';
import { PortalPreviewSection } from '@/features/marketing/components/portal-preview-section';
import { MarketingPricingSection } from '@/features/marketing/components/pricing-section';
import { ProblemSection } from '@/features/marketing/components/problem-section';
import { ProductProofSection } from '@/features/marketing/components/product-proof-section';
import { StructuredData } from '@/features/marketing/components/structured-data';
import { LandingViewBeacon } from '@/features/marketing/components/track-in-view';
import { TrustStrip } from '@/features/marketing/components/trust-strip';
import { landingContent } from '@/features/marketing/content';
import { reportLaunchIssues } from '@/features/marketing/launch-checks';
import { getURL } from '@/utils/get-url';

const { seo } = landingContent;
const canonical = getURL(seo.path);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical },
  openGraph: {
    type: 'website',
    siteName: 'DetailBusiness.com',
    title: seo.title,
    description: seo.description,
    url: canonical,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
};

export default async function HomePage() {
  // Launch-blocking content checks (unapproved refund copy, unresolved consultation credit, etc.)
  // are surfaced in server logs on every render so gaps stay visible before launch.
  reportLaunchIssues();

  return (
    <div className='flex flex-col gap-20 py-8 lg:gap-28'>
      <StructuredData />
      <LandingViewBeacon />

      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <ConnectedSystemSection />
      <FeatureGrid />
      <PortalPreviewSection />
      <ProductProofSection />
      <BuyerFitSection />
      <HowItWorksSection />
      <MarketingPricingSection />
      <ConsultationSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
