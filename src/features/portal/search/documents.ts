import { FOUNDATION_GUIDES, type GuideContent } from '../guides';
import { BUSINESS_SYSTEMS_MODULES } from '../portal-navigation';
import { getTool } from '../tools';

import type { ProtectedSearchDocument } from './types';

import 'server-only';

/**
 * The protected, full-text search index. This module is `server-only`: importing it from a client
 * component fails the build, guaranteeing paid content never ships in a browser bundle. It is built
 * from AUTHORED content objects only — scaffolded modules contribute nothing here and are
 * discoverable only via the public catalog in `./discovery.ts` (so placeholder routes never appear
 * as finished, searchable content).
 */

function guideDocuments(guide: GuideContent): ProtectedSearchDocument[] {
  const href = `/portal/${guide.slug}`;
  const docs: ProtectedSearchDocument[] = [];

  // One canonical guide document. Body aggregates the guide's prose sections so a body match on any
  // section still surfaces the guide.
  const bodyParts = [
    guide.outcome,
    guide.whatItDoes,
    ...(typeof guide.whyItMatters === 'string'
      ? [guide.whyItMatters]
      : guide.whyItMatters.flatMap((reason) => [reason.heading, reason.body])),
    ...guide.goodEnoughToLaunch,
    ...(guide.notRequiredYet ?? []),
    ...(guide.terms?.flatMap((term) => [term.term, term.definition]) ?? []),
    ...(guide.commonMistakes ?? []),
    ...(guide.diagram ?? []),
    ...(guide.callouts?.map((callout) => callout.body) ?? []),
    ...(guide.tables?.flatMap((table) => [
      table.title,
      table.caption,
      ...table.columns,
      ...table.rows.flat(),
      table.note,
    ]) ?? []),
    ...(guide.timeline
      ? [
          guide.timeline.title,
          guide.timeline.intro,
          ...guide.timeline.phases.flatMap((phase) => [phase.heading, ...phase.bullets]),
        ]
      : []),
    ...(guide.detailBlocks?.flatMap((block) => [
      block.title,
      block.body,
      ...(block.bullets ?? []),
      ...(block.items?.flatMap((item) => [item.heading, item.body]) ?? []),
    ]) ?? []),
    guide.disclaimer,
  ];

  docs.push({
    id: `guide:${guide.slug}`,
    title: guide.title,
    description: guide.outcome,
    body: bodyParts.filter(Boolean).join(' \n'),
    href,
    type: 'guide',
    requiredTier: 'foundation',
    guideSlug: guide.slug,
    keywords: guide.searchKeywords,
  });

  // One document per checklist item; the optional instructional example is folded into the body so
  // it is searchable without being a separately-navigable destination.
  for (const item of guide.checklist) {
    const itemBody = [item.title, item.description, item.example, item.completionEvidence].filter(Boolean).join(' \n');
    docs.push({
      id: `checklist:${guide.slug}:${item.id}`,
      title: item.title,
      description: item.description,
      body: itemBody,
      href,
      type: 'checklist-item',
      requiredTier: 'foundation',
      guideSlug: guide.slug,
    });
  }

  // Official vendor links authored on the guide become resource documents — both the flat list and
  // any grouped links contribute.
  const allVendorLinks = [...(guide.vendorLinks ?? []), ...(guide.vendorLinkGroups?.flatMap((group) => group.links) ?? [])];
  for (const link of allVendorLinks) {
    docs.push({
      id: `resource:${guide.slug}:${link.href}`,
      title: link.label,
      body: link.label,
      href: link.href,
      type: 'resource',
      requiredTier: 'foundation',
      guideSlug: guide.slug,
    });
  }

  return docs;
}

/**
 * Authored Business Systems tools. A tool has no long-form content object yet, so its full-text is
 * its title + description. It is still tier-gated: only Business Systems users match it, while lower
 * tiers see the tool as locked discovery metadata.
 */
function toolDocuments(): ProtectedSearchDocument[] {
  return BUSINESS_SYSTEMS_MODULES.filter((mod) => Boolean(getTool(mod.slug))).map((mod) => ({
    id: `tool:${mod.slug}`,
    title: mod.title,
    description: mod.description,
    body: `${mod.title} \n${mod.description}`,
    href: `/portal/${mod.slug}`,
    type: 'tool' as const,
    requiredTier: mod.tier,
  }));
}

export const protectedDocuments: ProtectedSearchDocument[] = [
  ...FOUNDATION_GUIDES.flatMap(guideDocuments),
  ...toolDocuments(),
];
