'use server';

import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';

import { canAccessTier } from './access';
import { discoveryItems } from './discovery';
import { protectedDocuments } from './documents';
import {
  matchesDiscoveryMetadata,
  MIN_QUERY_LENGTH,
  normalizeSearchQuery,
  rankAndLimitResults,
  searchDocuments,
  toLockedResult,
} from './engine';
import type { PortalSearchResult } from './types';

/**
 * Portal-wide search. Runs entirely on the server: the entitlement is resolved from the trusted
 * session (never a client-supplied tier), authorization is applied BEFORE matching, and only the
 * minimized, entitlement-safe `PortalSearchResult[]` crosses back to the browser. The protected
 * index (`./documents.ts`) is server-only and is never serialized to the client.
 */
export async function searchPortal(rawQuery: string): Promise<PortalSearchResult[]> {
  const query = normalizeSearchQuery(rawQuery ?? '');
  if (query.length < MIN_QUERY_LENGTH) return [];

  const [session, entitlements] = await Promise.all([getSession(), getEntitlements()]);

  // Search is authenticated-only; unauthenticated portal access is already blocked by route guards.
  if (!session?.user) return [];

  // 1) Full-text over content the user is authorized to read. Filtering by entitlement first means
  //    an unauthorized document is never matched, so its existence/snippet can't leak.
  const authorizedDocuments = protectedDocuments.filter((doc) => canAccessTier(entitlements, doc.requiredTier));
  const unlocked = searchDocuments(authorizedDocuments, query);

  // 2) Public discovery metadata for features the user CANNOT access — locked cards for upselling.
  const locked = discoveryItems
    .filter((item) => !canAccessTier(entitlements, item.requiredTier))
    .filter((item) => matchesDiscoveryMetadata(item, query))
    .map((item) => toLockedResult(item, query));

  return rankAndLimitResults([...unlocked, ...locked]);
}
