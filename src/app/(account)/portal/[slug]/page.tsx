import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';
import { GuideTemplate } from '@/features/portal/components/guide-template';
import { getGuideCompletedItems } from '@/features/portal/controllers/get-guide-progress';
import { getModuleState } from '@/features/portal/controllers/get-module-state';
import { getGuide } from '@/features/portal/guides';
import { getFoundationNeighbors, getPortalModule, isModuleUnlocked } from '@/features/portal/portal-navigation';
import { getTool } from '@/features/portal/tools';

export default async function PortalModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portalModule = getPortalModule(slug);

  if (!portalModule) {
    notFound();
  }

  const [session, entitlements] = await Promise.all([getSession(), getEntitlements()]);

  if (!session) {
    redirect('/login');
  }

  // Enforce the entitlement gate server-side — locked modules are never rendered.
  if (!isModuleUnlocked(portalModule, entitlements)) {
    redirect('/pricing');
  }

  // Foundation guide with authored content → full guide template with saved progress.
  const guide = getGuide(slug);
  if (guide) {
    const completed = await getGuideCompletedItems(slug);
    return (
      <GuideTemplate guide={guide} initialCompleted={[...completed]} neighbors={getFoundationNeighbors(slug)} />
    );
  }

  // Business Systems tool with an authored implementation → interactive tool with saved state.
  const Tool = getTool(slug);
  if (Tool) {
    const initialState = await getModuleState(slug);
    return <Tool moduleKey={slug} initialState={initialState} />;
  }

  // Module without authored content yet → scaffold.
  return (
    <section className='flex max-w-3xl flex-col gap-8 py-10'>
      <Link href='/portal' className='flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-brand'>
        <IoArrowBack /> Back to portal
      </Link>

      <div className='flex flex-col gap-3'>
        <span className='text-sm font-semibold uppercase tracking-wide text-brand'>
          {portalModule.tier === 'business_systems' ? 'Business Systems' : 'Foundation'} ·{' '}
          {portalModule.kind === 'tool' ? 'Interactive tool' : 'Guide'}
        </span>
        <h1>{portalModule.title}</h1>
        <p className='text-lg text-muted-foreground'>{portalModule.description}</p>
      </div>

      <div className='rounded-lg border border-dashed border-border bg-card p-8 text-muted-foreground'>
        This module’s content is being built. Its saved{' '}
        {portalModule.persistence === 'portal_module_state' ? 'tool state' : 'progress'} will live in the{' '}
        <code className='text-foreground'>{portalModule.persistence}</code> table, keyed to your account.
      </div>
    </section>
  );
}
