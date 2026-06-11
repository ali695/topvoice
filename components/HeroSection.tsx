'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Library, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WaveformBackground } from './WaveformBackground';

const STATS = [
  { value: '130+', label: 'Voice Presets' },
  { value: '100+', label: 'Sub-Presets' },
  { value: '11', label: 'Languages' },
  { value: '$0', label: 'No Paid API' },
];

const CHIPS = [
  'Horror', 'TikTok', 'Documentary', 'Quranic Style',
  'Sleep Learning', 'ASMR', 'Cyberpunk', 'Trailer Voice',
  'Urdu Emotional', 'German Soft', 'Turkish Soft', 'British Cinematic',
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070f] via-[#0a0815] to-[#07070f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.14)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(6,182,212,0.07)_0%,transparent_50%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <WaveformBackground className="opacity-35" />

      {/* Floating chips */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CHIPS.map((chip, i) => (
          <motion.div
            key={chip}
            className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-white/60 whitespace-nowrap"
            style={{
              left: `${[6, 74, 4, 80, 8, 76, 5, 82, 7, 77, 3, 79][i % 12]}%`,
              top: `${[18, 14, 72, 65, 42, 38, 55, 25, 82, 48, 30, 60][i % 12]}%`,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            {chip}
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
          100% Free • No API Key • Runs in Your Browser
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
        >
          Generate Viral AI Voices{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400">
            Directly in Your Browser
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/55 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Create cinematic narrations, horror whispers, TikTok-style voices, sleep learning audio,
          character voices, multilingual voiceovers, and Arabic recitation-style pacing controls
          using <span className="text-emerald-400 font-medium">free browser-based voice technology</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
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

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-center">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                {value}
              </div>
              <div className="text-[11px] text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Animated bars hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-2 text-white/25 text-xs"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Real speech — powered by your device's built-in voice engine</span>
          <div className="flex items-end gap-0.5 ml-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full bg-violet-500/50"
                animate={{ height: [3, 8 + Math.random() * 10, 3] }}
                transition={{ duration: 0.7 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
