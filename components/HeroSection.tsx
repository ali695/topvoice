'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Library, Play, Sparkles, ArrowRight, Mic2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WaveformBackground } from './WaveformBackground';
import { SEED_PRESETS } from '@/data/seedPresets';
import { VibeBadge } from './VibeBadge';

const FLOATING_CARDS = SEED_PRESETS.slice(0, 6).map((p) => ({
  name: p.name,
  vibe: p.vibe,
  category: p.category,
}));

const STAT_ITEMS = [
  { value: '130+', label: 'Voice Presets' },
  { value: '11', label: 'Languages' },
  { value: '23+', label: 'Accents' },
  { value: '32', label: 'Vibes' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070f] via-[#0a0815] to-[#07070f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08)_0%,transparent_50%)]" />

      {/* Waveform */}
      <WaveformBackground className="opacity-40" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating preset chips */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={i}
            className="absolute glass rounded-xl px-3 py-2 flex items-center gap-2 hidden lg:flex"
            style={{
              left: `${[8, 75, 5, 80, 10, 72][i]}%`,
              top: `${[20, 15, 65, 60, 45, 40][i]}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.75, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          >
            <Mic2 className="w-3 h-3 text-violet-400" />
            <span className="text-xs text-white/70 whitespace-nowrap">{card.name}</span>
            <VibeBadge vibe={card.vibe} size="sm" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          130+ Voice Presets • 11 Languages • Real-Time Generation
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          Generate{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400">
            Viral AI Voices
          </span>
          <br />
          in Every Style
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Create cinematic narrations, horror whispers, TikTok voices, Quranic-style Arabic recitation controls,
          sleep learning audio, character voices, and multilingual voiceovers — all from one studio.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button variant="glow" size="xl" asChild>
            <Link href="/generate" className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Start Generating
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/presets" className="flex items-center gap-2">
              <Library className="w-5 h-5" />
              Explore Presets
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {STAT_ITEMS.map(({ value, label }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                {value}
              </div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Audio preview hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-3 text-white/30 text-sm"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full bg-violet-500/50"
                animate={{ height: [4, 8 + Math.random() * 12, 4] }}
                transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <span>Real AI voices — no fakes, no placeholders</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full bg-cyan-500/50"
                animate={{ height: [4, 8 + Math.random() * 12, 4] }}
                transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.1 + 0.4 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
