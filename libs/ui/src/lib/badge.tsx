import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from './utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-foreground',
        soft: 'border-transparent bg-accent text-accent-foreground',
        info:
          'border-transparent bg-sky-500/16 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300',
        success:
          'border-transparent bg-emerald-500/16 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
        warning:
          'border-transparent bg-amber-500/20 text-amber-900 dark:bg-amber-500/22 dark:text-amber-300',
        danger:
          'border-transparent bg-rose-500/16 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300',
        violet:
          'border-transparent bg-violet-500/16 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
