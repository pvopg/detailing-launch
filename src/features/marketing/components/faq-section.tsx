'use client';

import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

import { Container } from '@/components/container';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/utils/cn';

import { track } from '../analytics';
import { type FaqItem, landingContent, resolveFaqAnswer } from '../content';

/**
 * FAQ — an accessible accordion over Radix Collapsible. Answers mirror the visible page claims. The
 * refund item is launch-safe: it renders approved copy only when `refundPolicyApproved` is true, and
 * otherwise shows a placeholder that explicitly does NOT present the draft policy as final.
 */
export function FaqSection() {
  const { faq } = landingContent;
  return (
    <Container id='faq' className='scroll-mt-24'>
      <div className='mx-auto flex max-w-3xl flex-col gap-8'>
        <h2 className='text-center'>{faq.heading}</h2>
        <div className='flex flex-col gap-3'>
          {faq.items.map((item) => (
            <FaqRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const answer = resolveFaqAnswer(item);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) track('faq_open', { id: item.id });
  }

  return (
    <Collapsible open={open} onOpenChange={handleOpenChange} className='rounded-lg border border-border bg-card'>
      <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'>
        {item.question}
        <IoChevronDown
          className={cn('flex-shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
        <p className='px-5 pb-5 text-sm text-muted-foreground'>{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
