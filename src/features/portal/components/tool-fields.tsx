'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

/** A labeled form control with an optional hint, shared across the interactive tools. */
export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className='label text-foreground'>
        {label}
      </label>
      {children}
      {hint && <span className='text-xs text-muted-foreground'>{hint}</span>}
    </div>
  );
}

/** A plain text input bound to a string value. */
export function TextInput({
  id,
  value,
  onValueChange,
  placeholder,
  className,
}: {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <Input
      id={id}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={(event) => onValueChange(event.target.value)}
    />
  );
}

/**
 * A numeric input that keeps its own text buffer so partial entries (a trailing decimal point,
 * an empty field) don't get clobbered by the parsed value flowing back down. The buffer is only
 * re-synced from the outside when the incoming value no longer matches what was typed — e.g. when
 * the user switches to a different scenario.
 */
export function NumberInput({
  id,
  value,
  onValueChange,
  min = 0,
  step = 'any',
  prefix,
  suffix,
  placeholder = '0',
  className,
}: {
  id?: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  step?: number | 'any';
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  className?: string;
}) {
  const [buffer, setBuffer] = useState(() => (value ? String(value) : ''));

  useEffect(() => {
    const parsed = parseFloat(buffer);
    const current = Number.isNaN(parsed) ? 0 : parsed;
    if (current !== value) {
      setBuffer(value ? String(value) : '');
    }
    // Only re-sync when the external value changes; depending on `buffer` would fight typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleChange(next: string) {
    setBuffer(next);
    const parsed = parseFloat(next);
    onValueChange(Number.isNaN(parsed) ? 0 : parsed);
  }

  return (
    <div className='relative'>
      {prefix && (
        <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground'>
          {prefix}
        </span>
      )}
      <Input
        id={id}
        type='number'
        inputMode='decimal'
        min={min}
        step={step}
        value={buffer}
        placeholder={placeholder}
        onChange={(event) => handleChange(event.target.value)}
        className={cn(prefix && 'pl-7', suffix && 'pr-9', className)}
      />
      {suffix && (
        <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground'>
          {suffix}
        </span>
      )}
    </div>
  );
}
