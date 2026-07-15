import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/** Creates the Stripe customer and records the user -> customer mapping. */
async function createCustomer({ userId, email }: { userId: string; email: string }) {
  const customer = await stripeAdmin.customers.create({ email, metadata: { userId } });

  // Upsert rather than insert: the row may already exist and point at a customer that no longer
  // does, in which case it needs repointing rather than a duplicate-key error.
  const { error } = await supabaseAdminClient
    .from('customers')
    .upsert([{ id: userId, stripe_customer_id: customer.id }], { onConflict: 'id' });

  if (error) throw error;

  return customer.id;
}

/**
 * Resolves the user's Stripe customer id, creating one if needed.
 *
 * The mapping row can outlive the Stripe customer it points at — a customer deleted in the Stripe
 * dashboard leaves the row behind, and passing a dead id to Checkout fails the purchase with a 500
 * the user can never get past. So a stored id is confirmed against Stripe and replaced if it has
 * gone missing.
 */
export async function getOrCreateCustomer({ userId, email }: { userId: string; email: string }) {
  const { data } = await supabaseAdminClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', userId)
    .maybeSingle();

  const existingId = data?.stripe_customer_id;

  if (!existingId) {
    return createCustomer({ userId, email });
  }

  try {
    const customer = await stripeAdmin.customers.retrieve(existingId);

    // A customer deleted through the API stays retrievable, flagged rather than absent.
    if (!customer.deleted) {
      return existingId;
    }
  } catch (error) {
    // Anything other than "it isn't there" is a real failure, and must not be papered over by
    // silently minting a second customer for the same user.
    const isMissing = error instanceof Stripe.errors.StripeError && error.code === 'resource_missing';
    if (!isMissing) throw error;
  }

  console.info(`Stripe customer [${existingId}] for user [${userId}] is gone; creating a replacement.`);
  return createCustomer({ userId, email });
}
