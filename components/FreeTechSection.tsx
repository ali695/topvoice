'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Wifi, Lock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const PERKS = [
  { icon: ShieldCheck, title: 'No API Key', desc: 'Zero configuration. Open the app and speak instantly.' },
  { icon: Zap, title: 'Instant Generation', desc: 'No server round-trips. Voice is generated locally in milliseconds.' },
  { icon: Lock, title: 'Private by Default', desc: 'Your text never leaves your device. No data sent to servers.' },
  { icon: Wifi, title: 'Works Offline', desc: 'Once loaded, the app works without an internet connection.' },
];

const LIMITATIONS = [
  'Voice quality depends on your OS and installed system voices',
  'Chrome and Edge provide the most voices on desktop',
  'Safari on iOS has good multilingual support',
  'Firefox has limited voice selection on some systems',
  'Export to MP3 requires a future premium feature',
];

export function FreeTechSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a14] to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-5">
                <ShieldCheck className="w-3.5 h-3.5" />
                No Expensive Voice API Needed
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Completely Free,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Forever.
                </span>
              </h2>
              <p className="text-white/55 text-lg mb-8 leading-relaxed">
                VoiceGen Studio uses your browser's built-in speech technology — the same engine powering screen readers, navigation apps, and accessibility tools on your device. This keeps the first version free, fast, private, and instantly deployable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERKS.map((perk, i) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/4 border border-white/8"
                  >
                    <perk.icon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">{perk.title}</p>
                      <p className="text-xs text-white/45 mt-0.5">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — honest limitations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-amber-300">Honest Limitations</h3>
            </div>
            <p className="text-sm text-white/55 mb-5 leading-relaxed">
              Browser-based speech has some constraints. Here's what you should know:
            </p>
            <ul className="space-y-3">
              {LIMITATIONS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400/70 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/55">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/8">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/60">
                  Future premium plans will optionally add cloud-based AI voices (like ElevenLabs or OpenAI TTS) for studio-quality output — while keeping this free tier always available.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
