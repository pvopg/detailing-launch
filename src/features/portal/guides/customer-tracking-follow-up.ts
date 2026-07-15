import type { GuideContent } from './types';

/**
 * Foundation Guide 6 — Customer Tracking & Follow-Up.
 *
 * Canonical editorial source: Foundation_Guide_06_Customer_Tracking_and_Follow_Up.md. Checklist item
 * ids (`customer-followup-01`..`customer-followup-20`) are stable and must not change after release,
 * so saved progress in `checklist_progress` is never orphaned by copy edits. Progress is
 * Essential-only: items 01–15 are Essential (denominator 15); 16–19 Recommended; 20 Later.
 *
 * Field mapping mirrors Guide 5: the shared `GuideChecklistItem.title` renders in the checkbox-label
 * position, so the canonical "Checklist label" maps to `title` and the canonical "Instruction" maps
 * to `description`. `example` and `completionEvidence` are the canonical Example and Completion
 * evidence verbatim.
 *
 * This guide teaches a member to configure their OWN external customer system (CRM, database,
 * spreadsheet, or contact system). It is educational content, NOT a CRM feature inside the portal:
 * the portal persists only checklist completion — never customer, contact, vehicle, message,
 * permission, suppression, service-history, export, or CRM-credential data — and it never sends
 * email/text/calls or performs private customer-record search.
 */
export const customerTrackingFollowUpGuide: GuideContent = {
  slug: 'customer-tracking-follow-up',
  title: 'Customer Tracking & Follow-Up',
  shortTitle: 'Customer Tracking',
  outcome:
    'Keep one useful customer record, see the next action, and follow up consistently without turning service communication into unwanted marketing.',
  estimatedMinutes: 90,
  tint: 'blue',

  whatItDoes:
    'A customer relationship may begin in a website form, phone call, text, referral, social message, or Google search. It may then produce a quote, appointment, deposit, completed service, issue, follow-up, review request, or future booking. Without a shared record, the operator has to reconstruct that history from inboxes and memory. A simple customer-tracking system keeps the useful facts and the next action together. This guide is not about collecting every possible detail. It is about keeping the minimum information needed to serve the customer, follow through on promises, and understand the relationship. More data creates more responsibility. Do not store information merely because a tool offers a field for it. The next guide covers review requests and repeat-business offers; this guide builds the reliable customer record and communication controls those activities depend on.',

  terms: [
    {
      term: 'Customer record',
      definition: 'The current contact and preference information for one person or organization.',
    },
    {
      term: 'Service history',
      definition:
        'The inquiries, quotes, bookings, payments, completed services, issues, and approved notes connected to that customer.',
    },
    {
      term: 'Status',
      definition:
        'The customer or job’s current stage, such as active inquiry, quoted, booked, completed, issue open, inactive, or do not market.',
    },
    {
      term: 'Next action',
      definition:
        'The specific follow-up, owner, and date needed to keep the relationship moving or close it intentionally.',
    },
  ],

  whyItMatters: [
    {
      heading: 'No lost next actions',
      body: 'A record without a next action is only an archive. Status, owner, and due date make it possible to see which quote, appointment, issue, or follow-up needs attention.',
    },
    {
      heading: 'More personal service',
      body: 'Useful history prevents customers from repeating basic information and helps the operator remember the actual vehicle and prior service. Notes should remain factual and relevant, not subjective profiles of a person.',
    },
    {
      heading: 'Consistent follow-through',
      body: 'The customer should receive the promised quote, confirmation, receipt, issue response, or service check-in regardless of which channel started the conversation.',
    },
    {
      heading: 'Responsible communication',
      body: 'Responding about a requested service is different from adding someone to ongoing promotions. The system should distinguish operational communication, marketing permissions, preferred channels, and stop requests.',
    },
    {
      heading: 'Safer, smaller data',
      body: 'The FTC advises businesses to understand what personal information they hold, keep only what they need, protect it, dispose of it appropriately, and plan for incidents. A small customer record is easier to control than copies spread across phones, inboxes, spreadsheets, and contractor accounts.',
    },
  ],

  diagram: [
    'Inquiry',
    'Customer record',
    'Quote, booking, and payment history',
    'Completed service',
    'Post-service follow-up',
    'Review and repeat-business opportunity',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'The system should answer: Who is this customer? What happened? What did we promise? What are we allowed and expected to send? What happens next?',
    },
  ],

  goodEnoughToLaunch: [
    'One owner-controlled system is the source of truth for active customers and service history.',
    'Each customer has one primary record rather than avoidable duplicates.',
    'The record contains only useful contact, vehicle, service, status, preference, and next-action fields.',
    'Inquiry, quote, booking, payment, and completed-service references can be connected without storing card data.',
    'Each active record has a status, next action, due date, and owner.',
    'Service messages and promotional marketing are distinguished.',
    'Marketing consent or permission records, where used, identify the channel, source, date, and current status.',
    'Stop, unsubscribe, wrong-number, and do-not-contact requests suppress the relevant future messages.',
    'Access is limited, multifactor authentication is enabled where supported, and former helpers can be removed.',
    'A retention, deletion, export, and backup routine is documented.',
    'The operator can run a post-service check-in and record the outcome.',
    'A test customer can move through the full lifecycle without duplicated, missing, or unauthorized communication.',
  ],

  notRequiredYet: [
    'An enterprise CRM.',
    'Scoring customers by predicted value.',
    'Buying or scraping contact lists.',
    'Automated marketing sequences.',
    'Tracking customers across unrelated websites.',
    'Storing payment-card or bank information.',
    'Retaining every message forever.',
    'Importing every personal phone contact.',
    'A complex loyalty or referral program.',
    'A review request before the service outcome is checked.',
  ],

  checklist: [
    {
      id: 'customer-followup-01',
      title: 'Choose one secure place for customer records',
      description:
        'Select an owner-controlled CRM, database, spreadsheet, or business contact system that supports the required fields, statuses, next actions, access controls, export, and backup. Use a business account instead of a personal contact list. If customer information must remain in another operational tool, store a reference or link rather than creating uncontrolled copies.',
      example:
        'The operator uses a private CRM as the customer source of truth. The payment processor retains payment records, while the CRM stores only the provider transaction reference and status needed to connect the job.',
      completionEvidence:
        'The owner can sign in, manage access, export records, and identify this system as the source of truth.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-02',
      title: 'Keep only the information needed to serve and follow up',
      description:
        'Define a small required field set. Include a customer identifier, name, preferred contact method, contact value, service area or location reference needed for operations, vehicle basics, source, current status, last interaction, next action, next-action date, and communication preference. Add optional fields only when they have a clear business purpose. Do not store full card data, government identifiers, bank credentials, unnecessary birth dates, unrelated personal facts, or speculative notes.',
      example:
        'Customer ID, name, mobile, email, preferred channel, city/ZIP, vehicle year/make/model, source, status, last service, next action/date, marketing-email status, marketing-text status.',
      completionEvidence:
        'The field list is documented and unnecessary default fields are disabled, hidden, or intentionally unused.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-03',
      title: 'Prevent avoidable duplicate customer records',
      description:
        'Decide how records are matched before a new one is created, using appropriate fields such as normalized email or phone plus a manual check. Preserve separate people who share a household, company, vehicle, or phone when they are genuinely different customers. Merge carefully so service history, permissions, and stop requests are not lost or assigned to the wrong person.',
      example:
        'A new form uses the same email as an existing customer but a different vehicle. The operator adds the vehicle and inquiry to the existing customer after confirming identity instead of creating a second person.',
      completionEvidence:
        'The system has a duplicate-check step and the test records merge without losing history or preferences.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-04',
      title: 'Link inquiries, quotes, bookings, payments, and services',
      description:
        'For each customer, make it possible to find the inquiry source, quote reference, booking, payment status/reference, completed service, receipt, issue, and approved follow-up. Use identifiers or secure links to other systems rather than copying sensitive data. Keep timestamps and revisions where they matter so the accepted quote or policy is not overwritten.',
      example:
        'Customer C-0042 links to Q-2026-014, booking B-2026-019, invoices INV-2026-021/024, and service record S-2026-018. The card number remains only with the payment provider.',
      completionEvidence: 'A test customer’s complete journey can be followed from inquiry to completed service.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-05',
      title: 'Use a small status set everyone understands',
      description:
        'Choose statuses that describe the current relationship or open job and support a real next step. Avoid dozens of overlapping labels. Distinguish a customer lifecycle status from a specific booking or payment status when needed. Include issue open, inactive, and do-not-market states so records are not forced into a sales stage that no longer applies.',
      example:
        'Customer: Prospect, Active customer, Past customer, Issue open, Inactive, Do not market. Job: New inquiry, Awaiting details, Quoted, Booked, Completed, Closed, Declined.',
      completionEvidence: 'Every active test record can be assigned an unambiguous status.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-06',
      title: 'Give every active customer a next action and date',
      description:
        'Define which statuses require an owner, next action, and due date. Make the action specific enough to complete, such as Send revised quote or Check service concern, rather than Follow up. Close the action when completed and create the next one only when it serves the customer or approved business process.',
      example:
        'Owner: Phong · Next action: Call about access-to-water question · Due: Jul 15. After the call, the next action becomes Send revised quote by Jul 15.',
      completionEvidence: 'A view or report shows all overdue and upcoming next actions.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-07',
      title: 'Track how the customer expects to be contacted',
      description:
        'Record the preferred service channel and any known restrictions, such as email preferred, call after a certain time, wrong number, or no voicemail. Keep operational contact preferences separate from marketing permission. Do not infer permission for automated or promotional messages solely from a phone number, payment, completed job, or prior inquiry.',
      example:
        'Service contact: text preferred for this booking · Promotional email: not asked · Promotional text: not permitted. The service confirmation can use the agreed text channel; a marketing campaign cannot assume permission.',
      completionEvidence:
        'The record clearly separates service contact preference from each marketing channel’s status.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-08',
      title: 'Record permission before sending ongoing promotions',
      description:
        'If the business uses promotional email, automated texts, or calls, record the channel, permission or other approved basis, exact source, date/time, disclosure or form version, and current status. Keep proof appropriate to the applicable rules and provider. Do not backfill consent, purchase lists, or mark past customers subscribed by default. Obtain qualified advice for the business’s jurisdictions and communication methods.',
      example:
        'Marketing email: subscribed Jul 13 through website checkbox v2 · Marketing text: not subscribed. A quote-request checkbox was not bundled with either choice.',
      completionEvidence: 'Any marketable test record has a traceable source and channel-specific status.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-09',
      title: 'Decide when operational follow-up happens',
      description:
        'Map the service-related follow-ups that support an existing inquiry or job: missing-information request, quote follow-up, pre-appointment confirmation, payment reminder, post-service check-in, issue resolution, and final closeout. Assign timing, owner, stop conditions, and channel. Avoid repeated contact after a decline, stop request, wrong number, or closed issue.',
      example:
        'Quote follow-up: two business days after sending if no decision. Post-service check-in: next business day. Issue open: owner response by the promised date. Stop when customer declines, asks to stop, or record closes.',
      completionEvidence: 'The operational timeline is documented and each step has a purpose and stop rule.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-10',
      title: 'Record what was completed before following up',
      description:
        'After service, record the date, vehicle, location reference, completed scope, approved changes, final payment/receipt reference, relevant condition notes, customer concerns, photos the business is authorized to retain, and the next check-in. Keep notes factual and useful. Do not record insulting labels, sensitive personal observations, or unrelated information.',
      example:
        'S-2026-018 · Full detail completed Jul 13 · Approved pet-hair add-on · Receipt INV-2026-024 · Customer asked about one rear-seat spot · Next action: check in Jul 14.',
      completionEvidence: 'A test completed job produces a concise service record and next action.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-11',
      title: 'Write messages for common follow-up moments',
      description:
        'Create short, recognizable templates for missing information, quote status, appointment preparation, payment status, post-service check-in, issue acknowledgment, and closeout. Identify the business and specific job, use the correct channel, allow a human reply, and edit the template for the real situation. Do not include promotional offers in a message presented as a service update unless the marketing requirements are separately satisfied.',
      example:
        'Hi Jordan—this is Phong with Bright Mobile Detailing checking on yesterday’s full detail for your CR-V. Did everything meet the agreed scope? Reply here if there is anything you want me to review.',
      completionEvidence:
        'The templates are stored in the approved system and a test message renders correctly on a phone.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-12',
      title: 'Suppress messages when a customer asks to stop',
      description:
        'Create an immediate process for stop, unsubscribe, do-not-call, wrong-number, and channel-change requests. Record the request, channel, date, source message, and scope; update the suppression status; stop scheduled sends; and preserve only the suppression information needed to avoid contacting the person again. Do not delete the suppression record in a way that causes re-import or automation to resume messages. Follow applicable timelines and requirements.',
      example:
        'A customer replies STOP to a promotional text. The number is suppressed for marketing texts, queued promotional texts are canceled, and the record retains the stop date without treating the customer as deleted and marketable again.',
      completionEvidence:
        'A test opt-out prevents the relevant future message and survives export/re-import or automation checks.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-13',
      title: 'Limit access and secure the customer system',
      description:
        'Use individual accounts, multifactor authentication, role-based permissions, current devices/apps, and secure recovery methods. Remove former employees, contractors, or agencies promptly. Avoid exporting customer lists to personal devices or unencrypted files. Document who can view, edit, export, delete, or change communication permissions. Plan how the business will respond if an account or device is compromised.',
      example:
        'The owner can export and delete; a helper can update job notes but cannot export the full list or change marketing permissions. MFA is required and the shared spreadsheet link is not public.',
      completionEvidence: 'Access roles are reviewed, MFA is active where supported, and no unknown user has access.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-14',
      title: 'Decide how long records remain and how they are recovered',
      description:
        'Create a retention schedule based on operational, dispute, tax, insurance, and legal needs with qualified guidance. Define how stale inquiries, customer photos, message histories, financial references, and suppression records are reviewed and deleted or retained. Confirm the system can export usable data, create protected backups where appropriate, and restore a test record. Do not promise deletion that the business cannot complete across connected systems.',
      example:
        'Open jobs remain active; closed records are reviewed on a documented schedule; unnecessary condition photos are removed earlier; tax/payment references follow professional advice; suppression records retain only what is needed to prevent renewed marketing.',
      completionEvidence: 'The retention decision, export method, backup location, and restore-test result are documented.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-15',
      title: 'Run one customer through tracking and follow-up',
      description:
        'Create a test customer and move it through inquiry, quote, booking, payment reference, completed service, post-service check-in, issue or no-issue outcome, and closeout. Test a duplicate submission, changed contact preference, wrong-number or unsubscribe request, overdue next action, export, access restriction, and restore. Remove or clearly label test data afterward.',
      example:
        'C-TEST-001 submits twice but remains one customer, completes a test job, receives the correct service check-in, changes from text to email, opts out of marketing, appears in the export, and remains suppressed after the test restore.',
      completionEvidence:
        'The lifecycle test succeeds without lost history, duplicate active records, unauthorized access, or an incorrect message.',
      priority: 'essential',
    },
    {
      id: 'customer-followup-16',
      title: 'Keep a concise history for each vehicle',
      description:
        'When a customer has multiple vehicles or repeat services, use separate vehicle records or identifiers. Track year/make/model, customer-approved identifying note, completed services, relevant condition history, and future service notes. Avoid storing a full VIN, license-plate image, or exact location history unless there is a documented need and appropriate protection.',
      example:
        'Vehicle V-0068 · 2021 Honda CR-V · black · last full detail Jul 13 · customer prefers fragrance-free interior products. The note is service-relevant and customer-provided.',
      completionEvidence: 'A repeat-customer record distinguishes vehicles and retrieves the correct prior service.',
      priority: 'recommended',
    },
    {
      id: 'customer-followup-17',
      title: 'Create future-service reminders only when appropriate',
      description:
        'If the business sends reminders about future service, define whether each message is operational, requested, or promotional, then use the appropriate permission, disclosures, and opt-out process. Base timing on an actual prior service or customer request rather than pretending a universal interval. Stop when the customer declines or the channel is suppressed.',
      example:
        'A customer asks to be reminded about an interior refresh in three months. The record stores the request and due date. A broad seasonal discount campaign uses the separate marketing audience and opt-out rules.',
      completionEvidence: 'The reminder has a source, purpose, channel, due date, and stop condition.',
      priority: 'recommended',
    },
    {
      id: 'customer-followup-18',
      title: 'Create practical views without profiling customers',
      description:
        'Build views based on real operational needs, such as overdue next action, quote awaiting decision, completed service without check-in, issue open, last service type, service area, or communication permission. Avoid sensitive, discriminatory, speculative, or manipulative scoring. Do not assume that spending level measures a customer’s worth or service priority.',
      example:
        'Post-service check-in due, Open issue, Past interior-detail customers with marketing email permission, and No future contact are useful views. Difficult customer personality score is not.',
      completionEvidence: 'The selected views produce actionable, explainable lists.',
      priority: 'recommended',
    },
    {
      id: 'customer-followup-19',
      title: 'Clean and test the customer system every month',
      description:
        'Review duplicates, incomplete required fields, overdue next actions, open issues, stale permissions, suppressed contacts, former-user access, failed automations, export success, and backup/restore health. Sample records rather than exporting the entire list unnecessarily. Document corrections and recurring causes.',
      example:
        'On the first business day of each month, the owner merges confirmed duplicates, closes abandoned test records, reviews all open issues, removes an old collaborator, and restores one non-sensitive test record from backup.',
      completionEvidence: 'A recurring review reminder exists and the first review is recorded.',
      priority: 'recommended',
    },
    {
      id: 'customer-followup-20',
      title: 'Automate next actions only after the manual process works',
      description:
        'After the lifecycle, permissions, templates, and stop rules work manually, consider automating record creation, status changes, task reminders, and approved messages. Use authenticated events, deduplication, suppression checks, quiet-hour and frequency controls where appropriate, failure alerts, and a human override. Test with non-customer data before enabling sends.',
      example:
        'A completed service creates a next-business-day check-in task. The system checks channel preference and suppression before sending, logs the result, and alerts the owner if delivery fails. It does not enroll the customer in marketing.',
      completionEvidence:
        'The member documents one low-risk automation, its stop/suppression logic, failure alert, and manual fallback—or intentionally keeps the tested manual process.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'System-selection guidance',
      body: 'Keep this decision vendor-neutral. Do not maintain a static CRM price or feature comparison inside this guide — plans, limits, privacy features, and automation capabilities change. The member should compare:',
      bullets: [
        'owner-controlled account, billing, and administrator recovery;',
        'individual users, roles, MFA, access logs, and export restrictions;',
        'customer, vehicle, job, status, next-action, and communication-preference fields;',
        'deduplication and merge behavior;',
        'links or integrations for forms, quotes, bookings, payments, and messages;',
        'searchable service and interaction history;',
        'channel-specific consent and suppression support;',
        'mobile use for an operator away from a desk;',
        'export, backup, restore, deletion, and migration options;',
        'automation logs, failure alerts, and manual overrides;',
        'current total cost and limits after introductory pricing.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'The member already has contacts across several apps',
          body: 'Inventory the sources, choose the system of record, export only the data needed, clean and deduplicate in a protected workspace, import a test batch, verify permissions and history, then complete the migration. Do not upload an uncontrolled master list to multiple trial services.',
        },
        {
          heading: 'Two family members share a phone or email',
          body: 'Keep separate customer identities when they are separate people and jobs. Record the shared channel carefully and avoid assigning one person’s permission, stop request, vehicle, or service history to the other without confirmation.',
        },
        {
          heading: 'A customer changes phone number or email',
          body: 'Verify the change through an appropriate channel, preserve necessary history, mark the old value inactive or wrong when applicable, and ensure automations stop using it.',
        },
        {
          heading: 'A customer asks for no more contact',
          body: 'Clarify the scope only when necessary, stop the relevant messages promptly, record the request, cancel queued sends, and keep the minimum suppression record needed to honor it. Obtain qualified advice for deletion or broader privacy requests.',
        },
        {
          heading: 'A customer has an unresolved service concern',
          body: 'Change the status to Issue open, assign an owner and promised response date, preserve relevant facts and communication, and pause promotional follow-up. Resolve or close the issue before moving to a review request.',
        },
        {
          heading: 'The customer returns with a different vehicle',
          body: 'Add a vehicle record under the confirmed customer rather than overwriting the old vehicle. Connect each service to the correct vehicle.',
        },
        {
          heading: 'The business changes CRM providers',
          body: 'Export a complete test set, map fields and permissions, preserve stable identifiers where possible, validate suppressions and dates, migrate in controlled batches, and keep the old system read-only until verification is complete. Avoid running two systems as competing sources of truth.',
        },
        {
          heading: 'A contractor needs temporary access',
          body: 'Create an individual least-privilege account with an end date. Do not share the owner password or send a full customer export when filtered access is sufficient.',
        },
        {
          heading: 'The system is unavailable',
          body: 'Use the documented fallback to record the minimum current action securely, then reconcile it into the source of truth when service returns. Do not create a permanent shadow spreadsheet.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Using the phone contact list as the CRM — a personal contact entry does not show quote, booking, payment, service, permission, issue, or next-action history and may sync to uncontrolled devices.',
    'Creating a new record for every inquiry — repeat forms and channel changes can fragment history. Check for an existing person before creating or merging records.',
    'Collecting data without a purpose — every extra field increases maintenance and security responsibility. If the information does not help deliver, support, account for, or appropriately follow up on the service, do not collect it by default.',
    'Storing card or bank details — keep payment credentials inside the approved payment provider. The customer record needs only safe transaction references and statuses.',
    'Writing subjective or insulting notes — record observable, service-relevant facts and customer requests. Assume the note could be seen during support, legal review, export, or an access incident.',
    'Treating every past customer as a marketing subscriber — a prior purchase or inquiry is not unlimited permission for promotional messages. Track channel-specific permissions and obtain qualified guidance.',
    'Mixing service and promotional content — a confirmation or issue response should do that job. Adding an offer can change the nature of the message and the requirements that apply.',
    'Deleting an opted-out customer completely — if suppression evidence disappears, an import or automation can contact the person again. Retain the minimum suppression data under the approved policy.',
    'Leaving active records without next actions — statuses such as Follow-up or Maybe do not tell the operator what to do. Use a clear action, owner, and date or close the record.',
    'Keeping unresolved issues in ordinary notes — an issue needs a visible status, owner, promised response, and resolution. Do not let it disappear inside a long customer timeline.',
    'Exporting customer lists casually — CSV exports are easy to copy, email, and forget. Export only when needed, restrict access, protect the file, and delete working copies appropriately.',
    'Sharing one password — shared credentials prevent useful access control and removal. Use individual accounts and MFA where supported.',
    'Retaining everything forever — long retention is not automatically safer or more useful. Follow an approved schedule and preserve only what the business actually needs.',
    'Automating before opt-out behavior is tested — an automation that cannot stop correctly can repeat unwanted contact at scale. Test suppression, duplicates, failures, and manual override first.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Privacy and customer-data security',
      links: [
        {
          label: 'FTC — Start with Security: A Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/start-security-guide-business',
        },
        {
          label: 'FTC — Protecting Personal Information: A Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business',
        },
        {
          label: 'FTC — Privacy and Security guidance',
          href: 'https://www.ftc.gov/business-guidance/privacy-security',
        },
        {
          label: 'CISA — Secure Your Business',
          href: 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business',
        },
        {
          label: 'CISA — Require Multifactor Authentication',
          href: 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication',
        },
        {
          label: 'NIST — Small Business Cybersecurity Corner',
          href: 'https://www.nist.gov/itl/smallbusinesscyber',
        },
      ],
    },
    {
      heading: 'Email, calls, and texts',
      links: [
        {
          label: 'FTC — CAN-SPAM Act: A Compliance Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business',
        },
        {
          label: 'FTC — Advertising and Marketing Basics',
          href: 'https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics',
        },
        {
          label: 'FCC — Stop Unwanted Robocalls and Texts',
          href: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts',
        },
      ],
    },
    {
      heading: 'Data portability examples',
      links: [
        {
          label: 'Google Contacts — Export, back up, or restore contacts',
          href: 'https://support.google.com/contacts/answer/7199294?hl=en',
        },
        {
          label: 'Microsoft Support — Export contacts from Outlook',
          href: 'https://support.microsoft.com/en-us/outlook/training/export-contacts-in-outlook',
        },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, privacy, cybersecurity, records-retention, advertising, telemarketing, or text-message consent advice. It does not publish a universal retention period, deletion promise, consent disclosure, or follow-up schedule as sufficient in every jurisdiction. An inquiry, quote, booking, payment, or completed service is not unlimited permission for promotional communication — track channel-specific permissions and obtain qualified guidance. Do not buy, scrape, enrich, or import contact lists without appropriate permission and review, and do not store full payment-card data, bank credentials, government identifiers, unnecessary sensitive traits, or speculative personal profiles in customer records. Do not delete suppression information in a way that can cause future unwanted contact, and do not rely on shared passwords, public spreadsheets, or unrestricted customer exports. No CRM, consent record, opt-out process, backup, or security control guarantees compliance or prevents incidents. Google Contacts and Outlook are data-portability examples, not CRM recommendations — follow current official guidance and qualified review because privacy laws, communications rules, provider features, and retention obligations change.',

  searchKeywords: [
    'customer tracking',
    'CRM',
    'customer record',
    'customer history',
    'vehicle history',
    'status',
    'next action',
    'follow-up',
    'post-service check-in',
    'customer preference',
    'marketing consent',
    'email permission',
    'text permission',
    'unsubscribe',
    'STOP',
    'do not contact',
    'suppression list',
    'duplicate contact',
    'merge contacts',
    'data retention',
    'delete customer',
    'export contacts',
    'backup',
    'MFA',
  ],

  nextGuideSlug: 'reviews-repeat-business',
};
