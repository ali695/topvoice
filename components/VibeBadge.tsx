import { Badge } from '@/components/ui/badge';
import { VIBE_MAP } from '@/data/vibes';
import { cn } from '@/lib/utils';

interface VibeBadgeProps {
  vibe: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const VIBE_VARIANT_MAP: Record<string, string> = {
  Dramatic: 'from-red-500/20 to-orange-500/20 text-orange-300 border-orange-500/30',
  Friendly: 'from-yellow-500/20 to-green-500/20 text-green-300 border-green-500/30',
  Sincere: 'from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Whispering: 'from-slate-500/20 to-blue-300/20 text-blue-200 border-blue-300/30',
  Emotional: 'from-rose-500/20 to-pink-500/20 text-pink-300 border-pink-500/30',
  Demonic: 'from-red-900/40 to-black/40 text-red-400 border-red-800/50',
  Eerie: 'from-gray-500/20 to-green-900/20 text-green-400 border-green-900/40',
  Ghostly: 'from-slate-300/10 to-cyan-200/10 text-slate-300 border-slate-300/20',
  Poltergeist: 'from-purple-700/30 to-red-700/30 text-purple-300 border-purple-700/40',
  Cybernetic: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
  'Islamic Recitation': 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/30',
  Spiritual: 'from-amber-400/20 to-yellow-300/20 text-amber-300 border-amber-400/30',
  Murattal: 'from-green-600/20 to-emerald-400/20 text-emerald-300 border-emerald-500/30',
  Hypnotic: 'from-violet-400/20 to-indigo-500/20 text-violet-300 border-violet-400/30',
  'Calm Therapist': 'from-green-400/20 to-teal-400/20 text-teal-300 border-teal-400/30',
  'Soft ASMR': 'from-pink-300/20 to-purple-300/20 text-pink-300 border-pink-300/30',
  Villain: 'from-violet-600/30 to-purple-800/30 text-purple-300 border-violet-600/40',
};

export function VibeBadge({ vibe, size = 'default', className }: VibeBadgeProps) {
  const vibeInfo = VIBE_MAP[vibe.toLowerCase().replace(/\s+/g, '_')];
  const customStyle = VIBE_VARIANT_MAP[vibe] || '';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border text-xs font-semibold bg-gradient-to-r',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5',
        size === 'lg' ? 'px-3 py-1 text-sm' : '',
        customStyle || 'from-violet-500/20 to-cyan-500/20 text-violet-300 border-violet-500/30',
        className
      )}
    >
      {vibeInfo?.emoji && <span>{vibeInfo.emoji}</span>}
      {vibe}
    </span>
  );
}
