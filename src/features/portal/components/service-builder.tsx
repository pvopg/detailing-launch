'use client';

import { useState } from 'react';
import { IoAddOutline, IoCloseOutline, IoPricetagOutline, IoTimeOutline, IoTrashOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Json } from '@/libs/supabase/types';

import { useModuleState } from '../hooks/use-module-state';
import { getPortalModule } from '../portal-navigation';
import { createServicePackage, normalizeServiceBuilderState } from '../tools/normalize';
import { formatCurrency, formatDuration } from '../tools/pricing';
import type { ServiceBuilderState, ServicePackage } from '../tools/types';

import { Field, NumberInput, TextInput } from './tool-fields';
import { ToolShell } from './tool-shell';

export function ServiceBuilder({ moduleKey, initialState }: { moduleKey: string; initialState: Json | null }) {
  const portalModule = getPortalModule(moduleKey);
  const { state, setState, status } = useModuleState<ServiceBuilderState>(
    moduleKey,
    normalizeServiceBuilderState(initialState)
  );

  function addPackage() {
    setState((prev) => ({ packages: [...prev.packages, createServicePackage()] }));
  }

  function updatePackage(id: string, patch: Partial<ServicePackage>) {
    setState((prev) => ({
      packages: prev.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...patch } : pkg)),
    }));
  }

  function removePackage(id: string) {
    setState((prev) => ({ packages: prev.packages.filter((pkg) => pkg.id !== id) }));
  }

  return (
    <ToolShell
      title={portalModule?.title ?? 'Service & package builder'}
      description={portalModule?.description ?? ''}
      status={status}
    >
      {state.packages.length === 0 ? (
        <EmptyState onCreate={addPackage} />
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='grid gap-6 lg:grid-cols-2'>
            {state.packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onChange={(patch) => updatePackage(pkg.id, patch)}
                onRemove={() => removePackage(pkg.id)}
              />
            ))}
          </div>
          <Button variant='secondary' className='w-fit' onClick={addPackage}>
            <IoAddOutline /> Add package
          </Button>
        </div>
      )}
    </ToolShell>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className='flex flex-col items-start gap-4 rounded-lg border border-dashed border-border bg-card p-8'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-lg'>Build your service menu</h3>
        <p className='text-muted-foreground'>
          Define each service or package once — its price, how long it takes, and what’s included — and reuse it across
          quotes and your website.
        </p>
      </div>
      <Button variant='brand' onClick={onCreate}>
        <IoAddOutline /> Add your first package
      </Button>
    </div>
  );
}

function PackageCard({
  pkg,
  onChange,
  onRemove,
}: {
  pkg: ServicePackage;
  onChange: (patch: Partial<ServicePackage>) => void;
  onRemove: () => void;
}) {
  return (
    <div className='flex flex-col gap-5 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-start justify-between gap-3'>
          <Field label='Package name' htmlFor={`name-${pkg.id}`} className='flex-1'>
            <TextInput
              id={`name-${pkg.id}`}
              value={pkg.name}
              onValueChange={(name) => onChange({ name })}
              placeholder='e.g. Signature Full Detail'
            />
          </Field>
          <button
            type='button'
            onClick={onRemove}
            aria-label='Delete package'
            className='mt-8 text-muted-foreground transition-colors hover:text-destructive'
          >
            <IoTrashOutline />
          </button>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          <Field label='Category' htmlFor={`category-${pkg.id}`}>
            <TextInput
              id={`category-${pkg.id}`}
              value={pkg.category}
              onValueChange={(category) => onChange({ category })}
              placeholder='Exterior'
            />
          </Field>
          <Field label='Price' htmlFor={`price-${pkg.id}`}>
            <NumberInput
              id={`price-${pkg.id}`}
              value={pkg.price}
              onValueChange={(price) => onChange({ price })}
              prefix='$'
            />
          </Field>
          <Field label='Duration' htmlFor={`duration-${pkg.id}`}>
            <NumberInput
              id={`duration-${pkg.id}`}
              value={pkg.durationMinutes}
              onValueChange={(durationMinutes) => onChange({ durationMinutes })}
              suffix='min'
            />
          </Field>
        </div>

        <Field label='Description' htmlFor={`description-${pkg.id}`}>
          <textarea
            id={`description-${pkg.id}`}
            value={pkg.description}
            onChange={(event) => onChange({ description: event.target.value })}
            rows={2}
            placeholder='Who it’s for and what makes it worth the price.'
            className='flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground'
          />
        </Field>

        <IncludesEditor
          pkgId={pkg.id}
          includes={pkg.includes}
          onChange={(includes) => onChange({ includes })}
        />
      </div>

      <div className='flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground'>
        <span className='flex items-center gap-1.5'>
          <IoPricetagOutline /> {formatCurrency(pkg.price)}
        </span>
        <span className='flex items-center gap-1.5'>
          <IoTimeOutline /> {formatDuration(pkg.durationMinutes)}
        </span>
        {pkg.category.trim() && (
          <span className='rounded-pill bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground'>{pkg.category}</span>
        )}
      </div>
    </div>
  );
}

function IncludesEditor({
  pkgId,
  includes,
  onChange,
}: {
  pkgId: string;
  includes: string[];
  onChange: (includes: string[]) => void;
}) {
  const [draft, setDraft] = useState('');

  function addItem() {
    const value = draft.trim();
    if (!value) return;
    onChange([...includes, value]);
    setDraft('');
  }

  function updateItem(index: number, value: string) {
    onChange(includes.map((item, i) => (i === index ? value : item)));
  }

  function removeItem(index: number) {
    onChange(includes.filter((_, i) => i !== index));
  }

  return (
    <Field label="What's included">
      <div className='flex flex-col gap-2'>
        {includes.map((item, index) => (
          <div key={`${pkgId}-${index}`} className='flex items-center gap-2'>
            <Input value={item} onChange={(event) => updateItem(index, event.target.value)} className='h-9' />
            <button
              type='button'
              onClick={() => removeItem(index)}
              aria-label={`Remove item ${index + 1}`}
              className='flex-shrink-0 text-muted-foreground transition-colors hover:text-destructive'
            >
              <IoCloseOutline />
            </button>
          </div>
        ))}
        <div className='flex items-center gap-2'>
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addItem();
              }
            }}
            placeholder='Add an included item, then press Enter'
            className='h-9'
          />
          <Button type='button' variant='secondary' size='sm' onClick={addItem} disabled={!draft.trim()}>
            Add
          </Button>
        </div>
      </div>
    </Field>
  );
}
