import type { Entitlements } from '@/features/account/controllers/get-entitlements';
import type { EntitlementTier } from '@/features/pricing/models/product-metadata';

/**
 * Whether the given entitlements grant access to content requiring `tier`. Business Systems is a
 * superset of Foundation (mirrors `isModuleUnlocked` in `../portal-navigation.ts`). This is the
 * single authorization gate reused by both the protected-index filter and the discovery filter, so
 * access rules never drift between the two paths.
 */
export function canAccessTier(entitlements: Entitlements, tier: EntitlementTier): boolean {
  return tier === 'business_systems' ? entitlements.hasBusinessSystems : entitlements.hasFoundation;
}
