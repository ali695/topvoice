import { ACCENT_MAP } from '@/data/accents';
import { cn } from '@/lib/utils';

interface AccentBadgeProps {
  accent: string;
  size?: 'sm' | 'default';
  className?: string;
}

export function AccentBadge({ accent, size = 'default', className }: AccentBadgeProps) {
  const info = ACCENT_MAP[accent];
  const label = info?.label || accent.replace(/_/g, ' ');

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        className
      )}
    >
      {label}
    </span>
  );
}
