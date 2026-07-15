import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { ContinueCard, ModuleGrid, NextActionCard, ProgressSummary } from '@/features/portal/components/portal-home';
import { getPortalHomeProgress } from '@/features/portal/controllers/get-portal-progress';

export default async function PortalPage() {
  const [session, progress] = await Promise.all([getSession(), getPortalHomeProgress()]);

  if (!session) {
    redirect('/login');
  }

  const { entitlements } = progress;
  if (!entitlements.hasFoundation && !entitlements.hasBusinessSystems) {
    redirect('/pricing');
  }

  return (
    <section className='flex flex-col gap-12 py-10'>
      <div className='max-w-2xl'>
        <h1>Your portal</h1>
        <p className='mt-4 text-lg text-muted-foreground'>
          Pick up where you left off. Here’s how far you’ve come and the best next thing to do.
        </p>
      </div>

      <ProgressSummary foundation={progress.foundation} businessSystems={progress.businessSystems} />

      {progress.lastActivity ? (
        <div className='grid gap-4 lg:grid-cols-2'>
          <NextActionCard nextAction={progress.nextAction} />
          <ContinueCard destination={progress.lastActivity} />
        </div>
      ) : (
        <NextActionCard nextAction={progress.nextAction} />
      )}

      <ModuleGrid
        title='Foundation'
        subtitle='What to build, and in what order.'
        modules={progress.foundationModules}
      />

      <ModuleGrid
        title='Business Systems'
        subtitle='Interactive tools to implement it.'
        modules={progress.businessModules}
        showUpgrade={!entitlements.hasBusinessSystems}
      />
    </section>
  );
}
