import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

type RevokedReason = 'refund' | 'dispute';

/**
 * Tombstones the entitlement granted by the checkout that produced `paymentIntentId`.
 *
 * Entitlements record the Checkout Session that granted them, but refunds and disputes only carry a
 * payment intent, so the session is resolved back through the Stripe API. Not every payment intent
 * maps to an entitlement (subscription invoices, non-checkout charges), and a missing row is a
 * normal outcome rather than a failure — throwing would 400 the webhook and make Stripe redeliver
 * an event that can never succeed.
 */
async function revokeEntitlementForPaymentIntent(paymentIntentId: string, reason: RevokedReason) {
  const sessions = await stripeAdmin.checkout.sessions.list({ payment_intent: paymentIntentId, limit: 1 });
  const checkoutSessionId = sessions.data[0]?.id;

  if (!checkoutSessionId) {
    console.info(`No checkout session for payment intent [${paymentIntentId}]; nothing to revoke.`);
    return;
  }

  const { data, error } = await supabaseAdminClient
    .from('entitlements')
    .update({ revoked_at: new Date().toISOString(), revoked_reason: reason })
    .eq('stripe_checkout_session_id', checkoutSessionId)
    .is('revoked_at', null)
    .select('id, user_id, tier');

  if (error) throw error;

  if (!data?.length) {
    console.info(`No live entitlement for checkout session [${checkoutSessionId}]; nothing to revoke.`);
    return;
  }

  for (const entitlement of data) {
    console.info(`Revoked [${entitlement.tier}] entitlement for user [${entitlement.user_id}] (${reason}).`);
  }
}

/**
 * Revokes access when a charge is fully refunded. Partial refunds leave access intact — a goodwill
 * refund on part of the price should not remove what the customer paid for.
 */
export async function revokeEntitlementFromRefund(charge: Stripe.Charge) {
  if (charge.amount_refunded < charge.amount) {
    console.info(`Charge [${charge.id}] partially refunded (${charge.amount_refunded}/${charge.amount}); keeping access.`);
    return;
  }

  const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;

  if (!paymentIntentId) {
    console.info(`Refunded charge [${charge.id}] has no payment intent; nothing to revoke.`);
    return;
  }

  await revokeEntitlementForPaymentIntent(paymentIntentId, 'refund');
}

/**
 * Revokes access when a customer disputes a charge. The funds are withdrawn as soon as the dispute
 * is opened, so access ends immediately rather than waiting for the dispute to close.
 */
export async function revokeEntitlementFromDispute(dispute: Stripe.Dispute) {
  const paymentIntentId =
    typeof dispute.payment_intent === 'string' ? dispute.payment_intent : dispute.payment_intent?.id;

  if (!paymentIntentId) {
    console.info(`Dispute [${dispute.id}] has no payment intent; nothing to revoke.`);
    return;
  }

  await revokeEntitlementForPaymentIntent(paymentIntentId, 'dispute');
}
