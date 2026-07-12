import Link from 'next/link';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/features/pricing/components/pricing-section';

export default async function HomePage() {
  return (
    <div className='flex flex-col gap-20 py-8 lg:gap-28'>
      <HeroSection />
      <CapabilitiesSection />
      <PricingSection />
    </div>
  );
}

function HeroSection() {
  return (
    <Container className='px-0'>
      <section className='relative overflow-hidden rounded-2xl bg-brand-500 px-6 py-16 text-white shadow-md lg:px-16 lg:py-28'>
        <div className='relative z-10 flex max-w-[680px] flex-col gap-6'>
          <span className='label w-fit rounded-pill bg-white/15 px-3 py-2 text-white'>For solo & part-time detailers</span>
          <h1 className='text-white'>Turn your weekend detailing into a real business.</h1>
          <p className='max-w-xl text-lg text-brand-100'>
            You know how to do the work. We give you the digital system to capture leads, take booking and quote
            requests, collect deposits, follow up, and earn reviews — without stitching together ten tools.
          </p>
          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild variant='light'>
              <Link href='/signup'>Get started</Link>
            </Button>
            <Button asChild variant='outline' className='border-white/40 bg-transparent text-white hover:bg-white/10'>
              <Link href='/pricing'>See the kits</Link>
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}

const capabilities = [
  {
    eyebrow: 'Leads',
    title: 'Capture every inquiry',
    body: 'A professional presence and structured inquiry flow so texts, DMs, and referrals stop slipping through the cracks.',
    surface: 'bg-brand-50',
    accent: 'text-brand-600',
    wide: true,
  },
  {
    eyebrow: 'Payments',
    title: 'Get the deposit',
    body: 'Decide between instant booking and quote requests, and collect deposits and payments that actually land.',
    surface: 'bg-feature-cyan',
    accent: 'text-feature-cyan-ink',
  },
  {
    eyebrow: 'Follow-up',
    title: 'Never drop a customer',
    body: 'Track leads and customers, send reminders, and follow up on unanswered estimates on time.',
    surface: 'bg-feature-purple',
    accent: 'text-feature-purple-ink',
  },
  {
    eyebrow: 'Growth',
    title: 'Earn reviews & repeats',
    body: 'Turn finished jobs into reviews and repeat business with a repeatable lead-to-review workflow.',
    surface: 'bg-feature-green',
    accent: 'text-feature-green-ink',
  },
];

function CapabilitiesSection() {
  return (
    <Container>
      <div className='flex flex-col gap-10'>
        <div className='max-w-2xl'>
          <h2>Everything the business side needs — none of the detailing fluff.</h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            This isn’t a course on paint correction. It’s the digital foundation that makes a detailing business feel
            organized and legit.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className={`flex min-h-[16rem] flex-col justify-between gap-6 rounded-lg border border-border/60 p-6 lg:p-8 ${
                cap.surface
              } ${cap.wide ? 'lg:col-span-2' : ''}`}
            >
              <span className={`label ${cap.accent}`}>{cap.eyebrow}</span>
              <div className='flex flex-col gap-2'>
                <h3>{cap.title}</h3>
                <p className='max-w-md text-muted-foreground'>{cap.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
