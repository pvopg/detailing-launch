import Stripe from 'stripe';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

export async function deleteProduct(product: Stripe.Product) {
  // prices.product_id references products with no ON DELETE CASCADE, so remove child prices first.
  const { error: priceError } = await supabaseAdminClient.from('prices').delete().eq('product_id', product.id);

  if (priceError) {
    throw priceError;
  }

  const { error } = await supabaseAdminClient.from('products').delete().eq('id', product.id);

  if (error) {
    throw error;
  } else {
    console.info(`Product deleted: ${product.id}`);
  }
}
