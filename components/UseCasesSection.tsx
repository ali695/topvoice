'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const USE_CASES = [
  { emoji: '🎬', title: 'YouTube Narration', desc: 'Documentary, explainer, and channel intro voices', href: '/use-cases#youtube' },
  { emoji: '📱', title: 'TikTok & Reels', desc: 'Viral hooks, product ads, trending sound formats', href: '/use-cases#tiktok' },
  { emoji: '👻', title: 'Horror Stories', desc: 'Creepypasta, haunted narrations, demonic characters', href: '/use-cases#horror' },
  { emoji: '😴', title: 'Sleep Learning', desc: 'Hypnotic pacing for language and knowledge retention', href: '/use-cases#sleep' },
  { emoji: '🕌', title: 'Islamic Recitation Style', desc: 'Arabic pacing controls for Quranic audio projects', href: '/use-cases#islamic' },
  { emoji: '📚', title: 'Audiobooks', desc: 'Character voices, chapter narrators, full casts', href: '/use-cases#audiobooks' },
  { emoji: '🎮', title: 'Game Characters', desc: 'NPCs, bosses, narrative voices, ambient speech', href: '/use-cases#gaming' },
  { emoji: '📺', title: 'Ads & Product Videos', desc: 'Commercial voiceovers for digital and social', href: '/use-cases#ads' },
  { emoji: '🎙️', title: 'Podcasts', desc: 'Intro, outro, segment narrations, co-host voices', href: '/use-cases#podcasts' },
  { emoji: '🎓', title: 'E-Learning', desc: 'Course narration, lecture recordings, training audio', href: '/use-cases#elearning' },
  { emoji: '✨', title: 'ASMR Content', desc: 'Soft whispers, binaural triggers, relaxation audio', href: '/use-cases#sleep' },
  { emoji: '🌍', title: 'Multilingual Content', desc: 'Localize content across 11 languages from one preset system', href: '/use-cases' },
];

export function UseCasesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0815] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white mb-3"
          >
            Built for Every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Creator
            </span>
          </motion.h2>
          <p className="text-white/45 text-lg">
            From indie developers to production studios — VoiceGen Studio powers every workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={uc.href}
                className="block rounded-xl border border-white/8 bg-white/3 p-4 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group h-full"
              >
                <div className="text-2xl mb-2.5 group-hover:scale-110 transition-transform inline-block">
                  {uc.emoji}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 leading-tight">{uc.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{uc.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            View all use cases with preset recommendations →
          </Link>
        </div>
      </div>
    </section>
  );
}
