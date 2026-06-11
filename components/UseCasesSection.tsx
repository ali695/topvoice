'use client';

import { motion } from 'framer-motion';

const USE_CASES = [
  { emoji: '🎬', title: 'YouTube Narration', desc: 'Documentary, explainer, and channel intro voices' },
  { emoji: '📱', title: 'TikTok & Reels', desc: 'Viral hooks, product ads, trending sound formats' },
  { emoji: '👻', title: 'Horror Stories', desc: 'Creepypasta, haunted narrations, demonic characters' },
  { emoji: '😴', title: 'Sleep Learning', desc: 'Hypnotic pacing for language and knowledge retention' },
  { emoji: '🕌', title: 'Islamic Recitation', desc: 'Tajweed-paced Arabic audio with breath controls' },
  { emoji: '📚', title: 'Audiobooks', desc: 'Character voices, chapter narrators, full casts' },
  { emoji: '🎮', title: 'Game Characters', desc: 'NPCs, bosses, narrative voices, ambient speech' },
  { emoji: '📺', title: 'Advertisements', desc: 'Commercial voiceovers for radio, TV, and digital' },
  { emoji: '🎙️', title: 'Podcasts', desc: 'Intro, outro, segment narrations, co-host voices' },
  { emoji: '🎓', title: 'E-Learning', desc: 'Course narration, lecture recordings, training audio' },
  { emoji: '✨', title: 'ASMR Content', desc: 'Soft whispers, binaural triggers, relaxation audio' },
  { emoji: '🌍', title: 'Multilingual', desc: 'Localize content across 11 languages from one preset system' },
];

export function UseCasesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0815] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            Built for Every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Creator
            </span>
          </motion.h2>
          <p className="text-white/50 text-lg">
            From indie developers to production studios — VoiceGen Studio powers every use case.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/8 bg-white/3 p-4 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group cursor-default"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {uc.emoji}
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{uc.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
