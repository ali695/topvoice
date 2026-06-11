'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Library, Heart } from 'lucide-react';
import { PresetCard } from '@/components/PresetCard';
import { PresetFilters } from '@/components/PresetFilters';
import { ALL_PRESETS, SEED_PRESETS } from '@/data/allPresets';
import { filterPresets } from '@/lib/presets';
import { FilterState } from '@/types/voice';
import { Button } from '@/components/ui/button';
import { useVoiceGenStore } from '@/lib/store';

export default function PresetsPage() {
  const [filters, setFilters] = useState<Partial<FilterState>>({});
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSeedOnly, setShowSeedOnly] = useState(false);
  const { favoritePresetIds } = useVoiceGenStore();

  const filtered = useMemo(() => {
    let presets = filterPresets(ALL_PRESETS, filters);
    if (showFavoritesOnly) presets = presets.filter((p) => favoritePresetIds.includes(p.id));
    if (showSeedOnly) {
      const seedIds = new Set(SEED_PRESETS.map((p) => p.id));
      presets = presets.filter((p) => seedIds.has(p.id));
    }
    return presets;
  }, [filters, showFavoritesOnly, showSeedOnly, favoritePresetIds]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
              <Library className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white">Voice Preset Library</h1>
          </div>
          <p className="text-white/50">
            Browse {ALL_PRESETS.length} voice presets — {SEED_PRESETS.length} curated seeds and{' '}
            {ALL_PRESETS.length - SEED_PRESETS.length} auto-generated sub-presets.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex flex-wrap gap-2 mb-5">
          <Button
            variant={!showSeedOnly && !showFavoritesOnly ? 'default' : 'secondary'}
            size="sm"
            onClick={() => { setShowSeedOnly(false); setShowFavoritesOnly(false); }}
          >
            All Presets ({ALL_PRESETS.length})
          </Button>
          <Button
            variant={showSeedOnly ? 'default' : 'secondary'}
            size="sm"
            onClick={() => { setShowSeedOnly(true); setShowFavoritesOnly(false); }}
          >
            Seed Presets ({SEED_PRESETS.length})
          </Button>
          <Button
            variant={showFavoritesOnly ? 'default' : 'secondary'}
            size="sm"
            onClick={() => { setShowFavoritesOnly(true); setShowSeedOnly(false); }}
          >
            <Heart className="w-3.5 h-3.5" /> Favorites ({favoritePresetIds.length})
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <PresetFilters
            filters={filters}
            onChange={setFilters}
            total={filtered.length}
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No presets match your filters.</p>
            <button onClick={() => setFilters({})} className="text-violet-400 text-sm mt-2 hover:text-violet-300">
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((preset, i) => (
              <PresetCard key={preset.id} preset={preset} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
