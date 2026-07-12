'use client';

import { useMemo, useState, useTransition } from 'react';

import { toast } from '@/components/ui/use-toast';

import { toggleChecklistItem } from '../actions/toggle-checklist-item';
import type { GuideChecklistItem, GuideTint } from '../guides/types';

import { ExampleHint } from './example-hint';

const barColor: Record<GuideTint, string> = {
  blue: 'bg-brand-500',
  purple: 'bg-feature-purple-ink',
  cyan: 'bg-feature-cyan-ink',
  green: 'bg-feature-green-ink',
  amber: 'bg-feature-amber-ink',
};

const priorityGroups = [
  { key: 'essential', label: 'Essential', hint: 'Required to launch' },
  { key: 'recommended', label: 'Recommended', hint: 'Do these soon' },
  { key: 'later', label: 'Later', hint: 'Nice to have' },
] as const;

export function GuideChecklist({
  guideSlug,
  items,
  initialCompleted,
  tint,
}: {
  guideSlug: string;
  items: GuideChecklistItem[];
  initialCompleted: string[];
  tint: GuideTint;
}) {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(initialCompleted));
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const essentials = useMemo(() => items.filter((item) => item.priority === 'essential'), [items]);
  const doneEssential = essentials.filter((item) => completed.has(item.id)).length;
  const percent = essentials.length ? Math.round((doneEssential / essentials.length) * 100) : 0;
  const isComplete = essentials.length > 0 && doneEssential === essentials.length;

  function toggle(item: GuideChecklistItem) {
    const next = !completed.has(item.id);

    // Optimistic update.
    setCompleted((prev) => {
      const updated = new Set(prev);
      next ? updated.add(item.id) : updated.delete(item.id);
      return updated;
    });

    startTransition(async () => {
      const response = await toggleChecklistItem(guideSlug, item.id, next);
      if (response?.error) {
        // Revert on failure.
        setCompleted((prev) => {
          const updated = new Set(prev);
          next ? updated.delete(item.id) : updated.add(item.id);
          return updated;
        });
        toast({ variant: 'destructive', description: 'Could not save your progress. Please try again.' });
      } else {
        setSavedAt(Date.now());
      }
    });
  }

  return (
    <div className='flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-4'>
          <span className='font-display text-lg font-semibold'>Checklist</span>
          <span className='text-sm text-muted-foreground' aria-live='polite'>
            {isComplete ? 'Guide complete' : `${doneEssential} of ${essentials.length} essentials`}
            {savedAt !== null && ' · Saved'}
          </span>
        </div>
        <div
          className='h-2 w-full overflow-hidden rounded-pill bg-ink-100'
          role='progressbar'
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label='Essential checklist progress'
        >
          <div
            className={`h-2 rounded-pill transition-all ${isComplete ? 'bg-feature-green-ink' : barColor[tint]}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {priorityGroups.map((group) => {
        const groupItems = items.filter((item) => item.priority === group.key);
        if (groupItems.length === 0) return null;

        return (
          <fieldset key={group.key} className='flex flex-col gap-2'>
            <legend className='mb-1 flex items-baseline gap-2'>
              <span className='label text-foreground'>{group.label}</span>
              <span className='text-xs text-muted-foreground'>{group.hint}</span>
            </legend>
            {groupItems.map((item) => {
              const isDone = completed.has(item.id);
              const inputId = `${guideSlug}-${item.id}`;
              return (
                <div
                  key={item.id}
                  className='flex items-start gap-3 rounded-sm border border-border p-4 transition-colors hover:bg-muted'
                >
                  <input
                    id={inputId}
                    type='checkbox'
                    checked={isDone}
                    onChange={() => toggle(item)}
                    className='mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-brand-500'
                  />
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-wrap items-center gap-x-1.5'>
                      <label
                        htmlFor={inputId}
                        className={
                          isDone
                            ? 'cursor-pointer text-muted-foreground line-through'
                            : 'cursor-pointer font-medium text-foreground'
                        }
                      >
                        {item.title}
                      </label>
                      <ExampleHint example={item.example} itemTitle={item.title} />
                    </div>
                    {item.description && <span className='text-sm text-muted-foreground'>{item.description}</span>}
                  </div>
                </div>
              );
            })}
          </fieldset>
        );
      })}
    </div>
  );
}
