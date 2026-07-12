'use server';

import { getSession } from '@/features/account/controllers/get-session';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { ActionResponse } from '@/types/action-response';

/**
 * Toggles a checklist item's completion for the current user. Idempotent on (user_id, item_key);
 * RLS ensures a user can only write their own rows.
 */
export async function toggleChecklistItem(
  guideSlug: string,
  itemId: string,
  completed: boolean
): Promise<ActionResponse> {
  const session = await getSession();

  if (!session?.user) {
    return { data: null, error: 'Not authenticated' };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from('checklist_progress').upsert(
    {
      user_id: session.user.id,
      item_key: `${guideSlug}:${itemId}`,
      completed,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,item_key' }
  );

  if (error) {
    console.error(error);
    return { data: null, error };
  }

  return { data: null, error: null };
}
