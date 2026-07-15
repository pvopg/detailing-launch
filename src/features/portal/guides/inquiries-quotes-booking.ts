import type { GuideContent } from './types';

/**
 * Foundation Guide 4 — Inquiries, Quotes & Booking.
 *
 * Canonical editorial source: Foundation_Guide_04_Inquiries_Quotes_and_Booking.md. Checklist item
 * ids (`inquiry-booking-01`..`inquiry-booking-19`) are stable and must not change after release, so
 * saved progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only:
 * items 01–14 are Essential (denominator 14); 15–18 Recommended; 19 Later.
 *
 * This guide teaches a member to configure their own external inquiry, quote, and booking systems.
 * The portal persists only checklist completion — never customer inquiries, contact details, photos,
 * quotes, calendars, consent records, or payment data.
 */
export const inquiriesQuotesBookingGuide: GuideContent = {
  slug: 'inquiries-quotes-booking',
  title: 'Inquiries, Quotes & Booking',
  shortTitle: 'Inquiries & Booking',
  outcome:
    'Turn calls, forms, texts, and direct messages into a consistent inquiry, quote, and confirmed-booking workflow.',
  estimatedMinutes: 75,
  tint: 'green',

  whatItDoes:
    'Customers may contact a mobile detailer through a website form, phone call, text, Google profile, referral, or social-media message. The public channels can stay flexible, but the internal process should be consistent. This guide builds one simple workflow: capture the inquiry; collect the minimum information needed to evaluate it; respond within a stated window; send a written quote with a clear scope; reserve an available appointment; and confirm what happens next. The goal is not to automate every conversation. The goal is to prevent promising inquiries from disappearing in an inbox, quoting the wrong work, or reaching the calendar without clear expectations. Deposits and payment collection are covered in the next guide. Complete the booking workflow first so the payment step can attach to a stable process.',

  terms: [
    {
      term: 'Inquiry',
      definition: 'A request for information or service that has not yet been qualified or priced.',
    },
    {
      term: 'Qualified inquiry',
      definition:
        'A request that appears to fit the current services, service area, schedule, and customer requirements.',
    },
    {
      term: 'Quote',
      definition:
        'A written description of the proposed work, price, assumptions, and next step. Use business-approved terms appropriate to the location and service.',
    },
    {
      term: 'Confirmed booking',
      definition:
        'A reserved date or service window that both the business and customer can identify, with confirmation details sent through an agreed channel.',
    },
  ],

  whyItMatters: [
    {
      heading: 'Faster, more consistent responses',
      body: 'A standard set of questions and response templates reduces repeated typing while still allowing a personal conversation. Customers receive the same basic information regardless of where they first made contact.',
    },
    {
      heading: 'Better quote accuracy',
      body: 'Vehicle size, condition, requested services, access to water or power, location, and time constraints can change the work required. Collecting the relevant facts before quoting reduces avoidable surprises.',
    },
    {
      heading: 'Fewer missed leads',
      body: 'Messages spread across personal texts, direct-message inboxes, voicemail, and email are easy to forget. A single inquiry record gives each request an owner, status, and next action.',
    },
    {
      heading: 'Clear expectations',
      body: 'A written quote and confirmation help both sides understand the proposed work, price, location, date or arrival window, and next step. This does not remove every disagreement, but it creates a useful shared reference.',
    },
    {
      heading: 'A realistic calendar',
      body: 'Mobile service requires travel, setup, cleanup, weather judgment, and variation in vehicle condition. A booking system should protect enough time for the actual work instead of exposing every empty calendar slot.',
    },
  ],

  diagram: [
    'Website, Google, phone, referral, or social message',
    'Inquiry record',
    'Fit and information check',
    'Written quote',
    'Customer acceptance',
    'Confirmed booking',
    'Deposit and payment',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'Every qualified inquiry reaches one owner-controlled system, receives a clear written quote, and becomes a confirmed appointment — or a documented decline or follow-up.',
    },
    {
      tone: 'note',
      body: 'The system should make the current state visible. At any time, the operator should be able to tell whether an inquiry is new, awaiting information, quoted, accepted, booked, declined, or closed.',
    },
  ],

  goodEnoughToLaunch: [
    'Every public inquiry channel points into one owner-controlled workflow or is manually logged there.',
    'The intake process collects only the information needed to respond and prepare a quote.',
    'Required fields are labeled and the form gives understandable success and error feedback.',
    'The customer is told how the submitted contact information will be used for the requested response.',
    'New inquiries create a notification in an inbox or system the operator checks consistently.',
    'The operator has a realistic response window and a reusable acknowledgment message.',
    'Each inquiry receives a visible status and next action.',
    'The quote template states the customer, vehicle, location, proposed service, scope, price, assumptions, expiration or response date, and acceptance step.',
    'The calendar includes service duration, travel/setup buffer, and blocked personal or unavailable time.',
    'Accepted quotes become confirmed bookings with a written date or arrival window, location, service, price reference, and reschedule contact.',
    'The full journey has been tested from public inquiry through booking confirmation.',
  ],

  notRequiredYet: [
    'A fully automated CRM.',
    'Instant quotes for every vehicle condition.',
    'Deposits or stored payment details.',
    'Electronic signatures or custom contracts.',
    'Automated marketing campaigns.',
    'A chatbot or AI sales assistant.',
    'Round-the-clock response promises.',
    'A booking page that exposes every calendar opening.',
    'Complex integrations before the manual workflow is reliable.',
  ],

  checklist: [
    {
      id: 'inquiry-booking-01',
      title: 'Choose where every inquiry will be tracked',
      description:
        'Select one owner-controlled place where every new request will receive a record, status, and next action. This can be a lightweight CRM, booking system, spreadsheet, or other secure tool the operator checks consistently. Public channels may remain separate, but phone calls, texts, direct messages, and referrals should be added to the same system. Do not use a public or broadly shared document for customer contact details.',
      example:
        'Website forms create rows in a private inquiry tracker. The operator manually adds phone calls and Instagram messages with the source, customer name, requested service, status, and next action.',
      completionEvidence: 'The member can open one system and see every active inquiry regardless of source.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-02',
      title: 'Decide which inquiries can move forward',
      description:
        'Write simple qualification rules based on the services currently offered, real service area, working hours, vehicle or job limitations, site-access requirements, and schedule capacity. Include a respectful path for work the business cannot accept. These are operational rules, not a reason to collect unnecessary personal details or make decisions based on protected characteristics.',
      example:
        'Current fit: passenger vehicles within the listed service area, with legal parking and customer-provided access confirmed before booking. Oversized vehicles and specialty restoration work require manual review. Adapt the rules to the actual operation.',
      completionEvidence: 'The operator has a short fit checklist and a polite decline or referral response.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-03',
      title: 'Ask only for information needed to respond and quote',
      description:
        'Create a short inquiry form with clearly labeled required and optional fields. Ask for the customer’s name, preferred response method, vehicle basics, service location or ZIP/postal area, requested service, desired timing, and condition notes needed for the quote. Avoid collecting government identifiers, payment-card data, sensitive personal information, or exact details that are not needed yet. Give format instructions and understandable validation errors.',
      example:
        'Required: name, mobile or email, vehicle year/make/model, ZIP code, requested service, and a short condition description. Optional: preferred date range and photo upload. The form does not ask for a driver’s-license number or card information.',
      completionEvidence:
        'The live form contains the minimum fields, labels required items, and can be completed with keyboard and phone input.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-04',
      title: 'Tell customers how you will use their contact information',
      description:
        'Near the form action, explain that the submitted email or phone will be used to respond about the requested quote or appointment. If the business wants separate promotional email or automated marketing texts, use a distinct, unbundled consent process reviewed for the business’s jurisdiction and communication method. Do not precheck a marketing box, hide consent in unrelated terms, or treat an inquiry as unlimited permission to advertise. Honor opt-out or stop requests and obtain qualified advice when automating promotional calls or texts.',
      example:
        'We’ll use the contact information you provide to respond about this request and any related appointment. A separate optional marketing choice is not required to request a quote.',
      completionEvidence:
        'The inquiry experience states the immediate contact purpose, and any marketing choice is separate and optional.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-05',
      title: 'Connect every inquiry channel to the workflow',
      description:
        'Review the website, Google Business Profile, email signature, social profiles, voicemail, and referral materials. Point each primary action to the current form, phone, email, or booking path. Remove outdated links and decide how each channel enters the system of record. Use a direct booking link only when the customer can actually complete the intended booking action there.',
      example:
        'The website and Google profile use the same “Request a quote” page. The voicemail asks callers to leave their name, vehicle, ZIP code, and callback number. The operator logs the voicemail as a new inquiry.',
      completionEvidence: 'Every published inquiry path is current, tested, and mapped to the system of record.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-06',
      title: 'Decide who responds and when',
      description:
        'Send new-inquiry notifications to an owner-controlled inbox or app that is actively monitored. State a response window the operator can reliably meet during published business hours. Add backup checks for failed form notifications and spam folders. Do not promise instant or 24/7 responses unless the business actually provides them.',
      example:
        'New forms alert hello@brightmobiledetailing.com. The site says, “Requests received during business hours are normally answered within one business day.” The operator checks the form dashboard every evening as a backup.',
      completionEvidence:
        'A test inquiry produces a visible notification, and the response window is published consistently.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-07',
      title: 'Confirm receipt and explain the next step',
      description:
        'Create a short acknowledgment that confirms the request was received, repeats the expected response time, identifies any missing information, and tells the customer how to add details. Keep automated acknowledgments factual and avoid implying the job is accepted, priced, or booked before review.',
      example:
        'Thanks for contacting Bright Mobile Detailing. We received your request and will review it during business hours. This is not a confirmed appointment yet. If we need photos or other details before quoting, we’ll reply here.',
      completionEvidence:
        'The acknowledgment is active or saved as a reusable template and accurately describes the workflow.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-08',
      title: 'Give every inquiry a visible status',
      description:
        'Use a small, consistent status set that shows what must happen next. Assign a next-action date when the customer or operator owes information. Avoid relying on memory or message-read indicators. Close duplicates and declined requests without deleting records that the business legitimately needs to retain under its approved retention practice.',
      example:
        'New → Awaiting customer details → Ready to quote → Quote sent → Accepted → Booked → Closed, plus Declined and No response. Each active record has a next action and date.',
      completionEvidence: 'The system of record supports the selected statuses and next-action field.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-09',
      title: 'Create one quote format for every customer',
      description:
        'Create a readable quote that identifies the business, customer, vehicle, service location, proposed services, included work, excluded or unknown work, price, applicable approved fees or taxes, assumptions, expected duration or arrival window, quote date, response or expiration date, and acceptance step. Use business-approved terms appropriate to the jurisdiction. Keep the quote accessible on a phone and retain a copy in the inquiry record.',
      example:
        'Quote Q-2026-014 · 2021 Honda CR-V · Full detail at customer location · Includes listed interior and exterior work · Pet-hair surcharge only if approved after inspection · Total/starting price: $___ · Reply ACCEPT by July 18 to request the proposed window. Replace placeholders with accurate business terms.',
      completionEvidence:
        'A complete test quote can be generated, opened on a phone, and attached to the correct inquiry.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-10',
      title: 'State what can change the quote',
      description:
        'Decide when the business uses a fixed price, starting price, range, or estimate and label it accurately. State the vehicle-condition, location, access, requested add-on, or discovery conditions that may require approval of a changed scope or price. Do not bury important limitations or use a low headline price that does not reflect the commonly required service. Never add work or charges without the customer’s informed approval.',
      example:
        'This quote assumes the vehicle condition matches the submitted description and photos. If inspection shows biohazards, severe pet hair, or another condition outside the quoted scope, we will pause and request approval before changing the service or price.',
      completionEvidence: 'The quote template contains the approved scope, assumption, and change-approval language.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-11',
      title: 'Make accepting or declining the quote clear',
      description:
        'Give the customer one clear acceptance method, such as a reply, approval button, or booking action. State how long the quote or proposed availability remains open and what happens after acceptance. Record accepted, declined, expired, and revised quotes instead of overwriting the history. Do not describe a tentative time as reserved until the business’s booking rule is satisfied.',
      example:
        'Reply ACCEPT to approve this scope and request the proposed appointment window. The time is not reserved until you receive a booking confirmation. This quote is open through July 18 unless availability changes first. Adapt after legal and operational review.',
      completionEvidence: 'The acceptance instruction and quote-status process work in a test record.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-12',
      title: 'Set bookable time, duration, and travel buffers',
      description:
        'Choose the owner-controlled calendar that governs availability. Define service durations, setup/cleanup time, travel buffers, weather or daylight limits, lead time, maximum jobs per day, and unavailable personal time. If using self-scheduling, expose only appointment options that the operator can realistically fulfill and require manual review for jobs with uncertain duration.',
      example:
        'A full detail blocks four service hours plus 45 minutes before and after for travel and setup. Same-day booking is disabled, and an oversized or heavily soiled vehicle requires a manual quote before a time is offered.',
      completionEvidence: 'The calendar prevents a test customer from booking over blocked time or inside required buffers.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-13',
      title: 'Confirm the appointment in writing',
      description:
        'Send a confirmation after the booking rule is satisfied. Include the customer, vehicle, service, service address or agreed meeting location, date and arrival window, expected duration, quote reference and price, preparation instructions, contact method, and how to request a change or cancellation. State any approved cancellation, weather, access, or no-show policy clearly before the appointment. The next guide adds deposit and payment instructions.',
      example:
        'Confirmed: Saturday, July 25, arrival between 9:00–9:30 a.m. at the address you provided. Service: Full detail for the quoted vehicle. Please remove personal items and confirm access to the vehicle. Reply here if the location or vehicle changes.',
      completionEvidence: 'A test confirmation contains accurate details and gives the customer a working change channel.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-14',
      title: 'Run one inquiry-to-booking test on a phone',
      description:
        'Use an outside email address and phone to complete the live public path. Submit an inquiry, review the acknowledgment, move the record through statuses, request missing information, create and send a quote, accept it, reserve the calendar time, and receive the confirmation. Test one validation error and one reschedule or cancellation request. Remove or label the test data when finished.',
      example:
        'A test customer submits from the Google profile’s website link, receives the acknowledgment, sends a condition photo, approves Quote Q-TEST-001, receives the booking confirmation, and then successfully requests a different time.',
      completionEvidence:
        'The end-to-end test succeeds without a missing notification, duplicate booking, broken link, unclear state, or customer-data leak.',
      priority: 'essential',
    },
    {
      id: 'inquiry-booking-15',
      title: 'Add an optional, secure photo step for uncertain jobs',
      description:
        'When condition affects scope or duration, let the customer provide a few relevant photos or a short description through an approved system. Explain what to photograph and why. Minimize collection, restrict access, set a retention practice, and avoid requesting faces, license plates, documents, home interiors, or unrelated surroundings. Do not rely on photos as a guarantee of final condition.',
      example:
        'Optional: add one dashboard/front-seat photo, one rear-seat or cargo-area photo, and one photo of the main concern. Avoid including people or documents.',
      completionEvidence:
        'The optional process is secure, limited to quoting needs, and has a deletion or retention decision.',
      priority: 'recommended',
    },
    {
      id: 'inquiry-booking-16',
      title: 'Follow up on open quotes without chasing indefinitely',
      description:
        'Create a small number of useful follow-ups for quotes that have not received a decision. Reference the original request, make it easy to decline, and stop when the customer says no or asks not to be contacted. Keep service follow-up separate from promotional marketing and review automated messaging rules before using bulk email or text tools.',
      example:
        'Two business days after the quote: “Checking whether you have any questions about Quote Q-2026-014. If you’ve decided not to move forward, reply NO and I’ll close the request — no problem.” A final closeout follows only if appropriate.',
      completionEvidence: 'The cadence, stop conditions, and template are documented.',
      priority: 'recommended',
    },
    {
      id: 'inquiry-booking-17',
      title: 'Record where inquiries come from',
      description:
        'Add a simple source field such as Google, website, referral, Instagram, repeat customer, or other. Record the final outcome without inventing attribution precision. Use this operational data later in the Analytics & 30-Day Plan guide. Do not add invasive tracking merely to complete this item.',
      example:
        'Source: Google Business Profile · Outcome: booked, or Source: customer referral · Outcome: declined — outside service area.',
      completionEvidence: 'New inquiries include a source and closed records include an outcome.',
      priority: 'recommended',
    },
    {
      id: 'inquiry-booking-18',
      title: 'Review forms, templates, and availability monthly',
      description:
        'Add a recurring check for broken public links, failed notifications, form spam, unanswered records, quote accuracy, expired templates, calendar buffers, blocked time, and outdated policies. Run a short test inquiry after any platform or form change.',
      example:
        'On the first business day of each month, the operator submits a test form, reviews all inquiries without next actions, checks the next six weeks of availability, and updates seasonal response hours.',
      completionEvidence: 'A recurring review reminder exists with the selected checks.',
      priority: 'recommended',
    },
    {
      id: 'inquiry-booking-19',
      title: 'Automate repeated steps after the manual process works',
      description:
        'After the manual workflow has produced reliable results, consider connecting the form, inquiry system, quote tool, calendar, and reminder system. Automate status updates and notifications only when failures are visible and recoverable. Keep sensitive information out of unnecessary systems, avoid duplicate customer records, and retain a manual fallback.',
      example:
        'A completed website form creates one CRM record, sends an acknowledgment, and assigns a follow-up task. It does not automatically quote an unknown vehicle condition or reserve time before review.',
      completionEvidence:
        'The member documents one low-risk automation opportunity and its failure fallback, or intentionally keeps the manual workflow.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'Choosing your tools',
      body: 'Keep this guide vendor-neutral. Product names, plans, limits, and consent features change, so compare current options directly with each provider rather than relying on a static price list. The member should compare:',
      bullets: [
        'owner-controlled account, billing, and data export;',
        'intake forms with accessible labels and validation;',
        'a clear customer record, status, and next action;',
        'reusable quote templates and revision history;',
        'calendar conflict checks, lead time, service duration, and buffers;',
        'confirmation, reminder, reschedule, and cancellation behavior;',
        'mobile use for an operator working away from a desk;',
        'permission controls and multifactor authentication;',
        'integration with the website and Google Business Profile;',
        'total recurring cost after introductory pricing;',
        'support for a manual fallback and customer-data deletion.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'The member already books entirely by text',
          body: 'Keep text as a customer-facing channel if it works, but log each inquiry, quote, status, and appointment in the system of record. Do not let the phone thread become the only copy of the accepted scope.',
        },
        {
          heading: 'The customer calls instead of completing the form',
          body: 'Use the same intake questions conversationally and create the record for the customer. Send the written quote and confirmation afterward through the agreed channel.',
        },
        {
          heading: 'The vehicle condition cannot be quoted remotely',
          body: 'Explain that an inspection, additional photos, or an on-site price confirmation is required. State what is known, what remains conditional, and when the customer can approve or decline any change.',
        },
        {
          heading: 'The customer wants an exact time but travel is variable',
          body: 'Use an honest arrival window and explain how updates are communicated. Do not promise an exact minute the operation cannot reliably meet.',
        },
        {
          heading: 'Weather may prevent mobile service',
          body: 'Create a weather decision time, customer notification method, and reschedule path. Keep the policy visible before the appointment and avoid making safety or service-quality promises the business cannot control.',
        },
        {
          heading: 'The requested location lacks legal or safe working access',
          body: 'Pause qualification and ask for an alternative lawful service location. Do not accept a booking based only on an address when parking, property permission, water, power, drainage, or site rules are unresolved.',
        },
        {
          heading: 'The customer stops responding after a quote',
          body: 'Use the documented follow-up cadence, then close the inquiry with a reason. Reopen it if the customer returns and the quote and availability are still valid.',
        },
        {
          heading: 'The customer changes the vehicle, location, or service',
          body: 'Review the quote and calendar again. Issue a clearly identified revision when scope, price, duration, or travel changes. Do not silently reuse the old confirmation.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Leaving inquiries in their original inboxes — messages in social apps, texts, email, and voicemail do not create a dependable pipeline by themselves. Log each active request in one system with a status and next action.',
    'Asking too many questions before responding — long forms reduce completion and collect information the business must then protect. Ask only what is needed for the next decision and gather unusual details during follow-up.',
    'Treating an inquiry as marketing consent — a request for a quote supports responding about that request. It should not silently enroll the person in unrelated promotional email or automated texts.',
    'Using placeholders instead of visible labels — placeholder text can disappear and is not a reliable form label. Use persistent labels, identify required fields, and provide clear error correction.',
    'Promising a response time the operator cannot maintain — an honest one-business-day response is more useful than an “instant response” claim followed by silence.',
    'Sending a price without a scope — a number alone does not show which services, vehicle, location, condition, add-ons, or assumptions it covers. Preserve the written scope with the price.',
    'Calling every price a fixed quote — if condition can change the work, label the price and assumptions accurately. Pause and obtain approval before changing scope or charges.',
    'Overwriting revised quotes — keep the original and revised versions identifiable so the accepted scope is clear. Do not make a historical quote silently change after the customer sees it.',
    'Treating a proposed time as confirmed — a suggested window, accepted quote, and confirmed booking are different states. Tell the customer when the time is actually reserved.',
    'Exposing every empty calendar slot — an open calendar does not account for travel, setup, weather, variable condition, or personal commitments. Protect capacity with realistic rules and buffers.',
    'Sending reminders with missing context — a useful reminder identifies the business, appointment, service, date or arrival window, location, and change method. Avoid mystery texts such as “Reminder: tomorrow at 9.”',
    'Collecting card data in an ordinary form — do not ask customers to type payment-card details into an inquiry form, email, text, or spreadsheet. Use the approved payment process built in Guide 5.',
    'Automating before the workflow is understood — automation can make unclear rules fail faster. Prove the statuses, quote, capacity, and booking steps manually before connecting tools.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Accessible forms',
      links: [
        { label: 'W3C Web Accessibility Initiative — Forms Tutorial', href: 'https://www.w3.org/WAI/tutorials/forms/' },
        { label: 'W3C — Labeling Controls', href: 'https://www.w3.org/WAI/tutorials/forms/labels/' },
        { label: 'W3C — Form Instructions', href: 'https://www.w3.org/WAI/tutorials/forms/instructions/' },
        { label: 'W3C — Validating Input', href: 'https://www.w3.org/WAI/tutorials/forms/validation/' },
        { label: 'W3C — User Notifications', href: 'https://www.w3.org/WAI/tutorials/forms/notifications/' },
      ],
    },
    {
      heading: 'Customer data and communications',
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
          label: 'FTC — Advertising FAQs: A Guide for Small Business',
          href: 'https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business',
        },
        {
          label: 'FTC — CAN-SPAM Act: A Compliance Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business',
        },
        {
          label: 'FCC — Stop Unwanted Robocalls and Texts',
          href: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts',
        },
      ],
    },
    {
      heading: 'Scheduling examples',
      links: [
        {
          label: 'Google Calendar — Create an appointment schedule',
          href: 'https://support.google.com/calendar/answer/10729749?hl=en',
        },
        {
          label: 'Google Business Profile — Manage local business links',
          href: 'https://support.google.com/business/answer/6218037?hl=en',
        },
        {
          label: 'Microsoft — Microsoft Bookings overview',
          href: 'https://learn.microsoft.com/en-us/microsoft-365/bookings/bookings-overview?view=o365-worldwide',
        },
        {
          label: 'Microsoft — Set scheduling policies',
          href: 'https://learn.microsoft.com/en-us/microsoft-365/bookings/set-scheduling-policies?view=o365-worldwide',
        },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, privacy, tax, contract, advertising, accessibility-compliance, or communications-consent advice. Do not present example quote or policy language as universally enforceable or sufficient in every jurisdiction. Do not promise that a quote, reminder, form notice, checkbox, or opt-out process satisfies every applicable law. Do not advise collecting payment-card information through an ordinary form, email, text, or spreadsheet. Do not treat a service inquiry as permission for unrelated promotional email, robocalls, or robotexts. Do not promise exact prices or arrival times when the operation uses approved conditions or windows. Do not suggest that an accepted quote is a confirmed booking until the stated booking rule is satisfied. Do not recommend automation that sends messages, creates quotes, or reserves time without appropriate review and failure handling. Google Calendar and Microsoft Bookings are examples, not default recommendations — follow current official vendor instructions and obtain qualified advice, because product features, state requirements, and communications rules change.',

  searchKeywords: [
    'inquiry',
    'lead',
    'intake form',
    'quote request',
    'qualification',
    'service area',
    'vehicle condition',
    'quote template',
    'estimate',
    'scope',
    'price',
    'accept quote',
    'booking',
    'appointment',
    'calendar',
    'travel buffer',
    'confirmation',
    'reminder',
    'reschedule',
    'cancellation',
    'follow-up',
    'customer consent',
    'form accessibility',
  ],

  nextGuideSlug: 'deposits-payments',
};
