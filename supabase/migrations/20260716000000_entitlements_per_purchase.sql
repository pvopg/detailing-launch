/**
* ENTITLEMENTS — PER-PURCHASE ROWS
* Previously a user held at most one row per tier (unique (user_id, tier)). That collapsed two
* separate charges for the same tier into a single row whose stripe_checkout_session_id pointed at
* only the most recent purchase. Refunding that most-recent duplicate then tombstoned the shared row
* and removed access the other, still-valid charge should have kept.
*
* Each checkout session now owns its own entitlement row. stripe_checkout_session_id stays unique, so
* webhook replays remain idempotent and revocation (which resolves a refund/dispute back to a single
* session) tombstones only the refunded purchase. Access is read as "any non-revoked row for the
* tier" (see get-entitlements), so refunding one duplicate leaves access granted by the other.
*/
alter table entitlements drop constraint entitlements_user_id_tier_key;
