import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';

export default async function AccountPage() {
  const [session, entitlements] = await Promise.all([getSession(), getEntitlements()]);

  if (!session) {
    redirect('/login');
  }

  const hasAnyAccess = entitlements.hasFoundation || entitlements.hasBusinessSystems;

  return (
    <section className='py-16'>
      <h1 className='mb-8 text-center'>Account</h1>

      <div className='flex flex-col gap-4'>
        <Card
          title='Your Access'
          footer={
            hasAnyAccess ? (
              <div className='flex flex-wrap gap-2'>
                <Button size='sm' variant='brand' asChild>
                  <Link href='/portal'>Open portal</Link>
                </Button>
                <Button size='sm' variant='secondary' asChild>
                  <Link href='/manage-subscription'>Manage billing</Link>
                </Button>
              </div>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/pricing'>View kits</Link>
              </Button>
            )
          }
        >
          {hasAnyAccess ? (
            <ul className='flex flex-col gap-2'>
              <AccessItem label='Mobile Detailing Digital Foundation Kit' granted={entitlements.hasFoundation} />
              <AccessItem label='Mobile Detailing Business Systems Kit' granted={entitlements.hasBusinessSystems} />
            </ul>
          ) : (
            <p>You don&apos;t have access to any kits yet.</p>
          )}
        </Card>
      </div>
    </section>
  );
}

function AccessItem({ label, granted }: { label: string; granted: boolean }) {
  return (
    <li className='flex items-center justify-between gap-4'>
      <span>{label}</span>
      <span className={granted ? 'font-semibold text-feature-green-ink' : 'text-muted-foreground'}>
        {granted ? 'Unlocked' : 'Locked'}
      </span>
    </li>
  );
}

function Card({
  title,
  footer,
  children,
}: PropsWithChildren<{
  title: string;
  footer?: ReactNode;
}>) {
  return (
    <div className='m-auto w-full max-w-3xl rounded-lg border border-border bg-card shadow-sm'>
      <div className='p-6'>
        <h2 className='mb-1 text-xl font-semibold'>{title}</h2>
        <div className='py-4'>{children}</div>
      </div>
      <div className='flex justify-end rounded-b-lg border-t border-border p-4'>{footer}</div>
    </div>
  );
}
