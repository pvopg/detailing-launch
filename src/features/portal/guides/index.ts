import { analyticsThirtyDayPlanGuide } from './analytics-30-day-plan';
import { customerTrackingFollowUpGuide } from './customer-tracking-follow-up';
import { depositsPaymentsGuide } from './deposits-payments';
import { domainEmailGuide } from './domain-email';
import { inquiriesQuotesBookingGuide } from './inquiries-quotes-booking';
import { reviewsRepeatBusinessGuide } from './reviews-repeat-business';
import { roadmapGuide } from './roadmap';
import type { GuideContent } from './types';
import { websiteGbpGuide } from './website-gbp';

export * from './types';

/**
 * Guide content registry. Order is informational; navigation order comes from FOUNDATION_MODULES in
 * portal-navigation.ts (the authoritative Foundation sequence). A Foundation module without an entry
 * here renders the "coming soon" scaffold until its content is authored.
 */
export const FOUNDATION_GUIDES: GuideContent[] = [
  roadmapGuide,
  domainEmailGuide,
  websiteGbpGuide,
  inquiriesQuotesBookingGuide,
  depositsPaymentsGuide,
  customerTrackingFollowUpGuide,
  reviewsRepeatBusinessGuide,
  analyticsThirtyDayPlanGuide,
];

const guidesBySlug = new Map(FOUNDATION_GUIDES.map((guide) => [guide.slug, guide]));

export function getGuide(slug: string): GuideContent | undefined {
  return guidesBySlug.get(slug);
}
