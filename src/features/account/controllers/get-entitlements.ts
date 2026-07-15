import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export interface Entitlements {
  hasFoundation: boolean;
  hasBusinessSystems: boolean;
}

/**
 * Returns the current user's access tiers. Business Systems is a superset of Foundation, so a
 * Business Systems entitlement also grants Foundation access. Revoked entitlements (refunds and
 * chargebacks) are excluded. Row-level security scopes the query to the authenticated user.
 */
export async function getEntitlements(): Promise<Entitlements> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('entitlements').select('tier').is('revoked_at', null);

  if (error) {
    console.error(error);
  }

  const tiers = new Set((data ?? []).map((entitlement) => entitlement.tier));
  const hasBusinessSystems = tiers.has('business_systems');

  return {
    hasBusinessSystems,
    hasFoundation: hasBusinessSystems || tiers.has('foundation'),
  };
}
