'use client';

import { motion } from 'framer-motion';
import { Library, FileText, Sliders, Volume2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Library,
    title: 'Choose a Preset',
    desc: 'Browse 130+ curated voice presets across cinematic, horror, wellness, social media, spiritual, and character categories.',
    color: 'from-violet-500/20 to-violet-600/10 border-violet-500/25',
    iconColor: 'text-violet-400',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Paste Your Script',
    desc: 'Enter any text — narration, story, ad copy, Quranic verse for pacing practice, or TikTok hook.',
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/25',
    iconColor: 'text-cyan-400',
  },
  {
    step: '03',
    icon: Sliders,
    title: 'Adjust Voice Settings',
    desc: 'Fine-tune speed, pitch, clarity, emotional depth, breathing level, stability, reverb, and creepiness.',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/25',
    iconColor: 'text-amber-400',
  },
  {
    step: '04',
    icon: Volume2,
    title: 'Generate & Save',
    desc: 'Hit Generate to hear your voice instantly in the browser. Save to history for later replay and reuse.',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/25',
    iconColor: 'text-emerald-400',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Works
            </span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From zero to professional voiceover in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border bg-gradient-to-br p-5 ${step.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center`}>
                  <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                </div>
                <span className="text-3xl font-black text-white/8">{step.step}</span>
              </div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
