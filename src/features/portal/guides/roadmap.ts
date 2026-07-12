import type { GuideContent } from './types';

export const roadmapGuide: GuideContent = {
  slug: 'roadmap',
  title: 'Digital foundation roadmap',
  outcome: 'A clear picture of how every system connects — and the decisions to make before you build.',
  estimatedMinutes: 20,
  tint: 'blue',

  whatItDoes:
    'The roadmap is the map of your whole business. It shows how a stranger becomes a paying, repeat customer, and which system handles each step. Before you set up any single tool, this guide gets the shape of the journey clear so every later decision has a place to fit.',

  whyItMatters:
    'Most part-time detailers assemble tools one at a time and end up with gaps — an inquiry with no follow-up, a booking with no deposit, a finished job with no review. When you can see the whole journey first, you stop building disconnected pieces and start building one system where every step hands off cleanly to the next.',

  diagram: [
    'Online presence',
    'Inquiry or booking',
    'Quote and deposit',
    'Appointment and reminder',
    'Service and final payment',
    'Review and repeat service',
  ],

  goodEnoughToLaunch: [
    'You can name the single tool or place responsible for each step of the journey.',
    'Every service is classified as either direct-booking or quote-required.',
    'You know where inquiries land and where money is collected.',
    'You have run one complete test from inquiry to review yourself.',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'Nothing here has to be perfect. The goal is one connected path a customer can travel, not a finished, polished operation. You will refine each step in its own guide.',
    },
  ],

  checklist: [
    {
      id: 'define-service-area',
      title: 'Define your service area',
      description: 'The towns, radius, or zones you will actually travel to. This shapes your ads, your profile, and your quotes.',
      example:
        'We provide mobile detailing within 20 miles of Kansas City, Kansas. Locations beyond 20 miles are quoted separately.',
      priority: 'essential',
    },
    {
      id: 'document-primary-services',
      title: 'Document your primary services',
      description: 'The 3–6 services you actually sell today. Keep it to what you can deliver reliably.',
      example:
        'Express wash, full interior detail, exterior wash + wax, and a monthly maintenance plan. Leave off anything you cannot deliver consistently yet.',
      priority: 'essential',
    },
    {
      id: 'decide-direct-booking',
      title: 'Decide which services can be booked directly',
      description: 'Predictable scope, time, and price — safe for a customer to book without you quoting first.',
      example:
        'Express wash + interior refresh: fixed 90 minutes at $120 — customers can book this online directly. Full paint correction: depends on condition, so it stays quote-only.',
      priority: 'essential',
    },
    {
      id: 'decide-quote-required',
      title: 'Decide which services require a quote',
      description: 'Anything where condition or scope changes the price enough that a flat rate would burn you.',
      example:
        'Pet-hair removal, heavy stain or odor treatment, and paint correction vary too much to price sight-unseen — mark these quote-required.',
      priority: 'essential',
    },
    {
      id: 'choose-inquiry-destination',
      title: 'Choose where customer inquiries will go',
      description: 'One place you check every day — not scattered across DMs, texts, and email.',
      example:
        'Route every website form and DM into one shared inbox or booking tool, so no request lives only in a text thread you will forget.',
      priority: 'essential',
    },
    {
      id: 'choose-payment-collection',
      title: 'Choose how deposits and final payments will be collected',
      description: 'The account or tool that will take deposits and final balances.',
      example:
        'Require a 25% deposit to hold any booking over $150; collect the balance on completion by card or tap-to-pay. Adapt this to your business.',
      priority: 'essential',
    },
    {
      id: 'choose-customer-tracking',
      title: 'Choose where leads and customers will be tracked',
      description: 'Even a simple sheet works for now — the point is every lead has a status and a next action.',
      example:
        'One spreadsheet with a row per lead and columns for name, service, quoted price, status, and next action. A simple starting point you can upgrade later.',
      priority: 'essential',
    },
    {
      id: 'create-review-process',
      title: 'Create a review-request process',
      description: 'Decide how and when you will ask for a review after a completed job.',
      example:
        '“Thanks again, [name]! If you were happy with the result, a quick Google review really helps a small business like mine: [review link].”',
      priority: 'recommended',
    },
    {
      id: 'select-basic-metrics',
      title: 'Select the basic metrics you will review',
      description: 'A short list you will actually look at — inquiries, bookings, reviews.',
      example:
        'Track five each week: inquiries received, quotes sent, jobs booked, revenue, and reviews received. A simple starting point you can grow later.',
      priority: 'recommended',
    },
    {
      id: 'complete-test-run',
      title: 'Complete one test run through the entire customer journey',
      description: 'Act as your own customer from first inquiry through review, and note every step that is missing or confusing.',
      example:
        'Submit your own inquiry, send yourself a quote and deposit request, book a slot, then trigger the review request — writing down every step that breaks or feels confusing.',
      priority: 'essential',
    },
  ],

  commonMistakes: [
    'Buying tools before deciding what the journey should look like.',
    'Leaving inquiries in DMs where they get buried and forgotten.',
    'Treating every service as a custom quote, which slows down easy, bookable jobs.',
    'Never testing the full journey end to end before sending real traffic to it.',
  ],

  nextGuideSlug: 'domain-email',
};
