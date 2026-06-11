'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, ExternalLink, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { speak, stopSpeaking, isBrowserSpeechSupported, waitForVoices } from '@/lib/speech';
import { SEED_PRESETS } from '@/data/seedPresets';
import { cn } from '@/lib/utils';

const DEMO_PRESETS = SEED_PRESETS.slice(0, 8).map((p) => ({
  id: p.id,
  name: p.name,
  settings: p.settings,
}));

const DEMO_TEXTS = [
  'In the shadows of the ancient city, a narrator began to speak. The world fell silent.',
  'Stop scrolling! This is the AI voice hack that everyone is talking about right now!',
  'Breathe in slowly… and release. Let your mind drift into deep, peaceful stillness.',
  'There was something in the basement. You heard it last night. It heard you too.',
];

export function LandingDemoWidget() {
  const [selectedPresetId, setSelectedPresetId] = useState(DEMO_PRESETS[0].id);
  const [selectedText, setSelectedText] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSupported(isBrowserSpeechSupported());
    waitForVoices().then((v) => setReady(v.length > 0 || true));
  }, []);

  const preset = DEMO_PRESETS.find((p) => p.id === selectedPresetId) || DEMO_PRESETS[0];

  const handlePlay = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    if (!supported) return;
    speak({
      text: DEMO_TEXTS[selectedText],
      settings: preset.settings,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/6 to-cyan-500/4 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-5">
        <Volume2 className="w-5 h-5 text-violet-400" />
        <h3 className="font-bold text-white">Try It Live — Browser Voice Demo</h3>
        <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Free</span>
      </div>

      {/* Text selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {DEMO_TEXTS.map((t, i) => (
          <button
            key={i}
            onClick={() => setSelectedText(i)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-lg border transition-all',
              selectedText === i
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                : 'bg-white/4 border-white/10 text-white/45 hover:text-white hover:bg-white/8'
            )}
          >
            {['Cinematic', 'TikTok', 'Meditation', 'Horror'][i]}
          </button>
        ))}
      </div>

      {/* Script display */}
      <div className="rounded-xl bg-black/25 border border-white/8 p-4 mb-4 min-h-[64px]">
        <p className="text-sm text-white/70 italic leading-relaxed">"{DEMO_TEXTS[selectedText]}"</p>
      </div>

      {/* Preset + Play row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Select value={selectedPresetId} onValueChange={setSelectedPresetId}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEMO_PRESETS.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={isSpeaking ? 'destructive' : 'glow'}
          size="default"
          onClick={handlePlay}
          disabled={!supported || !ready}
          className="min-w-[120px]"
        >
          {isSpeaking ? (
            <><Square className="w-4 h-4" /> Stop</>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {!supported ? 'Not Supported' : 'Play Demo'}
            </>
          )}
        </Button>

        <Button variant="outline" size="default" asChild>
          <Link href="/generate" className="flex items-center gap-1.5">
            Full Studio
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>

      {/* Waveform */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-end gap-0.5 h-6 mt-4 justify-center"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"
              animate={{ height: [3, Math.random() * 20 + 4, 3] }}
              transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.04 }}
            />
          ))}
        </motion.div>
      )}

      {!supported && (
        <p className="mt-3 text-xs text-amber-400/80">
          ⚠️ Your browser doesn't support Web Speech API. Use Chrome, Edge, or Safari.
        </p>
      )}
    </div>
  );
}
