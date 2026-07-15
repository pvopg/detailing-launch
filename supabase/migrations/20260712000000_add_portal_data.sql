/**
* PORTAL DATA
* Backing tables for the member portal's saved progress and interactive tool state.
* Both are per-user and protected by row-level security. See src/features/portal/portal-navigation.ts
* for how module slugs map to these tables (guide modules -> checklist_progress, tool modules ->
* portal_module_state).
*/

/**
* CHECKLIST_PROGRESS
* Tracks completion of Foundation guide steps. `item_key` is a module slug or a step key within it.
*/
create table checklist_progress (
  user_id uuid references auth.users not null,
  -- Module slug (or module-scoped step key) this completion belongs to.
  item_key text not null,
  completed boolean not null default false,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (user_id, item_key)
);
alter table checklist_progress enable row level security;
create policy "Can view own checklist progress." on checklist_progress for select using (auth.uid() = user_id);
create policy "Can upsert own checklist progress." on checklist_progress for insert with check (auth.uid() = user_id);
create policy "Can update own checklist progress." on checklist_progress for update using (auth.uid() = user_id);

/**
* PORTAL_MODULE_STATE
* Stores the saved working state of each Business Systems interactive tool as a JSON blob.
* `module_key` is the module slug (e.g. 'pricing-calculator').
*/
create table portal_module_state (
  user_id uuid references auth.users not null,
  module_key text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (user_id, module_key)
);
alter table portal_module_state enable row level security;
create policy "Can view own module state." on portal_module_state for select using (auth.uid() = user_id);
create policy "Can insert own module state." on portal_module_state for insert with check (auth.uid() = user_id);
create policy "Can update own module state." on portal_module_state for update using (auth.uid() = user_id);
