'use client';

import { useEffect, useRef } from 'react';

import { type LandingEvent, track } from '../analytics';

/**
 * Fires a landing analytics event the first time its children scroll into view. Purely a measurement
 * wrapper — it renders its children unchanged and adds no visual layout — so it stays accessible and
 * has no effect when analytics has no listener. Respects that it should fire at most once.
 */
export function TrackInView({
  event,
  meta,
  children,
}: {
  event: LandingEvent;
  meta?: Record<string, string | number | boolean>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    // The wrapper is `display: contents` (no box), so observe its real child element instead —
    // an IntersectionObserver never fires on a contents element.
    const node = ref.current?.firstElementChild ?? ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            track(event, meta);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // `meta` is a stable literal from callers; intentionally not in deps to avoid re-observing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <div ref={ref} className='contents'>
      {children}
    </div>
  );
}

/** Fires `landing_view` once on mount. Rendered once near the top of the page. */
export function LandingViewBeacon() {
  useEffect(() => {
    track('landing_view');
  }, []);
  return null;
}
