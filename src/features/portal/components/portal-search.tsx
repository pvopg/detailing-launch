'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  IoArrowForward,
  IoDocumentTextOutline,
  IoLockClosed,
  IoSearchOutline,
  IoSparklesOutline,
} from 'react-icons/io5';

import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';

import { MIN_QUERY_LENGTH } from '../search/engine';
import { searchPortal } from '../search/search';
import type { PortalSearchResult, SearchResultType } from '../search/types';

const DEBOUNCE_MS = 200;
const MAX_QUERY_LENGTH = 100;

const TYPE_LABEL: Record<SearchResultType, string> = {
  guide: 'Guide',
  'guide-section': 'Guide section',
  'checklist-item': 'Checklist step',
  'checklist-example': 'Example',
  resource: 'Resource',
  message: 'Message',
  tool: 'Tool',
  feature: 'Feature',
};

const TIER_LABEL: Record<PortalSearchResult['requiredTier'], string> = {
  foundation: 'Foundation',
  business_systems: 'Business Systems',
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * Portal-wide search: a trigger button plus a modal (Radix Dialog — focus trap and focus-return are
 * handled by the primitive). Only the `searchPortal` server action and the result types are imported
 * here, so no protected content or index reaches the client bundle. Results are already minimized and
 * entitlement-filtered by the server.
 */
export function PortalSearch() {
  const [open, setOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut to open search.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type='button'
          className='flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-foreground sm:w-72'
        >
          <IoSearchOutline aria-hidden className='flex-shrink-0' />
          <span className='flex-1 text-left'>Search the portal…</span>
          <kbd className='hidden rounded-xs border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline'>
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Dialog.Content
          className='fixed left-1/2 top-4 z-50 flex max-h-[85vh] w-[calc(100vw-1rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-float data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:top-24'
          aria-label='Search the portal'
        >
          <Dialog.Title className='sr-only'>Search the portal</Dialog.Title>
          <Dialog.Description className='sr-only'>
            Search guides, checklist steps, tools, messages, and resources you have access to.
          </Dialog.Description>
          <SearchPanel onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PortalSearchResult[]>([]);
  // The query string the current `results` actually correspond to. Until a search settles for the
  // live query, we must not claim "no results" — otherwise the empty state flashes during the
  // debounce/request window before real results arrive.
  const [settledQuery, setSettledQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [errored, setErrored] = useState(false);
  const [isPending, startTransition] = useTransition();

  const trimmed = query.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH;
  const requestId = useRef(0);

  // Is the live query still waiting for its results? True from the moment a searchable query is
  // typed until the matching response settles. Drives the loading state and gates the empty state.
  const isSearching = trimmed.length >= MIN_QUERY_LENGTH && (settledQuery !== trimmed || isPending);

  // Debounced search. Each fired request carries an id; only the latest response is applied, so a
  // slow earlier request can't overwrite a newer one.
  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setSettledQuery('');
      setErrored(false);
      return;
    }

    const id = ++requestId.current;
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const next = await searchPortal(trimmed);
          if (id === requestId.current) {
            setResults(next);
            setActiveIndex(0);
            setErrored(false);
            setSettledQuery(trimmed);
          }
        } catch {
          if (id === requestId.current) {
            setResults([]);
            setErrored(true);
            setSettledQuery(trimmed);
          }
        }
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [trimmed]);

  const openResult = useCallback(
    (result: PortalSearchResult | undefined) => {
      if (!result) return;
      if (isExternal(result.href)) {
        window.open(result.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(result.href);
      }
      onNavigate();
    },
    [router, onNavigate]
  );

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      openResult(results[activeIndex]);
    }
  }

  const statusMessage = useMemo(() => {
    if (errored) return 'Search is unavailable. Try again.';
    if (trimmed.length < MIN_QUERY_LENGTH) return '';
    if (isSearching) return 'Searching…';
    return `${results.length} result${results.length === 1 ? '' : 's'} for “${trimmed}”`;
  }, [errored, trimmed, isSearching, results.length]);

  return (
    <>
      <div className='flex items-center gap-3 border-b border-border px-5 py-4'>
        <IoSearchOutline aria-hidden className='flex-shrink-0 text-muted-foreground' />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <Input
          autoFocus
          value={query}
          maxLength={MAX_QUERY_LENGTH}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder='Search guides, checklist steps, tools, messages…'
          className='h-9 border-0 bg-transparent px-2 focus-visible:ring-0'
          role='combobox'
          aria-expanded={results.length > 0}
          aria-controls='portal-search-results'
          aria-activedescendant={results[activeIndex] ? `result-${results[activeIndex].id}` : undefined}
          aria-label='Search the portal'
        />
      </div>

      {/* Polite live region announces the result count / status to assistive tech. */}
      <div className='sr-only' role='status' aria-live='polite'>
        {statusMessage}
      </div>

      <div id='portal-search-results' role='listbox' aria-label='Search results' className='overflow-y-auto p-2'>
        {trimmed.length < MIN_QUERY_LENGTH ? (
          <Hint>
            {tooShort
              ? 'Keep typing — at least two characters.'
              : 'Search guides, checklist steps, tools, messages, and resources.'}
          </Hint>
        ) : errored ? (
          <Hint>Search is unavailable right now. Your progress and navigation are unaffected — try again.</Hint>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <ResultRow
              key={result.id}
              result={result}
              active={index === activeIndex}
              onHover={() => setActiveIndex(index)}
              onSelect={() => openResult(result)}
            />
          ))
        ) : isSearching ? (
          <Hint>Searching…</Hint>
        ) : (
          <Hint>No portal results found for “{trimmed}”. Try a broader term.</Hint>
        )}
      </div>
    </>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className='px-5 py-8 text-center text-sm text-muted-foreground'>{children}</p>;
}

function ResultRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: PortalSearchResult;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  const locked = result.access === 'locked';

  return (
    <button
      type='button'
      id={`result-${result.id}`}
      role='option'
      aria-selected={active}
      onMouseMove={onHover}
      onClick={onSelect}
      className={cn(
        'flex w-full items-start gap-3.5 rounded-md px-4 py-3.5 text-left transition-colors',
        active ? 'bg-muted' : 'bg-transparent'
      )}
    >
      <span aria-hidden className={cn('mt-0.5 flex-shrink-0 text-lg', locked ? 'text-muted-foreground' : 'text-brand')}>
        {locked ? <IoLockClosed /> : result.type === 'tool' ? <IoSparklesOutline /> : <IoDocumentTextOutline />}
      </span>

      <span className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <span className='flex flex-wrap items-center gap-2'>
          <span className='truncate font-medium text-foreground'>{result.title}</span>
          <span className='label rounded-pill bg-muted px-2 py-0.5 text-[11px] text-muted-foreground'>
            {locked ? `${TIER_LABEL[result.requiredTier]} · Locked` : TYPE_LABEL[result.type]}
          </span>
        </span>

        {result.snippet ? (
          <Snippet text={result.snippet} />
        ) : result.description ? (
          <span className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>{result.description}</span>
        ) : null}

        {locked && (
          <span className='mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand'>
            Upgrade to access <IoArrowForward className='text-[10px]' aria-hidden />
          </span>
        )}
      </span>
    </button>
  );
}

/** Renders a plain-text snippet. Never uses dangerouslySetInnerHTML. */
function Snippet({ text }: { text: string }) {
  return <span className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>{text}</span>;
}
