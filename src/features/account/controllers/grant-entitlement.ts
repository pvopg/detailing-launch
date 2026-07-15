import Stripe from 'stripe';

import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import type { Database } from '@/libs/supabase/types';

/**
 * Grants a one-time entitlement to the user who completed a `payment`-mode Checkout Session.
 * The tier is derived from the purchased price's product metadata. Idempotent on the checkout
 * session id, so Stripe webhook retries are safe.
 */
export async function grantEntitlementFromCheckout(checkoutSession: Stripe.Checkout.Session) {
  const customerId = checkoutSession.customer as string;

  // Get customer's userId from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdminClient
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { id: userId } = customerData!;

  // Find the purchased price from the checkout session's line items.
  const lineItems = await stripeAdmin.checkout.sessions.listLineItems(checkoutSession.id, { limit: 1 });
  const priceId = lineItems.data[0]?.price?.id;
  if (!priceId) {
    throw new Error(`No price found on checkout session [${checkoutSession.id}]`);
  }

  // Resolve the tier from the price's product metadata (already synced to our DB).
  const { data: priceData, error: noPriceError } = await supabaseAdminClient
    .from('prices')
    .select('id, products(metadata)')
    .eq('id', priceId)
    .single();
  if (noPriceError) throw noPriceError;

  const metadata = productMetadataSchema.safeParse(priceData?.products?.metadata);
  if (!metadata.success) {
    throw new Error(`Product for price [${priceId}] is missing a valid entitlement tier in metadata`);
  }

  const entitlement: Database['public']['Tables']['entitlements']['Insert'] = {
    user_id: userId,
    tier: metadata.data.tier,
    price_id: priceId,
    stripe_checkout_session_id: checkoutSession.id,
  };

  // Idempotent on (user_id, tier): webhook replays and repeat purchases of the same tier both
  // resolve to the existing row rather than throwing on the unique constraint.
  const { error } = await supabaseAdminClient
    .from('entitlements')
    .upsert([entitlement], { onConflict: 'user_id,tier' });
  if (error) throw error;

  console.info(`Granted [${metadata.data.tier}] entitlement to user [${userId}] from session [${checkoutSession.id}]`);
}
