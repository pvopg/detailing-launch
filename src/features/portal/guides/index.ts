import { roadmapGuide } from './roadmap';
import type { GuideContent } from './types';

export * from './types';

/**
 * Guide content registry. Order is informational; navigation order comes from FOUNDATION_MODULES in
 * portal-navigation.ts (the authoritative Foundation sequence). A Foundation module without an entry
 * here renders the "coming soon" scaffold until its content is authored.
 */
export const FOUNDATION_GUIDES: GuideContent[] = [roadmapGuide];

const guidesBySlug = new Map(FOUNDATION_GUIDES.map((guide) => [guide.slug, guide]));

export function getGuide(slug: string): GuideContent | undefined {
  return guidesBySlug.get(slug);
}
