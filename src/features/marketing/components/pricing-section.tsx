import { IoCheckmark, IoClose } from 'react-icons/io5';

import { RefundDisclosure } from '@/components/refund-disclosure';
import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import type { Price } from '@/features/pricing/types';
import { cn } from '@/utils/cn';

import { type ComparisonRow, landingContent, type OfferContent } from '../content';
import { resolveTierCta } from '../cta';

import { Reveal } from './reveal';
import { TierCtaButton } from './tier-cta-button';
import { TrackInView } from './track-in-view';

/** Resolve the one-time price for a tier from the synced products table (or null if not seeded). */
function priceForTier(
  products: Awaited<ReturnType<typeof getProducts>>,
  tier: OfferContent['tier']
): Price | null {
  for (const product of products) {
    const parsed = productMetadataSchema.safeParse(product.metadata);
    if (parsed.success && parsed.data.tier === tier) {
      return product.prices?.[0] ?? null;
    }
  }
  return null;
}

/**
 * Pricing — the entitlement-aware conversion core. CTA state is derived from server-verified
 * entitlements: a purchased tier shows an "open" link rather than another purchase button, and a
 * Foundation owner sees an upgrade path to Business Systems. All prices are one-time founding access;
 * no subscription/`/month` styling appears.
 */
export async function MarketingPricingSection() {
  const { pricing } = landingContent;
  const [products, entitlements, session] = await Promise.all([getProducts(), getEntitlements(), getSession()]);

  // Signed-out visitors have no entitlement context; pass null so CTAs resolve to the purchase path
  // (createCheckoutAction itself routes unauthenticated users into sign-in).
  const ent = session ? entitlements : null;

  const foundationPrice = priceForTier(products, 'foundation');
  const businessPrice = priceForTier(products, 'business_systems');

  return (
    <section id='pricing' className='scroll-mt-24'>
      <div className='relative rounded-2xl bg-muted py-16'>
        <div className='relative z-10 m-auto flex max-w-container flex-col items-center gap-8 px-4'>
          <Reveal className='flex max-w-3xl flex-col items-center gap-4 text-center'>
            <h2>{pricing.heading}</h2>
            <p className='text-lg text-muted-foreground'>{pricing.intro}</p>
          </Reveal>

          <div className='flex w-full flex-col items-stretch justify-center gap-4 lg:flex-row lg:gap-8'>
            <TierCard
              offer={pricing.foundationOffer}
              price={foundationPrice}
              entitlements={ent}
              analyticsEvent='pricing_foundation_click'
              direction='left'
            />
            <TierCard
              offer={pricing.businessSystemsOffer}
              price={businessPrice}
              entitlements={ent}
              analyticsEvent='pricing_business_systems_click'
              highlighted
              includesFoundationNote
              direction='right'
            />
          </div>

          <p className='max-w-2xl text-center text-sm text-muted-foreground'>{pricing.thirdPartyDisclosure}</p>
          <RefundDisclosure />

          <TrackInView event='tier_comparison_view'>
            <Reveal className='flex w-full justify-center'>
              <TierComparison heading={pricing.comparisonHeading} rows={pricing.comparisonRows} />
            </Reveal>
          </TrackInView>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  offer,
  price,
  entitlements,
  analyticsEvent,
  highlighted,
  includesFoundationNote,
  direction,
}: {
  offer: OfferContent;
  price: Price | null;
  entitlements: Parameters<typeof resolveTierCta>[1];
  analyticsEvent: 'pricing_foundation_click' | 'pricing_business_systems_click';
  highlighted?: boolean;
  includesFoundationNote?: boolean;
  direction?: 'left' | 'right';
}) {
  const state = resolveTierCta(offer.tier, entitlements, offer.ctaLabel);

  return (
    <Reveal
      direction={direction}
      className={cn(
        'flex w-full flex-1 flex-col rounded-lg border bg-card p-6 shadow-sm lg:p-8',
        highlighted ? 'border-brand ring-1 ring-brand' : 'border-border'
      )}
    >
      <div className='flex flex-col gap-2'>
        {highlighted && <span className='label text-brand'>Most complete</span>}
        <div className='font-display text-xl font-semibold'>{offer.name}</div>
        <div className='flex items-baseline gap-2'>
          <span className='font-display text-4xl font-semibold tracking-tight'>{offer.price}</span>
          <span className='text-sm text-muted-foreground'>one-time founding access</span>
        </div>
        <p className='text-sm text-muted-foreground'>{offer.positioning}</p>
        {includesFoundationNote && (
          <p className='text-sm font-medium text-brand'>Includes everything in Foundation.</p>
        )}
      </div>

      <ul className='flex flex-1 flex-col gap-3 py-8'>
        {offer.includes.map((feature) => (
          <li key={feature} className='flex items-start gap-2'>
            <IoCheckmark className='mt-0.5 flex-shrink-0 text-brand' aria-hidden />
            <span className='text-sm text-foreground'>{feature}</span>
          </li>
        ))}
      </ul>

      <TierCtaButton
        state={state}
        price={price}
        createCheckoutAction={createCheckoutAction}
        event={analyticsEvent}
        placement='pricing'
        variant={highlighted ? 'brand' : 'secondary'}
      />
    </Reveal>
  );
}

function CompareMark({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className='text-xs font-medium text-foreground'>{value}</span>;
  }
  return value ? (
    <>
      <IoCheckmark className='mx-auto text-lg text-brand' aria-hidden />
      <span className='sr-only'>Included</span>
    </>
  ) : (
    <>
      <IoClose className='mx-auto text-lg text-ink-300' aria-hidden />
      <span className='sr-only'>Not included</span>
    </>
  );
}

function TierComparison({ heading, rows }: { heading: string; rows: ComparisonRow[] }) {
  return (
    <div className='w-full max-w-3xl'>
      <h3 className='mb-4 text-center text-lg'>{heading}</h3>
      <div className='overflow-hidden rounded-lg border border-border bg-card'>
        <table className='w-full border-collapse text-sm'>
          <caption className='sr-only'>Feature comparison of the Foundation and Business Systems kits</caption>
          <thead>
            <tr className='border-b border-border bg-muted/50'>
              <th scope='col' className='px-4 py-3 text-left font-semibold'>
                Feature
              </th>
              <th scope='col' className='px-3 py-3 text-center font-semibold'>
                Foundation
              </th>
              <th scope='col' className='px-3 py-3 text-center font-semibold'>
                Business Systems
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className='border-b border-border/60 last:border-0'>
                <th scope='row' className='px-4 py-3 text-left font-normal text-foreground'>
                  {row.feature}
                </th>
                <td className='px-3 py-3 text-center'>
                  <CompareMark value={row.foundation} />
                </td>
                <td className='px-3 py-3 text-center'>
                  <CompareMark value={row.businessSystems} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
