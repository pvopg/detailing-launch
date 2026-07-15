import type { Entitlements } from '@/features/account/controllers/get-entitlements';
import type { EntitlementTier } from '@/features/pricing/models/product-metadata';

/**
 * Entitlement-aware CTA state for a pricing/final tier button. A purchased tier must never present
 * another purchase button for access it already owns, so owned tiers resolve to an "open" link into
 * the portal instead of a checkout action.
 */
export type TierCtaState =
  | { mode: 'checkout'; label: string }
  | { mode: 'link'; label: string; href: string };

/**
 * @param tier          which tier this button represents
 * @param entitlements  server-verified entitlements (null when the visitor is signed out)
 * @param purchaseLabel the approved purchase label from content (e.g. "Get Foundation access — $20")
 */
export function resolveTierCta(
  tier: EntitlementTier,
  entitlements: Entitlements | null,
  purchaseLabel: string
): TierCtaState {
  // Signed out or no entitlement row yet: start the purchase flow. `createCheckoutAction` itself
  // redirects unauthenticated visitors into sign-in, so this covers both signed-out and
  // signed-in-no-purchase states with one path.
  if (!entitlements) return { mode: 'checkout', label: purchaseLabel };

  if (tier === 'foundation') {
    if (entitlements.hasBusinessSystems) return { mode: 'link', label: 'Open portal', href: '/portal' };
    if (entitlements.hasFoundation) return { mode: 'link', label: 'Open Foundation', href: '/portal' };
    return { mode: 'checkout', label: purchaseLabel };
  }

  // Business Systems tier.
  if (entitlements.hasBusinessSystems) return { mode: 'link', label: 'Open Business Systems', href: '/portal' };
  if (entitlements.hasFoundation) return { mode: 'checkout', label: 'Upgrade to Business Systems' };
  return { mode: 'checkout', label: purchaseLabel };
}
