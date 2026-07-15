import { getURL } from '@/utils/get-url';

import { landingContent, resolveFaqAnswer } from '../content';

/**
 * JSON-LD structured data that mirrors only what is visible on the page.
 *
 * - Product/Offer: the two one-time $20 / $99 offers, priced in USD. No aggregateRating, review, or
 *   availability values are emitted (none are approved).
 * - FAQPage: the same questions and resolved answers shown in the accordion — including the
 *   launch-safe refund answer — so the markup can never contain hidden or different copy.
 */
export function StructuredData() {
  const { seo, pricing, faq } = landingContent;
  const url = getURL(seo.path);

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Mobile Detailing Member Portal',
    description: seo.description,
    brand: { '@type': 'Brand', name: 'pgGallery' },
    url,
    offers: [pricing.foundationOffer, pricing.businessSystemsOffer].map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      priceCurrency: 'USD',
      price: (offer.priceCents / 100).toFixed(2),
      url,
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: resolveFaqAnswer(item) },
    })),
  };

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}
