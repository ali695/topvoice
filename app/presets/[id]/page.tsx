'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Heart, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ALL_PRESETS, getSubPresetsFor } from '@/data/allPresets';
import { VibeBadge } from '@/components/VibeBadge';
import { AccentBadge } from '@/components/AccentBadge';
import { PresetCard } from '@/components/PresetCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LANGUAGE_MAP } from '@/data/languages';
import { useVoiceGenStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function PresetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { setSelectedPreset, toggleFavorite, isFavorite } = useVoiceGenStore();
  const [copied, setCopied] = useState(false);

  const preset = ALL_PRESETS.find((p) => p.id === id);
  if (!preset) notFound();

  const subPresets = getSubPresetsFor(preset.id);
  const parentPreset = preset.parentPresetId
    ? ALL_PRESETS.find((p) => p.id === preset.parentPresetId)
    : null;

  const favorite = isFavorite(preset.id);
  const langInfo = LANGUAGE_MAP[preset.settings.language];

  const handleUse = () => {
    setSelectedPreset(preset);
    router.push('/generate');
  };

  const copySettings = () => {
    navigator.clipboard.writeText(JSON.stringify(preset.settings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SETTING_LABELS: Record<string, string> = {
    language: 'Language', speed: 'Speed', pitch: 'Pitch',
    temperature: 'Temperature', emotionalDepth: 'Emotional Depth',
    clarity: 'Clarity', breathingLevel: 'Breathing Level',
    stability: 'Stability', accent: 'Accent',
    reverb: 'Reverb', creepiness: 'Creepiness',
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link href="/presets" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Presets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {preset.isPremium && (
                      <Badge variant="premium" size="sm" className="mb-2">⭐ Pro</Badge>
                    )}
                    {preset.parentPresetId && (
                      <Badge variant="secondary" size="sm" className="mb-2 mr-2">Variant of {parentPreset?.name}</Badge>
                    )}
                    <h1 className="text-2xl font-black text-white">{preset.name}</h1>
                    <p className="text-white/50 text-sm mt-1">{preset.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => toggleFavorite(preset.id)}>
                      <Heart className={`w-4 h-4 ${favorite ? 'fill-red-400 text-red-400' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={copySettings}>
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-5">{preset.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <VibeBadge vibe={preset.vibe} />
                  <AccentBadge accent={preset.settings.accent} />
                  {langInfo && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">
                      {langInfo.flag} {langInfo.name}
                    </span>
                  )}
                </div>

                <Button variant="glow" size="lg" onClick={handleUse} className="w-full sm:w-auto">
                  <Zap className="w-4 h-4" />
                  Use This Preset
                </Button>
              </div>

              {/* Tags */}
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <h3 className="font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {preset.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Use cases */}
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <h3 className="font-semibold text-white mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {preset.useCases.map((uc) => (
                    <span key={uc} className="px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Settings sidebar */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <h3 className="font-semibold text-white mb-4">Voice Settings</h3>
              <div className="space-y-3">
                {Object.entries(preset.settings).map(([key, val]) => {
                  if (val === undefined || val === null) return null;
                  const label = SETTING_LABELS[key] || key;
                  const displayVal = typeof val === 'number' ? val.toFixed(2) : String(val).replace(/_/g, ' ');
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{label}</span>
                      <span className="text-xs font-mono text-violet-400">{displayVal}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sub-presets */}
        {subPresets.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-5">
              {subPresets.length} Variations of {preset.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subPresets.map((sub, i) => (
                <PresetCard key={sub.id} preset={sub} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
