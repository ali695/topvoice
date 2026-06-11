'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SEED_PRESETS } from '@/data/seedPresets';
import { PresetCard } from '@/components/PresetCard';
import { Zap } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'british_cinematic',
    name: 'British Cinematic & Thriller',
    emoji: '🎬',
    color: 'from-violet-500/20 to-violet-700/10 border-violet-500/30',
    desc: 'Rich, polished British narration for documentaries, thriller content, and premium audiobooks.',
    useCases: ['YouTube Documentary', 'Thriller Podcasts', 'Premium Audiobooks'],
  },
  {
    id: 'horror',
    name: 'Horror & Thriller',
    emoji: '👻',
    color: 'from-red-500/20 to-red-900/10 border-red-500/30',
    desc: 'Atmospheric horror narration — eerie whispers, unsettling pacing, and creepy character voices.',
    useCases: ['Horror Stories', 'Creepypasta', 'Halloween Content'],
  },
  {
    id: 'ultra_horror',
    name: 'Ultra-Horror & Background Horror',
    emoji: '👹',
    color: 'from-red-900/30 to-black/30 border-red-900/40',
    desc: 'Extreme horror for demonic characters, possessed entities, and supernatural atmosphere.',
    useCases: ['Horror Films', 'Game Characters', 'Dark Podcasts'],
  },
  {
    id: 'social_media',
    name: 'Social Media Voices',
    emoji: '📱',
    color: 'from-pink-500/20 to-orange-500/10 border-pink-500/30',
    desc: 'High-energy voices engineered for TikTok, Reels, and viral short-form content.',
    useCases: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
  },
  {
    id: 'quranic',
    name: 'Quranic Recitation Controls',
    emoji: '🕌',
    color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30',
    desc: 'Respectful Arabic recitation-style pacing controls. Generic style labels — no real-person imitation.',
    useCases: ['Quranic Audio Projects', 'Arabic Education', 'Islamic App Development'],
  },
  {
    id: 'relaxation',
    name: 'Sleep & Relaxation',
    emoji: '😴',
    color: 'from-indigo-500/20 to-blue-600/10 border-indigo-500/30',
    desc: 'Deeply calming voices for meditation, sleep induction, hypnotherapy, and stress relief.',
    useCases: ['Meditation Apps', 'Sleep Stories', 'Hypnosis Audio'],
  },
  {
    id: 'scifi',
    name: 'Sci-Fi & Cyberpunk',
    emoji: '🤖',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    desc: 'Synthetic AI voices, glitchy holograms, and cyberpunk reporters from the neon future.',
    useCases: ['Sci-Fi Films', 'Game Narration', 'AI Characters'],
  },
  {
    id: 'characters',
    name: 'Character Voices',
    emoji: '🎭',
    color: 'from-amber-500/20 to-yellow-600/10 border-amber-500/30',
    desc: 'Fantasy creatures, robots, goblins, and memorable NPCs for games and animation.',
    useCases: ['Game Characters', 'Animation', 'Fantasy Audiobooks'],
  },
  {
    id: 'emotional',
    name: 'Emotional Narrators',
    emoji: '💔',
    color: 'from-rose-500/20 to-pink-600/10 border-rose-500/30',
    desc: 'Raw emotional intensity for heartbreak, panic, drama, and deeply felt storytelling.',
    useCases: ['Emotional Stories', 'Drama', 'Poetry', 'Short Films'],
  },
  {
    id: 'asmr',
    name: 'Soft ASMR & Whisper',
    emoji: '✨',
    color: 'from-purple-400/20 to-pink-400/10 border-purple-400/25',
    desc: 'Ultra-soft whisper voices for ASMR, sleep content, and intimate binaural experiences.',
    useCases: ['ASMR', 'Sleep Audio', 'Relaxation Content'],
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Voice Categories</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every preset lives inside one of these categories. Browse to find the right voice style for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CATEGORIES.map((cat, i) => {
            const presets = SEED_PRESETS.filter((p) => p.category
              .toLowerCase().replace(/[^a-z]/g, '') === cat.id.replace(/_/g, ''));
            const topPresets = SEED_PRESETS.filter((p) =>
              p.category.toLowerCase().includes(cat.name.split('&')[0].trim().toLowerCase().split(' ').pop()!)
            ).slice(0, 3);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border bg-gradient-to-br p-5 ${cat.color}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{cat.name}</h3>
                  </div>
                </div>
                <p className="text-xs text-white/55 leading-relaxed mb-4">{cat.desc}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {cat.useCases.map((uc) => (
                    <span key={uc} className="text-[10px] px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/50">
                      {uc}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/presets?category=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                >
                  <Zap className="w-3 h-3" />
                  View presets in this category
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
