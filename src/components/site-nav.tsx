'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu } from 'react-icons/io5';

import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { ActionResponse } from '@/types/action-response';

/** Marketing anchors — only meaningful on the landing page, so they render only there. */
const ANCHORS = [
  { href: '#what-you-get', label: 'What you get' },
  { href: '#portal-preview', label: 'Portal preview' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

/**
 * Site header navigation. Entitlement-aware: signed-out visitors get Sign in + a "View the kits"
 * CTA; signed-in members get an "Open portal" link and the account menu. Landing-page anchor links
 * appear only on `/`. Includes a keyboard-operable mobile sheet.
 */
export function SiteNav({
  isSignedIn,
  hasPortalAccess,
  signOut,
}: {
  isSignedIn: boolean;
  hasPortalAccess: boolean;
  signOut: () => Promise<ActionResponse>;
}) {
  const pathname = usePathname();
  const onLanding = pathname === '/';
  const pricingHref = onLanding ? '#pricing' : '/pricing';

  return (
    <div className='flex items-center gap-6'>
      {onLanding && (
        <nav aria-label='Sections' className='hidden items-center gap-6 lg:flex'>
          {ANCHORS.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className='text-sm font-medium text-foreground hover:text-brand'>
              {anchor.label}
            </a>
          ))}
        </nav>
      )}

      {isSignedIn ? (
        <div className='flex items-center gap-4'>
          {hasPortalAccess && (
            <Button variant='brand' className='hidden lg:flex' asChild>
              <Link href='/portal'>Open portal</Link>
            </Button>
          )}
          <AccountMenu signOut={signOut} />
        </div>
      ) : (
        <>
          <div className='hidden items-center gap-4 lg:flex'>
            <Link href='/login' className='text-sm font-medium text-foreground hover:text-brand'>
              Sign in
            </Link>
            <Button variant='brand' asChild>
              <Link href={pricingHref}>View the kits</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger className='block rounded-sm p-1 lg:hidden' aria-label='Open menu'>
              <IoMenu size={28} />
            </SheetTrigger>
            <SheetContent className='w-full bg-background'>
              <SheetHeader>
                <SheetTitle className='sr-only'>Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav aria-label='Menu' className='mt-8 flex flex-col gap-4'>
                {onLanding &&
                  ANCHORS.map((anchor) => (
                    <a key={anchor.href} href={anchor.href} className='text-base font-medium text-foreground'>
                      {anchor.label}
                    </a>
                  ))}
                <Link href='/login' className='text-base font-medium text-foreground'>
                  Sign in
                </Link>
                <Button variant='brand' className='mt-2 w-full' asChild>
                  <Link href={pricingHref}>View the kits</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
