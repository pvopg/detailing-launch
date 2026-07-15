'use client';

import { useEffect, useRef, useState } from 'react';

import type { Json } from '@/libs/supabase/types';

import { saveModuleState } from '../actions/save-module-state';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Owns a tool module's working state and transparently persists it to `portal_module_state`
 * via a debounced autosave. Every tool follows the same "your progress saves as you go" UX,
 * so this hook centralizes the save lifecycle and exposes a `status` for the shell to surface.
 *
 * The initial (loaded) state is never re-saved — only subsequent edits trigger a write.
 *
 * Pass `getDefaultState` to enable `reset()`, which returns the tool to its first-time-user state.
 * A reset flows through `setState`, so the same debounced autosave persists it — no separate path.
 */
export function useModuleState<T>(moduleKey: string, initialState: T, getDefaultState?: () => T) {
  const [state, setState] = useState<T>(initialState);
  const [status, setStatus] = useState<SaveStatus>('idle');

  const isInitial = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip the first run so loading a saved tool doesn't immediately re-save it.
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    setStatus('saving');
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const response = await saveModuleState(moduleKey, state as unknown as Json);
      setStatus(response?.error ? 'error' : 'saved');
    }, 700);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [state, moduleKey]);

  function reset() {
    if (getDefaultState) setState(getDefaultState());
  }

  return { state, setState, status, reset };
}
