import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { IoAlertCircle, IoArrowBack, IoArrowDown, IoArrowForward, IoCheckmarkCircle } from 'react-icons/io5';

import { Button } from '@/components/ui/button';

import type { GuideContent, GuideTint } from '../guides/types';
import type { PortalModule } from '../portal-navigation';

import { GuideChecklist } from './guide-checklist';

const chipClass: Record<GuideTint, string> = {
  blue: 'bg-brand-50 text-brand-600',
  purple: 'bg-feature-purple text-feature-purple-ink',
  cyan: 'bg-feature-cyan text-feature-cyan-ink',
  green: 'bg-feature-green text-feature-green-ink',
  amber: 'bg-feature-amber text-feature-amber-ink',
};

export function GuideTemplate({
  guide,
  initialCompleted,
  neighbors,
}: {
  guide: GuideContent;
  initialCompleted: string[];
  neighbors: { prev?: PortalModule; next?: PortalModule };
}) {
  const essentialCount = guide.checklist.filter((item) => item.priority === 'essential').length;

  return (
    <article className='mx-auto flex max-w-3xl flex-col gap-10 py-10'>
      <Link href='/portal' className='flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-brand'>
        <IoArrowBack /> Back to portal
      </Link>

      <header className='flex flex-col gap-3'>
        <span className={`label w-fit rounded-pill px-3 py-1.5 ${chipClass[guide.tint]}`}>Foundation guide</span>
        <h1>{guide.title}</h1>
        <p className='text-lg text-muted-foreground'>{guide.outcome}</p>
        <p className='text-sm text-muted-foreground'>
          ~{guide.estimatedMinutes} min · {essentialCount} essential steps
        </p>
      </header>

      <Section title='What this system does'>
        <p className='text-muted-foreground'>{guide.whatItDoes}</p>
      </Section>

      <Section title='Why it matters'>
        <p className='text-muted-foreground'>{guide.whyItMatters}</p>
      </Section>

      {guide.diagram && (
        <ol className='flex flex-col'>
          {guide.diagram.map((step, index) => (
            <li key={step} className='flex flex-col items-center'>
              <span className='w-full rounded-sm border border-border bg-muted px-4 py-3 text-center font-medium'>
                {step}
              </span>
              {index < guide.diagram!.length - 1 && <IoArrowDown className='my-1 text-muted-foreground' aria-hidden />}
            </li>
          ))}
        </ol>
      )}

      {guide.callouts?.map((callout, index) => (
        <div
          key={index}
          className={`rounded-sm border-l-4 p-4 ${
            callout.tone === 'warning' ? 'border-feature-amber-ink bg-feature-amber' : 'border-brand-500 bg-brand-50'
          }`}
        >
          <p className='text-sm text-foreground'>{callout.body}</p>
        </div>
      ))}

      <Section title='What “good enough to launch” looks like'>
        <ul className='flex flex-col gap-2'>
          {guide.goodEnoughToLaunch.map((point) => (
            <li key={point} className='flex items-start gap-2'>
              <IoCheckmarkCircle className='mt-0.5 flex-shrink-0 text-feature-green-ink' />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {guide.examples && (
        <dl className='flex flex-col gap-1 rounded-sm border border-border bg-muted p-4 text-sm'>
          {guide.examples.map((example) => (
            <div key={example.label} className='flex flex-wrap gap-2'>
              <dt className='font-medium text-foreground'>{example.label}:</dt>
              <dd className='text-muted-foreground'>{example.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <GuideChecklist
        guideSlug={guide.slug}
        items={guide.checklist}
        initialCompleted={initialCompleted}
        tint={guide.tint}
      />

      {guide.commonMistakes && (
        <Section title='Common mistakes'>
          <ul className='flex flex-col gap-2'>
            {guide.commonMistakes.map((mistake) => (
              <li key={mistake} className='flex items-start gap-2'>
                <IoAlertCircle className='mt-0.5 flex-shrink-0 text-feature-amber-ink' />
                <span className='text-muted-foreground'>{mistake}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {guide.vendorLinks && (
        <Section title='Official instructions'>
          <ul className='flex flex-col gap-2'>
            {guide.vendorLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-1 text-brand underline underline-offset-4'
                >
                  {link.label}
                  <IoArrowForward className='text-xs' />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <nav className='flex items-center justify-between gap-4 border-t border-border pt-6'>
        {neighbors.prev ? (
          <Link
            href={`/portal/${neighbors.prev.slug}`}
            className='flex items-center gap-2 text-sm text-muted-foreground hover:text-brand'
          >
            <IoArrowBack /> {neighbors.prev.title}
          </Link>
        ) : (
          <span />
        )}
        {neighbors.next && (
          <Button asChild variant='brand'>
            <Link href={`/portal/${neighbors.next.slug}`}>
              Continue: {neighbors.next.title} <IoArrowForward />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className='flex flex-col gap-3'>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
