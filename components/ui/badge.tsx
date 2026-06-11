import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
        secondary: 'bg-white/10 text-white/70 border border-white/10',
        destructive: 'bg-red-500/20 text-red-300 border border-red-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
        gold: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        green: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        pink: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
        premium: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40',
        horror: 'bg-red-900/40 text-red-300 border border-red-800/50',
      },
      size: {
        default: 'px-2.5 py-0.5',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
