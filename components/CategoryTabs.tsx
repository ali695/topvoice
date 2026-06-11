'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PresetCard } from './PresetCard';
import { ALL_PRESETS, PRESET_CATEGORIES } from '@/data/allPresets';
import { SEED_PRESETS } from '@/data/seedPresets';

const FEATURED_CATEGORIES = [
  'British Cinematic & Thriller',
  'Horror & Thriller',
  'Ultra-Horror',
  'Social Media',
  'Quranic Recitation',
  'Relaxation',
  'Characters',
  'Sci-Fi & Cyberpunk',
];

export function CategoryTabs() {
  const [active, setActive] = useState(FEATURED_CATEGORIES[0]);

  const presets = SEED_PRESETS.filter((p) => p.category === active).slice(0, 6);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Every Voice, Every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Category
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Browse 130+ presets across cinematic, horror, wellness, spiritual, sci-fi, social media, and more.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FEATURED_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === cat
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {active === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-violet-600/20 border border-violet-500/40 rounded-xl"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Preset grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {presets.map((preset, i) => (
              <PresetCard key={preset.id} preset={preset} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
