/**
 * Curated catalog for the software finder. Static, client-safe reference data: a short list of the
 * software decisions a solo detailer actually has to make, each with a few vetted options and the
 * vendor's official link. This is guidance, not affiliate placement — options are ordered roughly
 * "simplest / cheapest to start" first, and every use case allows a custom pick via free-form notes.
 *
 * Links point at each vendor's official site. Keep them to canonical root/product URLs so they stay
 * stable; if a product is renamed or a link breaks, fix it here — nothing else references these URLs.
 */

export interface SoftwareOption {
  id: string;
  name: string;
  /** One line on who it fits and the tradeoff. */
  note: string;
  /** Official vendor URL. */
  href: string;
  /** Rough starting cost signal shown as a pill, e.g. "Free", "Free plan", "From $10/mo". */
  cost: string;
}

export interface SoftwareUseCase {
  id: string;
  title: string;
  /** The job to be done, in the detailer's terms. */
  need: string;
  options: SoftwareOption[];
}

export const SOFTWARE_CATALOG: SoftwareUseCase[] = [
  {
    id: 'website',
    title: 'Website',
    need: 'A simple, trustworthy page that shows your services, area, and how to book.',
    options: [
      {
        id: 'carrd',
        name: 'Carrd',
        note: 'One-page site you can launch in an afternoon. Cheapest way to look legit.',
        href: 'https://carrd.co',
        cost: 'Free plan',
      },
      {
        id: 'squarespace',
        name: 'Squarespace',
        note: 'Polished templates with built-in scheduling and payments if you grow into them.',
        href: 'https://www.squarespace.com',
        cost: 'From $16/mo',
      },
      {
        id: 'wix',
        name: 'Wix',
        note: 'Drag-and-drop builder with a generous free tier and a booking add-on.',
        href: 'https://www.wix.com',
        cost: 'Free plan',
      },
    ],
  },
  {
    id: 'google-business-profile',
    title: 'Local listing',
    need: 'Show up on Google Maps and Search when someone nearby looks for detailing.',
    options: [
      {
        id: 'gbp',
        name: 'Google Business Profile',
        note: 'Free, and the single highest-leverage listing for local, review-driven trades.',
        href: 'https://www.google.com/business/',
        cost: 'Free',
      },
    ],
  },
  {
    id: 'booking',
    title: 'Booking & scheduling',
    need: 'Let customers pick a time without the back-and-forth texting.',
    options: [
      {
        id: 'calendly',
        name: 'Calendly',
        note: 'Fast to set up; share a link and let people self-book open slots.',
        href: 'https://calendly.com',
        cost: 'Free plan',
      },
      {
        id: 'square-appointments',
        name: 'Square Appointments',
        note: 'Booking + payments + reminders in one; pairs with Square checkout.',
        href: 'https://squareup.com/us/en/appointments',
        cost: 'Free plan',
      },
      {
        id: 'acuity',
        name: 'Acuity Scheduling',
        note: 'More control over intake questions, packages, and deposits at booking.',
        href: 'https://www.acuityscheduling.com',
        cost: 'From $16/mo',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    need: 'Take cards and deposits so you are not chasing cash after the job.',
    options: [
      {
        id: 'square',
        name: 'Square',
        note: 'Tap-to-pay on your phone, no monthly fee; great for on-site jobs.',
        href: 'https://squareup.com',
        cost: 'Per-transaction',
      },
      {
        id: 'stripe',
        name: 'Stripe',
        note: 'Payment links and deposits online; best if you collect before the appointment.',
        href: 'https://stripe.com',
        cost: 'Per-transaction',
      },
      {
        id: 'paypal',
        name: 'PayPal / Venmo',
        note: 'Familiar to customers for quick deposits; watch personal-vs-business terms.',
        href: 'https://www.paypal.com',
        cost: 'Per-transaction',
      },
    ],
  },
  {
    id: 'quotes-invoices',
    title: 'Quotes & invoices',
    need: 'Send a clean quote or invoice instead of a number in a text thread.',
    options: [
      {
        id: 'wave',
        name: 'Wave',
        note: 'Free invoicing and basic accounting; solid starting point for solo operators.',
        href: 'https://www.waveapps.com',
        cost: 'Free',
      },
      {
        id: 'square-invoices',
        name: 'Square Invoices',
        note: 'Send invoices and deposit requests that tie back to Square payments.',
        href: 'https://squareup.com/us/en/software/invoices',
        cost: 'Free plan',
      },
      {
        id: 'jobber',
        name: 'Jobber',
        note: 'Quotes, scheduling, and invoicing built for field-service trades as you scale.',
        href: 'https://www.getjobber.com',
        cost: 'From $25/mo',
      },
    ],
  },
  {
    id: 'customer-tracking',
    title: 'Customer tracking',
    need: 'Give every inquiry a status and a next action so none slip through.',
    options: [
      {
        id: 'sheets',
        name: 'Google Sheets',
        note: 'A simple pipeline tab beats any CRM you will not actually keep updated.',
        href: 'https://sheets.google.com',
        cost: 'Free',
      },
      {
        id: 'jobber-crm',
        name: 'Jobber',
        note: 'Client records tied to quotes and jobs; the upgrade once a sheet gets painful.',
        href: 'https://www.getjobber.com',
        cost: 'From $25/mo',
      },
      {
        id: 'hubspot',
        name: 'HubSpot CRM',
        note: 'Free CRM with deal stages if you want a real pipeline view early.',
        href: 'https://www.hubspot.com/products/crm',
        cost: 'Free plan',
      },
    ],
  },
  {
    id: 'business-email',
    title: 'Business email',
    need: 'Email from your own domain so you look like a business, not a hobby.',
    options: [
      {
        id: 'google-workspace',
        name: 'Google Workspace',
        note: 'you@yourbusiness.com plus the Google apps you already know.',
        href: 'https://workspace.google.com',
        cost: 'From $6/mo',
      },
      {
        id: 'zoho-mail',
        name: 'Zoho Mail',
        note: 'Cheaper custom-domain email with a free tier for a single mailbox.',
        href: 'https://www.zoho.com/mail/',
        cost: 'Free plan',
      },
    ],
  },
  {
    id: 'reviews',
    title: 'Reviews',
    need: 'Turn finished jobs into public reviews that win the next customer.',
    options: [
      {
        id: 'gbp-reviews',
        name: 'Google Business Profile',
        note: 'Where your reviews matter most; share your review link after each job.',
        href: 'https://www.google.com/business/',
        cost: 'Free',
      },
      {
        id: 'nicejob',
        name: 'NiceJob',
        note: 'Automates review requests and reminders once you have steady volume.',
        href: 'https://get.nicejob.com',
        cost: 'From $75/mo',
      },
    ],
  },
];

export function getUseCase(id: string): SoftwareUseCase | undefined {
  return SOFTWARE_CATALOG.find((useCase) => useCase.id === id);
}

export function getOption(useCaseId: string, optionId: string): SoftwareOption | undefined {
  return getUseCase(useCaseId)?.options.find((option) => option.id === optionId);
}
