import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import type { Database } from '@/libs/supabase/types';

import { upsertProduct } from './upsert-product';

type Price = Database['public']['Tables']['prices']['Row'];

/** Postgres foreign_key_violation — the price arrived before its parent product row existed. */
const FOREIGN_KEY_VIOLATION = '23503';

export async function upsertPrice(price: Stripe.Price) {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata,
  };

  const { error } = await supabaseAdminClient.from('prices').upsert([priceData]);

  if (!error) {
    console.info(`Price inserted/updated: ${price.id}`);
    return;
  }

  // Stripe delivers product.created and price.created in parallel with no ordering guarantee, so a
  // price can land before its product. Pull the parent from Stripe, insert it, and retry once.
  if (error.code !== FOREIGN_KEY_VIOLATION || !priceData.product_id) {
    throw error;
  }

  console.info(`Price ${price.id} arrived before product ${priceData.product_id}; syncing product first.`);
  const product = await stripeAdmin.products.retrieve(priceData.product_id);
  await upsertProduct(product);

  const { error: retryError } = await supabaseAdminClient.from('prices').upsert([priceData]);

  if (retryError) {
    throw retryError;
  }

  console.info(`Price inserted/updated: ${price.id}`);
}
