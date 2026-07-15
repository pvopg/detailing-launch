import { PropsWithChildren } from 'react';

import { PortalSearch } from '@/features/portal/components/portal-search';

/**
 * Portal shell. Renders a slim header hosting portal-wide search above every `/portal` page
 * (index, guides, and tools), so search is reachable throughout the portal. Access to the portal
 * itself is already enforced by each route; search returns only entitlement-safe results.
 */
export default function PortalLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 z-30 -mx-4 flex justify-end border-b border-border bg-background/80 px-4 py-3 backdrop-blur'>
        <PortalSearch />
      </div>
      {children}
    </div>
  );
}
