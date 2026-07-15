import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/**
 * Returns the set of completed checklist item ids for a guide, for the current user.
 * Rows are stored in `checklist_progress` keyed `${guideSlug}:${itemId}`; RLS scopes to the user.
 */
export async function getGuideCompletedItems(guideSlug: string): Promise<Set<string>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('checklist_progress')
    .select('item_key, completed')
    .like('item_key', `${guideSlug}:%`);

  if (error) {
    console.error(error);
    return new Set();
  }

  const prefixLength = guideSlug.length + 1;
  return new Set(
    (data ?? []).filter((row) => row.completed).map((row) => row.item_key.slice(prefixLength))
  );
}
