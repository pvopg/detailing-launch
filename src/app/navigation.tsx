import { SiteNav } from '@/components/site-nav';
import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';

import { signOut } from './(auth)/auth-actions';

export async function Navigation() {
  const session = await getSession();
  const entitlements = session ? await getEntitlements() : { hasFoundation: false, hasBusinessSystems: false };
  const hasPortalAccess = entitlements.hasFoundation || entitlements.hasBusinessSystems;

  return <SiteNav isSignedIn={Boolean(session)} hasPortalAccess={hasPortalAccess} signOut={signOut} />;
}
