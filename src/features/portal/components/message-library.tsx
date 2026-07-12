'use client';

import { useMemo, useState } from 'react';
import { IoAddOutline, IoCheckmarkOutline, IoCopyOutline, IoTrashOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import type { Json } from '@/libs/supabase/types';
import { cn } from '@/utils/cn';

import { useModuleState } from '../hooks/use-module-state';
import { getPortalModule } from '../portal-navigation';
import { createSavedMessage, normalizeMessageLibraryState } from '../tools/normalize';
import type { MessageCategory, MessageLibraryState, SavedMessage } from '../tools/types';

import { Field, TextInput } from './tool-fields';
import { ToolShell } from './tool-shell';

const CATEGORY_LABELS: Record<MessageCategory, string> = {
  inquiry: 'Inquiry reply',
  quote: 'Quote',
  reminder: 'Reminder',
  review: 'Review request',
  'follow-up': 'Follow-up',
  other: 'Other',
};

const CATEGORY_ORDER: MessageCategory[] = ['inquiry', 'quote', 'reminder', 'review', 'follow-up', 'other'];

/** Pulls {placeholder} tokens out of a message body so the detailer sees what to fill in. */
function extractPlaceholders(body: string): string[] {
  const matches = body.match(/\{[^{}]+\}/g) ?? [];
  return Array.from(new Set(matches));
}

export function MessageLibrary({ moduleKey, initialState }: { moduleKey: string; initialState: Json | null }) {
  const portalModule = getPortalModule(moduleKey);
  const { state, setState, status, reset } = useModuleState<MessageLibraryState>(
    moduleKey,
    normalizeMessageLibraryState(initialState),
    () => normalizeMessageLibraryState(null)
  );

  function addMessage() {
    setState((prev) => ({ messages: [...prev.messages, createSavedMessage()] }));
  }

  function updateMessage(id: string, patch: Partial<SavedMessage>) {
    setState((prev) => ({
      messages: prev.messages.map((message) => (message.id === id ? { ...message, ...patch } : message)),
    }));
  }

  function removeMessage(id: string) {
    setState((prev) => ({ messages: prev.messages.filter((message) => message.id !== id) }));
  }

  return (
    <ToolShell
      title={portalModule?.title ?? 'Personalized message library'}
      description={portalModule?.description ?? ''}
      status={status}
      onReset={reset}
    >
      {state.messages.length === 0 ? (
        <EmptyState onCreate={addMessage} />
      ) : (
        <div className='flex flex-col gap-6'>
          <p className='max-w-2xl text-sm text-muted-foreground'>
            Write each message once, in your own voice. Wrap details you swap per customer in curly braces — like{' '}
            <code className='rounded bg-muted px-1 text-foreground'>{'{name}'}</code> or{' '}
            <code className='rounded bg-muted px-1 text-foreground'>{'{date}'}</code> — so you remember to fill them in
            before sending.
          </p>
          <div className='grid gap-6 lg:grid-cols-2'>
            {state.messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onChange={(patch) => updateMessage(message.id, patch)}
                onRemove={() => removeMessage(message.id)}
              />
            ))}
          </div>
          <Button variant='secondary' className='w-fit' onClick={addMessage}>
            <IoAddOutline /> Add message
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
        <h3 className='text-lg'>Stop rewriting the same texts</h3>
        <p className='text-muted-foreground'>
          Save the replies you send over and over — first responses, quote follow-ups, appointment reminders, review
          requests — and copy them in one tap when you need them.
        </p>
      </div>
      <Button variant='brand' onClick={onCreate}>
        <IoAddOutline /> Add your first message
      </Button>
    </div>
  );
}

function MessageCard({
  message,
  onChange,
  onRemove,
}: {
  message: SavedMessage;
  onChange: (patch: Partial<SavedMessage>) => void;
  onRemove: () => void;
}) {
  const placeholders = useMemo(() => extractPlaceholders(message.body), [message.body]);

  return (
    <div className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <Field label='Label' htmlFor={`label-${message.id}`} className='flex-1'>
          <TextInput
            id={`label-${message.id}`}
            value={message.label}
            onValueChange={(label) => onChange({ label })}
            placeholder='e.g. First reply to a DM'
          />
        </Field>
        <button
          type='button'
          onClick={onRemove}
          aria-label='Delete message'
          className='mt-8 text-muted-foreground transition-colors hover:text-destructive'
        >
          <IoTrashOutline />
        </button>
      </div>

      <Field label='Category' htmlFor={`category-${message.id}`}>
        <select
          id={`category-${message.id}`}
          value={message.category}
          onChange={(event) => onChange({ category: event.target.value as MessageCategory })}
          className='flex h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground transition-colors'
        >
          {CATEGORY_ORDER.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </Field>

      <Field label='Message' htmlFor={`body-${message.id}`}>
        <textarea
          id={`body-${message.id}`}
          value={message.body}
          onChange={(event) => onChange({ body: event.target.value })}
          rows={5}
          placeholder={'Hi {name}! Thanks for reaching out about a detail on your {vehicle}…'}
          className='flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground'
        />
      </Field>

      {placeholders.length > 0 && (
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-xs text-muted-foreground'>Fill in:</span>
          {placeholders.map((placeholder) => (
            <span
              key={placeholder}
              className='rounded-pill bg-feature-amber px-2.5 py-0.5 text-xs font-medium text-feature-amber-ink'
            >
              {placeholder}
            </span>
          ))}
        </div>
      )}

      <CopyButton body={message.body} />
    </div>
  );
}

function CopyButton({ body }: { body: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!body.trim()) return;
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); fail quietly rather than throw.
    }
  }

  return (
    <Button
      type='button'
      variant='outline'
      size='sm'
      className={cn('w-fit', copied && 'text-feature-green-ink')}
      onClick={copy}
      disabled={!body.trim()}
    >
      {copied ? <IoCheckmarkOutline /> : <IoCopyOutline />}
      {copied ? 'Copied' : 'Copy message'}
    </Button>
  );
}
