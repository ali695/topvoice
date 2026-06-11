'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does voice generation work?',
    a: 'VoiceGen Studio uses a backend TTS provider abstraction. Your text and settings are sent to our secure API, which processes them through the configured TTS engine and returns a high-quality audio file. No audio processing happens in the browser.',
  },
  {
    q: 'What TTS providers do you support?',
    a: 'The platform supports a pluggable provider system. In development mode, a mock provider demonstrates the full workflow. Production supports external API-based TTS providers configured via environment variables. Local model support is planned for future releases.',
  },
  {
    q: 'Are the Quranic recitation presets respectful?',
    a: 'Yes. All Quranic recitation presets use generic style labels (e.g., "Saudi Qari Style", "Egyptian Murattal Style") and do not claim to clone or imitate any real named reciter. The controls focus on pacing, breath, clarity, and emotional resonance to support proper recitation production.',
  },
  {
    q: 'Can I use these voices commercially?',
    a: 'Commercial usage rights depend on your plan and the configured TTS provider\'s terms of service. Creator and Studio plans include commercial licensing for your generated audio content.',
  },
  {
    q: 'What languages are supported?',
    a: 'VoiceGen Studio supports 11 languages: English, Urdu, German, Arabic, Hindi, Turkish, Spanish, French, Japanese, Russian, and Chinese (Mandarin). Arabic includes RTL support and Tajweed-aware pacing controls.',
  },
  {
    q: 'What are sub-presets?',
    a: 'Sub-presets are automatically generated variations of the seed presets. Each seed preset has variants like Cinematic Trailer, Podcast, Whisper Mode, High Clarity, Emotional+, and more. Sub-presets adjust settings within valid ranges while keeping the character of the parent voice.',
  },
  {
    q: 'Is there an API?',
    a: 'Yes. The Python FastAPI backend exposes REST endpoints for voice generation, preset browsing, and history management. API documentation is available at /api-docs.',
  },
  {
    q: 'How long does generation take?',
    a: 'Generation time depends on text length and the configured TTS provider. Short clips (under 500 characters) typically complete in 1–3 seconds. Longer narrations may take 5–15 seconds. Long-form audio (30+ minutes) uses background job processing.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-white text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/40 flex-shrink-0 ml-4 transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
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
                    <p className="px-5 pb-4 text-sm text-white/60 leading-relaxed">
                      {faq.a}
                    </p>
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
