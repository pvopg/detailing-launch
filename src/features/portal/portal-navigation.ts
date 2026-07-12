import type { Entitlements } from '@/features/account/controllers/get-entitlements';
import type { EntitlementTier } from '@/features/pricing/models/product-metadata';

/**
 * Portal content map — the single source of truth for portal navigation.
 *
 * - `guide` modules are read-through content whose only saved state is completion; they persist
 *   via the `checklist_progress` table (item_key = module slug).
 * - `tool` modules are interactive and persist their working state via the `portal_module_state`
 *   table (module_key = module slug) as a JSON blob.
 *
 * Access follows the entitlement superset rule: Business Systems unlocks Foundation too.
 */
export type PortalModuleKind = 'guide' | 'tool';

export interface PortalModule {
  slug: string;
  title: string;
  description: string;
  tier: EntitlementTier;
  kind: PortalModuleKind;
  persistence: 'checklist_progress' | 'portal_module_state';
}

export const FOUNDATION_MODULES: PortalModule[] = [
  {
    slug: 'roadmap',
    title: 'Digital foundation roadmap',
    description: 'How every system connects, and the decisions to make before you build.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'domain-email',
    title: 'Domain & business email',
    description: 'Create a consistent, professional business identity you control.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'website-gbp',
    title: 'Website & Google Business Profile',
    description: 'Make the business findable and trustworthy enough for someone to inquire.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'inquiries-quotes-booking',
    title: 'Inquiries, quotes & booking',
    description: 'Stop losing important customer details in DMs and text threads.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'deposits-payments',
    title: 'Deposits & payments',
    description: 'Make payment expectations clear before the appointment.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'customer-tracking',
    title: 'Customer tracking & follow-up',
    description: 'Give every inquiry a status and a next action.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'reviews-repeat',
    title: 'Reviews & repeat business',
    description: 'Turn completed jobs into trust and future revenue.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
  {
    slug: 'analytics-30-day-plan',
    title: 'Analytics & 30-day plan',
    description: 'Complete the setup in a realistic order and confirm that it works.',
    tier: 'foundation',
    kind: 'guide',
    persistence: 'checklist_progress',
  },
];

export const BUSINESS_SYSTEMS_MODULES: PortalModule[] = [
  {
    slug: 'service-builder',
    title: 'Service & package builder',
    description: 'Define your services and packages and save them for reuse across your business.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
  {
    slug: 'pricing-calculator',
    title: 'Pricing & profitability calculator',
    description: 'Price jobs with confidence by modeling costs, time, and target margin.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
  {
    slug: 'workflow-planner',
    title: 'Customer-workflow planner',
    description: 'Lay out your lead-to-review workflow and the touch points at each stage.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
  {
    slug: 'message-library',
    title: 'Personalized message library',
    description: 'Save reusable inquiry replies, reminders, and review requests in your own voice.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
  {
    slug: 'software-finder',
    title: 'Software finder & saved choices',
    description: 'Pick tools per use case and save your stack decisions in one place.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
  {
    slug: 'dashboard',
    title: 'Progress dashboard & next actions',
    description: 'See your saved progress across modules and the recommended next steps.',
    tier: 'business_systems',
    kind: 'tool',
    persistence: 'portal_module_state',
  },
];

export const PORTAL_MODULES: PortalModule[] = [...FOUNDATION_MODULES, ...BUSINESS_SYSTEMS_MODULES];

export function getPortalModule(slug: string): PortalModule | undefined {
  return PORTAL_MODULES.find((mod) => mod.slug === slug);
}

/** Whether the given entitlements unlock a module (Business Systems is a superset of Foundation). */
export function isModuleUnlocked(mod: PortalModule, entitlements: Entitlements): boolean {
  return mod.tier === 'business_systems' ? entitlements.hasBusinessSystems : entitlements.hasFoundation;
}

/** Previous/next Foundation modules for guide navigation, in authored sequence. */
export function getFoundationNeighbors(slug: string): { prev?: PortalModule; next?: PortalModule } {
  const index = FOUNDATION_MODULES.findIndex((mod) => mod.slug === slug);
  if (index === -1) return {};
  return { prev: FOUNDATION_MODULES[index - 1], next: FOUNDATION_MODULES[index + 1] };
}
