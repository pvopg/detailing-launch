import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { landingContent, refundPolicy } from '@/features/marketing/content';
import { getURL } from '@/utils/get-url';

const supportEmail = landingContent.footer.supportEmail;
const canonical = getURL(refundPolicy.route);

export const metadata: Metadata = {
  title: `Refund Policy — ${refundPolicy.tradeName}`,
  description:
    `${refundPolicy.tradeName} refund policy: a 72-hour Three-Day Fit Guarantee for one-time digital purchases, how refunds affect portal access, and how to request one.`,
  alternates: { canonical },
  // Public legal page — must be indexable and readable without authentication.
  robots: { index: true, follow: true },
};

export default function RefundPolicyPage() {
  return (
    <Container className='py-12 lg:py-16'>
      <article className='mx-auto flex max-w-3xl flex-col gap-8 text-foreground'>
        <header className='flex flex-col gap-2'>
          <h1>Refund Policy</h1>
          <p className='text-sm text-muted-foreground'>Effective: {refundPolicy.effectiveDate}</p>
        </header>

        <p>
          {refundPolicy.tradeName} products are one-time digital purchases that provide immediate access to
          educational guides, interactive tools, templates, and other portal content. Because access is provided
          immediately, purchases are covered by the following limited refund policy.
        </p>

        <Section title='Three-Day Fit Guarantee'>
          <p>
            You may request a full refund within 72 hours of your purchase if you determine that the product is not a
            good fit for your business.
          </p>
          <p>
            To request a refund, email{' '}
            <a className='font-medium text-brand hover:underline' href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>{' '}
            from the email address used for your purchase. Include the product you purchased, your receipt or
            transaction number if available, and a brief explanation of your request.
          </p>
          <p>
            Exploring the portal, opening introductory material, or beginning a guide does not automatically make a
            purchase ineligible. However, we may decline a change-of-mind refund if, before submitting the request,
            you have:
          </p>
          <List
            items={[
              'Completed more than two Foundation guides;',
              "Completed any Business Systems tool, meaning all of that tool's required items or decisions have been finalized; or",
              'Otherwise used the portal in a manner that reasonably demonstrates substantial consumption of the paid materials.',
            ]}
          />
          <p>
            We will determine usage from the portal activity associated with your account as of the time your refund
            request was received.
          </p>
        </Section>

        <Section title='Issues We Will Correct'>
          <p>Please contact us if:</p>
          <List
            items={[
              'You were charged more than once for the same product;',
              'You received access to the wrong product;',
              'You cannot access the paid portal because of a material technical problem caused by ' +
                refundPolicy.tradeName + '; or',
              'The product materially differs from its description on the sales page.',
            ]}
          />
          <p>
            We will first attempt to correct billing, access, or technical issues. If we cannot resolve a qualifying
            problem within a reasonable time, we may issue a refund even when the standard 72-hour period has passed.
          </p>
        </Section>

        <Section title='Refund Exclusions'>
          <p>Refunds generally will not be issued because:</p>
          <List
            items={[
              'The request was submitted more than 72 hours after purchase;',
              'The paid materials were substantially completed or used before the request was submitted;',
              'You changed your mind after receiving and substantially using the knowledge or tools;',
              'You did not have time to use or implement the materials;',
              "You expected hands-on detailing instruction, certification, licensing assistance, legal advice, tax advice, insurance recommendations, equipment recommendations, or other content identified as outside the product's scope;",
              'You purchased third-party software, subscriptions, domains, or services recommended or referenced in the portal;',
              'You are dissatisfied with a third-party product or provider; or',
              'The product did not produce a particular amount of revenue or a specific business result.',
            ]}
          />
          <p>
            {refundPolicy.tradeName} provides educational and business-organization resources. Results depend on your
            market, effort, pricing, services, execution, and other factors outside our control.
          </p>
        </Section>

        <Section title='Access After a Refund'>
          <p>A full refund ends the access granted by the refunded purchase.</p>
          <List
            items={[
              'Refunding the Foundation Kit ends the Foundation access granted by that purchase.',
              'Refunding the Business Systems Kit ends Business Systems access and the Foundation access included with that purchase, unless another valid purchase independently grants access.',
              'Refunding one of two duplicate charges must not end access supported by the remaining valid charge.',
            ]}
          />
          <p>
            You may purchase the product again later. Access will be restored after the new payment is successfully
            confirmed.
          </p>
          <p>
            A partial goodwill refund does not end portal access unless we expressly agree otherwise in writing.
          </p>
          <p>Refunds for discounted or promotional purchases are limited to the amount actually paid.</p>
        </Section>

        <Section title='Approved Refunds'>
          <p>
            Approved refunds are returned to the original payment method. We cannot send a refund to a different card,
            account, or person.
          </p>
          <p>
            Refunds usually appear within approximately 5–10 business days, although the timing depends on the
            customer&apos;s bank or card provider. A refund issued soon after purchase may appear as a reversal of the
            original charge instead of a separate credit.
          </p>
        </Section>

        <Section title='Payment Disputes'>
          <p>
            Please contact us before filing a chargeback or payment dispute so we have an opportunity to resolve the
            issue.
          </p>
          <p>
            If you open a chargeback or payment dispute, access associated with the disputed purchase will be revoked.
            If the dispute is resolved in your favor and the payment is restored, contact us to have your access
            reviewed.
          </p>
        </Section>

        <Section title='Your Legal Rights'>
          <p>
            Nothing in this policy limits any consumer rights that cannot legally be waived. If applicable law requires
            a different result, that law will control.
          </p>
        </Section>

        <Section title='Contact'>
          <p>Questions and refund requests may be sent to:</p>
          <p className='flex flex-col'>
            <span className='font-medium text-foreground'>
              {refundPolicy.legalName} operating as {refundPolicy.tradeName}
            </span>
            <a className='font-medium text-brand hover:underline' href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
          </p>
        </Section>
      </article>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className='flex list-disc flex-col gap-2 pl-6 text-muted-foreground'>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
