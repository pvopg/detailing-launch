import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import type { Price } from '@/features/pricing/types';

import { landingContent, type OfferContent } from '../content';
import { resolveTierCta } from '../cta';

import { Reveal } from './reveal';
import { TierCtaButton } from './tier-cta-button';

function priceForTier(products: Awaited<ReturnType<typeof getProducts>>, tier: OfferContent['tier']): Price | null {
  for (const product of products) {
    const parsed = productMetadataSchema.safeParse(product.metadata);
    if (parsed.success && parsed.data.tier === tier) return product.prices?.[0] ?? null;
  }
  return null;
}

/**
 * Final CTA — a decisive, non-hyped close that reuses the same entitlement-aware button logic as the
 * pricing cards (an owned tier opens the portal instead of offering another purchase).
 */
export async function FinalCtaSection() {
  const { finalCta, pricing } = landingContent;
  const [products, entitlements, session] = await Promise.all([getProducts(), getEntitlements(), getSession()]);
  const ent = session ? entitlements : null;

  const foundationState = resolveTierCta('foundation', ent, pricing.foundationOffer.ctaLabel);
  const businessState = resolveTierCta('business_systems', ent, pricing.businessSystemsOffer.ctaLabel);

  return (
    <section className='rounded-2xl bg-navy-950 px-6 py-16 text-center text-white lg:px-16'>
      <Reveal className='mx-auto flex max-w-2xl flex-col items-center gap-6'>
        <h2 className='text-white'>{finalCta.heading}</h2>
        <p className='text-lg text-ink-300'>{finalCta.description}</p>
        <div className='flex w-full flex-col justify-center gap-3 sm:flex-row'>
          <TierCtaButton
            state={foundationState}
            price={priceForTier(products, 'foundation')}
            createCheckoutAction={createCheckoutAction}
            event='final_cta_click'
            placement='final-cta-foundation'
            variant='light'
            className='sm:w-auto'
          />
          <TierCtaButton
            state={businessState}
            price={priceForTier(products, 'business_systems')}
            createCheckoutAction={createCheckoutAction}
            event='final_cta_click'
            placement='final-cta-business'
            variant='brand'
            className='sm:w-auto'
          />
        </div>
        <p className='text-sm text-ink-300'>{finalCta.microcopy}</p>
      </Reveal>
    </section>
  );
}
