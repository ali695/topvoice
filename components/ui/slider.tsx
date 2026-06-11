'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
    showValue?: boolean;
    valueFormatter?: (v: number) => string;
  }
>(({ className, label, showValue, valueFormatter, ...props }, ref) => {
  const value = props.value ?? props.defaultValue ?? [0];
  const displayVal = Array.isArray(value) ? value[0] : value;
  const formatted = valueFormatter ? valueFormatter(displayVal) : displayVal.toFixed(2);

  return (
    <div className="space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-white/60">{label}</span>}
          {showValue && <span className="text-xs font-mono text-violet-400">{formatted}</span>}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-violet-500 to-cyan-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-violet-500 bg-white shadow-lg shadow-violet-500/30 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-cyan-400 hover:shadow-cyan-500/30" />
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
