import Link from 'next/link';

import { Logo } from '@/components/logo';
import { landingContent } from '@/features/marketing/content';

/**
 * Global footer. Renders only links that resolve — legal pages appear solely when marked available
 * in content, so no dead legal links ship (their availability flags are launch-tracked in
 * `launch-checks.ts`). Support is a mailto that always resolves.
 */
export function SiteFooter() {
  const { footer } = landingContent;
  const legal = footer.legal.filter((link) => link.available);

  return (
    <footer className='mt-16 flex flex-col gap-8 text-muted-foreground lg:mt-24'>
      <div className='flex flex-col justify-between gap-8 lg:flex-row'>
        <div className='flex max-w-xs flex-col gap-3'>
          <Logo />
          <p className='text-sm text-muted-foreground'>{footer.tagline}</p>
        </div>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16'>
          <div className='flex flex-col gap-3'>
            <div className='font-semibold text-foreground'>Product</div>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link href='/#what-you-get' className='hover:text-brand'>
                What you get
              </Link>
              <Link href='/#portal-preview' className='hover:text-brand'>
                Portal preview
              </Link>
              <Link href='/pricing' className='hover:text-brand'>
                Pricing
              </Link>
              <Link href='/#faq' className='hover:text-brand'>
                FAQ
              </Link>
            </nav>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='font-semibold text-foreground'>Account</div>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link href='/login' className='hover:text-brand'>
                Sign in
              </Link>
              <a href={`mailto:${footer.supportEmail}`} className='hover:text-brand'>
                Get support
              </a>
            </nav>
          </div>
          {legal.length > 0 && (
            <div className='flex flex-col gap-3'>
              <div className='font-semibold text-foreground'>Legal</div>
              <nav className='flex flex-col gap-2 text-sm'>
                {legal.map((link) => (
                  <Link key={link.href} href={link.href} className='hover:text-brand'>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
      <p className='max-w-3xl text-xs text-muted-foreground'>{footer.thirdPartyDisclosure}</p>
      <div className='border-t border-border py-6 text-center'>
        <span className='text-xs text-muted-foreground'>Copyright {new Date().getFullYear()} © DetailBusiness.com</span>
      </div>
    </footer>
  );
}
