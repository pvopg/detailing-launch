import type { GuideContent } from './types';

/**
 * Foundation Guide 8 — Analytics & 30-Day Plan (terminal Foundation guide).
 *
 * Canonical editorial source: Foundation_Guide_08_Analytics_and_30_Day_Plan.md. Checklist item ids
 * (`analytics-plan-01`..`analytics-plan-20`) are stable and must not change after release, so saved
 * progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only: items
 * 01–15 are Essential (denominator 15); 16–19 Recommended; 20 Later.
 *
 * Field mapping mirrors Guides 6–7: the shared `GuideChecklistItem.title` renders in the checkbox-label
 * position, so the canonical "Checklist label" maps to `title` and the canonical "Instruction" maps to
 * `description`. `example` and `completionEvidence` are the canonical Example and Completion evidence
 * verbatim.
 *
 * This is the last guide in the Foundation sequence: it has no `nextGuideSlug`. Guide navigation is
 * driven by FOUNDATION_MODULES neighbors (portal-navigation.ts), and because Guide 8 is last there is
 * no "Continue" button — the shared template's "Back to portal" link is the terminal completion path.
 *
 * This guide teaches a member to configure and review their OWN external measurement systems. It is
 * educational content, NOT an analytics feature inside the portal: the portal persists only checklist
 * completion — never analytics events, properties, metrics, scorecards, baselines, campaigns, reports,
 * inquiries, quotes, bookings, payments, revenue, reviews, customer identities, or provider
 * credentials — and it never ingests, connects, imports, or searches any measurement/business data.
 */
export const analyticsThirtyDayPlanGuide: GuideContent = {
  slug: 'analytics-30-day-plan',
  title: 'Analytics & 30-Day Plan',
  shortTitle: 'Analytics & 30-Day Plan',
  outcome:
    'Measure the customer journey with a small, trustworthy scorecard and turn the clearest gap into a focused 30-day improvement plan.',
  estimatedMinutes: 90,
  tint: 'cyan',

  whatItDoes:
    'Analytics should help a detailer answer practical questions: how potential customers are finding the business, which sources produce real inquiries rather than only views or clicks, where people stop between inquiry, quote, booking, payment, and completed service, which follow-ups, reviews, or repeat-business efforts are actually being used, and what the single most useful improvement to make next is. The first version does not need a custom dashboard or perfect attribution. It needs a small set of consistently defined numbers, owner-controlled access to the source reports, a test that confirms the important actions are recorded, and a recurring time to review the results. Website analytics, Google Search Console, Google Business Profile performance, inquiry records, quotes, bookings, and payment reports describe different parts of the journey, and their totals will not always match: a website session is not an inquiry, a Business Profile interaction is not automatically a customer, and a sent payment link is not a completed payment. This final Foundation guide connects the systems built in Guides 1–7 and turns the clearest remaining gap into a 30-day plan.',

  terms: [
    {
      term: 'Metric',
      definition:
        'A consistently defined number used to answer a business question, such as qualified inquiries or completed services.',
    },
    {
      term: 'Event',
      definition:
        'A recorded action in an analytics system, such as a page view, contact-button click, or successful form submission.',
    },
    {
      term: 'Key event',
      definition:
        'An analytics event identified as especially important to the business. It is still a measurement signal, not automatic proof of a booked or completed job.',
    },
    {
      term: 'Baseline',
      definition:
        'A clearly dated starting period used for comparison. A baseline describes what happened; it does not prove why it happened.',
    },
    {
      term: 'Decision rule',
      definition:
        'A written condition that tells the owner what to continue, investigate, change, or stop after reviewing the data.',
    },
  ],

  whyItMatters: [
    {
      heading: 'Fewer decisions based on impressions alone',
      body: 'Views, impressions, clicks, sessions, and profile interactions can show visibility or interest. They do not by themselves show that a person became a qualified inquiry, booked, paid, or received a completed service.',
    },
    {
      heading: 'A visible customer-journey bottleneck',
      body: 'Consistent stages make it possible to see whether the largest gap is discovery, inquiry quality, response speed, quote acceptance, scheduling, payment, completion, reviews, or repeat business.',
    },
    {
      heading: 'Cleaner comparisons',
      body: 'Exact date ranges, written metric definitions, and a change log reduce misleading comparisons. Comparing a partial week with a full week or redefining a qualified inquiry halfway through the month can produce a false trend.',
    },
    {
      heading: 'Safer measurement',
      body: 'Analytics tools should not receive customer names, email addresses, phone numbers, street addresses, card information, or other unnecessary personal information. The business should understand what each tool collects, restrict access, review retention and sharing settings, and keep detailed customer records in the appropriate operational system.',
    },
    {
      heading: 'A smaller improvement plan',
      body: 'A 30-day cycle gives the operator enough structure to verify the system, make one focused change, observe what happens, and choose the next action without rebuilding everything at once.',
    },
  ],

  diagram: [
    'Search, map, referral, social, or ad discovery',
    'Website or Business Profile interaction',
    'Inquiry',
    'Qualified inquiry',
    'Quote',
    'Booking and verified payment',
    'Completed service',
    'Review, repeat booking, or referral',
    'Weekly review and next improvement',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'A website session is not an inquiry, a Business Profile interaction is not automatically a customer, and a sent payment link is not a completed payment. The useful view combines digital signals with the business records that confirm what happened after the click.',
    },
  ],

  goodEnoughToLaunch: [
    'The owner controls or has durable administrator access to the website analytics, Search Console property, and Google Business Profile reports used by the business.',
    'One scorecard defines the few metrics needed to understand discovery, inquiries, quotes, bookings, payments, completed services, reviews, and repeat business.',
    'Every metric has a written definition, source, date window, owner, and known limitation.',
    'Inquiry sources are captured consistently using a small controlled list plus an optional customer-provided answer.',
    'Website analytics, if used, is installed through the approved site method and verified with a real test.',
    'At least one meaningful website action—such as a successful inquiry submission—is tested separately from ordinary page views or button clicks.',
    'Search Console ownership and performance access are verified for the correct website property.',
    'Google Business Profile performance opens for the correct business and date range.',
    'Analytics URLs, event names, parameters, reports, and exports do not contain customer PII or payment data.',
    'Privacy, consent, sharing, user-access, and retention settings have been reviewed for the selected tools and business circumstances.',
    'A baseline period with exact dates is recorded, even when some values are zero or unavailable.',
    'One end-to-end test can be traced from a discovery source through the selected digital action and into the correct inquiry or test record.',
    'A weekly review and day-30 review are scheduled.',
    'The 30-day plan names one primary bottleneck, one change, the owner, the observation window, the success signal, and the decision rule.',
  ],

  notRequiredYet: [
    'A custom business-intelligence dashboard.',
    'Perfect person-level attribution across devices and platforms.',
    'Tracking every click, scroll, or page element.',
    'Session replay or heatmaps.',
    'Storing customer identities inside analytics tools.',
    'Call recording or dynamic call tracking.',
    'A complex attribution model.',
    'Daily reactions to small fluctuations.',
    'A statistically significant experiment.',
    'Paid-ad conversion imports.',
    'Automated CRM and payment integrations.',
    'A revenue forecast based on one month.',
    'Comparing the business with unsupported industry benchmarks.',
  ],

  tables: [
    {
      title: 'Starter scorecard',
      caption:
        'Use the smallest scorecard that supports a decision. Keep detailed customer, quote, payment, and service records in their appropriate systems; the scorecard can contain aggregate counts and secure references.',
      columns: ['Metric', 'Working definition', 'Primary source', 'Why it is useful'],
      rows: [
        [
          'Search visibility',
          'Search Console impressions for the selected website property and date range',
          'Search Console',
          'Shows whether pages appeared in Google Search',
        ],
        [
          'Search clicks',
          'Clicks from Google Search results for the same property and date range',
          'Search Console',
          'Shows visits from organic Google Search',
        ],
        [
          'Business Profile interactions',
          'Available calls, website clicks, direction requests, bookings, or other interactions reported for the selected profile and date range',
          'Google Business Profile',
          'Shows actions taken from the profile; availability varies',
        ],
        [
          'Website key actions',
          'Verified successful inquiry submissions or another deliberately selected action',
          'Website analytics and form delivery log',
          'Shows a useful website signal; the operational record confirms the inquiry',
        ],
        [
          'Inquiries',
          'New, non-test customer requests received during the period',
          'Inquiry system of record',
          'Shows total demand entering the workflow',
        ],
        [
          'Qualified inquiries',
          'Inquiries meeting the documented service-area, service, vehicle, timing, and minimum-job rules',
          'Inquiry system of record',
          'Separates real fit from total contacts',
        ],
        [
          'Quotes sent',
          'Written quotes sent during the period',
          'Quote system',
          'Shows how many qualified opportunities received an offer',
        ],
        [
          'Quotes accepted',
          'Quotes explicitly accepted under the documented rule',
          'Quote or booking system',
          'Supports a consistently defined quote-acceptance rate',
        ],
        [
          'Bookings confirmed',
          'Appointments meeting the documented confirmation rule',
          'Booking system',
          'Shows committed work, not merely requested dates',
        ],
        [
          'Completed services',
          'Booked services actually completed during the period',
          'Service/customer record',
          'Shows delivered work',
        ],
        [
          'Collected service revenue',
          'Customer payments successfully recorded for completed or properly categorized services, net/gross treatment defined consistently',
          'Payment and bookkeeping records',
          'Supports business review; keep customer payment data outside analytics',
        ],
        [
          'New reviews',
          'Genuine new public reviews during the period',
          'Review profile',
          'Shows review activity, not service quality by itself',
        ],
        [
          'Repeat bookings',
          'Confirmed bookings from existing customers under the documented definition',
          'Customer system',
          'Shows returning demand without tying it to review activity',
        ],
        [
          'Known-source rate',
          'Inquiries with an approved source value ÷ total eligible inquiries',
          'Inquiry system',
          'Reveals whether source data is complete enough to use',
        ],
      ],
      note: 'Use ratios only when the numerator and denominator describe the same eligible population and compatible time/cohort — for example, quote acceptance rate = accepted quotes ÷ quotes sent under one documented acceptance definition; qualified-to-booked rate = confirmed bookings ÷ qualified inquiries when the timing window and follow-through are comparable; known-source rate = inquiries with a usable source ÷ eligible inquiries. Do not compare ratios with different definitions, unfinished cohorts, or missing records without labeling the limitation.',
    },
  ],

  timeline: {
    title: 'The first 30-day cycle',
    phases: [
      {
        heading: 'Days 1–3: Establish control and definitions',
        bullets: [
          'Confirm owner access to each measurement source.',
          'Write the scorecard definitions and exact baseline dates.',
          'Record what is currently available, missing, delayed, or known to be unreliable.',
          'Choose the one customer-journey question the cycle should answer.',
        ],
      },
      {
        heading: 'Days 4–7: Verify collection',
        bullets: [
          'Test website analytics, the selected key action, Search Console property, Business Profile report, inquiry delivery, and source capture.',
          'Remove PII from URLs, event parameters, or analytics fields.',
          'Fix broken notifications, duplicate events, wrong properties, and missing test records before interpreting performance.',
        ],
      },
      {
        heading: 'Days 8–14: Record the baseline and choose one bottleneck',
        bullets: [
          'Enter the first comparable values in the scorecard.',
          'Separate digital signals from confirmed operational outcomes.',
          'Select one bottleneck supported by the records, not the most emotionally frustrating metric.',
          'Write one change small enough to implement and observe during the remaining cycle.',
        ],
      },
      {
        heading: 'Days 15–21: Make one controlled improvement',
        bullets: [
          'Implement the selected change.',
          'Record the date, owner, affected page/workflow, and expected signal.',
          'Avoid unrelated redesigns or simultaneous changes that make the result impossible to interpret.',
          'Continue normal service and accurate recordkeeping.',
        ],
      },
      {
        heading: 'Days 22–27: Observe and check data quality',
        bullets: [
          'Review the same definitions and date windows.',
          'Confirm that events, inquiries, statuses, and outcomes are still recorded correctly.',
          'Note holidays, weather, outages, ad changes, capacity limits, or unusual jobs that affect interpretation.',
          'Do not declare success or failure from one isolated click, inquiry, review, or booking.',
        ],
      },
      {
        heading: 'Days 28–30: Compare, decide, and start the next cycle',
        bullets: [
          'Compare the completed period with the baseline using the same definitions.',
          'State what changed, what remained uncertain, and what operational evidence supports the conclusion.',
          'Decide to keep, adjust, reverse, investigate, or continue observing the change.',
          'Choose the next smallest bottleneck and schedule the next review cycle.',
        ],
      },
    ],
  },

  checklist: [
    {
      id: 'analytics-plan-01',
      title: 'Write five practical questions before choosing metrics',
      description:
        'Write the small set of questions the owner must answer each week, covering discovery, inquiries, journey bottlenecks, completed outcomes, and the next improvement. Every metric added later should support one of these questions. Remove a metric when the owner cannot explain what decision it changes.',
      example:
        'Which sources produced qualified inquiries? Where did qualified customers stop before booking? Did the selected website or workflow change improve the target signal without creating a new problem?',
      completionEvidence: 'Five decision questions are written and assigned to the weekly review.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-02',
      title: 'Connect discovery signals to confirmed business stages',
      description:
        'Map the stages from search, maps, referral, social, or ads through website/profile action, inquiry, qualification, quote, booking, verified payment, completed service, review, and repeat booking. Identify which system is the source of truth at each stage and where only an aggregate or directional signal is available.',
      example:
        'Search Console → website analytics → inquiry CRM → quote/booking system → payment provider → service record → Google Business Profile reviews → customer record.',
      completionEvidence: 'Every stage has a named source, owner, and known handoff.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-03',
      title: 'Secure durable access to every measurement source',
      description:
        'Confirm the business owner controls or has durable administrator access to the website analytics property, Search Console, Google Business Profile, form/inquiry system, booking records, payment reports, and scorecard. Use individual accounts, multifactor authentication where supported, recovery methods, and least-necessary roles. Remove former vendors or helpers who no longer need access.',
      example:
        'The owner is verified on the Search Console domain property, an administrator on the correct analytics property and Business Profile, and the agency uses its own delegated account rather than owning the only login.',
      completionEvidence: 'The owner can open every source, manage access, and recover the account.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-04',
      title: 'Define every number before comparing it',
      description:
        'For each scorecard metric, document its name, business question, exact definition, inclusion/exclusion rules, source, date basis, owner, refresh delay, and limitation. Define statuses such as inquiry, qualified, quote sent, accepted, confirmed booking, paid, completed, repeat customer, and known source consistently with earlier guides.',
      example:
        'Confirmed booking: an appointment whose required deposit is verified Paid and confirmation was sent. Source: booking system. Date basis: confirmation date. Excludes requested dates and test records.',
      completionEvidence: 'Every displayed metric has one current definition and source.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-05',
      title: 'Put the core journey numbers in one review view',
      description:
        'Create one owner-controlled scorecard using a secure spreadsheet, CRM report, or reporting tool. Include exact start/end dates, current values, prior comparable values when available, notes, and the next decision. Use aggregates or secure references; do not copy unnecessary customer details, card data, or private communications into the scorecard.',
      example:
        'A weekly sheet contains Search clicks, Business Profile interactions, website key actions, inquiries, qualified inquiries, quotes, bookings, completed services, aggregate collected revenue, reviews, repeat bookings, and notes for known data issues.',
      completionEvidence: 'The owner can complete the scorecard from the named sources without redefining the metrics.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-06',
      title: 'Record how each inquiry found the business',
      description:
        'Use a small controlled source list that matches the channels the business actually uses, plus “Other/Customer answer” and “Unknown”. Preserve campaign parameters or referrer information when appropriately available, but do not silently replace the customer’s answer with an assumed last click. Train the owner to distinguish source, campaign, and referral person when relevant.',
      example:
        'Google Search, Google Maps/Business Profile, Referral, Repeat customer, Instagram, Facebook, Paid Google, Paid Meta, Other, Unknown; the form may also ask “How did you hear about us?”',
      completionEvidence: 'A test inquiry receives one usable source value without free-text chaos or forced guessing.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-07',
      title: 'Confirm the correct website sends data to the correct property',
      description:
        'If the business uses website analytics, configure it through the website platform’s supported method in an owner-controlled property. Confirm the correct domain, time zone, currency where applicable, active data stream, internal/test-traffic handling, authorized users, sharing choices, and retention setting. Review applicable notice and consent requirements for the business and visitors. If the business intentionally does not use client-side analytics, document the approved alternative sources rather than installing an unreviewed tool.',
      example:
        'The owner-controlled GA4 property receives activity only from the live detailing domain, uses the business time zone, has former vendors removed, and the site’s privacy treatment reflects the selected configuration.',
      completionEvidence: 'The live property and collection choice are documented and owner-accessible.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-08',
      title: 'Confirm the correct website property in Search Console',
      description:
        'Add or open the Search Console property that covers the intended production domain. Verify ownership through a durable method, preserve a backup verification method where appropriate, review owners/users, and confirm that the Performance report shows the correct site. Record whether the property is a Domain or URL-prefix property so future comparisons use the same scope.',
      example:
        'brightmobiledetailing.com is verified as a Domain property through owner-controlled DNS, includes HTTPS and the expected subdomains, and the owner can remove an old agency user.',
      completionEvidence: 'The owner can open the correct Performance report and explain the property scope.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-09',
      title: 'Open the correct profile’s performance report',
      description:
        'Confirm the owner or authorized manager can open performance for the correct verified Business Profile and select an exact date range. Record the interactions and search information currently available for that profile without assuming every metric exists. Treat reported calls, clicks, directions, bookings, views, and searches according to Google’s current definitions and known delays.',
      example:
        'The owner opens the detailing profile—not a duplicate or old location—selects July 1–31, records the available interactions, and notes that profile actions are directional signals rather than confirmed customers.',
      completionEvidence: 'The correct profile and date range can be reviewed or exported under owner control.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-10',
      title: 'Measure a successful inquiry, not only a button click',
      description:
        'Choose the most meaningful website action available, preferably a confirmed inquiry submission or thank-you state rather than a form view or contact-button click. Configure or identify the event using the supported analytics method, mark it as important where appropriate, and verify it in the platform’s realtime or debugging tools. Keep the operational inquiry-delivery record as the confirmation that a real inquiry arrived.',
      example:
        'A test form submission creates one generate_lead event and one test inquiry record. Clicking “Start quote” without completing the form does not count as a successful inquiry.',
      completionEvidence: 'One controlled test produces the expected analytics event and matching operational record without duplicates.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-11',
      title: 'Review URLs, events, and reports for prohibited or unnecessary data',
      description:
        'Inspect page URLs, query strings, form confirmation pages, event names/parameters, campaign values, dashboards, and exports. Do not send names, email addresses, phone numbers, street addresses, card or bank data, government identifiers, private message contents, or other unnecessary personal information to analytics tools. Use non-sensitive aggregate events and keep detailed records in the appropriate secure system. Correct leaks and follow the selected provider’s current remediation instructions.',
      example:
        'The confirmation URL is /quote-request/thank-you, not a thank-you URL that appends the customer’s email and phone number; the event records generate_lead without the customer’s identity or vehicle notes.',
      completionEvidence: 'A test journey and report inspection show no customer PII or payment data in analytics fields.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-12',
      title: 'Capture the starting numbers before changing the system',
      description:
        'Choose a baseline window appropriate to the available data and label the exact dates, source scopes, incomplete data, outages, capacity limits, holidays, weather, and campaigns. Record zero and unavailable values honestly. Do not backfill invented values or compare a partial period with a full period without labeling the difference.',
      example:
        'Baseline: Jun 1–30, 2026. Search Console Domain property; GBP profile ID noted; two days of form-delivery outage; owner unavailable Jun 12–15; paid campaign not running.',
      completionEvidence: 'The scorecard contains one dated baseline with limitations and no invented data.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-13',
      title: 'Trace one controlled test through every relevant system',
      description:
        'Run a labeled test from an approved source link through the website or Business Profile path, selected key action, inquiry delivery, source field, status, quote/booking handoff, and scorecard treatment. Use test mode or non-production records where appropriate, prevent real charges and customer messages, and clean up test records without deleting evidence needed to confirm the setup.',
      example:
        'TEST-ANALYTICS-001 opens a tagged test link, submits the inquiry form, appears once in analytics and once in the inquiry system with the expected source, then is excluded from real customer totals.',
      completionEvidence: 'The owner can explain what each source recorded, where counts differ, and how test traffic is excluded.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-14',
      title: 'Choose one bottleneck, one change, and one success signal',
      description:
        'Use the baseline and operational evidence to choose one customer-journey bottleneck. Write the current condition, proposed change, implementation owner/date, observation window, primary metric, guardrail metric, known limits, and decision rule. Keep the change small enough to implement and observe without redesigning unrelated systems.',
      example:
        'Bottleneck: qualified inquiries abandon the long form. Change: move optional vehicle photos after basic contact/service fields. Primary signal: completed qualified inquiry rate. Guardrail: percentage of inquiries missing information needed to quote. Decide on Day 30 whether to keep, revise, or reverse.',
      completionEvidence: 'One written plan has a single primary change and a day-30 decision rule.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-15',
      title: 'Put the measurement routine on the calendar',
      description:
        'Schedule short weekly reviews and a day-30 decision review. Assign the owner, source-update steps, scorecard deadline, data-quality check, decision notes, and next action. During the review, distinguish observations from explanations and record uncertainty rather than inventing a cause.',
      example:
        'Mondays 8:00–8:25 AM: update prior week. Day 30: compare the full cycle with baseline, review the change log, decide keep/adjust/reverse/observe, and choose the next bottleneck.',
      completionEvidence: 'Recurring review events and the day-30 agenda exist in an owner-controlled calendar.',
      priority: 'essential',
    },
    {
      id: 'analytics-plan-16',
      title: 'Use consistent source, medium, and campaign values',
      description:
        'Define lowercase naming rules for approved campaign parameters, who creates them, and where the final URLs are stored. Use tagged links for campaigns the business controls, such as email, QR codes, paid ads, and social profile links, without placing customer information in the parameters. Test redirects so the parameters survive and land on the intended page.',
      example:
        'utm_source=instagram · utm_medium=organic_social · utm_campaign=summer_maintenance_2026; never use a customer name, email, phone number, or invoice number as a campaign value.',
      completionEvidence: 'Two test campaign URLs follow the naming rule and report under the expected values.',
      priority: 'recommended',
    },
    {
      id: 'analytics-plan-17',
      title: 'Record changes that affect interpretation',
      description:
        'Keep a dated log of website releases, form changes, service-area changes, pricing changes, profile edits, ads, outages, tracking fixes, capacity constraints, weather events, vacations, and definition changes. Record who made the change and which metrics may be affected. Do not rewrite old definitions without preserving the effective date.',
      example:
        'Jul 18: shortened quote form; Jul 20: severe storms canceled two service days; Jul 22: fixed duplicate generate_lead event.',
      completionEvidence: 'The scorecard review can reference a dated explanation for known disruptions or measurement changes.',
      priority: 'recommended',
    },
    {
      id: 'analytics-plan-18',
      title: 'Preserve periodic aggregate snapshots',
      description:
        'Export or snapshot the aggregate reports needed to preserve trend context when provider interfaces or retention windows change. Store them in an owner-controlled location with exact dates, source/property name, and restricted access. Do not create unnecessary copies of user-level or customer data.',
      example:
        'At month end, the owner exports the scorecard, Search Console performance, and available Business Profile performance using filenames such as 2026-07_GSC_domain-performance.csv.',
      completionEvidence: 'One dated export set can be found and understood without opening a former vendor account.',
      priority: 'recommended',
    },
    {
      id: 'analytics-plan-19',
      title: 'Expand the scorecard carefully',
      description:
        'After the core journey counts are stable, add only secondary metrics tied to a decision, such as response time, quote age, no-show rate, repeat interval, review-request delivery, or service-mix share. Define the new metric before displaying it and avoid sensitive customer segmentation or unsupported lifetime-value estimates.',
      example:
        'The owner adds median first-response time during published hours because slow response is the selected bottleneck; the calculation and excluded after-hours inquiries are documented.',
      completionEvidence: 'Each secondary metric has a question, definition, owner, source, and review action.',
      priority: 'recommended',
    },
    {
      id: 'analytics-plan-20',
      title: 'Automate reporting only after the manual scorecard is trustworthy',
      description:
        'After definitions, manual reconciliation, source capture, and privacy controls work reliably, consider supported integrations among analytics, advertising, CRM, booking, payment, and reporting systems. Use server-verified events where required, least-necessary data, documented consent and policy treatment, deduplication, failure alerts, access controls, and a manual reconciliation path. Do not upload customer lists or transaction data merely because a platform accepts them.',
      example:
        'A future integration imports one verified qualified-lead or completed-booking signal using a supported method, excludes prohibited data, deduplicates retries, logs failures, and can be reconciled to the operational source.',
      completionEvidence:
        'The member documents one justified integration, its data fields, security/privacy boundary, deduplication rule, failure path, and manual fallback—or intentionally retains the manual process.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'System-selection guidance',
      body: 'Keep this guide vendor-neutral. Do not maintain a static analytics-tool comparison inside this guide — features, terminology, prices, privacy controls, attribution methods, interfaces, and retention options change. The member should compare:',
      bullets: [
        'owner/admin access, MFA, recovery, and user roles;',
        'supported installation for the website platform;',
        'realtime or debugging tools for validation;',
        'meaningful event and key-action configuration;',
        'search and local-profile performance access;',
        'privacy, consent, data-sharing, retention, deletion, and export controls;',
        'ability to avoid PII and sensitive operational data;',
        'stable date ranges, property scopes, metric definitions, and annotations;',
        'campaign tagging and source reporting;',
        'aggregate export and backup options;',
        'integration, deduplication, failure alerts, and audit history;',
        'total cost and limits after introductory pricing;',
        'ability to leave the platform with usable records.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'The business has almost no website traffic',
          body: 'Keep the setup correct and focus the scorecard on verified inquiries, source capture, Business Profile interactions, referrals, quotes, bookings, and completed services. Low volume is a result to record, not a reason to fabricate a trend.',
        },
        {
          heading: 'The business does not use Google Analytics',
          body: 'Document the approved alternative, such as privacy-conscious site statistics, server logs, form-delivery records, Search Console, Business Profile performance, and the customer system. The goal is trustworthy decisions, not mandatory use of one vendor.',
        },
        {
          heading: 'Search Console or Business Profile shows no data',
          body: 'Confirm the correct property/profile, ownership, date range, eligibility, and expected processing delay. Record “Unavailable” or “0” accurately and continue using operational sources while data accumulates.',
        },
        {
          heading: 'Analytics shows more inquiries than the CRM',
          body: 'Check duplicate events, refreshes, test traffic, blocked form delivery, spam, wrong confirmation logic, and integration failures. Do not silently adjust one total to force a match.',
        },
        {
          heading: 'The CRM shows more inquiries than analytics',
          body: 'Some inquiries may arrive by phone, direct message, referral, or privacy settings that prevent client-side measurement. Keep the CRM as the operational source and label analytics as partial.',
        },
        {
          heading: 'A customer uses several channels before booking',
          body: 'Preserve the available digital source and the customer-provided answer when appropriate. Do not claim one touchpoint caused the booking when the evidence shows a multi-step journey.',
        },
        {
          heading: 'A metric changes after the provider updates its definition',
          body: 'Record the date and provider note, avoid comparing incompatible periods as one continuous series, and preserve the old definition in the change log.',
        },
        {
          heading: 'The form includes customer details in the confirmation URL',
          body: 'Treat it as a data issue. Remove the personal values from the URL and analytics fields, review affected reports and provider remediation guidance, and confirm the corrected flow with a new test.',
        },
        {
          heading: 'A week has one large commercial job',
          body: 'Label the unusual job and avoid treating the revenue jump as a repeatable consumer trend. Review service count, mix, capacity, and revenue separately.',
        },
        {
          heading: 'Weather cancels several appointments',
          body: 'Record the weather and cancellation/reschedule effect. Do not attribute the completed-service decline solely to marketing or the website.',
        },
        {
          heading: 'The first 30-day change produces no clear result',
          body: 'Verify implementation and data quality, state that the result is inconclusive, and decide whether to continue observing, adjust the change, or test a different bottleneck. Do not invent a success claim.',
        },
        {
          heading: 'Paid ads begin during the baseline',
          body: 'Split or annotate the periods and campaigns. Do not describe a mixed paid-and-organic period as an unchanged baseline.',
        },
        {
          heading: 'The owner misses a weekly review',
          body: 'Update the scorecard when possible, preserve the actual data dates, and resume the schedule. Do not backdate decisions or fill missing values from memory.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Tracking every available number — more metrics create more maintenance and more opportunities to react to noise. Keep only numbers connected to a defined business question and decision.',
    'Treating a digital interaction as a completed outcome — a profile view, website session, contact click, or form start is not automatically an inquiry, qualified lead, booking, payment, or completed service.',
    'Using inconsistent funnel definitions — if “qualified,” “accepted,” or “confirmed” changes from week to week, the trend is not comparable. Preserve definitions and effective dates.',
    'Comparing incompatible date ranges — do not compare three days with a full week, a 28-day platform view with a calendar month, or an unfinished quote cohort with a completed one without labeling the limitation.',
    'Assuming attribution is exact — a customer may discover the business on Maps, return through a saved link, ask a friend, and later search the business name. Treat source reports as evidence with limitations, not a perfect account of influence.',
    'Letting a vendor own the only account — the business should retain durable owner access, recovery methods, exports, and the ability to remove a former provider.',
    'Sending PII through URLs or event parameters — names, emails, phone numbers, addresses, customer IDs that can be resolved externally, and private form contents do not belong in analytics URLs, campaign values, or event fields.',
    'Counting duplicate events — a form retry, page refresh, tag loaded twice, or integration retry can create duplicates. Test the full path and reconcile with the operational record.',
    'Trusting a thank-you page without checking delivery — the browser may show success even when a form notification, CRM write, or integration failed. Confirm both the analytics signal and the inquiry record.',
    'Reacting to normal delay or small samples — some reports process later than others, and small local-business counts can move sharply from one event. Record delays and avoid unsupported conclusions.',
    'Changing several things at once — simultaneous pricing, copy, form, ad, service-area, and scheduling changes make it difficult to tell what affected the result. Keep the 30-day cycle focused.',
    'Ignoring capacity and operations — fewer bookings may reflect rain, vacation, sold-out capacity, or service-area limits rather than weaker marketing. Record operational context.',
    'Building a dashboard before fixing collection — a polished dashboard cannot repair wrong properties, missing inquiries, duplicate events, inconsistent statuses, or PII leakage.',
    'Optimizing vanity metrics — increasing page views or followers is not automatically useful if qualified inquiries, bookings, or completed services do not improve.',
    'Claiming causation from a before-and-after chart — a change followed by a different result does not prove the change caused it. State the observation, limitations, and next test honestly.',
    'Waiting for perfect data before acting — measurement will always have limits. Once the critical path is verified, use the best trustworthy evidence available and document uncertainty.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Google Analytics setup and validation',
      links: [
        {
          label: 'Google Analytics — Set up Analytics for a website or app',
          href: 'https://support.google.com/analytics/answer/9304153?hl=en',
        },
        {
          label: 'Google Analytics — Confirm that data is being collected',
          href: 'https://support.google.com/analytics/answer/9333790?hl=en',
        },
        {
          label: 'Google Analytics — About events',
          href: 'https://support.google.com/analytics/answer/9322688?hl=en',
        },
        {
          label: 'Google Analytics — Mark events as key events',
          href: 'https://support.google.com/analytics/answer/13128484?hl=en',
        },
        {
          label: 'Google Analytics — Monitor events in DebugView',
          href: 'https://support.google.com/analytics/answer/7201382?hl=en',
        },
        {
          label: 'Google Analytics — Campaign URL Builder',
          href: 'https://ga-dev-tools.google/campaign-url-builder/',
        },
      ],
    },
    {
      heading: 'Google Analytics privacy and data controls',
      links: [
        {
          label: 'Google Analytics — Avoid sending personally identifiable information',
          href: 'https://support.google.com/analytics/answer/6366371?hl=en',
        },
        {
          label: 'Google Analytics — Privacy controls',
          href: 'https://support.google.com/analytics/answer/9019185?hl=en',
        },
        {
          label: 'Google Analytics — Data retention',
          href: 'https://support.google.com/analytics/answer/7667196?hl=en',
        },
        {
          label: 'Google Analytics — Data sharing settings',
          href: 'https://support.google.com/analytics/answer/1011397?hl=en',
        },
      ],
    },
    {
      heading: 'Google Search Console',
      links: [
        {
          label: 'Google Search Console — Getting started',
          href: 'https://support.google.com/webmasters/answer/10267942?hl=en',
        },
        {
          label: 'Google Search Console — Add a website property',
          href: 'https://support.google.com/webmasters/answer/34592?hl=en',
        },
        {
          label: 'Google Search Console — Verify site ownership',
          href: 'https://support.google.com/webmasters/answer/9008080?hl=en',
        },
        {
          label: 'Google Search Console — Performance report',
          href: 'https://support.google.com/webmasters/answer/7576553?hl=en',
        },
        {
          label: 'Google Search Console — Understand impressions, position, and clicks',
          href: 'https://support.google.com/webmasters/answer/7042828?hl=en',
        },
      ],
    },
    {
      heading: 'Google Business Profile and business data',
      links: [
        {
          label: 'Google Business Profile — Understand performance and insights',
          href: 'https://support.google.com/business/answer/9918094?hl=en',
        },
        {
          label: 'FTC — Protecting Personal Information: A Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business',
        },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, privacy, consent, data-security, accounting, tax, advertising, analytics-implementation, or statistical advice. Google Analytics is one example, not a requirement — an approved alternative may be used when it provides the needed evidence and appropriate privacy treatment. Do not present any analytics, search, profile, CRM, payment, ad, or reporting tool as universally best, and do not treat provider metric lists, fees, interfaces, attribution rules, processing delays, privacy controls, or retention options as permanent. Do not send customer names, emails, phone numbers, addresses, card or bank data, private messages, detailed vehicle or job notes, or other unnecessary personal information into analytics URLs, events, parameters, dashboards, or exports. Do not describe views, impressions, clicks, sessions, calls, form starts, or browser success pages as confirmed inquiries, bookings, payments, customers, or completed services. Do not combine incompatible date ranges, definitions, property scopes, unfinished cohorts, or paid/organic periods without a clear limitation, and do not claim that one source receives full credit for a multi-touch customer journey. Do not infer causation, statistical significance, customer lifetime value, industry benchmarks, or forecasted revenue from a small 30-day sample without appropriate evidence, and do not let measurement delay, missing data, or an inconclusive result become invented values or unsupported success claims. Follow current official guidance and qualified review because laws, consent expectations, provider policies, metrics, interfaces, and privacy controls change.',

  searchKeywords: [
    'analytics',
    '30-day plan',
    'scorecard',
    'metrics',
    'measurement',
    'baseline',
    'decision rule',
    'customer journey',
    'funnel',
    'source tracking',
    'attribution',
    'Google Analytics',
    'GA4',
    'key event',
    'DebugView',
    'Search Console',
    'search impressions',
    'search clicks',
    'Google Business Profile performance',
    'inquiries',
    'qualified inquiries',
    'quote acceptance',
    'bookings',
    'completed services',
    'revenue',
    'reviews',
    'repeat bookings',
    'UTM',
    'campaign URL',
    'PII',
    'data retention',
    'weekly review',
    'data quality',
    'conversion rate',
  ],
};
