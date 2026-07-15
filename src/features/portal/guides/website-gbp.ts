import type { GuideContent } from './types';

/**
 * Foundation Guide 3 — Website & Google Business Profile.
 *
 * Canonical editorial source: Foundation_Guide_03_Website_and_Google_Business_Profile.md. Checklist
 * item ids (`website-gbp-01`..`website-gbp-18`) are stable and must not change after release, so saved
 * progress in `checklist_progress` is never orphaned by copy edits. Progress is Essential-only: items
 * 01–13 are Essential (denominator 13); 14–17 Recommended; 18 Later.
 */
export const websiteGbpGuide: GuideContent = {
  slug: 'website-gbp',
  title: 'Website & Google Business Profile',
  outcome:
    'Publish a clear, mobile-friendly website and an accurate Google Business Profile so local customers can find the business and reach one tested inquiry action.',
  estimatedMinutes: 60,
  tint: 'cyan',

  whatItDoes:
    'Your website and Google Business Profile are two connected front doors to the same business. The website is the public space you control: it explains what you do, where you work, what a customer should expect, and how to contact you. Your Google Business Profile helps eligible local customers find and evaluate the business through Google Search and Maps. They should feel like two views of one company — the name, phone number, website, service area, hours, services, and next step should agree so a customer moving from Google to the website never has to decide whether they found the right business. This guide focuses on a useful first version; you do not need a large website, an advanced SEO campaign, a custom-coded booking system, or perfect search ranking to launch.',

  terms: [
    {
      term: 'Website',
      definition: 'The pages on your domain that explain the business and direct customers to an inquiry action.',
    },
    {
      term: 'Google Business Profile',
      definition: 'The business information eligible customers can manage for their appearance on Google Search and Maps.',
    },
    {
      term: 'Service-area business',
      definition:
        'A business that travels to customers instead of serving them at its own address. A mobile detailer working from home usually uses this model and keeps the home address hidden when customers are not served there.',
    },
  ],

  diagram: [
    'Local search or referral',
    'Google Business Profile or website',
    'Services, service area, and proof',
    'Inquiry action',
    'Quote and booking',
    'Payment, follow-up, and review',
  ],

  whyItMatters:
    'A useful website answers the questions that otherwise create repetitive messages: what services are offered, where the detailer travels, whether the business is a fit for this vehicle and job, and what the customer should do next. A website on a business-owned domain also gives you a stable destination you control — social profiles and marketplace listings help people discover the business, but the platform controls the account, presentation, and rules. An eligible, accurate Google Business Profile can help you appear when nearby customers search Google or Maps, but Google requires businesses to represent themselves truthfully: categories, addresses, service areas, and names should describe the actual business, not keywords you hope to rank for. Matching business facts across both entry points reduces doubt, and real photos, a clear service area, a working phone number, and a professional email are more useful proof than generic claims. Both front doors should lead to one primary action, such as requesting a quote — the next guide builds the workflow behind it.',

  callouts: [
    {
      tone: 'note',
      body: 'The goal is not to win every search. The goal is to give the right customer a clear, accurate path from discovery to inquiry.',
    },
    {
      tone: 'warning',
      body: 'A mobile detailer should not publicly display a home address when customers are not served there. Use the service-area configuration and follow Google’s current verification instructions.',
    },
  ],

  goodEnoughToLaunch: [
    'The website loads securely on the business-owned domain.',
    'The main page works on a phone without horizontal scrolling, clipped text, or unreadable controls.',
    'The website clearly states the business name, mobile-detailing service, service area, core services, and primary inquiry action.',
    'Contact information and hours are accurate and easy to find.',
    'The website uses authentic business or work photos where available and makes no unsupported claims.',
    'The inquiry button, form, phone link, and email link have been tested from a phone.',
    'The Google Business Profile is claimed in an owner-controlled account.',
    'The profile uses the correct business model, name, primary category, contact information, hours, and service area.',
    'A home or private address is hidden when customers are not served there.',
    'The member has completed the verification steps Google currently offers, or has a documented verification attempt in progress.',
    'The public website and Google profile point to each other and present consistent information.',
  ],

  notRequiredYet: [
    'A multi-page custom website.',
    'Guaranteed placement in Google Search or Maps.',
    'Paid search advertising.',
    'Dozens of city or service pages.',
    'A blog or weekly content schedule.',
    'Advanced analytics or conversion tracking.',
    'Complex structured data added by hand.',
    'A storefront address the business does not actually use to serve customers.',
  ],

  checklist: [
    {
      id: 'website-gbp-01',
      title: 'Write down the facts both public profiles will use',
      description:
        'Create one short reference containing the exact public business name, primary phone number, business email, domain, normal response hours, services, service area, and primary customer action. Use it when editing both the website and Google Business Profile so the facts stay consistent. Do not store passwords, recovery codes, identity documents, or private home-address details in this reference.',
      example:
        'Bright Mobile Detailing · 615-555-0142 · hello@brightmobiledetailing.com · Serving Nashville and nearby listed communities · Request a quote. Adapt the fields to the actual business.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-02',
      title: 'Choose a website platform you can access and maintain',
      description:
        'Choose a platform that can use the business domain, publish secure HTTPS pages, work on mobile, and let the owner edit basic copy and links. Create the account with owner-controlled email and recovery methods. If a developer helps, grant appropriate access instead of making that person the only account owner. Prefer a simple platform the operator can maintain over features that are not needed yet.',
      example:
        'A solo operator chooses a hosted site builder with a mobile template and connects the business domain from Guide 2. The operator owns the billing and login while a developer receives collaborator access.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-03',
      title: 'Publish the website on your business domain',
      description:
        'Follow the website platform’s current instructions to connect the domain. Preserve working email DNS records while making website changes. Confirm that the preferred address loads with https://, that common domain variations redirect to one canonical version, and that the browser does not show a certificate warning.',
      example:
        'Both brightmobiledetailing.com and www.brightmobiledetailing.com resolve to the same secure website, while the existing email mailbox continues to send and receive normally.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-04',
      title: 'Explain what you do, where you work, and what happens next',
      description:
        'Publish a clear first page — or a small set of pages — that names the mobile-detailing service, identifies the service area, summarizes the main services, explains the primary customer benefit without guarantees, and presents one prominent inquiry action. Put the most important information near the top instead of making customers search through slogans.',
      example:
        'Mobile detailing at your home or workplace in the Nashville area. Choose an interior, exterior, or full-detail service, then request a quote for your vehicle. The main button says Request a quote.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-05',
      title: 'Describe services without creating false expectations',
      description:
        'List the services currently offered and the information that affects a quote, such as vehicle size, condition, location, and requested add-ons. If displaying prices, clearly label whether they are fixed, starting prices, or estimates. State any important service limitations in plain language. Do not advertise services, certifications, guarantees, or results the business cannot provide.',
      example:
        'Full details start at $___; the final quote depends on vehicle size and condition. We confirm price and availability before booking. Replace the blank only with an approved real amount.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-06',
      title: 'Show real work and a real operator',
      description:
        'Add a short business introduction and authentic images of the operator, vehicle, equipment, or completed work when available. Use only images the business has permission to publish. Do not present stock images, another detailer’s work, AI-generated vehicles, or unverified testimonials as customer proof. Add useful alternative text when an image communicates information; decorative images should not be described as proof.',
      example:
        'A before-and-after image from a completed detail is labeled “Pet-hair removal on the rear seat of a customer SUV” with the customer’s permission. A short paragraph introduces the operator and service area.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-07',
      title: 'Give every page one clear way to request service',
      description:
        'Connect the primary call to action to a working inquiry destination: a form, booking/quote tool, phone call, or business email. Ask only for information needed to respond. Show what happens after submission and the expected response window. Test success, error, and notification behavior before publishing the link widely.',
      example:
        'A short form asks for name, mobile number, vehicle, ZIP code, desired service, and a brief condition note. After submission it says, “Thanks — expect a response during business hours within one business day.” Adapt the fields and timing to the actual workflow.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-08',
      title: 'Test the site like a customer on a phone',
      description:
        'Review every public page on a phone. Confirm readable text, visible focus states, sufficient contrast, descriptive page titles, logical headings, labeled form controls, meaningful link text, image alternative text where needed, and controls large enough to use. Test with keyboard navigation on desktop and at increased browser zoom. Fix broken links, clipped content, intrusive popups, and media that blocks the main task.',
      example:
        'At 200% browser zoom, the navigation still works, the quote form labels remain visible, the Request a quote button can be reached by keyboard, and the page does not scroll sideways.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-09',
      title: 'Put the Google profile under owner control',
      description:
        'Search Google and Maps for an existing profile before creating a new one. Claim the existing eligible profile when appropriate, or add the business through Google’s official process. Use an owner-controlled Google account and add managers only when needed. Do not create duplicate profiles for the same business or let a marketing vendor remain the only owner.',
      example:
        'The operator finds no existing listing, creates one using the owner’s business Google account, and later invites a helper as a manager instead of sharing the password.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-10',
      title: 'Set the profile as a truthful service-area business',
      description:
        'Choose the location model that matches how customers are actually served. If customers do not visit the business address, hide the address and define the real service area using Google’s current service-area controls. Do not use a P.O. box, virtual office, coworking address, rented mailbox, or another location merely to appear in a different market. A hybrid profile is appropriate only when the business both serves customers at a staffed location and travels to customers.',
      example:
        'A mobile detailer works from home but only details vehicles at customer locations. The home address is used privately if Google requires it for verification, is not displayed publicly, and the profile lists the cities or postal areas the operator realistically serves.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-11',
      title: 'Complete the name, category, contact, hours, and services',
      description:
        'Enter the real-world business name without extra service or location keywords. Choose the most specific primary category that represents the main business, and use additional categories only when they describe real services. Add the business phone, website, service area, normal customer-facing hours, and available service information. Keep these facts aligned with the website. Do not use categories as keywords or claim hours when the business cannot respond or operate.',
      example:
        'The profile name is “Bright Mobile Detailing,” not “Bright Mobile Detailing Best Ceramic Coating Nashville.” The website, phone number, service area, and listed hours match the website’s source-of-truth record.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-12',
      title: 'Verify the business using Google’s offered method',
      description:
        'Use only the verification methods Google offers for the profile. Follow the current instructions and show truthful evidence that the business exists and is managed by the operator. For service-area video verification, be prepared to show the local operating area, business equipment or vehicle, and proof of management without exposing private customer information. Do not change core profile facts repeatedly while verification is pending. If verification fails, use Google’s official help and appeal paths rather than creating a replacement profile.',
      example:
        'The operator records one continuous verification video showing a nearby street sign, detailing equipment, access to the work vehicle, and a business document with matching information, while keeping customer plates and private documents out of view.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-13',
      title: 'Check the website and Google profile as a customer',
      description:
        'Open the public website and profile while signed out or in a private browser. Confirm the displayed name, phone, hours, service area, website link, services, and inquiry action. Test the website link from the profile and the Google profile link from the website if one is shown. Search results and Maps display are controlled by Google and may change; verify the information you can control rather than expecting a particular ranking or layout.',
      example:
        'From a phone in a private browser, the operator opens the public profile, taps the website, submits a test inquiry, taps the phone link, and confirms that the visible service area and hours are accurate.',
      priority: 'essential',
    },
    {
      id: 'website-gbp-14',
      title: 'Add current, authentic Google profile photos',
      description:
        'Add a clear logo or identity image plus authentic photos that help a customer understand the mobile operation and quality of work. Favor current, well-lit images of the operator, work vehicle, equipment, and completed details. Protect customer privacy and upload only images the business can publish. Google may choose how images appear, so do not promise that a selected cover image will always display first.',
      example:
        'The profile includes the logo, a branded work vehicle, the organized equipment setup, and several permitted before-and-after photos from different service types.',
      priority: 'recommended',
    },
    {
      id: 'website-gbp-15',
      title: 'Verify the website in Search Console',
      description:
        'Add the domain or site to Google Search Console using an owner-controlled account. Verify ownership, confirm that the main pages are discoverable, and submit the platform-generated sitemap if one is available and appropriate. Search Console is for monitoring and troubleshooting; verification does not guarantee rankings or traffic.',
      example:
        'The operator verifies the domain property, confirms the homepage can be inspected, and submits https://brightmobiledetailing.com/sitemap.xml only after confirming that the website platform generated that URL.',
      priority: 'recommended',
    },
    {
      id: 'website-gbp-16',
      title: 'Enable the platform’s local-business details',
      description:
        'If the website platform or developer supports it, add valid LocalBusiness structured data that matches information visibly shown on the page. Use the most appropriate business type available, include only true fields, and test the final page with Google’s current tools. Do not add fake reviews, hidden content, unsupported service areas, or invented ratings. Structured data can help search engines understand a page but does not guarantee a special result.',
      example:
        'The developer adds JSON-LD containing the public business name, website, phone, public service-area description, and hours already visible on the page. A private home address is not exposed merely to fill a schema field.',
      priority: 'recommended',
    },
    {
      id: 'website-gbp-17',
      title: 'Review the website and profile every month',
      description:
        'Add a recurring reminder to review hours, phone, service area, services, website links, inquiry delivery, public profile edits, and recent photos. Also check that the owner still controls the website platform, domain, and Google profile. Update facts when the business changes instead of letting customers discover the mismatch.',
      example:
        'On the first Monday of each month, the operator submits one test inquiry, checks the public Google profile, reviews pending edits, and replaces outdated seasonal hours.',
      priority: 'recommended',
    },
    {
      id: 'website-gbp-18',
      title: 'Add useful service or location pages when justified',
      description:
        'Add a separate page only when it helps a real customer answer a distinct question — for example, a detailed interior-service page or a genuinely different service-area page with unique information. Avoid mass-producing near-identical city pages, copied descriptions, or pages written only to manipulate search results. Keep the original inquiry path consistent.',
      example:
        'A dedicated Interior Detailing page explains included work, exclusions, vehicle-condition factors, photos, and the quote process. It is not a copy of the homepage with only the city name changed.',
      priority: 'later',
    },
  ],

  detailBlocks: [
    {
      title: 'Choosing a website platform',
      body: 'Keep this vendor-neutral: no platform is universally best, and plans, limits, and introductory offers change, so confirm current cost directly with the provider. Compare platforms on:',
      bullets: [
        'Owner-controlled login, billing, and export options.',
        'Custom-domain and HTTPS support.',
        'Responsive/mobile behavior.',
        'Accessible templates and form controls.',
        'Form notifications and spam protection.',
        'The ability to edit titles, descriptions, images, and links.',
        'Sitemap and Search Console support.',
        'Total recurring cost after introductory pricing.',
        'The operator’s ability to make routine changes without a developer.',
      ],
    },
    {
      title: 'If your situation is different',
      items: [
        {
          heading: 'You already have a website',
          body: 'Do not require a rebuild. Check ownership, domain/HTTPS, mobile use, accuracy, inquiry delivery, and alignment with the Google profile. Keep what works and fix only the gaps that prevent the launch standard.',
        },
        {
          heading: 'Your website is only a social-media page',
          body: 'Keep the active social account, but create a simple business-owned website as the durable destination. Social profiles can link to the website, and the website can link back where useful.',
        },
        {
          heading: 'An agency or former partner owns your Google profile',
          body: 'Request ownership or manager access through Google’s official process. Do not share passwords or create a duplicate listing simply to bypass the ownership issue.',
        },
        {
          heading: 'You work from home',
          body: 'The private address may be needed during verification, but it should remain hidden when customers are not served there. The public profile should describe the real service area.',
        },
        {
          heading: 'Customers can visit a shop and you also travel',
          body: 'A hybrid profile may be appropriate when the location is genuinely staffed during the listed hours and customers can receive service there. Confirm the current Google requirements before displaying the address.',
        },
        {
          heading: 'Verification is delayed or rejected',
          body: 'Record the exact status, avoid repeated changes to core profile information, gather truthful business evidence, and use Google’s official help or appeal path. A pending submission can satisfy the checklist item; it does not mean the profile is publicly verified.',
        },
        {
          heading: 'The category you want is not available',
          body: 'Choose the most specific available category that describes the main current business. Do not substitute an unrelated category as a keyword tactic. Review Google’s category options again if the service mix changes.',
        },
        {
          heading: 'You cannot publish customer vehicle photos',
          body: 'Use permitted photos of the operator, work vehicle, equipment, process, or staged demonstration work. Do not fabricate customer proof. Add real portfolio images later with permission.',
        },
      ],
    },
  ],

  commonMistakes: [
    'Treating the website as a design project instead of a customer path — a polished page still fails if it does not explain the service area, services, and next step.',
    'Publishing a private home address when customers are not served there instead of using the service-area configuration.',
    'Using a fake or borrowed location — virtual offices, rented mailboxes, P.O. boxes, coworking addresses, and other businesses’ locations should not manufacture a local presence.',
    'Adding city names, service lists, or marketing claims to the business-name field, which is not a shortcut to better visibility.',
    'Creating a duplicate profile after a verification problem instead of using the official verification, support, and appeal process.',
    'Listing an unrealistic service area — list only the areas the operator can realistically serve under the current schedule and travel policy.',
    'Letting the website and profile disagree on name, phone, hours, service area, or URL; use one source-of-truth record and update both together.',
    'Hiding the inquiry action in the footer or behind several pages instead of keeping the primary action visible.',
    'Publishing forms nobody monitors — an on-screen success message is not enough; test that the notification arrives and the reply path works.',
    'Using stock or generated images as customer proof instead of labeling or replacing them honestly.',
    'Making unsupported ranking or outcome claims — neither a website nor a profile guarantees ranking, leads, reviews, or income.',
    'Building many thin pages before one clear, tested page works.',
    'Ignoring mobile and keyboard use — test the site without a mouse and at increased zoom before launch.',
  ],

  vendorLinkGroups: [
    {
      heading: 'Google Business Profile setup and policies',
      links: [
        { label: 'Google — Add or claim your Business Profile', href: 'https://support.google.com/business/answer/2911778?hl=en' },
        {
          label: 'Google — Business eligibility and ownership guidelines',
          href: 'https://support.google.com/business/answer/13763036?hl=en',
        },
        {
          label: 'Google — Guidelines for representing your business',
          href: 'https://support.google.com/business/answer/3038177?hl=en',
        },
        { label: 'Google — Manage service areas', href: 'https://support.google.com/business/answer/9157481?hl=en' },
        { label: 'Google — Edit your Business Profile', href: 'https://support.google.com/business/answer/3039617?hl=en' },
        { label: 'Google — Verify your business', href: 'https://support.google.com/business/answer/7107242?hl=en' },
        { label: 'Google — Verify with a video recording', href: 'https://support.google.com/business/answer/14271705?hl=en' },
        {
          label: 'Google — Manage Business Profile photos and videos',
          href: 'https://support.google.com/business/answer/6103862?hl=en',
        },
      ],
    },
    {
      heading: 'Website and search fundamentals',
      links: [
        {
          label: 'Google Search Central — SEO Starter Guide',
          href: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
        },
        { label: 'Google Search Central — Search Essentials', href: 'https://developers.google.com/search/docs/essentials' },
        {
          label: 'Google Search Central — Mobile-first indexing best practices',
          href: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
        },
        {
          label: 'Google Search Central — Get started with Search Console',
          href: 'https://developers.google.com/search/docs/monitor-debug/search-console-start',
        },
        {
          label: 'Google Search Central — Learn about sitemaps',
          href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
        },
        {
          label: 'Google Search Central — Local Business structured data',
          href: 'https://developers.google.com/search/docs/appearance/structured-data/local-business',
        },
        {
          label: 'Google Search Central — General structured data guidelines',
          href: 'https://developers.google.com/search/docs/appearance/structured-data/sd-policies',
        },
      ],
    },
    {
      heading: 'Accessibility',
      links: [
        {
          label: 'W3C WAI — Introduction to Web Accessibility',
          href: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
        },
        { label: 'W3C WAI — Designing for Web Accessibility', href: 'https://www.w3.org/WAI/tips/designing/' },
      ],
    },
  ],

  disclaimer:
    'This guide provides operational education, not legal, privacy, accessibility-compliance, advertising, or SEO advice. Neither a website nor a Google Business Profile guarantees verification, ranking, profile display, traffic, inquiries, reviews, or revenue. Do not add keywords to the business-name field, choose inaccurate categories, use a borrowed or virtual address to create a local presence, present pending verification as verified, or publish stock or generated images as completed customer work. Follow the official vendor instructions, which change over time.',

  searchKeywords: [
    'website',
    'Google Business Profile',
    'Google Maps',
    'service-area business',
    'service area',
    'hide address',
    'business category',
    'verification',
    'video verification',
    'mobile website',
    'inquiry form',
    'local SEO',
    'Search Console',
    'sitemap',
    'LocalBusiness schema',
    'structured data',
    'business photos',
    'website accessibility',
    'HTTPS',
  ],

  nextGuideSlug: 'inquiries-quotes-booking',
};
