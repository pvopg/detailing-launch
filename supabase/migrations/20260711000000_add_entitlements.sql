/**
* ENTITLEMENTS
* Grants a user one-time access to a product tier. Populated from Stripe
* `checkout.session.completed` webhooks when a checkout is completed in `payment` mode.
* Business Systems is treated as a superset of Foundation at read time (see get-entitlements),
* so a Business Systems purchase stores a single `business_systems` row.
*/
create type entitlement_tier as enum ('foundation', 'business_systems');

create table entitlements (
  id uuid primary key default gen_random_uuid(),
  -- The user who owns this entitlement.
  user_id uuid references auth.users not null,
  -- Which tier of access was granted.
  tier entitlement_tier not null,
  -- The Stripe Checkout Session that granted this entitlement. Unique so webhook
  -- replays are idempotent.
  stripe_checkout_session_id text unique,
  -- The Stripe price that was purchased, for provenance and support.
  price_id text references prices,
  granted_at timestamp with time zone not null default timezone('utc'::text, now()),
  -- A user holds at most one row per tier.
  unique (user_id, tier)
);
alter table entitlements enable row level security;
create policy "Can view own entitlements." on entitlements for select using (auth.uid() = user_id);
