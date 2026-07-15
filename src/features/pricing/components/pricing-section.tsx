import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';

import { createCheckoutAction } from '../actions/create-checkout-action';

export async function PricingSection({ isPricingPage }: { isPricingPage?: boolean }) {
  const products = await getProducts();

  const HeadingLevel = isPricingPage ? 'h1' : 'h2';

  return (
    <section className='relative rounded-2xl bg-muted py-16'>
      <div className='relative z-10 m-auto flex max-w-container flex-col items-center gap-8 px-4'>
        <HeadingLevel className='max-w-4xl text-center'>One-time founding access. No subscription.</HeadingLevel>
        <p className='max-w-2xl text-center text-lg text-muted-foreground'>
          Start with the Foundation roadmap, or get the full Business Systems workspace. Buy once — Business Systems
          includes everything in Foundation.
        </p>
        <div className='flex w-full flex-col items-stretch justify-center gap-4 lg:flex-row lg:gap-8'>
          {products.map((product) => {
            return <PricingCard key={product.id} product={product} createCheckoutAction={createCheckoutAction} />;
          })}
        </div>
      </div>
    </section>
  );
}
