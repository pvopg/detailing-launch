import Stripe from 'stripe';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

export async function deletePrice(price: Stripe.Price) {
  const { error } = await supabaseAdminClient.from('prices').delete().eq('id', price.id);

  if (error) {
    throw error;
  } else {
    console.info(`Price deleted: ${price.id}`);
  }
}
