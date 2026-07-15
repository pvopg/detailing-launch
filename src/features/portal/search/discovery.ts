import { PORTAL_MODULES } from '../portal-navigation';

import type { SearchDiscoveryItem } from './types';

/**
 * The public discovery catalog: intentionally safe-to-expose feature metadata used to build LOCKED
 * search results, so a lower tier can discover (and upgrade to) a feature without receiving any
 * protected content. Every module — authored or scaffolded — appears here.
 *
 * `marketingDescription` reuses each module's navigation `description`, which is already written and
 * reviewed as public marketing copy (it is shown on the portal index to locked tiles). It is NEVER
 * derived from a protected body.
 */

/** Optional discovery keywords per slug, to catch terms a member would search but the title omits. */
const KEYWORDS: Record<string, string[]> = {
  roadmap: ['plan', 'overview', 'getting started'],
  'domain-email': ['domain', 'email', 'business email', 'identity'],
  'website-gbp': ['website', 'google business profile', 'gbp', 'maps', 'listing'],
  'inquiries-quotes-booking': ['inquiry', 'quote', 'booking', 'leads'],
  'deposits-payments': ['deposit', 'payment', 'invoice', 'balance'],
  'customer-tracking-follow-up': ['crm', 'customer record', 'follow up', 'next action', 'suppression', 'unsubscribe'],
  'reviews-repeat-business': ['review', 'google review', 'repeat', 'referral'],
  'analytics-30-day-plan': ['analytics', 'metrics', 'scorecard', 'measurement', '30-day plan', 'launch plan'],
  'service-builder': ['services', 'packages', 'menu', 'pricing'],
  'pricing-calculator': ['pricing', 'profit', 'margin', 'cost', 'labor'],
  'workflow-planner': ['workflow', 'process', 'stages', 'touch points'],
  'message-library': ['messages', 'templates', 'scripts', 'replies'],
  'software-finder': ['software', 'tools', 'apps', 'stack'],
};

export const discoveryItems: SearchDiscoveryItem[] = PORTAL_MODULES.map((mod) => ({
  id: `feature:${mod.slug}`,
  title: mod.title,
  marketingDescription: mod.description,
  href: `/portal/${mod.slug}`,
  type: mod.kind === 'tool' ? 'tool' : 'guide',
  requiredTier: mod.tier,
  keywords: KEYWORDS[mod.slug],
}));
