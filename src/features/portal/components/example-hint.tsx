'use client';

import { useEffect, useState } from 'react';
import { IoHelpCircleOutline } from 'react-icons/io5';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Optional per-checklist-item help control. Renders nothing when there is no example.
 * Fine-pointer devices get a hover/focus tooltip; coarse-pointer (touch) devices get a tap popover.
 * Purely instructional — never affects checklist completion or progress.
 */
export function ExampleHint({ example, itemTitle }: { example?: string | null; itemTitle: string }) {
  const content = example?.trim();
  const coarsePointer = useCoarsePointer();

  if (!content) {
    return null;
  }

  const triggerLabel = `View example for ${itemTitle}`;
  const triggerClass =
    'inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-brand focus-visible:text-brand data-[state=open]:text-brand data-[state=delayed-open]:text-brand';
  const surfaceClass = 'max-w-[min(320px,calc(100vw-2rem))]';

  if (coarsePointer) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button type='button' aria-label={triggerLabel} className={triggerClass}>
            <IoHelpCircleOutline aria-hidden size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent collisionPadding={16} className={surfaceClass}>
          <ExampleBody example={content} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type='button' aria-label={triggerLabel} className={triggerClass}>
            <IoHelpCircleOutline aria-hidden size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent collisionPadding={16} className={surfaceClass}>
          <ExampleBody example={content} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ExampleBody({ example }: { example: string }) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='label text-brand'>Example</span>
      <p className='text-sm text-foreground'>{example}</p>
      <span className='text-xs text-muted-foreground'>Adapt this to your business.</span>
    </div>
  );
}

/** True on touch / coarse-pointer devices. SSR-safe: starts false, resolves after mount. */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return coarse;
}
