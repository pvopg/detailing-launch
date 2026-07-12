import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-sm font-sans text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Ink — default primary CTA.
        default: 'bg-primary text-primary-foreground hover:bg-ink-900 hover:shadow-sm',
        // Brand — saturated-blue CTA on neutral surfaces. `sexy`/`orange` alias it for back-compat.
        brand: 'bg-brand text-brand-foreground hover:bg-brand-700 hover:shadow-sm',
        sexy: 'bg-brand text-brand-foreground hover:bg-brand-700 hover:shadow-sm',
        orange: 'bg-brand text-brand-foreground hover:bg-brand-700 hover:shadow-sm',
        // Light — CTA on blue or navy surfaces.
        light: 'bg-white text-ink-950 hover:bg-ink-50 hover:shadow-sm',
        // Outline / secondary.
        secondary: 'border border-border bg-transparent text-foreground hover:bg-muted',
        outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
        // Ghost / link.
        ghost: 'hover:bg-muted',
        link: 'text-brand underline-offset-4 hover:underline',
        destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
      },
      size: {
        default: 'h-11 px-[18px]',
        sm: 'h-9 rounded-xs px-3 text-xs',
        lg: 'h-14 rounded-sm px-[22px] text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
