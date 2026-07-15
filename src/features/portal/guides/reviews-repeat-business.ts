import type { GuideContent } from './types';

/**
 * Foundation Guide 7 — Reviews & Repeat Business.
 *
 * Canonical editorial source: Foundation_Guide_07_Reviews_and_Repeat_Business.md. Checklist item ids
 * (`reviews-repeat-01`..`reviews-repeat-20`) are stable and must not change after release, so saved
 * progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only: items
 * 01–15 are Essential (denominator 15); 16–19 Recommended; 20 Later.
 *
 * Field mapping mirrors Guide 6: the shared `GuideChecklistItem.title` renders in the checkbox-label
 * position, so the canonical "Checklist label" maps to `title` and the canonical "Instruction" maps to
 * `description`. `example` and `completionEvidence` are the canonical Example and Completion evidence
 * verbatim.
 *
 * This guide teaches a member to configure their OWN external review, service-recovery, testimonial,
 * repeat-business, and referral workflows. It is educational content, NOT a reputation, review, or
 * loyalty feature inside the portal: the portal persists only checklist completion — never reviews,
 * ratings, reviewer identities, customer records, service issues, testimonials, permissions, offers,
 * referrals, replies, or suppression records — and it never collects, scrapes, sends, or searches any
 * review/customer operational data.
 */
export const reviewsRepeatBusinessGuide: GuideContent = {
  slug: 'reviews-repeat-business',
  title: 'Reviews & Repeat Business',
  shortTitle: 'Reviews & Repeat Business',
  outcome:
    'Request honest reviews consistently, respond professionally, and create respectful reasons for satisfied customers to return—without review gating or incentives.',
  estimatedMinutes: 90,
  tint: 'green',

  whatItDoes:
    'Reviews help future customers understand what real customers experienced. Repeat business helps a detailer serve customers who already know the work. Both systems depend on the same foundation: accurate completed-service records, respectful communication, and honest customer choice. The safest review process does not ask only the customers expected to be positive, does not offer a discount or prize for a Google review, and does not tell customers what rating or words to use. It uses a consistent event—such as a completed service and closed support issue—to send the same neutral request to eligible customers. The safest repeat-business process is separate from the review request: a customer should not have to post, revise, or remove a review to receive a normal service reminder, loyalty benefit, referral reward, or future offer. This guide builds both workflows and keeps the boundaries visible.',

  terms: [
    {
      term: 'Review request',
      definition: 'A neutral invitation for a real customer to share an honest experience on a chosen platform.',
    },
    {
      term: 'Review gating',
      definition:
        'Selecting or steering only customers expected to leave favorable reviews while diverting or suppressing likely critical feedback.',
    },
    {
      term: 'Testimonial',
      definition:
        'A customer statement the business republishes in its own marketing. Permission, accuracy, context, and material-connection disclosures may be required.',
    },
    {
      term: 'Repeat-business offer',
      definition:
        'A future service reminder, loyalty benefit, or promotion that is independent of whether the customer posts or changes a review.',
    },
  ],

  whyItMatters: [
    {
      heading: 'Trust that can survive scrutiny',
      body: 'Real reviews are useful because the business does not control the customer’s opinion. Fake, purchased, employee, family, or incentive-driven reviews can mislead customers and violate platform rules or law.',
    },
    {
      heading: 'Consistent requests',
      body: 'A repeatable rule reduces awkward improvisation and review gating. Every eligible completed-service customer receives the same neutral opportunity, subject to communication preferences and a genuine service-recovery pause.',
    },
    {
      heading: 'Better service recovery',
      body: 'Critical feedback can reveal a missed expectation, unclear scope, or operational problem. A professional response protects privacy, acknowledges the concern, and moves the detailed conversation to a private support channel.',
    },
    {
      heading: 'More efficient repeat business',
      body: 'Returning customers already understand the service and may need less education. Timely reminders based on actual service history can be more useful than constant broad promotions.',
    },
    {
      heading: 'Cleaner marketing evidence',
      body: 'When the business republishes a review or testimonial, it should preserve the customer’s meaning, obtain appropriate permission, disclose material connections, and avoid implying results that are not typical or supported.',
    },
  ],

  diagram: [
    'Completed service',
    'Outcome check and issue resolution',
    'Neutral review request',
    'Honest public feedback and professional response',
    'Permission-aware future-service reminder or offer',
    'Repeat booking',
  ],

  callouts: [
    {
      tone: 'note',
      body: 'The goal is not a perfect rating. The goal is a credible record of real customer experiences and a respectful way for customers to return.',
    },
  ],

  goodEnoughToLaunch: [
    'The owner controls the chosen review profile and can generate its official review link or QR code.',
    'A consistent eligibility rule covers genuine completed-service customers without selecting only likely positive reviewers.',
    'Open service issues pause the automated request for customer support, then return to the neutral rule after resolution or closure regardless of predicted sentiment.',
    'The request asks for an honest review and does not suggest a rating, wording, or positive outcome.',
    'No payment, discount, free service, contest entry, or other benefit is offered for a Google review.',
    'The business does not buy, fabricate, generate, exchange, or arrange reviews from people without genuine experience.',
    'Requests follow the customer’s channel preference and applicable communication rules.',
    'Stop, unsubscribe, wrong-number, and do-not-contact statuses are honored.',
    'New reviews are monitored and public responses protect customer privacy.',
    'Negative reviews are reported only when they appear to violate platform policy, not simply because they are unfavorable.',
    'Any review or testimonial reused in marketing is accurate, permissioned where appropriate, and not edited to change its meaning.',
    'Repeat-business reminders or offers are separate from review activity and use appropriate permission.',
    'The complete request, response, repeat-offer, suppression, and tracking flow has been tested.',
  ],

  notRequiredYet: [
    'A five-star average.',
    'A target number of reviews per employee.',
    'Incentives for reviews.',
    'A review kiosk that pressures customers on site.',
    'Replies containing private job details.',
    'Automatic responses written without human review.',
    'A complex loyalty-points program.',
    'Purchased contact lists.',
    'Frequent promotions to every past customer.',
    'Republishing every review on the website.',
    'Removing every critical review.',
  ],

  checklist: [
    {
      id: 'reviews-repeat-01',
      title: 'Write down what each workflow is meant to do',
      description:
        'Define the review workflow as a way to invite honest feedback from real completed-service customers. Define the repeat-business workflow as a way to offer a relevant future service or reminder using approved customer communication. Keep the two outcomes, eligibility rules, messages, and tracking fields separate so a benefit is never conditioned on review activity.',
      example:
        'Review goal: give every eligible completed-service customer one neutral Google review invitation. Repeat goal: remind customers about relevant future services when the customer’s history and communication permission support it.',
      completionEvidence: 'The two goals and their separation are documented.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-02',
      title: 'Make sure you can manage the review profile',
      description:
        'Confirm the owner can access the verified Google Business Profile and any other approved review destination. Enable or route review notifications to an owner-controlled inbox or app that is checked consistently. Remove former agencies or helpers who no longer need access and use individual roles rather than shared passwords.',
      example:
        'The owner receives Google Business Profile review alerts at the business email and a current manager can reply, but the former marketing contractor no longer has access.',
      completionEvidence: 'The owner can open, read, reply to, and manage notifications for the selected profile.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-03',
      title: 'Use the platform’s official review link or QR code',
      description:
        'Generate the review link or QR code from the business’s own profile using the platform’s current official process. Do not use another business’s place ID, a link that preselects a rating, a misleading redirect, or a third-party page that screens sentiment before sending customers to Google. Test the link while signed out and on a phone.',
      example:
        'The operator copies the Google Business Profile review link, opens it in a private mobile browser, and confirms that it shows the correct business and a neutral review interface.',
      completionEvidence: 'The direct link and optional QR code open the correct public review destination.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-04',
      title: 'Ask all eligible completed-service customers consistently',
      description:
        'Base eligibility on objective operational facts such as a real service being completed and the customer record being contactable. Do not ask only customers who gave high private feedback, tipped, spent above a threshold, or are expected to be positive. Exclude test records, duplicates, fraudulent activity, wrong numbers, and channels that are suppressed. Handle an open service issue under the next item rather than treating likely criticism as permanent ineligibility.',
      example:
        'Eligible: genuine completed service, customer record matched, no duplicate request for this job, contact channel allowed, no open support issue. Sentiment, tip amount, and private satisfaction score are not eligibility fields.',
      completionEvidence: 'The rule can be applied without predicting or filtering the customer’s opinion.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-05',
      title: 'Pause for service recovery, then return to the same rule',
      description:
        'When a customer has an unresolved service concern, prioritize the support response and pause automated promotional or review requests while the issue is open. Record the owner, promised response, resolution, and closure. After closure, apply the same neutral review-request rule used for other eligible customers; do not permanently suppress the invitation because the customer remained unhappy or might post criticism.',
      example:
        'A missed interior spot opens a service issue. The review automation pauses while the operator addresses it. After the issue is closed, the customer remains eligible for the same neutral request unless the communication channel is suppressed or the customer asked not to be contacted.',
      completionEvidence:
        'The issue workflow pauses the request for support reasons and does not use private satisfaction as a review gate.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-06',
      title: 'Ask for an honest review without steering the rating',
      description:
        'Identify the business and completed service, explain that honest feedback helps future customers, provide the official link, and make participation optional. Do not ask for five stars, “positive” feedback, specific keywords, mention of an employee, or removal/revision of criticism. Do not imply that the customer will receive better service, a discount, or another benefit for posting.',
      example:
        'Hi Jordan—thank you for choosing Bright Mobile Detailing for your CR-V. If you’re willing, you can share an honest review of your experience here: [official link]. Reviews are optional, and we appreciate your time either way.',
      completionEvidence: 'The approved template is neutral, recognizable, and links directly to the correct profile.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-07',
      title: 'Send one timely request through an allowed channel',
      description:
        'Choose a reasonable request time after the service outcome is known and any immediate operational check-in is complete. Use the customer’s approved service or marketing channel as appropriate, follow applicable rules, and avoid repeated pressure. Define whether one reminder is permitted and when the request closes. Stop after a review is detected only if the match is reliable; otherwise avoid asking the customer to prove they reviewed.',
      example:
        'One neutral request is sent the next business day after a completed service and closed check-in. One reminder may be sent several days later only if the channel and policy permit. No further review messages are scheduled for that service.',
      completionEvidence: 'Timing, channel, maximum frequency, and stop conditions are documented.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-08',
      title: 'Adopt a written review-integrity rule',
      description:
        'Prohibit buying or selling reviews, AI-generated customer reviews, reviews from people without genuine experience, coordinated review exchanges, duplicate accounts, employee or family reviews that conceal a material connection, review gating, pressure for specific sentiment, and incentives for Google reviews. Do not pay customers to post, revise, or remove a Google review. Review other platforms’ current rules before considering any incentive, and obtain qualified guidance about disclosures and legality.',
      example:
        'A future-service discount may be offered to an eligible customer independently of review activity. It is not unlocked by posting, showing, changing, or deleting a review.',
      completionEvidence: 'The integrity rule is documented and reflected in templates, automations, and staff/helper instructions.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-09',
      title: 'Record request status and stop conditions',
      description:
        'In the customer system, record the service reference, eligibility date, request date/channel, reminder status, delivery result, stop or suppression status, and public review link when a reliable match exists. Do not create a hidden “likely five-star” score, require screenshots, or store speculative notes about how the customer might rate the business.',
      example:
        'Service S-2026-018 · Eligible Jul 14 · Review request sent by email Jul 14 · Reminder not sent · Public review match: unknown · Request closed Jul 21.',
      completionEvidence: 'The workflow can show who was asked and why without sentiment profiling.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-10',
      title: 'Check and route new reviews consistently',
      description:
        'Route review alerts to the owner or named responder. Record whether a public reply, private follow-up, policy report, or no action is appropriate. Set a realistic response target and prioritize serious safety, privacy, fraud, or service concerns. Do not share login credentials with a responder or let an automation publish without review during launch.',
      example:
        'The owner checks review alerts each business day. A normal review receives a public reply task; a review describing an unresolved service issue creates a private service-recovery task before the public reply is finalized.',
      completionEvidence: 'New test alerts reach the correct owner and create a visible response decision.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-11',
      title: 'Create response templates for praise and criticism',
      description:
        'Keep replies concise, professional, and specific enough to be human without confirming private details. Thank positive reviewers without making unsupported claims. For criticism, acknowledge the concern, avoid arguing, do not reveal the customer’s vehicle, address, payment, messages, or service history, and invite the reviewer to an owner-controlled private channel. Do not pressure the reviewer to change or remove the review.',
      example:
        'Thank you for the feedback. I’m sorry the service did not meet the agreed expectation. Please contact Phong at the business email or published number so I can review the appointment privately.',
      completionEvidence:
        'Approved positive and critical-response templates protect privacy and allow a human resolution path.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-12',
      title: 'Use the platform’s reporting process appropriately',
      description:
        'Compare a concerning review with the platform’s current content policy. Report reviews that appear to involve spam, impersonation, conflicts of interest, prohibited personal information, threats, or other policy violations through the official tool. Do not report a review merely because it is negative, mistaken about a disputed fact, or uncomfortable. Preserve the review and response record while the platform decides; removal is not guaranteed.',
      example:
        'A one-star review from a real customer describing a poor experience receives a professional response, not a policy report. A review that publishes private personal information is documented and reported under the relevant policy category.',
      completionEvidence:
        'The owner can find the official report tool and the decision checklist distinguishes policy violations from criticism.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-13',
      title: 'Get permission before featuring customer words or images',
      description:
        'Before placing a review, quote, name, vehicle image, or customer photo in the website, ads, social content, or sales materials, confirm the business has appropriate permission and preserve the customer’s meaning. Do not edit away important qualifications, invent a customer identity, or imply that a result is typical when it is not supported. Clearly disclose unexpected material connections such as payment, a gift, free service, employment, family relationship, or referral compensation.',
      example:
        'The customer approves using a short exact excerpt and first name/last initial with a permitted vehicle photo. The business records the source review, approved assets, allowed channels, date, and any required disclosure.',
      completionEvidence:
        'The testimonial-use record identifies the source, permission, exact approved version, context, and material connection if any.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-14',
      title: 'Give past customers a relevant reason to return',
      description:
        'Create one simple future-service reminder or offer based on real service history, season, vehicle need, or customer request. State the service, eligibility, price or discount terms, expiration, limits, and booking action clearly. Use an approved communication channel and honor opt-outs. The customer receives the offer regardless of whether they posted, changed, or removed a review.',
      example:
        'Past interior-detail customers who requested email offers may receive one seasonal interior-refresh offer with the real price, service scope, expiration date, and booking link. Review activity is not an eligibility field.',
      completionEvidence: 'The offer, audience rule, channel, terms, and review-independent eligibility are documented.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-15',
      title: 'Run a review-request and repeat-booking test',
      description:
        'Use a test customer to validate eligibility, open-issue pause, neutral request, official link, one reminder rule, suppression, alert routing, positive and critical response drafts, policy-report decision, testimonial permission record, repeat offer, and rebooking path. Confirm that a low private satisfaction value does not permanently remove the test customer from neutral eligibility and that review activity does not control the repeat offer. Remove or label test data afterward.',
      example:
        'C-TEST-REV-001 completes service, opens and closes an issue, receives the neutral link, opts out of marketing, triggers a review alert, receives a privacy-safe response, and remains excluded from the repeat offer because of the marketing opt-out—not because of review sentiment.',
      completionEvidence:
        'The test passes without gating, incentive, privacy exposure, duplicate pressure, or unauthorized marketing.',
      priority: 'essential',
    },
    {
      id: 'reviews-repeat-16',
      title: 'Resolve concerns before discussing reputation',
      description:
        'Define how the operator acknowledges concerns, gathers facts, compares the agreed scope, offers an appropriate operational remedy when warranted, documents the outcome, and closes the issue. Focus on solving the service problem, not buying silence or asking for review removal. If the customer independently changes a review later, do not claim or imply that a remedy was conditioned on it.',
      example:
        'Acknowledge within the promised window → review quote/photos/messages → propose reinspection or approved remedy → document acceptance → complete remedy → close issue → return to neutral review eligibility.',
      completionEvidence: 'The playbook has an owner, response target, decision path, and closure definition.',
      priority: 'recommended',
    },
    {
      id: 'reviews-repeat-17',
      title: 'Reward genuine referrals without buying reviews',
      description:
        'If the business uses a referral benefit, define who qualifies, what action earns it, limits, expiration, fraud handling, and disclosure. Tie the benefit to a verified referral and completed qualifying action—not a rating, review, testimonial, social post, or review revision. Ensure referral messages and rewards follow applicable advertising, tax, and communication requirements.',
      example:
        'A customer receives a stated service credit after a referred new customer completes a qualifying paid service. No review is requested or required as part of the referral reward.',
      completionEvidence: 'Referral eligibility and review-independent terms are documented.',
      priority: 'recommended',
    },
    {
      id: 'reviews-repeat-18',
      title: 'Measure requests, reviews, responses, and returns',
      description:
        'Track completed eligible services, neutral requests sent, delivery failures, public reviews found, response time, open service issues, repeat offers sent, opt-outs, and repeat bookings. Treat platform counts and customer matches as imperfect. Do not set employee quotas that encourage pressure or fake activity, and do not optimize only for average star rating.',
      example:
        'Monthly view: eligible completed services 18 · requests sent 15 · delivery failures 1 · public reviews found 6 · median response time 1 business day · repeat bookings 4 · marketing opt-outs 1.',
      completionEvidence: 'The metric definitions and data sources are documented without a “positive-only” success measure.',
      priority: 'recommended',
    },
    {
      id: 'reviews-repeat-19',
      title: 'Check links, templates, policies, permissions, and replies',
      description:
        'Review the official link, request audience, gating controls, incentive prohibition, open issues, unpublished replies, reported reviews, testimonial permissions, material-connection disclosures, repeat-offer terms, channel permissions, suppressions, and automation failures. Sample the full audience rule to confirm critical or low-scoring customers were not excluded based on sentiment.',
      example:
        'The owner compares all completed services with requests sent, documents legitimate exclusions, finds no sentiment-based filter, confirms the review QR code, and removes an expired repeat offer.',
      completionEvidence: 'A recurring audit reminder exists and the first audit is recorded.',
      priority: 'recommended',
    },
    {
      id: 'reviews-repeat-20',
      title: 'Automate only after gating and suppression tests pass',
      description:
        'After the manual workflow works, consider automating eligibility, request timing, reminders, alert routing, and repeat offers. Use objective service events, open-issue pauses, channel permissions, suppression checks, frequency limits, failure alerts, and human approval for public replies or policy reports. Do not use sentiment analysis, tips, spend, survey scores, or AI predictions to decide who may post a public review.',
      example:
        'A completed service schedules one neutral request after the check-in. An open issue pauses it. Closure resumes the same rule. The automation never reads a private satisfaction score and never publishes an AI-written public reply without review.',
      completionEvidence:
        'The automation design documents eligibility, pause/resume behavior, suppressions, review-independent repeat offers, alerts, and manual override—or the member keeps the tested manual process.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'System-selection guidance',
      body: 'Keep this guide vendor-neutral. Do not maintain a static reputation-management or loyalty-tool comparison inside this guide — features, prices, review-platform integrations, and compliance controls change. The member should compare:',
      bullets: [
        'official review-link and QR-code generation;',
        'owner-controlled profile roles and review notifications;',
        'neutral audience rules that do not depend on sentiment;',
        'open-issue pause and review-request resume behavior;',
        'channel permissions, suppression, frequency limits, and delivery logs;',
        'public response workflow and human approval;',
        'testimonial source, permission, and disclosure records;',
        'repeat-offer audience, terms, expiration, and booking links;',
        'referral tracking that remains independent of reviews;',
        'export, audit logs, failure alerts, and data retention;',
        'total cost and limits after introductory pricing.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'The customer gave positive private feedback',
          body: 'Use the same neutral request used for all eligible completed-service customers. Do not rewrite it as “Since you loved the service, please leave five stars” or use the positive response as the gate to reveal the link.',
        },
        {
          heading: 'The customer gave negative private feedback',
          body: 'Open a service-recovery issue and pause automated requests while it is unresolved. After closure, return to the neutral eligibility rule unless the customer’s channel is suppressed or the customer asked not to be contacted.',
        },
        {
          heading: 'The customer posts a critical but genuine review',
          body: 'Respond briefly and professionally, protect privacy, create a private resolution task, and avoid pressuring the customer to revise or remove the review. Do not report it solely because it is unfavorable.',
        },
        {
          heading: 'The review appears to be from a non-customer',
          body: 'Check the platform policy and internal records without publicly accusing the reviewer. Report through the official tool only when a policy category appears relevant. The business may still post a privacy-safe response while the platform reviews it.',
        },
        {
          heading: 'A review contains private information',
          body: 'Preserve evidence, report it under the relevant policy, and avoid repeating the private information in the public reply. Escalate serious safety or legal concerns appropriately.',
        },
        {
          heading: 'A customer offers to change a review after a refund or redo',
          body: 'Make the service remedy based on the approved policy and facts, not review revision. Tell the customer they control their own honest review; do not make the remedy conditional.',
        },
        {
          heading: 'The customer wants a referral reward and also reviewed',
          body: 'Apply the referral rule only to the qualifying referral action. Do not increase, deny, or describe the reward based on the review or rating.',
        },
        {
          heading: 'A testimonial was edited for length',
          body: 'Keep the original, obtain permission for the exact shortened version where appropriate, and ensure the edit does not change the meaning or omit an important qualification.',
        },
        {
          heading: 'The business receives no reviews after asking',
          body: 'Do not increase pressure or create fake activity. Verify the link, delivery, neutral audience, and timing, then continue the consistent process. Customers are not obligated to review.',
        },
        {
          heading: 'The customer asks not to receive offers',
          body: 'Update the channel-specific suppression, cancel queued repeat offers, and retain the minimum record needed to honor the request. A service issue or legally necessary message may require different handling; obtain qualified guidance.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Asking only customers expected to leave five stars — private surveys, tips, spend, and staff judgment should not determine who gets the public review link. Use an objective completed-service rule.',
    'Sending unhappy customers to a private form instead of the public link — offering a public link only after a positive answer is review gating. A private feedback channel can exist, but it should not control access to the review invitation.',
    'Offering a discount or free service for a Google review — Google prohibits incentives for posting, revising, or removing reviews. Keep loyalty and referral benefits entirely independent of review activity.',
    'Asking for specific stars, words, or employee mentions — a neutral request leaves the rating and content to the customer. Do not pressure customers to mention a technician, city, service keyword, or five-star score.',
    'Using staff, family, friends, or fake accounts — connections can bias reviews and may require disclosure or be prohibited. Never arrange reviews from people without a genuine customer experience.',
    'Using AI to fabricate customer proof — AI can help draft internal templates, but it cannot create a genuine customer experience or review. Do not publish invented customer identities, quotes, or ratings.',
    'Pressuring customers on site — do not stand over a customer while they post, require a review before leaving, or use a shared device/account. Send the optional link for the customer to use on their own time.',
    'Treating criticism as a policy violation — platforms generally remove content for policy reasons, not because the business disputes the opinion. Respond professionally and report only when a relevant policy may be violated.',
    'Revealing customer details in a public reply — do not confirm service dates, addresses, vehicle details, payment history, messages, or issue evidence publicly. Move specifics to a private channel.',
    'Arguing line by line — a defensive public essay can amplify conflict. Acknowledge, state the desire to review the concern, and provide a direct private resolution path.',
    'Paying for review removal or revision — do not condition a refund, redo, credit, or other remedy on deleting or changing a truthful review. Resolve the service issue on its own merits.',
    'Republishing a review without context — preserve meaning, obtain appropriate permission, and disclose unexpected material connections. Do not turn a qualified comment into an absolute claim.',
    'Combining a review request and discount — even when the discount is intended for future service, placing it inside the review request can imply an exchange. Send repeat-business offers separately under their own eligibility and permission rules.',
    'Sending frequent promotions to every past customer — use relevant service history, channel permission, clear terms, reasonable frequency, and opt-out handling. More messages do not automatically create more loyalty.',
    'Automating public replies without review — AI or template automation can disclose private details, sound dismissive, or misread the situation. Keep a human approval step during launch.',
  ],

  vendorLinkGroups: [
    {
      heading: 'FTC reviews and testimonials guidance',
      links: [
        {
          label: 'FTC — Consumer Reviews and Testimonials Rule: Questions and Answers',
          href: 'https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers',
        },
        {
          label: 'FTC — Rulemaking: Use of Consumer Reviews and Testimonials',
          href: 'https://www.ftc.gov/legal-library/browse/rules/rulemaking-use-consumer-reviews-testimonials',
        },
        {
          label: 'FTC — Soliciting and Paying for Online Reviews',
          href: 'https://www.ftc.gov/business-guidance/resources/soliciting-paying-online-reviews-guide-marketers',
        },
        {
          label: 'FTC — Consumer Review Fairness Act: What Businesses Need to Know',
          href: 'https://www.ftc.gov/business-guidance/resources/consumer-review-fairness-act-what-businesses-need-know',
        },
        {
          label: 'FTC — Endorsement Guides: What People Are Asking',
          href: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
        },
      ],
    },
    {
      heading: 'Google Business Profile reviews',
      links: [
        {
          label: 'Google — Create a link or QR code to request reviews',
          href: 'https://support.google.com/business/answer/16816815?hl=en',
        },
        {
          label: 'Google — Tips to get more reviews',
          href: 'https://support.google.com/business/answer/3474122?hl=en',
        },
        {
          label: 'Google — Prohibited and restricted review content',
          href: 'https://support.google.com/business/answer/7400114?hl=en',
        },
        {
          label: 'Google — Manage customer reviews and replies',
          href: 'https://support.google.com/business/answer/3474050?hl=en',
        },
        {
          label: 'Google — Report inappropriate reviews',
          href: 'https://support.google.com/business/answer/4596773?hl=en',
        },
      ],
    },
    {
      heading: 'Repeat-business communications',
      links: [
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
  ],

  disclaimer:
    'This guide provides operational education, not legal, advertising, endorsement, privacy, platform-policy, email, telemarketing, or text-message consent advice. It does not publish a universal review-request schedule, testimonial release, incentive practice, referral rule, marketing disclosure, or response template as sufficient everywhere. Do not use review gating, positive-only solicitation, preselected ratings, required wording, customer pressure, review kiosks, purchased reviews, review exchanges, fake accounts, or AI-generated customer reviews. Do not offer or imply payment, discounts, free goods/services, contest entries, loyalty benefits, or other incentives for Google reviews, review revisions, or review removal, and do not condition refunds, rework, credits, or service recovery on changing or deleting a truthful review. Do not reveal customer identity, vehicle, address, payment, booking, message, or issue details in public replies, and do not republish a review or testimonial in a way that changes its meaning or hides an unexpected material connection. Repeat offers and referral rewards remain independent of review activity. The existence of an incentive practice under one rule does not mean a review platform allows it; Google prohibits incentivized reviews. No rating, removal, review volume, search ranking, lead volume, repeat booking, or revenue result is guaranteed — follow current official guidance and qualified review because laws, platform policies, review interfaces, and communication rules change.',

  searchKeywords: [
    'reviews',
    'Google reviews',
    'review link',
    'review QR code',
    'review request',
    'honest review',
    'review gating',
    'five-star review',
    'incentivized review',
    'fake review',
    'AI review',
    'employee review',
    'negative review',
    'respond to review',
    'report review',
    'testimonial',
    'testimonial permission',
    'material connection',
    'repeat business',
    'rebooking',
    'loyalty offer',
    'service reminder',
    'referral program',
    'review response',
    'service recovery',
  ],

  nextGuideSlug: 'analytics-30-day-plan',
};
