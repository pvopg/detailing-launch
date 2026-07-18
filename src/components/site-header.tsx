'use client';

import { ReactNode, useEffect, useState } from 'react';

import { Logo } from '@/components/logo';
import { cn } from '@/utils/cn';

/**
 * Sticky top bar with a "reveal on scroll up" behavior. It sits transparent and roomy at the top of
 * the page, condenses to a frosted, bordered bar once scrolled, hides itself when the user scrolls
 * down (so it stays out of the way while reading), and slides back into view the moment they scroll
 * back up. `nav` is passed in from the server layout so the session-aware <Navigation> can stay a
 * server component while the scroll state lives on the client.
 */
export function SiteHeader({ nav }: { nav: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      setScrolled(y > 8);

      if (y > lastY && y > 96) {
        // Scrolling down and past the bar's own height — tuck it away.
        setHidden(true);
      } else if (y < lastY) {
        // Any upward movement reveals it immediately.
        setHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update(); // sync on mount in case the page loads already scrolled (e.g. anchor / back-nav)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300 will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? 'border-border/60 bg-background/80 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70'
          : 'border-transparent bg-transparent'
      )}
    >
      <div
        className={cn(
          'm-auto flex max-w-[1440px] items-center justify-between px-4 transition-[padding] duration-300',
          scrolled ? 'py-3' : 'py-8'
        )}
      >
        <Logo />
        {nav}
      </div>
    </header>
  );
}
