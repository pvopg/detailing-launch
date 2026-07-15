import type { GuideContent } from './types';

/**
 * Foundation Guide 2 — Domain & Business Email.
 *
 * Canonical editorial source: Foundation_Guide_02_Domain_and_Business_Email.md. Checklist item ids
 * (`domain-email-01`..`domain-email-14`) are stable and must not change after release, so saved
 * progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only:
 * items 01–10 are Essential (denominator 10); 11–13 Recommended; 14 Later.
 */
export const domainEmailGuide: GuideContent = {
  slug: 'domain-email',
  title: 'Domain & business email',
  outcome:
    'Secure a business-owned web address and set up a professional email customers can recognize and trust.',
  estimatedMinutes: 45,
  tint: 'purple',

  whatItDoes:
    'Your domain is the permanent address behind your website and business email. It should belong to you — not a developer, marketing company, or temporary platform account. A professional email such as hello@yourbusiness.com gives customers a consistent way to recognize your business across quotes, payment requests, reminders, and review follow-ups. This guide helps you choose and protect the domain, connect an email provider, and confirm that messages work before you depend on them with customers. You do not need a finished website to complete this guide — the domain and email can be ready first.',

  terms: [
    { term: 'Domain', definition: 'The address, such as brightmobiledetailing.com.' },
    {
      term: 'DNS',
      definition: "The connection settings that tell the internet where the domain's website and email services live.",
    },
    {
      term: 'Mailbox',
      definition: 'The inbox used to send, receive, and store messages, such as Google Workspace or Microsoft 365.',
    },
  ],

  diagram: [
    'Business name',
    'Domain',
    'Professional email',
    'Website and Google Business Profile',
    'Inquiry',
    'Quote, payment, follow-up, and review',
  ],

  whyItMatters:
    'Your domain can become the common address used by your website, email, forms, booking links, and future marketing, so losing control of it can interrupt several business systems at once — the owner should know which account controls the registration. Using the same business domain across email and your website also makes the business easier to recognize: a customer should not have to decide whether a quote from a personal inbox belongs to the company they found online. Modern email providers use DNS records such as MX, SPF, DKIM, and DMARC to route mail and help receiving systems evaluate whether a message is authorized, so it is worth following the exact records your provider supplies rather than copying values from examples. Finally, the domain and the email provider are separate choices — you should be able to keep the domain even if the website builder or mailbox provider changes later.',

  callouts: [
    {
      tone: 'note',
      body: 'The goal is not a technically perfect email system. The goal is a domain you control and an inbox that customers can use reliably.',
    },
  ],

  goodEnoughToLaunch: [
    'The chosen domain is registered in an account the business owner controls.',
    'Registrar contact and recovery information is current.',
    'Auto-renew is enabled with a working payment method.',
    'Multifactor authentication is enabled on the registrar and email accounts.',
    'One customer-facing mailbox on the business domain can send and receive mail.',
    'The mailbox has the correct sender name and a simple signature.',
    "The email provider's required DNS and authentication steps are complete.",
    'Test messages and replies work from both desktop/mobile and at least two outside inboxes.',
  ],

  notRequiredYet: [
    'A complete website.',
    'Multiple employee inboxes.',
    'A complicated folder or automation system.',
    'A newsletter platform.',
    'A strict DMARC enforcement policy configured without understanding its impact.',
  ],

  checklist: [
    {
      id: 'domain-email-01',
      title: 'Choose a domain customers can recognize and type',
      description:
        'Choose a short domain that closely matches the public business name. Prefer clear spelling over clever spelling. Avoid unnecessary numbers, punctuation, repeated words, or a location that will feel wrong if the service area expands. A familiar extension such as .com is useful when available, but clarity and ownership matter more than forcing a poor name.',
      example:
        'brightmobiledetailing.com is easier to say and remember than bright-mobile-detailing-615.com. Adapt the pattern to the actual business name and market.',
      priority: 'essential',
    },
    {
      id: 'domain-email-02',
      title: 'Check the name before purchasing',
      description:
        'Search the proposed name and close variations in a web search, Google Maps, social platforms, and the desired domain extension. Look for another local service business that customers could reasonably confuse with this one. Domain availability alone does not establish rights to a business name; seek qualified advice if a conflict is unclear.',
      example:
        'If a nearby company already operates as “Bright Auto Detail,” do not assume brightautodetailing.com is safe merely because the domain is available.',
      priority: 'essential',
    },
    {
      id: 'domain-email-03',
      title: 'Register the domain under your control',
      description:
        'Create the registrar account with an email address and phone number the business owner can access independently. The owner should control the login, payment method, recovery method, and registrant details. If another person helps with setup, grant appropriate access rather than allowing that person to become the only account owner.',
      example:
        'The owner creates the registrar account and invites a developer as a collaborator where supported, instead of letting the developer purchase the domain in the developer’s personal account.',
      priority: 'essential',
    },
    {
      id: 'domain-email-04',
      title: 'Turn on auto-renew and account security',
      description:
        'Enable auto-renew, confirm the payment method, update registration contact information, enable registrar lock where available, and turn on multifactor authentication. Save recovery codes somewhere separate from the device normally used to sign in.',
      example:
        'Auto-renew is enabled, the card does not expire before the next renewal, MFA uses an authenticator app or security key, and recovery codes are stored in a password manager.',
      priority: 'essential',
    },
    {
      id: 'domain-email-05',
      title: 'Choose a business email provider',
      description:
        'Choose a provider that supports email on the custom domain, multifactor authentication, account recovery, mobile access, and documented DNS setup. A mailbox service is preferable to forwarding-only service because it provides a consistent place to send, receive, search, and retain business conversations.',
      example:
        'A solo operator chooses Google Workspace or Microsoft 365 because it supplies a full mailbox, mobile app, admin recovery, and custom-domain instructions. This is an example, not a requirement to use either provider.',
      priority: 'essential',
    },
    {
      id: 'domain-email-06',
      title: 'Create your main business email address',
      description:
        'Create one address the operator can monitor consistently. Use a role address such as hello@, contact@, or quotes@, or a name-based address if that feels more personal. Avoid creating several inboxes before there is a reliable process for checking them.',
      example:
        'hello@brightmobiledetailing.com is the public address, while the operator signs in to one mailbox and checks it daily.',
      priority: 'essential',
    },
    {
      id: 'domain-email-07',
      title: 'Connect the domain to your email provider',
      description:
        "Follow the provider's current domain-verification and DNS instructions. Add only the records supplied for this exact domain and account. Confirm the required MX records and any verification record before removing or replacing existing records. DNS changes may take time to appear.",
      example:
        'The member copies the Google Workspace or Microsoft 365 verification and MX values from the admin console into the registrar’s DNS screen, then returns to the provider to verify — not values copied from a tutorial screenshot.',
      priority: 'essential',
    },
    {
      id: 'domain-email-08',
      title: 'Complete SPF and DKIM setup',
      description:
        "Follow the email provider's official SPF and DKIM instructions and confirm that authentication is enabled. Do not create multiple separate SPF records or guess how to combine services; follow the provider's guidance when more than one service sends mail for the domain.",
      example:
        'The member adds the provider-supplied SPF TXT record and DKIM record, activates DKIM in the provider console, and checks that the provider reports authentication as active.',
      priority: 'essential',
    },
    {
      id: 'domain-email-09',
      title: 'Test the mailbox from outside accounts',
      description:
        'Send a short message to at least two outside inboxes — for example, one Gmail address and one Outlook address — then reply to each message. Check the sender name, From address, reply destination, formatting, mobile display, and spam/junk placement. Correct problems before publishing the address.',
      example:
        'Send “Mailbox test — no action needed” from the business address, reply from both outside accounts, and confirm both replies return to the business inbox.',
      priority: 'essential',
    },
    {
      id: 'domain-email-10',
      title: 'Add a recognizable sender name and signature',
      description:
        'Set the sender name to the operator and/or business name. Add a short signature with the business name, service area, preferred phone number, website placeholder if appropriate, and no unsupported claims. Keep it readable on mobile.',
      example:
        'Phong — Bright Mobile Detailing with the business phone number and “Serving the Nashville area.” Add the website after it is ready.',
      priority: 'essential',
    },
    {
      id: 'domain-email-11',
      title: 'Add role-based aliases for future workflows',
      description:
        'Add aliases only when they create a useful public destination, such as quotes@, payments@, or reviews@. Route them to the primary mailbox unless a separate person truly needs a separate inbox. Confirm that replies use the intended From address.',
      example:
        'quotes@brightmobiledetailing.com and reviews@brightmobiledetailing.com both reach the main mailbox, so the solo operator does not have three inboxes to monitor.',
      priority: 'recommended',
    },
    {
      id: 'domain-email-12',
      title: 'Add a monitored DMARC policy',
      description:
        "After all legitimate sending services are represented in SPF/DKIM, follow the provider's official DMARC guidance. Begin with the provider's recommended monitoring approach and review reports before adopting stricter handling. If the setup is unclear, obtain technical help rather than publishing an aggressive policy that may block legitimate mail.",
      example:
        'The member follows the selected provider’s current DMARC instructions, sends reports to a monitored address or service, and confirms legitimate mail passes before considering stricter enforcement.',
      priority: 'recommended',
    },
    {
      id: 'domain-email-13',
      title: 'Save a domain and email ownership record',
      description:
        'Record the domain, registrar, renewal date, account owner, email provider, primary mailbox, recovery method location, and who is allowed to make DNS changes. Store this record securely without placing passwords or recovery codes in an ordinary shared document.',
      example:
        'A password manager note records “Registrar: example registrar; renews May 2027; account owner: Phong; email provider: Google Workspace; DNS access: owner only.” The password remains in the password manager’s credential field.',
      priority: 'recommended',
    },
    {
      id: 'domain-email-14',
      title: 'Schedule an annual domain and email review',
      description:
        'Add a reminder at least 30 days before renewal to verify the payment method, contact information, MFA/recovery methods, active aliases, DNS access, and services allowed to send email for the domain.',
      example:
        'A recurring calendar reminder each April checks a May renewal and removes an old marketing service from the email setup.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'Choosing an email provider',
      body: 'Providers are examples, not endorsements — compare them yourself and follow the provider’s current official instructions. Vendor pricing and plan names change, so confirm the current cost directly with the provider rather than relying on a comparison here. Compare providers on:',
      bullets: [
        'Custom-domain mailbox support.',
        'Current total price for the number of users you need.',
        'Multifactor authentication and account-recovery options.',
        'Mobile and desktop access.',
        'Alias and shared-address support.',
        'Official DNS and authentication documentation.',
        'Export and migration options.',
        'Support appropriate to your comfort level.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'You already own a domain',
          body: 'Do not buy another. Start by verifying ownership: identify the registrar, confirm you can sign in, check contact and recovery information, enable MFA and auto-renew, then continue with email.',
        },
        {
          heading: 'A developer or agency controls the domain',
          body: "Request owner-controlled access or a transfer using the registrar's documented process. Identify the current website and email dependencies before deleting DNS records or initiating a transfer.",
        },
        {
          heading: 'Email already works on a personal inbox',
          body: 'Keep the personal inbox active as a recovery channel during setup. Do not shut it down until the business-domain mailbox has passed two-way tests and important accounts have been updated.',
        },
        {
          heading: 'The .com you want is unavailable',
          body: 'Choose the clearest available alternative rather than an awkward spelling. A location or service modifier is fine if it stays accurate. No extension guarantees credibility or search ranking.',
        },
        {
          heading: 'You use more than one sending service',
          body: "A mailbox provider, booking software, invoicing system, and marketing platform may each need authentication. Follow each provider's official domain-authentication instructions, and get technical help if records must be combined.",
        },
      ],
    },
  ],

  commonMistakes: [
    "Registering through someone else's account — paying for a domain does not help if a former developer or agency is the only person who can sign in, renew it, or change DNS.",
    'Choosing a name that is hard to say aloud — extra hyphens, numbers, unusual spelling, and repeated words increase errors when customers hear it over the phone.',
    'Treating domain availability as name clearance — an available domain can still resemble an existing business or protected name.',
    'Buying many add-ons before the basics work — privacy, hosting, site builders, certificates, and marketing packages can wait; a domain and a working mailbox are the immediate goal.',
    'Using forwarding as the only email system — it can receive messages but may break replies, sender identity, storage, troubleshooting, or authentication.',
    'Creating too many inboxes — a solo operator usually needs one monitored mailbox plus aliases; multiple unmonitored inboxes hide missed inquiries.',
    "Editing DNS from a generic tutorial — record values differ by provider and account; use the current values shown in your provider's admin console.",
    'Publishing more than one SPF record — multiple SPF records can cause authentication failures; use the provider’s combined-setup instructions instead of adding another independent record.',
    'Skipping outside delivery tests — a provider saying “setup complete” does not confirm the real customer experience; send, receive, reply, and inspect spam placement from outside systems.',
    'Forgetting renewal and recovery details — an expired card, inaccessible recovery inbox, or old phone number can turn a routine renewal into an outage.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Domain registration and control (ICANN)',
      links: [
        {
          label: 'ICANN — The Domain Name Registration Process',
          href: 'https://www.icann.org/resources/pages/domain-name-registration-process-2023-11-02-en',
        },
        { label: 'ICANN Lookup', href: 'https://lookup.icann.org/' },
        {
          label: 'ICANN — Securely Managing Your Domain Name',
          href: 'https://www.icann.org/resources/pages/securely-managing-domain-name-2020-08-26-en',
        },
        {
          label: 'ICANN — Renewing Domain Names',
          href: 'https://www.icann.org/resources/pages/renew-domain-name-2018-12-07-en',
        },
      ],
    },
    {
      heading: 'Google Workspace',
      links: [
        { label: 'Verify a domain for Google Workspace', href: 'https://support.google.com/a/answer/60216?hl=en' },
        { label: 'Set up MX records for Google Workspace', href: 'https://support.google.com/a/answer/140034?hl=en' },
        { label: 'Set up SPF', href: 'https://support.google.com/a/answer/33786?hl=en' },
        { label: 'Set up DKIM', href: 'https://support.google.com/a/answer/174124?hl=en' },
        { label: 'Set up DMARC', href: 'https://support.google.com/a/answer/2466580?hl=en' },
      ],
    },
    {
      heading: 'Microsoft 365',
      links: [
        {
          label: 'Add a custom domain to Microsoft 365',
          href: 'https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain?view=o365-worldwide',
        },
        {
          label: 'Connect a domain by adding DNS records',
          href: 'https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider?view=o365-worldwide',
        },
        {
          label: 'Set up SPF for a custom domain',
          href: 'https://learn.microsoft.com/en-us/defender-office-365/email-authentication-spf-configure',
        },
        {
          label: 'Set up DKIM for a custom domain',
          href: 'https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure',
        },
        {
          label: 'Set up DMARC in Microsoft 365',
          href: 'https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure',
        },
      ],
    },
    {
      heading: 'Account security',
      links: [
        {
          label: 'CISA — Require Multifactor Authentication',
          href: 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication',
        },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, trademark, cybersecurity, or deliverability advice. Registering a domain does not guarantee it is legally available to use as a business name, and no setup guarantees inbox placement or protection from spoofing. Follow your provider’s official instructions, which change over time.',

  searchKeywords: [
    'domain',
    'business email',
    'registrar',
    'DNS',
    'MX',
    'SPF',
    'DKIM',
    'DMARC',
    'mailbox',
    'email alias',
    'auto-renew',
    'MFA',
    'Google Workspace',
    'Microsoft 365',
    'sender name',
    'email signature',
  ],

  nextGuideSlug: 'website-gbp',
};
