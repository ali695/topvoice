'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is VoiceGen Studio completely free?',
    a: 'Yes. The current version is 100% free. It uses your browser\'s built-in Web Speech API (SpeechSynthesis) — no API key, no sign-up, no payment required. Just open the app and start generating voices.',
  },
  {
    q: 'Does it use paid external APIs like ElevenLabs or OpenAI?',
    a: 'No. The current version uses only free browser-native speech technology. No requests are sent to ElevenLabs, OpenAI, Google Cloud TTS, or any paid service. Future optional premium plans may offer cloud voice upgrades, but the free tier will remain API-free.',
  },
  {
    q: 'Why do voices sound different on different devices?',
    a: 'Voice quality and variety depends entirely on your operating system and browser. Windows typically includes Microsoft David and Zira voices. Mac and iOS include Alex, Samantha, and many multilingual voices. Chrome on desktop often has the most voices. Android and Firefox have more limited options.',
  },
  {
    q: 'Can I use generated voices for YouTube?',
    a: 'Yes. Browser speech synthesis output is not copyrighted by anyone — your generated content is yours. However, check YouTube\'s content policies for AI-generated audio, and ensure your scripts are original. Do not use voices to impersonate real public figures.',
  },
  {
    q: 'Can I save my favorite presets?',
    a: 'Yes. Click the heart icon on any preset card to save it as a favorite. Favorites persist in your browser\'s localStorage across sessions on the same device.',
  },
  {
    q: 'Can I export to MP3 or WAV?',
    a: 'Not yet in the free version. The Web Speech API does not expose a way to capture audio output as a file. To record your output, you can use OS-level screen recording tools like OBS, Audacity\'s loopback recording, or system audio capture. MP3 export is planned for a future premium feature.',
  },
  {
    q: 'Does it support Urdu, Arabic, German, Turkish, Hindi, and English?',
    a: 'The preset system supports these 11 languages: EN, AR, UR, DE, HI, TR, ES, FR, JA, RU, ZH. Voice availability for each language depends on your OS and browser. Chrome on Windows/Mac provides the broadest multilingual support. Arabic (AR) works on most devices. Urdu (UR) support varies.',
  },
  {
    q: 'Can I add paid cloud voices later?',
    a: 'Yes. The backend is architected with a TTS provider abstraction. When you\'re ready for production-quality voices, you can configure the backend with a provider like ElevenLabs or OpenAI TTS by setting environment variables. The frontend will seamlessly switch to the backend API. See /docs for the upgrade path.',
  },
  {
    q: 'Is my text private?',
    a: 'Yes. In the free browser version, your text is processed entirely locally using the Web Speech API. Nothing is sent to any server. Generation history is stored only in your browser\'s localStorage and never uploaded.',
  },
  {
    q: 'What browsers are supported?',
    a: 'Chrome and Edge provide the best experience with the most voices. Safari (Mac and iOS) works well with good multilingual support. Firefox has limited voice availability on some systems. The app UI works in all modern browsers, but voice generation requires Web Speech API support.',
  },
  {
    q: 'Are the Quranic recitation presets respectful?',
    a: 'Yes. All Quranic presets use generic style labels (e.g., "Saudi Qari Style", "Egyptian Murattal Style") and do not claim to clone or imitate any real named reciter. The controls are technical pacing, breath, and clarity parameters to support Quranic audio project production. Users are responsible for using these respectfully.',
  },
  {
    q: 'Can I create my own presets?',
    a: 'Yes. Adjust any voice settings in the studio and use "Copy JSON" to save your settings. To add a new permanent preset, edit the SEED_PRESETS array in /data/seedPresets.ts — sub-presets will be auto-generated. See /docs for the full guide.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-3">FAQ</h1>
          <p className="text-white/50">Everything you need to know about VoiceGen Studio.</p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-medium text-white text-sm pr-2">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/35 flex-shrink-0 transition-transform duration-200 ${
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
                    <p className="px-5 pb-5 text-sm text-white/55 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
