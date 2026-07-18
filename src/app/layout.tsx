import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';

import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';

import { Navigation } from './navigation';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

// Body / UI text — neutral interface sans.
const geist = Geist({
  variable: '--font-body',
  subsets: ['latin'],
});

// Display / headings — geometric display sans (Aeonik Pro substitute).
const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin'],
});

// Monospace — numeric / code contexts.
const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mobile Detailing Member Portal — DetailBusiness.com',
  description:
    'Digital systems for mobile detailers: capture leads, take booking and quote requests, collect deposits, follow up, and grow a more professional detailing business.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // suppressHydrationWarning: the pre-paint script adds `.reveal-enabled` to <html> before React
    // hydrates, so the server/client class list intentionally differs on this element.
    <html lang='en' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn('font-sans antialiased', geist.variable, manrope.variable, geistMono.variable)}
      >
        {/* Enables scroll-reveal only when JS is live, before first paint — so no-JS renders visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-enabled')" }} />
        <div className='m-auto flex h-full max-w-[1440px] flex-col px-4'>
          <AppBar />
          <main className='relative flex-1'>
            <div className='relative h-full'>{children}</div>
          </main>
          <SiteFooter />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

async function AppBar() {
  return (
    <header className='flex items-center justify-between py-8'>
      <Logo />
      <Navigation />
    </header>
  );
}
