# Detailing Launch

## Environments — read before touching Supabase or Stripe

There are **two separate Supabase projects and two Stripe modes**. They are easy to
confuse because the env filenames don't make it obvious. Always confirm which one you're
pointed at before running a query or a mutation.

| Env file     | Role            | Supabase project        | Stripe mode        | Serves            |
| ------------ | --------------- | ----------------------- | ------------------ | ----------------- |
| `.env.prod`  | **PRODUCTION**  | `ilhffgaplnfsykytlowx`  | LIVE (real charges)| detailbusiness.com |
| `.env.local` | local / dev     | `qfxtaighcaatmdeimwzs`  | TEST               | localhost         |

- `.env.local` is **not** production — it's a different project with its own data. A clean
  result there tells you nothing about prod.
- When a question is about what's live on detailbusiness.com, use `.env.prod`, and
  cross-check IDs against the live site/Stripe before trusting a query.
- Live Stripe mutations (archiving products, prices, etc.) affect real customers. Confirm
  the target IDs first.

## Products / pricing sync

- `products` and `prices` tables are populated from Stripe by the webhook at
  `src/app/api/webhooks/route.ts` (`product.*` / `price.*` events). The pricing page reads
  the DB via `getProducts()`, which filters `active = true` on both product and price.
- Archiving a product in Stripe (`active=false`) propagates to the DB and drops it from the
  page. Deleting a Stripe product fires `product.deleted`, which now removes the DB row.
- Editing DB rows directly is whack-a-mole while the corresponding Stripe object still
  exists — fix the source of truth (Stripe) and let the webhook sync.
