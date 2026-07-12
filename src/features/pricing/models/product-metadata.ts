import z from 'zod';

// The entitlement tier a product grants. Stored on the Stripe product's metadata as `tier`
// and synced to our `products` table. Must match the `entitlement_tier` DB enum.
export const entitlementTierSchema = z.enum(['foundation', 'business_systems']);

export const productMetadataSchema = z
  .object({
    tier: entitlementTierSchema,
    // Optional display order on the pricing page.
    index: z.string().optional(),
    // Optional pipe-separated ("|") list of feature bullet points to show on the card.
    features: z.string().optional(),
  })
  .transform((data) => ({
    tier: data.tier,
    index: data.index ? parseInt(data.index) : 0,
    features: data.features
      ? data.features
          .split('|')
          .map((feature) => feature.trim())
          .filter(Boolean)
      : [],
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type EntitlementTier = z.infer<typeof entitlementTierSchema>;
