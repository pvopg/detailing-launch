'use server';

import { getSession } from '@/features/account/controllers/get-session';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Json } from '@/libs/supabase/types';
import { ActionResponse } from '@/types/action-response';

/**
 * Persists an interactive tool's working state as a JSON blob. Idempotent on
 * (user_id, module_key); RLS ensures a user can only write their own row. Tool modules
 * declare `persistence: 'portal_module_state'` in the portal navigation config.
 */
export async function saveModuleState(moduleKey: string, state: Json): Promise<ActionResponse> {
  const session = await getSession();

  if (!session?.user) {
    return { data: null, error: 'Not authenticated' };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from('portal_module_state').upsert(
    {
      user_id: session.user.id,
      module_key: moduleKey,
      state,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,module_key' }
  );

  if (error) {
    console.error(error);
    return { data: null, error };
  }

  return { data: null, error: null };
}
