/**
 * Centralized, typed marketing content for the public landing page.
 *
 * Every mutable commercial/legal decision lives here rather than being scattered across components,
 * so unresolved copy (headline, refund policy, consultation credit) can be reviewed and flipped in
 * one place. Launch-safety defaults are intentionally conservative:
 *
 *   - `consultation.creditEnabled` defaults to `false` — the $25 Business Systems credit is unresolved.
 *   - `refundPolicyApproved` defaults to `false` — the refund wording is not final and must not be
 *     presented as an approved promise. See `launch-checks.ts` for the launch-blocking validation.
 *
 * Nothing here is secret: assume every value is publicly visible. Do not add Stripe secrets, price
 * IDs, or internal product identifiers — tier ↔ product mapping is resolved server-side from the
 * `products` table via `metadata.tier`.
 */

import type { EntitlementTier } from '@/features/pricing/models/product-metadata';

export interface TrustItem {
  /** Lucide icon name, resolved in the TrustStrip component. */
  icon: 'badge-check' | 'shield-check' | 'save' | 'user' | 'link';
  label: string;
}

export interface FeatureCard {
  title: string;
  body: string;
  surface: 'brand' | 'purple' | 'cyan' | 'green' | 'amber' | 'plain';
  /** Spans two columns in the bento grid on large screens. */
  wide?: boolean;
}

export interface ProofItem {
  label: string;
  detail: string;
}

export interface BuyerFitItem {
  text: string;
}

export interface HowItWorksStep {
  title: string;
  body: string;
}

export interface FaqItem {
  id: string;
  question: string;
  /** Approved answer. The refund item is special-cased and rendered from `refundPolicyFaq`. */
  answer: string;
  /** Marks the refund question, which must never present unapproved copy as final. */
  isRefundPolicy?: boolean;
}

export interface ComparisonRow {
  feature: string;
  foundation: boolean | string;
  businessSystems: boolean | string;
}

export interface OfferContent {
  tier: EntitlementTier;
  name: string;
  price: string;
  priceCents: number;
  positioning: string;
  includes: string[];
  /** Base CTA label used for the "purchase" state; entitlement-aware states override it. */
  ctaLabel: string;
}

export interface ConnectedSystemStep {
  label: string;
}

export interface PortalPreview {
  id: string;
  /** Short heading shown above the preview frame. */
  title: string;
  caption: string;
  /**
   * Descriptive alt text for the preview. Because previews are rendered as live, demo-data DOM
   * (not bitmap screenshots of real accounts), this doubles as the frame's accessible label.
   */
  alt: string;
}

export interface LandingPageContent {
  seo: {
    title: string;
    description: string;
    /** Path used to build the canonical + OG URL against NEXT_PUBLIC_SITE_URL. */
    path: string;
    ogImagePath: string;
  };
  hero: {
    eyebrow: string;
    /** Working headline — not permanently approved; read from here, never hard-coded in the view. */
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
  };
  trustItems: TrustItem[];
  problem: {
    heading: string;
    intro: string;
    painPoints: string[];
    resolution: string;
  };
  connectedSystem: {
    heading: string;
    intro: string;
    steps: ConnectedSystemStep[];
    foundationNote: string;
    businessNote: string;
  };
  features: {
    heading: string;
    intro: string;
    cards: FeatureCard[];
  };
  portalPreviews: {
    heading: string;
    intro: string;
    previews: PortalPreview[];
  };
  proof: {
    heading: string;
    intro: string;
    items: ProofItem[];
    /** Testimonials are disabled until real, permissioned quotes exist. */
    testimonialsEnabled: boolean;
  };
  buyerFit: {
    heading: string;
    builtForLabel: string;
    notBuiltForLabel: string;
    builtFor: BuyerFitItem[];
    notBuiltFor: BuyerFitItem[];
    disclosure: string;
  };
  howItWorks: {
    heading: string;
    steps: HowItWorksStep[];
  };
  pricing: {
    heading: string;
    intro: string;
    foundationOffer: OfferContent;
    businessSystemsOffer: OfferContent;
    comparisonHeading: string;
    comparisonRows: ComparisonRow[];
    thirdPartyDisclosure: string;
  };
  consultation: {
    enabled: boolean;
    title: string;
    price: string;
    format: string;
    includes: string[];
    ctaLabel: string;
    /** Inquiry route used when scheduling/payment is not implemented. Must resolve. */
    ctaHref: string;
    separateNote: string;
    /** The unresolved $25 Business Systems credit — must stay disabled by default. */
    creditEnabled: boolean;
    creditCopy?: string;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  finalCta: {
    heading: string;
    description: string;
    microcopy: string;
  };
  footer: {
    tagline: string;
    supportEmail: string;
    /** Legal pages are only linked when implemented, so no dead links ship. */
    legal: { label: string; href: string; available: boolean }[];
    thirdPartyDisclosure: string;
  };
  /** Whether the final refund wording has been approved. Launch-blocking when false. */
  refundPolicyApproved: boolean;
  /** Approved refund answer, rendered only when `refundPolicyApproved` is true. */
  refundPolicyFaq?: string;
}

const FOUNDATION_INCLUDES = [
  'Eight-guide Foundation sequence',
  'Saved Essential-step progress',
  'Optional examples and common mistakes',
  'Official vendor links',
  'Portal-home progress and next action',
  'Entitlement-aware portal search',
];

const BUSINESS_INCLUDES = [
  'Everything in Foundation',
  'Service & package builder',
  'Pricing & profitability calculator',
  'Customer-workflow planner',
  'Personalized message library',
  'Software finder with saved choices',
  'Draft / Finalize status and Reset to defaults',
];

export const landingContent: LandingPageContent = {
  seo: {
    title: 'Mobile Detailing Business Systems | pgGallery',
    description:
      'Build the digital foundation around your mobile detailing work with guided setup, saved progress, pricing, workflow, messaging, and software tools.',
    path: '/',
    ogImagePath: '/opengraph-image',
  },
  hero: {
    eyebrow: 'A digital business system for working mobile detailers',
    headline: 'Turn your weekend detailing into a real business.',
    description:
      'Build the online presence, inquiry, payment, customer follow-up, and review systems that make your detailing business easier to run.',
    primaryCta: 'Explore the kits',
    secondaryCta: 'See inside the portal',
    microcopy: 'One-time founding access. No subscription required.',
  },
  trustItems: [
    { icon: 'badge-check', label: 'One-time access' },
    { icon: 'shield-check', label: 'Secure checkout through Stripe' },
    { icon: 'save', label: 'Saved progress and tools' },
    { icon: 'user', label: 'Built for solo and part-time detailers' },
    { icon: 'link', label: 'Official vendor guidance links' },
  ],
  problem: {
    heading: 'You know how to detail. The business around the work is the hard part.',
    intro:
      'The detailing is the easy part. Everything around it tends to live in your head and across a dozen threads.',
    painPoints: [
      'Inquiries split across texts, DMs, and comments',
      'No consistent quote or booking path',
      'Deposits and payments handled a different way each time',
      'Customer details stored in memory or scattered notes',
      'Follow-ups and review requests forgotten',
      'Uncertainty about which software you actually need',
    ],
    resolution:
      'This portal is the organizing layer for all of it — a clear plan and saved tools for the systems around your work. It will not create demand for you, but it makes the business you already have easier to run.',
  },
  connectedSystem: {
    heading: 'Build one connected path from first inquiry to repeat customer.',
    intro:
      'Each piece hands off to the next, so a lead never falls through the cracks between a text and a paid, repeat customer.',
    steps: [
      { label: 'Online presence' },
      { label: 'Inquiry or quote request' },
      { label: 'Deposit and payment' },
      { label: 'Customer tracking' },
      { label: 'Follow-up' },
      { label: 'Review and repeat business' },
    ],
    foundationNote: 'Foundation gives you the plan — what to build, and in what order.',
    businessNote: 'Business Systems adds the saved tools to implement and reuse it.',
  },
  features: {
    heading: 'Everything the business side needs — none of the detailing fluff.',
    intro:
      'This is not a course on paint correction. It is the digital foundation that makes a detailing business feel organized and legit.',
    cards: [
      {
        title: 'Know what to build next',
        body: 'Eight Foundation guides sequence the setup, with progress tracked on the Essential steps only.',
        surface: 'brand',
        wide: true,
      },
      {
        title: 'Resume without starting over',
        body: 'Your checklist and tool state save to your member account, so you can pick up where you left off.',
        surface: 'cyan',
      },
      {
        title: 'Build services and pricing',
        body: 'Save reusable service packages and model pricing scenarios by cost, time, and target margin.',
        surface: 'purple',
      },
      {
        title: 'Standardize the customer journey',
        body: 'Lay out workflow stages and save reusable messages for inquiries, reminders, and reviews.',
        surface: 'green',
      },
      {
        title: 'Choose software intentionally',
        body: 'Work through use-case decisions, save your choices, and jump to official vendor links.',
        surface: 'amber',
      },
      {
        title: 'Find anything quickly',
        body: 'Entitlement-aware search spans the content you have access to, with safe discovery of the rest.',
        surface: 'plain',
      },
      {
        title: 'See progress at a glance',
        body: 'Portal home shows your status, a Continue-where-you-left-off card, and one recommended next action.',
        surface: 'plain',
      },
      {
        title: 'Start over safely',
        body: 'A guarded Reset to defaults lets you clear any of the five tools without touching the rest.',
        surface: 'plain',
      },
    ],
  },
  portalPreviews: {
    heading: 'See the portal before you buy it.',
    intro:
      'Real product UI with intentional demo data — the member dashboard, a Foundation guide, the Business Systems tools, and entitlement-aware search.',
    previews: [
      {
        id: 'dashboard',
        title: 'Member dashboard',
        caption: 'Progress across both tiers, Continue where you left off, and one recommended next action.',
        alt: 'Portal home dashboard showing Foundation at 3 of 8 Essential steps, a recommended next action card, and module tiles with not-started, in-progress, and complete states.',
      },
      {
        id: 'guide',
        title: 'Foundation guide',
        caption: 'Essential / Recommended / Later steps with saved checklist progress and optional examples.',
        alt: 'Domain and business email Foundation guide showing a checklist with Essential, Recommended, and Later labels, several items checked, and a Show example control.',
      },
      {
        id: 'tools',
        title: 'Business Systems tools',
        caption: 'Interactive tools like the pricing calculator with Draft / Finalize and saved state.',
        alt: 'Pricing and profitability calculator tool showing cost, time, and margin inputs with a computed price and a Finalize control.',
      },
      {
        id: 'search',
        title: 'Portal-wide search',
        caption: 'Full-text results for content you own, plus safe locked discovery with an upgrade prompt.',
        alt: 'Portal search results showing an unlocked full-text result and a locked result with a title, short description, and an Upgrade to unlock prompt.',
      },
    ],
  },
  proof: {
    heading: 'See the system before you buy it.',
    intro:
      'No testimonials or performance claims yet — just what the product actually is and does today.',
    items: [
      { label: '8-guide Foundation sequence', detail: 'A step-by-step setup path from online presence to repeat business.' },
      { label: '5 saved Business Systems tools', detail: 'Service, pricing, workflow, message, and software tools that save their state.' },
      { label: 'Saved per-account progress', detail: 'Checklist and tool state persist to your member account.' },
      { label: 'One-time checkout and automatic access', detail: 'Secure Stripe checkout grants portal access through your account.' },
      { label: 'Server-enforced tier access', detail: 'What you can open is decided on the server, not hidden in the browser.' },
      { label: 'Keyboard- and screen-reader-friendly controls', detail: 'Built to accessibility standards, not color alone.' },
      { label: 'Official vendor links, not copied tutorials', detail: 'We point you to the source instead of reprinting setup steps that go stale.' },
    ],
    testimonialsEnabled: false,
  },
  buyerFit: {
    heading: 'Built for working detailers — not everyone.',
    builtForLabel: 'Built for',
    notBuiltForLabel: 'Not built for',
    builtFor: [
      { text: 'Weekend and part-time mobile detailers' },
      { text: 'Solo operators already doing paid work' },
      { text: 'Detailers relying on texts, DMs, and referrals' },
      { text: 'Operators who want clearer systems before hiring an agency' },
      { text: 'People willing to implement the guidance themselves' },
    ],
    notBuiltFor: [
      { text: 'People learning how to detail a vehicle' },
      { text: 'Mature shops with established operations' },
      { text: 'Franchise organizations' },
      { text: 'Buyers seeking legal, tax, licensing, insurance, or equipment advice' },
      { text: 'Anyone expecting guaranteed income' },
    ],
    disclosure:
      'This portal focuses on the digital business systems around detailing — not washing, paint correction, coating installation, or equipment selection.',
  },
  howItWorks: {
    heading: 'How it works',
    steps: [
      { title: 'Choose access', body: 'Select Foundation for the plan, or Business Systems for the plan plus the saved tools.' },
      { title: 'Sign in and unlock the portal', body: 'Complete secure checkout and get account-based access to your tier automatically.' },
      { title: 'Follow the next action', body: 'Work through the Essential steps and saved tools, and resume anytime from where you left off.' },
    ],
  },
  pricing: {
    heading: 'One-time founding access. No subscription.',
    intro:
      'Start with the Foundation plan, or get the full Business Systems workspace. Buy once — Business Systems includes everything in Foundation.',
    foundationOffer: {
      tier: 'foundation',
      name: 'Mobile Detailing Digital Foundation Kit',
      price: '$20',
      priceCents: 2000,
      positioning: 'For detailers who need a clear setup plan.',
      includes: FOUNDATION_INCLUDES,
      ctaLabel: 'Get Foundation access — $20',
    },
    businessSystemsOffer: {
      tier: 'business_systems',
      name: 'Mobile Detailing Business Systems Kit',
      price: '$99',
      priceCents: 9900,
      positioning: 'For detailers ready to build and save the working system.',
      includes: BUSINESS_INCLUDES,
      ctaLabel: 'Get Business Systems access — $99',
    },
    comparisonHeading: 'Compare the kits',
    comparisonRows: [
      { feature: 'Eight-guide Foundation sequence', foundation: true, businessSystems: true },
      { feature: 'Saved Essential-step progress', foundation: true, businessSystems: true },
      { feature: 'Examples and common mistakes', foundation: true, businessSystems: true },
      { feature: 'Official vendor links', foundation: true, businessSystems: true },
      { feature: 'Portal-home progress and next action', foundation: true, businessSystems: true },
      { feature: 'Entitlement-aware portal search', foundation: 'Foundation content', businessSystems: 'Full portal' },
      { feature: 'Service & package builder', foundation: false, businessSystems: true },
      { feature: 'Pricing & profitability calculator', foundation: false, businessSystems: true },
      { feature: 'Customer-workflow planner', foundation: false, businessSystems: true },
      { feature: 'Personalized message library', foundation: false, businessSystems: true },
      { feature: 'Software finder with saved choices', foundation: false, businessSystems: true },
      { feature: 'Draft / Finalize and Reset to defaults', foundation: false, businessSystems: true },
    ],
    thirdPartyDisclosure:
      'Access covers the portal only. Recommended third-party services — domain, email, website, booking, payments, CRM, messaging, and analytics — bill separately at their own rates.',
  },
  consultation: {
    enabled: true,
    title: 'Detailing Business Systems Consultation',
    price: '$150',
    format: '60-minute video call',
    includes: [
      'A review of your current digital systems',
      'Website, booking, CRM, and payment recommendations',
      'A prioritized implementation plan',
      'A written post-call summary',
    ],
    ctaLabel: 'Ask about a consultation',
    ctaHref: 'mailto:hello@detailbusiness.com?subject=Detailing%20Business%20Systems%20Consultation',
    separateNote: 'The consultation is a separate offer and is not included with either kit.',
    creditEnabled: false,
    creditCopy: undefined,
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        id: 'subscription',
        question: 'Is this a subscription?',
        answer:
          'No. The $20 and $99 offers are one-time founding-access purchases. A future subscription is not included or promised.',
      },
      {
        id: 'difference',
        question: 'What is the difference between Foundation and Business Systems?',
        answer:
          'Foundation explains what to build and in what order. Business Systems includes Foundation and adds five saved tools for services, pricing, workflow, messages, and software decisions.',
      },
      {
        id: 'techniques',
        question: 'Does this teach detailing techniques?',
        answer:
          'No. It focuses on the digital business systems around the work — not washing, paint correction, ceramic coating installation, or equipment selection.',
      },
      {
        id: 'established',
        question: 'Do I need an established business?',
        answer:
          'The primary buyer already knows how to detail and has completed at least a few paid jobs. It is designed for solo, weekend, part-time, and early-stage operators.',
      },
      {
        id: 'other-software',
        question: 'Do I need to buy other software?',
        answer:
          'The purchase covers portal access only. Some recommendations involve third-party domains, email, website, forms, booking, payments, CRM, messaging, analytics, accounting, or advertising services. Their fees are separate.',
      },
      {
        id: 'superset',
        question: 'Does the $99 kit include the $20 kit?',
        answer: 'Yes. Business Systems access includes everything in Foundation.',
      },
      {
        id: 'access',
        question: 'How do I access the portal after purchase?',
        answer:
          'You sign in with the purchasing account. Successful checkout grants the appropriate access automatically through the account-access flow.',
      },
      {
        id: 'save-progress',
        question: 'Can I save my progress?',
        answer:
          'Yes. Foundation checklist progress and Business Systems tool state save to your authenticated account.',
      },
      {
        id: 'consultation',
        question: 'Is a consultation included?',
        answer: 'No. The $150 consultation is a separate offer.',
      },
      {
        id: 'refund',
        question: 'What is the refund policy?',
        answer: '', // Rendered from refundPolicyFaq only when approved; see FaqSection.
        isRefundPolicy: true,
      },
    ],
  },
  finalCta: {
    heading: 'Build the business system around the work you already know how to do.',
    description:
      'Start with the Foundation plan, or unlock the complete saved workspace with Business Systems.',
    microcopy: 'One-time founding access. Third-party software costs are separate.',
  },
  footer: {
    tagline: 'Digital business systems for working mobile detailers.',
    supportEmail: 'hello@detailbusiness.com',
    legal: [
      // Only rendered when `available` is true, so no dead legal links ship. Flip to true when the
      // corresponding page is implemented and (for refund) approved.
      { label: 'Privacy Policy', href: '/privacy', available: false },
      { label: 'Terms', href: '/terms', available: false },
      { label: 'Refund Policy', href: '/refund-policy', available: false },
    ],
    thirdPartyDisclosure:
      'Recommended third-party software is billed separately by those providers and is not included in portal access.',
  },
  refundPolicyApproved: false,
  refundPolicyFaq: undefined,
};

/**
 * Resolves the visible answer for a FAQ item. The refund item is launch-safe: it returns approved
 * copy only when `refundPolicyApproved` is set, otherwise a placeholder that does not present the
 * draft as final. Shared by the FAQ accordion and the FAQ structured data so the two never diverge.
 */
export function resolveFaqAnswer(item: FaqItem, content: LandingPageContent = landingContent): string {
  if (!item.isRefundPolicy) return item.answer;
  if (content.refundPolicyApproved && content.refundPolicyFaq?.trim()) return content.refundPolicyFaq;
  return `Our refund policy is being finalized and will be published here before founding access opens. For refund questions in the meantime, email ${content.footer.supportEmail}.`;
}
