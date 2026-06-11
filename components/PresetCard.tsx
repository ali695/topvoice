'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Zap, Eye, Crown, Mic2 } from 'lucide-react';
import { VoiceProfile } from '@/types/voice';
import { VibeBadge } from './VibeBadge';
import { AccentBadge } from './AccentBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LANGUAGE_MAP } from '@/data/languages';
import { useVoiceGenStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface PresetCardProps {
  preset: VoiceProfile;
  compact?: boolean;
  index?: number;
}

export function PresetCard({ preset, compact = false, index = 0 }: PresetCardProps) {
  const router = useRouter();
  const { setSelectedPreset, toggleFavorite, isFavorite } = useVoiceGenStore();
  const favorite = isFavorite(preset.id);
  const langInfo = LANGUAGE_MAP[preset.settings.language];

  const handleUsePreset = () => {
    setSelectedPreset(preset);
    router.push('/generate');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={cn(
        'group relative rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm hover:border-violet-500/30 hover:from-violet-500/5 hover:to-cyan-500/5 transition-all duration-300',
        compact ? 'p-4' : 'p-5'
      )}
    >
      {/* Premium badge */}
      {preset.isPremium && (
        <div className="absolute top-3 right-3">
          <Badge variant="premium" size="sm">
            <Crown className="w-3 h-3" /> Pro
          </Badge>
        </div>
      )}

      {/* Sub-preset indicator */}
      {preset.parentPresetId && (
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" size="sm">Variant</Badge>
        </div>
      )}

      {/* Header */}
      <div className={cn('mb-3', (preset.isPremium || preset.parentPresetId) && 'mt-5')}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Mic2 className="w-4 h-4 text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm leading-tight truncate group-hover:text-violet-300 transition-colors">
              {preset.name}
            </h3>
            <p className="text-xs text-white/40 mt-0.5">{preset.category}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {!compact && (
        <p className="text-xs text-white/50 leading-relaxed mb-3 line-clamp-2">
          {preset.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <VibeBadge vibe={preset.vibe} size="sm" />
        <AccentBadge accent={preset.settings.accent} size="sm" />
        {langInfo && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50">
            {langInfo.flag} {langInfo.code}
          </span>
        )}
      </div>

      {/* Settings summary */}
      {!compact && (
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {[
            { label: 'Speed', val: preset.settings.speed.toFixed(1) },
            { label: 'Pitch', val: preset.settings.pitch.toFixed(2) },
            { label: 'Depth', val: preset.settings.emotionalDepth.toFixed(1) },
          ].map(({ label, val }) => (
            <div key={label} className="rounded-lg bg-white/3 border border-white/5 px-2 py-1.5 text-center">
              <div className="text-[10px] text-white/30">{label}</div>
              <div className="text-xs font-mono text-violet-400">{val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {!compact && (
        <div className="flex flex-wrap gap-1 mb-4">
          {preset.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/30">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="glow"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={handleUsePreset}
        >
          <Zap className="w-3 h-3" />
          Use Preset
        </Button>
        <Link href={`/presets/${preset.id}`}>
          <Button variant="outline" size="icon-sm">
            <Eye className="w-3.5 h-3.5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toggleFavorite(preset.id)}
          className={cn(favorite && 'text-red-400 hover:text-red-300')}
        >
          <Heart className={cn('w-3.5 h-3.5', favorite && 'fill-current')} />
        </Button>
      </div>
    </motion.div>
  );
}
