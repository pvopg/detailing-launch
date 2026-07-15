/**
* ENTITLEMENT REVOCATION
* Access is revoked by tombstoning the row rather than deleting it: Stripe can replay the original
* `checkout.session.completed` long after a refund, and a deleted row would be silently re-granted
* by that replay. A tombstone also keeps the refund/chargeback signal for support and reporting.
* Read paths must filter on `revoked_at is null`; re-purchase clears the tombstone (see
* grant-entitlement).
*/
alter table entitlements
  -- When access was revoked. Null means the entitlement is live.
  add column revoked_at timestamp with time zone,
  -- Why access was revoked: 'refund' (full refund) or 'dispute' (chargeback).
  add column revoked_reason text;

-- Live-entitlement lookups are the hot path for every portal render.
create index entitlements_user_live_idx on entitlements (user_id) where revoked_at is null;
