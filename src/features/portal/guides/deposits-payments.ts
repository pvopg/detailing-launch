import type { GuideContent } from './types';

/**
 * Foundation Guide 5 — Deposits & Payments.
 *
 * Canonical editorial source: Foundation_Guide_05_Deposits_and_Payments.md. Checklist item ids
 * (`deposits-payments-01`..`deposits-payments-20`) are stable and must not change after release, so
 * saved progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only:
 * items 01–15 are Essential (denominator 15); 16–19 Recommended; 20 Later.
 *
 * Field mapping: the shared `GuideChecklistItem.title` renders in the checkbox-label position, so the
 * canonical "Checklist label" maps to `title` and the canonical "Instruction" maps to `description`
 * (matching the imperative register used by Guide 4). `example` and `completionEvidence` are the
 * canonical Example and Completion evidence verbatim.
 *
 * This guide teaches a member to configure their own external payment provider. It is educational
 * content, NOT the portal's Stripe purchase flow: the portal persists only checklist completion —
 * never card, bank, quote, invoice, deposit, refund, dispute, payout, or provider-credential data —
 * and guide completion never grants an entitlement.
 */
export const depositsPaymentsGuide: GuideContent = {
  slug: 'deposits-payments',
  title: 'Deposits & Payments',
  shortTitle: 'Deposits & Payments',
  outcome:
    'Add a secure, trackable deposit and payment process to accepted quotes and confirmed mobile-detailing appointments.',
  estimatedMinutes: 90,
  tint: 'amber',

  whatItDoes:
    'A payment system should answer five questions without guesswork: what the customer is paying for; how much is due now and later; which payment status changes the booking; how both sides will know the payment succeeded; and what happens if the job changes, the payment fails, or money must be returned. The safest first version uses a reputable payment provider’s hosted invoice, payment link, or in-person terminal — the provider collects the card or bank information while the detailer receives only a payment status and record. Card numbers should not pass through an ordinary inquiry form, email, text, direct message, spreadsheet, or handwritten note. This guide connects payment to the written quote and booking process from the previous guide. It does not prescribe a universal deposit amount, cancellation rule, refund policy, tax treatment, or contract term; those choices depend on the business, provider, and jurisdiction and should be reviewed appropriately.',

  terms: [
    {
      term: 'Deposit',
      definition:
        'A payment collected before service. Its purpose, amount, application to the final balance, and cancellation/refund treatment should be stated clearly using approved language.',
    },
    {
      term: 'Balance',
      definition:
        'The amount still due after deposits, approved adjustments, discounts, taxes, refunds, or other legitimate entries are applied.',
    },
    {
      term: 'Payment processor',
      definition: 'The provider that securely accepts a customer’s payment method and reports the transaction status.',
    },
    {
      term: 'Payout',
      definition:
        'The processor’s transfer of collected funds to the business bank account. A customer payment can succeed before the payout reaches the bank.',
    },
  ],

  whyItMatters: [
    {
      heading: 'Clear booking commitments',
      body: 'When a deposit is part of the booking rule, both the customer and operator should know the amount, deadline, and effect on the appointment. “Paid,” “pending,” “failed,” and “refunded” are different states and should not be treated interchangeably.',
    },
    {
      heading: 'Lower card-data risk',
      body: 'Processor-hosted payment pages and approved terminals keep card entry inside systems designed for payment security. PCI DSS responsibilities still apply to merchants that accept cards, but simpler outsourced payment environments can reduce the amount of card data the small business handles directly.',
    },
    {
      heading: 'Fewer duplicate or unexplained charges',
      body: 'Every request should reference the correct quote, customer, vehicle, service, and amount. Reusing a generic link without a record can make it harder to tell which booking a payment belongs to or whether the customer paid twice.',
    },
    {
      heading: 'Better customer communication',
      body: 'A professional request and receipt identify the business, amount, purpose, payment status, remaining balance, and contact path. Customers should not have to trust a bare link in a text with no context.',
    },
    {
      heading: 'Reliable records',
      body: 'Payment records support customer service, reconciliation, tax preparation, refunds, and dispute responses. The business should be able to connect a processor transaction to the quote and booking without storing the card details.',
    },
  ],

  diagram: [
    'Accepted quote',
    'Secure deposit or payment request',
    'Verified payment status',
    'Confirmed booking',
    'Completed service',
    'Final balance and receipt',
    'Reconciliation, refund, or dispute handling',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'The goal is not to support every payment method. The goal is a small set of secure options that the operator can explain, verify, and reconcile.',
    },
  ],

  goodEnoughToLaunch: [
    'One primary payment provider is configured in an owner-controlled business account.',
    'Multifactor authentication, recovery methods, business identity, payout account, and notification email are verified.',
    'Customers enter card or bank information only on the provider’s hosted page or approved terminal.',
    'Accepted methods, processing timing, deposit purpose, balance timing, and booking effect are documented.',
    'Cancellation, reschedule, refund, and failed-payment wording has been approved for the business and shown before payment.',
    'Each payment request references the correct customer, quote, service, and amount.',
    'The operator verifies payment from the provider’s authenticated dashboard or trusted notification — not a screenshot supplied by the customer.',
    'The booking workflow distinguishes sent, pending, paid, failed, canceled, partially refunded, and refunded states.',
    'Customers receive a receipt and can see any remaining balance.',
    'Refunds and disputes have a documented owner, evidence location, and response process.',
    'Processor transactions and payouts can be reconciled to the business records.',
    'A test payment, failed-payment path, duplicate-prevention check, refund, receipt, and payout review have been completed.',
  ],

  notRequiredYet: [
    'A custom checkout application.',
    'Storing cards for future use.',
    'Accepting every wallet, bank-transfer, or buy-now-pay-later method.',
    'Automatic tipping or financing.',
    'Advanced accounting integrations.',
    'A universal “non-refundable deposit” policy.',
    'Direct handling of card numbers.',
    'Instant availability of every payout.',
    'Custom fraud rules before the basic payment flow is understood.',
  ],

  checklist: [
    {
      id: 'deposits-payments-01',
      title: 'Decide when money is requested and what each status means',
      description:
        'Map the payment steps from accepted quote through completed service. Define whether a deposit is required, when a balance is due, who can mark a booking confirmed, and how failed, pending, refunded, or disputed payments affect the appointment. Use processor-reported status instead of assuming that a sent link or customer screenshot means payment succeeded.',
      example:
        'Quote accepted → deposit request sent → deposit paid → booking confirmed → service completed → final invoice paid → receipt sent. A payment marked pending does not confirm the appointment until the approved rule is satisfied.',
      completionEvidence: 'The member has a written payment-state map connected to the Guide 4 booking statuses.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-02',
      title: 'Choose one primary payment processor',
      description:
        'Choose a provider that supports the required online and/or in-person methods, hosted invoices or links, receipts, refunds, transaction exports, dispute notices, payout reporting, multifactor authentication, and support appropriate to the operator. Compare current fees, payout timing, holds, hardware, refund behavior, and account requirements using official information. Use a business/commercial account and transaction type where required; do not use personal “friends and family” transfers for customer services.',
      example:
        'The operator compares Stripe, Square, and PayPal business offerings using current official pages, then records the selected provider and why it fits mobile and online payments. This is an example, not a recommendation of those providers.',
      completionEvidence: 'The provider decision and owner-controlled account are documented.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-03',
      title: 'Protect the payment account and verify the bank destination',
      description:
        'Complete the provider’s identity and business verification with truthful information. Confirm the payout bank account, business name shown to customers, statement descriptor where supported, notification email, recovery methods, and tax-profile fields requested by the provider. Enable multifactor authentication and save recovery codes securely. Limit staff or contractor permissions to the access they need.',
      example:
        'The business owner is the account administrator, payouts go to the business checking account ending in the verified last four digits, MFA uses an authenticator or security key, and a helper can create invoices without changing bank details.',
      completionEvidence: 'Account security and payout destination are verified from the authenticated provider dashboard.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-04',
      title: 'Use hosted checkout or an approved terminal',
      description:
        'Use the provider’s hosted invoice, payment page, payment link, tap-to-pay feature, or approved card terminal. Do not request or store full card numbers, security codes, bank login credentials, or card photos in forms, email, text, direct messages, notes, or spreadsheets. Follow the provider and acquiring bank’s PCI instructions, complete any required validation, keep devices and apps updated, and ask the provider or a qualified assessor when the applicable requirements are unclear.',
      example:
        'The customer taps “Pay deposit” and enters payment information on the provider’s HTTPS-hosted page. The inquiry record stores only the provider transaction reference, amount, date, and status — not the card number.',
      completionEvidence:
        'Every card-entry path is provider-hosted or uses approved hardware, with no ordinary form collecting card data.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-05',
      title: 'Publish the payment methods you actually support',
      description:
        'Select a small set of payment methods the business can verify and reconcile. State when each is accepted and whether timing differs. Create a safe fallback for device, network, or provider outages that does not involve copying card details. Be cautious with checks, transfer screenshots, overpayments, unusual refund requests, or pressure to move money outside the provider.',
      example:
        'Online card deposit before booking; card or approved digital payment for the final balance; cash accepted only at service completion with a receipt. During an outage, the operator sends a fresh hosted invoice later instead of writing down a card number.',
      completionEvidence: 'Accepted methods and the outage fallback are documented and customer-facing where appropriate.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-06',
      title: 'State the deposit amount, purpose, deadline, and balance treatment',
      description:
        'Decide whether the business needs a deposit for every booking, certain services, or specific risk conditions. State the amount or calculation, why it is collected, when it is due, how it applies to the final balance, what confirms the appointment, and what happens if the amount is not received. Use approved wording and avoid calling a payment “non-refundable” without jurisdiction-appropriate review.',
      example:
        'A $___ booking deposit is due through the secure invoice by the stated deadline. The deposit is applied to the quoted service total. The appointment is confirmed only after the payment status is Paid and a confirmation is sent. Refund and reschedule treatment appears in the approved policy.',
      completionEvidence:
        'The deposit rule is written, reviewed, and consistent across quote, payment request, and confirmation.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-07',
      title: 'Finalize the money-back and schedule-change rules',
      description:
        'Create clear, jurisdiction-appropriate wording for customer cancellations, operator cancellations, weather, unsafe or inaccessible locations, rescheduling, no-shows, changed scope, overpayments, and partial or full refunds. State deadlines, how customers request a change, how refunds are returned, and any provider timing customers should expect. Show the policy before payment and retain the version associated with the transaction. Obtain qualified review where needed.',
      example:
        'The policy separately explains customer cancellation, weather rescheduling, and operator cancellation rather than using one blanket “all deposits are non-refundable” sentence.',
      completionEvidence: 'Approved policy language is visible before payment and linked to the quote or booking record.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-08',
      title: 'Build the deposit or invoice from the accepted quote',
      description:
        'Create the request from the accepted quote or booking record. Include the business identity, customer, vehicle or job reference, service, quote number, amount due now, remaining balance, due date, and support contact. Use a unique invoice or transaction reference. Do not change the quoted scope or add fees without customer approval.',
      example:
        'Invoice INV-2026-021 · Deposit for Quote Q-2026-014 · 2021 Honda CR-V full detail · Due now: $___ · Remaining quoted balance after deposit: $___ · Contact: hello@brightmobiledetailing.com.',
      completionEvidence:
        'A test request can be traced to one quote and booking without opening a separate message thread.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-09',
      title: 'Give each payment one purpose and reference',
      description:
        'Decide how the business prevents sending multiple active requests for the same amount and purpose. Cancel or clearly mark replaced invoices, identify partial payments and adjustments, and verify the amount before resending a link. If the platform supports idempotent payment creation or unique invoice states, use the existing provider behavior rather than custom duplicate-prone logic.',
      example:
        'When the service changes, the operator voids Invoice INV-2026-021 and issues INV-2026-022 with the revised quote reference. Both records remain visible, but only the replacement is payable.',
      completionEvidence:
        'The operator can identify the active request and explain how an accidental second charge is prevented or corrected.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-10',
      title: 'Tell the customer how to verify the request',
      description:
        'Send the payment request from a recognizable business address or provider channel. Include the business name, quote or invoice reference, amount, purpose, due date, and contact path. Tell customers not to send card information by reply. Avoid URL shorteners, surprise domain changes, or uncontextualized links that resemble phishing. If bank details or payment destinations change, confirm the change through a trusted channel.',
      example:
        'Bright Mobile Detailing sent Invoice INV-2026-021 for the deposit on Quote Q-2026-014. Amount due: $___. Pay only through the secure provider link below. Do not email or text card information. Questions? Reply to this business email or call the published number.',
      completionEvidence: 'The payment message is recognizable, contextual, and matches the provider-hosted request.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-11',
      title: 'Update the booking only from a verified payment status',
      description:
        'Check payment status in the authenticated provider dashboard or verified server-side integration. Define which status — such as Paid or Succeeded — allows the booking to move forward. Treat pending, processing, failed, canceled, refunded, and disputed states according to the written workflow. Do not trust screenshots, forwarded emails, or a customer’s bank display as the source of truth.',
      example:
        'The booking changes from “Deposit requested” to “Confirmed” only after the provider shows the correct invoice as paid. A pending bank payment remains pending until the provider confirms success.',
      completionEvidence: 'A test status change updates the booking correctly and a failed payment does not confirm it.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-12',
      title: 'Request the remaining balance and document payment',
      description:
        'At the approved point in the service workflow, request the final balance using the same secure provider or approved terminal. Apply the deposit and approved adjustments accurately. Review the total with the customer before charging. Send a receipt showing the business, transaction date, services, deposit, adjustments, final payment, total paid, remaining balance, payment method descriptor where appropriate, and refund contact path.',
      example:
        'The final invoice shows $___ service total − $___ deposit + $___ customer-approved add-on = $___ final balance, then the provider receipt shows a zero balance after successful payment.',
      completionEvidence:
        'A test final payment produces an accurate receipt and the inquiry/booking record shows the correct paid balance.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-13',
      title: 'Create a response process for payment problems',
      description:
        'Document who reviews failed payments, duplicate charges, refund requests, unauthorized-payment reports, processor disputes, and payout holds. Use the provider’s official refund and dispute tools, return refunds through the original transaction when supported, record the amount and reason, and respond within provider deadlines. Preserve truthful evidence such as the quote, accepted scope, policy version, payment record, confirmation, customer messages, and proof of completed work. Never fabricate evidence or promise a dispute outcome.',
      example:
        'A duplicate payment is verified in the dashboard, one transaction is refunded through the provider, the customer receives the refund receipt, and the record notes the original transaction, refund amount, date, and reason.',
      completionEvidence: 'The owner can locate the provider’s refund/dispute area and the business response checklist.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-14',
      title: 'Match transactions, fees, refunds, and payouts to business records',
      description:
        'Choose a regular reconciliation routine. Match each provider transaction to an invoice or service record, then match gross payments, processing fees, refunds, disputes, and net payouts to the bank and bookkeeping records. Investigate missing or duplicate entries instead of changing totals to force a match. Follow the recordkeeping and retention advice of the business’s tax and accounting professionals.',
      example:
        'Each Friday, the operator exports the provider activity, matches Invoice INV-2026-021 to its deposit and final payment, records the processing fees separately, and confirms the net payout against the business bank activity.',
      completionEvidence: 'One test period reconciles from customer payment through processor activity to bank payout.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-15',
      title: 'Run payment, failure, receipt, refund, and payout tests',
      description:
        'Use the provider’s test mode when available, then conduct a controlled real low-value test if appropriate and permitted. Test the deposit request, successful payment, failed or canceled payment, duplicate-prevention behavior, booking update, final balance, receipt, partial or full refund, customer notification, transaction export, and payout reconciliation. Remove test customer data where appropriate and do not confuse test funds with revenue.',
      example:
        'Q-TEST-001 receives one deposit request, a failed attempt remains unconfirmed, a successful attempt confirms the booking, the receipt shows the balance, a partial refund is issued, and the resulting payout/fee entries reconcile.',
      completionEvidence: 'The full lifecycle passes without card data entering the portal, messages, or tracker.',
      priority: 'essential',
    },
    {
      id: 'deposits-payments-16',
      title: 'Remind customers before a request expires',
      description:
        'Create a small number of factual reminders that identify the business, invoice, amount, purpose, due date, and support contact. Stop reminders after payment, cancellation, replacement, refund, or customer dispute. Keep service-payment reminders separate from promotional marketing and follow applicable communication requirements.',
      example:
        'Reminder from Bright Mobile Detailing: Invoice INV-2026-021 for the booking deposit remains open through July 18. If your plans changed or you have a question, reply here rather than paying the link.',
      completionEvidence: 'Reminder timing, stop conditions, and template are documented or configured.',
      priority: 'recommended',
    },
    {
      id: 'deposits-payments-17',
      title: 'Decide whether and when tips are offered',
      description:
        'Decide whether the payment experience will offer an optional gratuity. If used, present it after service or at an appropriate point, make the optional nature clear, allow a custom or zero amount, and avoid default choices that pressure the customer. Confirm how the provider reports gratuities for bookkeeping and tax handling.',
      example:
        'The final in-person payment screen includes “No tip,” percentage options, and “Custom”; the deposit page does not ask for a tip before service.',
      completionEvidence: 'The gratuity setting and recordkeeping treatment are intentional and reviewed.',
      priority: 'recommended',
    },
    {
      id: 'deposits-payments-18',
      title: 'Keep payment evidence organized by transaction',
      description:
        'For each paid job, retain the non-card evidence reasonably needed under the business’s approved retention policy: quote version, acceptance, policy shown, invoice, payment status, confirmation, approved changes, completion note, receipt, and relevant customer communication. Restrict access and delete information when no longer needed. Evidence supports a response but never guarantees a dispute decision.',
      example:
        'A secure folder or CRM record for INV-2026-021 links the accepted quote, appointment confirmation, approved add-on, completed-service note, receipt, and customer acknowledgment without storing card data.',
      completionEvidence: 'A test transaction has a complete, access-controlled evidence record.',
      priority: 'recommended',
    },
    {
      id: 'deposits-payments-19',
      title: 'Review the payment account every month',
      description:
        'Check administrator access, MFA/recovery methods, bank destination, statement descriptor, open invoices, failed payments, refunds, disputes, payout holds, device inventory, app updates, processing fees, and policy links. Review provider announcements before enabling new payment methods or financing features.',
      example:
        'On the first business day of each month, the owner removes an old collaborator, verifies the bank account ending, reviews open disputes and failed invoices, and confirms the refund-policy link still loads.',
      completionEvidence: 'A recurring account-review reminder exists with the selected checks.',
      priority: 'recommended',
    },
    {
      id: 'deposits-payments-20',
      title: 'Automate payment updates and bookkeeping carefully',
      description:
        'After the payment lifecycle works reliably, consider connecting quote acceptance, invoices, payment status, booking confirmation, receipts, and bookkeeping. Use the provider’s supported integration and server-verified events. Make updates idempotent, log failures, protect secrets, and retain a manual reconciliation path. Never trust a browser-supplied payment or entitlement status.',
      example:
        'A verified provider event marks the matching invoice paid exactly once and releases the booking confirmation. A retry does not create a second record, and a failed integration creates an owner alert for manual review.',
      completionEvidence:
        'The member documents one integration opportunity, its security boundary, duplicate-prevention rule, and manual fallback — or intentionally keeps the tested manual process.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'Provider-selection guidance',
      body: 'Keep this decision vendor-neutral. Do not rely on a static provider fee table — fees, plans, payment methods, refund treatment, and payout terms change. The member should compare:',
      bullets: [
        'business-account eligibility and verification requirements;',
        'hosted invoices, payment links, terminals, and mobile acceptance;',
        'supported customer methods and payment-status timing;',
        'current processing, hardware, refund, dispute, and payout fees;',
        'payout timing, reserves, holds, and bank-account controls;',
        'receipts, partial payments, deposits, tips, refunds, and dispute tools;',
        'transaction references, exports, reports, and bookkeeping connections;',
        'multifactor authentication, permissions, alerts, and device management;',
        'customer support and account-recovery options;',
        'PCI guidance for the exact payment environment;',
        'data export and migration options.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'The member accepts only cash today',
          body: 'Keep a written receipt and record every cash payment. Add secure electronic payment only when the operator can verify, receipt, and reconcile it. Do not leave cash transactions outside the income records.',
        },
        {
          heading: 'A customer wants to pay before the quote is complete',
          body: 'Do not accept an unexplained amount. Finish the scope or create a clearly described approved payment request that states what the money is for and what remains unresolved.',
        },
        {
          heading: 'The customer says payment succeeded but the provider shows pending or failed',
          body: 'Use the provider status as the operational source of truth. Explain the status calmly, avoid asking for card information, and follow the provider’s troubleshooting path.',
        },
        {
          heading: 'A bank transfer or check is pending',
          body: 'Processing and return timing can differ from cards. Do not treat the payment as final before the provider or bank status meets the business’s documented rule.',
        },
        {
          heading: 'The customer accidentally pays twice',
          body: 'Verify both transactions, stop any remaining active request, refund the correct duplicate through the official provider process, send the refund receipt, and document the reason.',
        },
        {
          heading: 'The customer asks for an overpayment refund to another destination',
          body: 'Pause. Do not send money to a different person, account, card, wallet, or gift card. Review the transaction for fraud and use the provider’s official refund process.',
        },
        {
          heading: 'Weather or site conditions force a reschedule',
          body: 'Apply the approved policy consistently and document the customer communication. Do not invent a new deposit rule after payment.',
        },
        {
          heading: 'The service scope changes on arrival',
          body: 'Explain the change, issue a revised quote or invoice, and obtain approval before charging more or substituting work. Preserve both versions.',
        },
        {
          heading: 'The processor holds a payout',
          body: 'A hold does not necessarily mean the customer payment failed. Review the provider notice, account-verification requests, reserve rules, and support path. Do not promise the customer a refund or second charge until the transaction status is understood.',
        },
        {
          heading: 'A dispute or chargeback arrives',
          body: 'Open the provider case promptly, note the deadline, preserve truthful evidence, respond through the official tool, and keep customer communication professional. The issuer or provider process determines the outcome.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Collecting card information in an ordinary form or message — card numbers and security codes should stay inside the payment provider’s approved environment. Do not ask customers to send them by text, email, direct message, or photo.',
    'Using a personal-transfer payment type for business services — consumer or “friends and family” transfers may lack business transaction records or violate provider terms. Use the provider’s appropriate business payment flow.',
    'Sending a bare payment link — a customer should see the business, invoice reference, amount, purpose, due date, and support contact before deciding whether a link is legitimate.',
    'Assuming a screenshot proves payment — screenshots and forwarded emails can be incomplete or altered. Verify the transaction in the authenticated provider dashboard or trusted integration.',
    'Treating pending funds as settled — some methods process slowly or can be returned. Follow the provider-reported status and the business’s approved booking rule.',
    'Reusing one generic link without a transaction record — generic links can make attribution, balance calculation, duplicate detection, and refunds harder. Create a traceable request or capture a reliable reference for every payment.',
    'Calling every deposit non-refundable — the word “non-refundable” is not a universal solution. Cancellation, operator failure, weather, rescheduling, changed scope, and local law can affect the outcome. Use approved, specific wording.',
    'Hiding fees or balance conditions — customers should understand the amount due now, remaining balance, approved fees, and conditions before payment. Do not surprise them after the work begins.',
    'Marking the booking confirmed when the link is sent — a request sent is not a payment made. Use the verified payment state required by the written booking rule.',
    'Charging a changed amount without approval — if vehicle condition or requested work changes the price, pause and obtain informed approval. Preserve the revised quote or invoice history.',
    'Refunding outside the original transaction without checking — unusual requests to refund a different person, card, bank account, gift card, or excess amount can signal fraud. Use the provider’s official process and investigate before moving money.',
    'Ignoring processor fees and payout timing — the customer’s gross payment, provider fee, refund cost, reserve, and net bank payout may differ. Reconcile each component instead of treating the bank deposit as gross revenue.',
    'Deleting records when a dispute arrives — preserve truthful, relevant records and follow provider deadlines. Never alter or fabricate evidence.',
    'Automating from browser-reported status — the customer’s browser or return page is not the payment source of truth. Production integrations should rely on authenticated provider data and safe retry behavior.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Payment security',
      links: [
        {
          label: 'PCI Security Standards Council — Merchant Resources',
          href: 'https://www.pcisecuritystandards.org/merchants/',
        },
        {
          label: 'PCI SSC — Guide to Safe Payments for Small Merchants',
          href: 'https://www.pcisecuritystandards.org/pdfs/Small_Merchant_Guide_to_Safe_Payments.pdf',
        },
        {
          label: 'FTC — Protecting Personal Information: A Guide for Business',
          href: 'https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business',
        },
        {
          label: 'CISA — Require Multifactor Authentication',
          href: 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication',
        },
      ],
    },
    {
      heading: 'Stripe examples',
      links: [
        { label: 'Stripe — Payment Links', href: 'https://docs.stripe.com/payment-links' },
        { label: 'Stripe — Receipts', href: 'https://docs.stripe.com/receipts' },
        { label: 'Stripe — Refund and cancel payments', href: 'https://docs.stripe.com/refunds' },
        { label: 'Stripe — Disputes', href: 'https://docs.stripe.com/disputes' },
      ],
    },
    {
      heading: 'Square examples',
      links: [
        {
          label: 'Square — Accept payment for an invoice',
          href: 'https://squareup.com/help/us/en/article/8508-accept-payment-for-an-invoice',
        },
        {
          label: 'Square — Manage customer refunds',
          href: 'https://squareup.com/help/us/en/article/6116-process-refunds',
        },
        {
          label: 'Square — Manage payment disputes',
          href: 'https://squareup.com/help/us/en/article/3882-payment-disputes-walkthrough',
        },
      ],
    },
    {
      heading: 'PayPal examples',
      links: [
        { label: 'PayPal — Business invoicing', href: 'https://www.paypal.com/us/business/accept-payments/invoice' },
        {
          label: 'PayPal — Resolution Center',
          href: 'https://www.paypal.com/us/cshelp/article/what-is-the-resolution-center-help246',
        },
      ],
    },
    {
      heading: 'Business records',
      links: [
        {
          label: 'IRS — Recordkeeping',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping',
        },
        {
          label: 'IRS — What kind of records should I keep?',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep',
        },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, tax, accounting, banking, PCI-compliance, contract, refund, or chargeback advice. It does not publish a universal deposit amount, “non-refundable” clause, cancellation deadline, tax rate, or record-retention period; keep that language configurable and subject to appropriate review. Never instruct customers or members to send card numbers, security codes, bank credentials, or card photos through a portal, form, email, text, direct message, note, or spreadsheet. Do not present a customer screenshot or browser return page as verified payment status, describe a pending payment as settled or a sent request as paid, refund an overpayment to a different destination, or use personal-transfer methods for commercial service payments. Do not promise that evidence will win a dispute or that a refund will arrive by a universal deadline. Stripe, Square, and PayPal are examples, not universal recommendations — follow current official provider instructions and qualified review because fees, features, tax rules, payment laws, PCI obligations, and refund rights change.',

  searchKeywords: [
    'deposit',
    'booking deposit',
    'payment',
    'payment processor',
    'invoice',
    'payment link',
    'card terminal',
    'PCI',
    'card data',
    'payment status',
    'payout',
    'receipt',
    'final balance',
    'refund',
    'partial refund',
    'chargeback',
    'dispute',
    'duplicate charge',
    'reconciliation',
    'processing fee',
    'payment reminder',
    'gratuity',
    'tip',
    'Stripe',
    'Square',
    'PayPal',
  ],

  nextGuideSlug: 'customer-tracking-follow-up',
};
