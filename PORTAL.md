# Member Portal — navigation, data & design

This document is the finalized spec for the portal's content navigation, the data it persists, and
the design system. Code is the source of truth; this summarizes intent.

## Access model

Two one-time tiers, with **Business Systems a superset of Foundation**:

- `foundation` ($20) → unlocks all Foundation modules.
- `business_systems` ($99) → unlocks Foundation **and** Business Systems modules.

Access is resolved by `getEntitlements()` (`src/features/account/controllers/get-entitlements.ts`),
which returns `{ hasFoundation, hasBusinessSystems }`. Every portal route enforces this server-side.

## Content navigation

The single source of truth is `src/features/portal/portal-navigation.ts`. Routes:

- `/portal` — index; lists all modules with locked/unlocked state.
- `/portal/[slug]` — a module; validates the slug, enforces the entitlement gate, renders content.

### Foundation modules (`guide`)

| Slug | Title |
| --- | --- |
| `roadmap` | Digital foundation roadmap |
| `domain-email` | Domain & business email |
| `website-gbp` | Website & Google Business Profile |
| `inquiries-quotes-booking` | Inquiries, quotes & booking |
| `deposits-payments` | Deposits & payments |
| `customer-tracking` | Customer tracking & follow-up |
| `reviews-repeat` | Reviews & repeat business |
| `analytics-30-day-plan` | Analytics & 30-day plan |

### Guide content model (templatized)

Each Foundation guide is authored once as a typed `GuideContent` object in `src/features/portal/guides/`
and rendered through a single `GuideTemplate` (`src/features/portal/components/`). Template sections:
what it does · why it matters · what "good enough to launch" looks like · interactive checklist ·
common mistakes · official vendor links · recommended next guide (plus optional diagram / callouts /
examples blocks). Adding a guide = adding a content object; rendering, persistence, and nav are untouched.

Checklist items carry a `priority` (`essential` | `recommended` | `later`); **progress = completed
essential items ÷ total essential items**, and a guide is complete when all essential items are done.
An item may also carry an optional plain-text `example`, surfaced by the reusable `ExampleHint` control
(Radix tooltip on fine pointers, popover on touch) — instructional only, never persisted or counted.
Per-user state persists in `checklist_progress` (key `${slug}:${itemId}`) via the `toggleChecklistItem`
server action (optimistic UI, RLS-scoped). `roadmap` is authored end-to-end as the reference guide;
the other 7 render a scaffold until authored.

### Business Systems modules (`tool`)

| Slug | Title |
| --- | --- |
| `service-builder` | Service & package builder |
| `pricing-calculator` | Pricing & profitability calculator |
| `workflow-planner` | Customer-workflow planner |
| `message-library` | Personalized message library |
| `software-finder` | Software finder & saved choices |
| `dashboard` | Progress dashboard & next actions |

### Tool content model (templatized)

Each interactive tool is a client component registered by slug in `src/features/portal/tools/index.ts`
(`getTool(slug)`); `/portal/[slug]` renders it after the entitlement gate, passing the loaded
`portal_module_state` blob as `initialState`. A tool owns its working state through the shared
`useModuleState(moduleKey, initial)` hook (`src/features/portal/hooks/`), which debounces edits and
autosaves via the `saveModuleState` server action (`portal_module_state`, upsert on
`user_id,module_key`) — the initial load is never re-saved. Loaded blobs are coerced through a
`normalize*` function (`src/features/portal/tools/normalize.ts`) so partial/legacy JSON is safe.
Shared UI: `ToolShell` (back link, header, live save indicator), `Field` / `TextInput` /
`NumberInput` (`components/tool-fields.tsx`). Persisted shapes live in `tools/types.ts`; pure pricing
math + formatters in `tools/pricing.ts`. Adding a tool = a state shape + a normalizer + a client
component + one registry entry; nav, gating, and persistence are untouched.

**Authored so far:** `service-builder` (named packages: category, price, duration, description,
included line items) and `pricing-calculator` (per-scenario labor hours/rate, supplies, travel,
overhead, processing-fee %, in either target-margin or set-price mode; derives price, cost
breakdown, net profit, margin, and take-home per labor hour). The other 4 tools render the scaffold.

## Data needs

Two per-user tables (migration `supabase/migrations/20260712000000_add_portal_data.sql`), both RLS-scoped to the owner:

- **`checklist_progress`** — completion state for `guide` modules. Key: `(user_id, item_key)` where
  `item_key` is the module slug or a step key within it. Columns: `completed`, `updated_at`.
- **`portal_module_state`** — saved working state for `tool` modules as a JSON blob. Key:
  `(user_id, module_key)` where `module_key` is the module slug. Columns: `state jsonb`, `updated_at`.

A module declares its store via `persistence` in the nav config, so wiring a save handler is mechanical:
`guide` → `checklist_progress`, `tool` → `portal_module_state`.

## Design system

Fintech-inspired, **light-first** system (full spec: `/payop-inspired-web-design-system.md`). White/near-white
base, saturated blue brand reserved for high-emphasis moments, deep navy for narrative sections, pastel
semantic tints for feature surfaces, generous whitespace.

### Type

- **Display/headings:** Manrope (Aeonik Pro substitute), CSS var `--font-display`, Tailwind `font-display`
  (aliases `font-heading` / `font-alt`). Applied to `h1`–`h3` with tight tracking. Utility roles
  `.display-xl` / `.display-lg` / `.label` in `globals.css`.
- **Body/UI:** Geist, CSS var `--font-body`, Tailwind `font-sans` (default).
- **Mono:** Geist Mono, `--font-mono`, Tailwind `font-mono`.

Configured in `src/app/layout.tsx` (next/font) and `tailwind.config.ts`.

### Color

Hex CSS variables in `src/styles/globals.css` (light default). Full ramps `--brand-50..900`, `--ink-50..950`,
`--navy-800..950`, and accent families (`--purple-*`, `--cyan-*`, `--green-*`, `--amber-*`, `--red-*`). Key
semantic aliases, mapped onto the shadcn tokens Tailwind consumes:

| Token | Source | Use |
| --- | --- | --- |
| `--background` | `--white` | Page surface |
| `--foreground` | `--ink-950` | Primary text |
| `--muted` / `--muted-foreground` | `--ink-50` / `--ink-600` | Soft sections / secondary text |
| `--card` / `--popover` | `--white` | Raised surfaces |
| `--border` / `--input` | `--ink-200` | Hairlines |
| `--primary` | `--ink-950` | Ink (default) CTA |
| `--brand` | `--brand-600` | Saturated-blue CTA / emphasis |
| `--ring` | `#73a7ff` | Focus ring |

Tailwind exposes `brand.{50..900,DEFAULT}`, `navy.{800..950}`, `ink.{50..950}`, and `feature.{purple,cyan,green,amber}`
(+ `-ink` foregrounds), plus shadows `shadow-{xs,sm,md,float}` and radii `rounded-{xs,sm,md,lg,xl,2xl,pill}`.

**Buttons** follow the system variants (`src/components/ui/button.tsx`): `default` = Ink, `brand`/`sexy` = Brand,
`light` = on-blue/navy, `secondary`/`outline`, `ghost`, `link`.

**Rules of thumb:** white does most of the work; reserve saturated blue for the hero, key CTAs, and selected
surfaces; use navy to change narrative pace; accent tints identify feature categories, not long-form text.
