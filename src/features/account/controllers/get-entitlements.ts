import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export interface Entitlements {
  hasFoundation: boolean;
  hasBusinessSystems: boolean;
}

/**
 * Returns the current user's access tiers. Business Systems is a superset of Foundation, so a
 * Business Systems entitlement also grants Foundation access. Row-level security scopes the query
 * to the authenticated user.
 */
export async function getEntitlements(): Promise<Entitlements> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('entitlements').select('tier');

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
