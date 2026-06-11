'use client';

import { motion } from 'framer-motion';
import {
  Globe2, Mic2, Sliders, Download, History, Shield,
  Wand2, Zap, Layers
} from 'lucide-react';

const FEATURES = [
  {
    icon: Mic2,
    title: '130+ Voice Presets',
    description: 'Cinematic, horror, wellness, spiritual, social media, characters, and more — all production-ready.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Globe2,
    title: '11 Languages',
    description: 'English, Arabic, Urdu, Hindi, Japanese, German, Turkish, Spanish, French, Russian, Chinese.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Sliders,
    title: 'Advanced Controls',
    description: 'Fine-tune speed, pitch, temperature, emotional depth, clarity, breathing, stability, reverb, and more.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Wand2,
    title: '100+ Sub-Presets',
    description: 'Auto-generated variations of every preset — cinematic, whisper, emotional, studio, commercial, and more.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Zap,
    title: 'Real-Time Generation',
    description: 'Backend TTS provider abstraction supports mock, external API, and local model configurations.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Download,
    title: 'MP3 & WAV Export',
    description: 'Download in studio-quality formats. Batch generation available on Studio plan.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: History,
    title: 'Generation History',
    description: 'Every generation saved with settings, audio preview, and one-click regeneration.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: Layers,
    title: 'Preset Variants',
    description: 'Every seed preset automatically generates trailer, podcast, documentary, ASMR, and commercial variants.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'API keys never exposed to frontend. All generation happens server-side. Provider keys in environment only.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Sound Professional
            </span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A complete voice production studio in your browser. No installs, no hardware, no limits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-white/15 hover:bg-white/5 transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${feature.bg} group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
