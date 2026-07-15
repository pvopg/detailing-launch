'use client';

import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper: slides its target ~20px from a direction while fading in, once, the first
 * time it enters the viewport. Pairs with the CSS in globals.css.
 *
 * Safe by construction: the target is fully visible unless `.reveal-enabled` is on <html> (set by a
 * pre-paint script only when JS runs) and reduced-motion users are forced visible in CSS. If the
 * observer is unavailable, the target is shown immediately.
 *
 * Renders AS the given element (`as`) so it can replace a card/li/figure without adding a wrapper
 * that would break grid or list semantics.
 */
type Direction = 'up' | 'left' | 'right';

/** Subtle offset for the "tasteful" motion setting. */
const OFFSET = '20px';

function directionVars(direction: Direction): CSSProperties {
  switch (direction) {
    case 'left':
      return { '--reveal-x': `-${OFFSET}` } as CSSProperties;
    case 'right':
      return { '--reveal-x': OFFSET } as CSSProperties;
    case 'up':
    default:
      return { '--reveal-y': OFFSET } as CSSProperties;
  }
}

export function Reveal({
  as,
  direction = 'up',
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  direction?: Direction;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = (as ?? 'div') as ElementType;

  return (
    <Comp
      // ElementType + intrinsic ref: the ref lands on the rendered DOM node.
      ref={ref as never}
      data-reveal
      className={className}
      style={{ '--reveal-delay': `${delay}ms`, ...directionVars(direction), ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  );
}
