import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoArrowForward, IoLockClosed } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { type Entitlements,getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';
import {
  BUSINESS_SYSTEMS_MODULES,
  FOUNDATION_MODULES,
  isModuleUnlocked,
  type PortalModule,
} from '@/features/portal/portal-navigation';

export default async function PortalPage() {
  const [session, entitlements] = await Promise.all([getSession(), getEntitlements()]);

  if (!session) {
    redirect('/login');
  }

  if (!entitlements.hasFoundation && !entitlements.hasBusinessSystems) {
    redirect('/pricing');
  }

  return (
    <section className='flex flex-col gap-16 py-10'>
      <div className='max-w-2xl'>
        <h1>Your portal</h1>
        <p className='mt-4 text-lg text-muted-foreground'>
          Work through the foundation, then put the systems into practice. Your progress saves as you go.
        </p>
      </div>

      <ModuleGroup
        title='Foundation'
        subtitle='What to build, and in what order.'
        modules={FOUNDATION_MODULES}
        entitlements={entitlements}
      />

      <ModuleGroup
        title='Business Systems'
        subtitle='Interactive tools to implement it.'
        modules={BUSINESS_SYSTEMS_MODULES}
        entitlements={entitlements}
        showUpgrade={!entitlements.hasBusinessSystems}
      />
    </section>
  );
}

function ModuleGroup({
  title,
  subtitle,
  modules,
  entitlements,
  showUpgrade,
}: {
  title: string;
  subtitle: string;
  modules: PortalModule[];
  entitlements: Entitlements;
  showUpgrade?: boolean;
}) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h2>{title}</h2>
          <p className='mt-1 text-muted-foreground'>{subtitle}</p>
        </div>
        {showUpgrade && (
          <Button asChild variant='sexy'>
            <Link href='/pricing'>Unlock Business Systems</Link>
          </Button>
        )}
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {modules.map((mod) => (
          <ModuleCard key={mod.slug} mod={mod} unlocked={isModuleUnlocked(mod, entitlements)} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ mod, unlocked }: { mod: PortalModule; unlocked: boolean }) {
  const content = (
    <div
      className={`flex h-full flex-col justify-between gap-6 rounded-lg border border-border bg-card p-5 transition-colors ${
        unlocked ? 'hover:border-brand' : 'opacity-60'
      }`}
    >
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg'>{mod.title}</h3>
        <p className='text-sm text-muted-foreground'>{mod.description}</p>
      </div>
      <span className='flex items-center gap-2 text-sm font-medium text-brand'>
        {unlocked ? (
          <>
            Open <IoArrowForward />
          </>
        ) : (
          <span className='flex items-center gap-2 text-muted-foreground'>
            <IoLockClosed /> Locked
          </span>
        )}
      </span>
    </div>
  );

  return unlocked ? <Link href={`/portal/${mod.slug}`}>{content}</Link> : content;
}
