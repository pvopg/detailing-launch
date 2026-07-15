'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/cn';

import { productMetadataSchema } from '../models/product-metadata';
import { BillingInterval, Price, ProductWithPrices } from '../types';

const intervalSuffix: Record<string, string> = { day: '/day', week: '/week', month: '/month', year: '/year' };

export function PricingCard({
  product,
  price,
  createCheckoutAction,
}: {
  product: ProductWithPrices;
  price?: Price;
  createCheckoutAction?: ({ price }: { price: Price }) => void;
}) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(
    price ? (price.interval as BillingInterval) : 'month'
  );

  // Determine the price to render
  const currentPrice = useMemo(() => {
    // If price is passed in we use that one. This is used on the account page when showing the user their current subscription.
    if (price) return price;

    // If no price provided we need to find the right one to render for the product.
    // First check if the product has a price - in the case of our enterprise product, no price is included.
    // We'll return null and handle that case when rendering.
    if (product.prices.length === 0) return null;

    // Next determine if the product is a one time purchase - in these cases it will only have a single price.
    if (product.prices.length === 1) return product.prices[0];

    // Lastly we can assume the product is a subscription one with a month and year price, so we get the price according to the select billingInterval
    return product.prices.find((price) => price.interval === billingInterval);
  }, [billingInterval, price, product.prices]);

  const metadata = productMetadataSchema.parse(product.metadata);
  const buttonVariantMap = {
    foundation: 'secondary',
    business_systems: 'brand',
  } as const;

  // Business Systems is the highlighted upsell tier.
  const isHighlighted = metadata.tier === 'business_systems';

  function handleBillingIntervalChange(billingInterval: BillingInterval) {
    setBillingInterval(billingInterval);
  }

  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col rounded-lg border bg-card p-6 shadow-sm lg:p-8',
        isHighlighted ? 'border-brand ring-1 ring-brand' : 'border-border'
      )}
    >
      <div className='flex flex-col gap-2'>
        {isHighlighted && <span className='label text-brand'>Most complete</span>}
        <div className='font-display text-xl font-semibold'>{product.name}</div>
        <div className='flex items-baseline gap-0.5'>
          <span className='font-display text-4xl font-semibold tracking-tight'>
            {currentPrice?.unit_amount != null ? '$' + currentPrice.unit_amount / 100 : 'Custom'}
          </span>
          <span className='text-muted-foreground'>{currentPrice?.interval ? intervalSuffix[currentPrice.interval] : null}</span>
        </div>
      </div>

      {!Boolean(price) && product.prices.length > 1 && (
        <div className='mt-4'>
          <PricingSwitch onChange={handleBillingIntervalChange} />
        </div>
      )}

      <div className='flex flex-1 flex-col gap-3 py-8'>
        {metadata.features.map((feature) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </div>

      {createCheckoutAction && (
        <>
          {currentPrice && (
            <Button
              variant={buttonVariantMap[metadata.tier]}
              className='w-full'
              onClick={() => createCheckoutAction({ price: currentPrice })}
            >
              Get started
            </Button>
          )}
          {!currentPrice && (
            <Button variant={buttonVariantMap[metadata.tier]} className='w-full' asChild>
              <Link href='/contact'>Contact us</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className='flex items-start gap-2'>
      <IoCheckmark className='mt-0.5 flex-shrink-0 text-brand' />
      <p className='text-sm text-foreground'>{text}</p>
    </div>
  );
}

function PricingSwitch({ onChange }: { onChange: (value: BillingInterval) => void }) {
  return (
    <Tabs
      defaultValue='month'
      className='flex items-center'
      onValueChange={(newBillingInterval) => onChange(newBillingInterval as BillingInterval)}
    >
      <TabsList className='m-auto'>
        <TabsTrigger value='month'>Monthly</TabsTrigger>
        <TabsTrigger value='year'>Yearly</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
