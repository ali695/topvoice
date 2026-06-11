'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'Is VoiceGen Studio free?',
    a: 'Yes — completely. The current version uses your browser\'s built-in speech engine. No API key, no account, no payment.',
  },
  {
    q: 'Does it use paid APIs like ElevenLabs or OpenAI?',
    a: 'No. Zero external API calls in the free version. Everything runs locally in your browser using the Web Speech API.',
  },
  {
    q: 'Why do voices sound different on different devices?',
    a: 'Voice quality depends on your OS and browser. Chrome and Edge on Windows/Mac have the best selection. Safari on iOS is also strong. Firefox is more limited.',
  },
  {
    q: 'Can I use it for YouTube?',
    a: 'Yes. Browser-synthesized audio is yours to use commercially. Disclose AI-generated audio where required by platform policies.',
  },
  {
    q: 'Can I save my presets?',
    a: 'Yes. Favorite any preset with the heart icon. Favorites persist in your browser\'s localStorage.',
  },
  {
    q: 'Can I export MP3?',
    a: 'Not yet. The Web Speech API doesn\'t support audio capture. Use OS screen recording tools (OBS, Audacity) to capture audio. MP3 export is planned for a future premium version.',
  },
  {
    q: 'Does it support Urdu, Arabic, German, Turkish, Hindi?',
    a: 'Yes — 11 languages are supported in the preset system. Voice availability for each language depends on your OS. Chrome provides the best multilingual coverage.',
  },
  {
    q: 'Can I add paid cloud voices later?',
    a: 'Yes. The backend architecture supports ElevenLabs, OpenAI TTS, and other providers. Configure via environment variables when ready.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Common{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Questions
            </span>
          </h2>
          <p className="text-white/45">
            More detailed answers in the{' '}
            <Link href="/faq" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
              full FAQ page
            </Link>.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-medium text-white text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-white/35 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-white/55 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
