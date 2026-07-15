import { PropsWithChildren } from 'react';
import Link from 'next/link';
import {
  IoAlertCircle,
  IoArrowBack,
  IoArrowDown,
  IoArrowForward,
  IoCheckmarkCircle,
  IoRemoveCircle,
} from 'react-icons/io5';

import { Button } from '@/components/ui/button';

import type { GuideContent, GuideTint, GuideVendorLink } from '../guides/types';
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

      {guide.terms && (
        <Section title='Key terms to understand'>
          <dl className='flex flex-col gap-2'>
            {guide.terms.map((term) => (
              <div key={term.term} className='flex flex-col gap-0.5'>
                <dt className='font-medium text-foreground'>{term.term}</dt>
                <dd className='text-muted-foreground'>{term.definition}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title='Why it matters'>
        {typeof guide.whyItMatters === 'string' ? (
          <p className='text-muted-foreground'>{guide.whyItMatters}</p>
        ) : (
          <dl className='flex flex-col gap-3'>
            {guide.whyItMatters.map((reason) => (
              <div key={reason.heading} className='flex flex-col gap-0.5'>
                <dt className='font-medium text-foreground'>{reason.heading}</dt>
                <dd className='text-muted-foreground'>{reason.body}</dd>
              </div>
            ))}
          </dl>
        )}
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
        {guide.notRequiredYet && (
          <div className='mt-2 flex flex-col gap-2'>
            <span className='label text-muted-foreground'>Not required yet</span>
            <ul className='flex flex-col gap-2'>
              {guide.notRequiredYet.map((point) => (
                <li key={point} className='flex items-start gap-2 text-muted-foreground'>
                  <IoRemoveCircle className='mt-0.5 flex-shrink-0' aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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

      {guide.tables?.map((table, index) => (
        <Section key={table.title ?? index} title={table.title ?? 'Reference table'}>
          <div className='overflow-x-auto rounded-sm border border-border'>
            <table className='w-full border-collapse text-left text-sm'>
              {table.caption && (
                <caption className='px-4 pt-3 text-left text-sm text-muted-foreground'>{table.caption}</caption>
              )}
              <thead>
                <tr className='border-b border-border bg-muted'>
                  {table.columns.map((column) => (
                    <th key={column} scope='col' className='px-4 py-2 align-top font-medium text-foreground'>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className='border-b border-border last:border-b-0'>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={
                          cellIndex === 0
                            ? 'px-4 py-2 align-top font-medium text-foreground'
                            : 'px-4 py-2 align-top text-muted-foreground'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note && <p className='text-sm text-muted-foreground'>{table.note}</p>}
        </Section>
      ))}

      {guide.timeline && (
        <Section title={guide.timeline.title}>
          {guide.timeline.intro && <p className='text-muted-foreground'>{guide.timeline.intro}</p>}
          <ol className='flex flex-col gap-4'>
            {guide.timeline.phases.map((phase) => (
              <li key={phase.heading} className='flex flex-col gap-2 rounded-sm border-l-4 border-border pl-4'>
                <h4 className='font-medium text-foreground'>{phase.heading}</h4>
                <ul className='flex flex-col gap-1.5'>
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className='flex items-start gap-2 text-muted-foreground'>
                      <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground' aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <GuideChecklist
        guideSlug={guide.slug}
        items={guide.checklist}
        initialCompleted={initialCompleted}
        tint={guide.tint}
      />

      {guide.detailBlocks?.map((block) => (
        <Section key={block.title} title={block.title}>
          {block.body && <p className='text-muted-foreground'>{block.body}</p>}
          {block.bullets && (
            <ul className='flex flex-col gap-2'>
              {block.bullets.map((bullet) => (
                <li key={bullet} className='flex items-start gap-2 text-muted-foreground'>
                  <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground' aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {block.items && (
            <dl className='flex flex-col gap-3'>
              {block.items.map((item) => (
                <div key={item.heading} className='flex flex-col gap-0.5'>
                  <dt className='font-medium text-foreground'>{item.heading}</dt>
                  <dd className='text-muted-foreground'>{item.body}</dd>
                </div>
              ))}
            </dl>
          )}
        </Section>
      ))}

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

      {(guide.vendorLinks || guide.vendorLinkGroups) && (
        <Section title='Official instructions'>
          {guide.vendorLinks && <VendorLinkList links={guide.vendorLinks} />}
          {guide.vendorLinkGroups?.map((group) => (
            <div key={group.heading} className='flex flex-col gap-2'>
              <h4 className='label text-foreground'>{group.heading}</h4>
              <VendorLinkList links={group.links} />
            </div>
          ))}
        </Section>
      )}

      {guide.disclaimer && (
        <p className='border-t border-border pt-6 text-sm text-muted-foreground'>{guide.disclaimer}</p>
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

function VendorLinkList({ links }: { links: GuideVendorLink[] }) {
  return (
    <ul className='flex flex-col gap-2'>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-1 text-brand underline underline-offset-4'
          >
            {link.label}
            <IoArrowForward className='text-xs' aria-label='(opens in a new tab)' />
          </a>
        </li>
      ))}
    </ul>
  );
}
