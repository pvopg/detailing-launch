import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Json } from '@/libs/supabase/types';

/**
 * Returns the saved working state for a tool module for the current user, or `null` if none
 * exists yet. Rows live in `portal_module_state` keyed by `module_key`; RLS scopes to the user,
 * so no explicit user filter is needed (the PK is `(user_id, module_key)`).
 */
export async function getModuleState(moduleKey: string): Promise<Json | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('portal_module_state')
    .select('state')
    .eq('module_key', moduleKey)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.state ?? null;
}
