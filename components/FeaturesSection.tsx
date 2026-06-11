'use client';

import { motion } from 'framer-motion';
import { Globe2, Mic2, Sliders, Wand2, Zap, History, Layers, ShieldCheck, Volume2 } from 'lucide-react';

const FEATURES = [
  {
    icon: Volume2,
    title: '100% Browser-Based',
    description: 'Uses your device\'s built-in speech engine. Zero API calls, zero cost, zero latency.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Mic2,
    title: '130+ Voice Presets',
    description: 'Cinematic, horror, wellness, spiritual, social media, characters, sci-fi, and more.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Globe2,
    title: '11 Languages',
    description: 'EN, AR, UR, HI, DE, TR, ES, FR, JA, RU, ZH — best coverage in Chrome and Edge.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Sliders,
    title: '9 Voice Controls',
    description: 'Speed, pitch, clarity, emotional depth, breathing level, stability, reverb, and creepiness.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Wand2,
    title: '100+ Sub-Presets',
    description: 'Auto-generated variants — Cinematic Trailer, Whisper Mode, Emotional+, Studio, and more.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'No server round-trip. Your voice plays the moment you click Generate.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: History,
    title: 'Generation History',
    description: 'Every generation saved locally. Replay, reload into studio, or export as JSON.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: Layers,
    title: 'Preset Browser',
    description: 'Search and filter 130+ presets by category, language, vibe, accent, and use case.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Private by Default',
    description: 'Your text never leaves your device. LocalStorage history. No tracking.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white mb-3"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Sound Professional
            </span>
          </motion.h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            A complete voice studio in your browser — no installs, no API keys, no limits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-white/14 hover:bg-white/5 transition-all group"
            >
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3.5 ${f.bg} group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-4.5 h-4.5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
