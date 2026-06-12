'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, ExternalLink, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  speak, stopSpeaking, isBrowserSpeechSupported, waitForVoices,
} from '@/lib/speech';
import { SEED_PRESETS } from '@/data/seedPresets';
import { cn } from '@/lib/utils';

const DEMO_PRESETS = SEED_PRESETS.slice(0, 8).map((p) => ({
  id: p.id,
  name: p.name,
  settings: p.settings,
}));

const DEMO_SCRIPTS = [
  {
    label: 'Cinematic',
    text: 'In the shadows of the ancient city, a narrator began to speak. The world fell silent.',
  },
  {
    label: 'TikTok',
    text: 'Stop scrolling! This is the AI voice hack that everyone is talking about right now!',
  },
  {
    label: 'Meditation',
    text: 'Breathe in slowly… and release. Let your mind drift into deep, peaceful stillness.',
  },
  {
    label: 'Horror',
    text: 'There was something in the basement. You heard it last night. It heard you too.',
  },
];

export function LandingDemoWidget() {
  const [selectedPresetId, setSelectedPresetId] = useState(DEMO_PRESETS[0].id);
  const [scriptIndex,      setScriptIndex]      = useState(0);
  const [isSpeaking,       setIsSpeaking]        = useState(false);
  const [supported,        setSupported]         = useState(true);
  const [voiceCount,       setVoiceCount]        = useState(0);

  useEffect(() => {
    const ok = isBrowserSpeechSupported();
    setSupported(ok);
    if (ok) waitForVoices().then((v) => setVoiceCount(v.length));
  }, []);

  const preset = DEMO_PRESETS.find((p) => p.id === selectedPresetId) ?? DEMO_PRESETS[0];
  const script = DEMO_SCRIPTS[scriptIndex];

  const handleToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    if (!supported) return;

    speak({
      text: script.text,
      settings: preset.settings,
      onStart: () => setIsSpeaking(true),
      onEnd:   () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/6 to-cyan-500/3 p-6 sm:p-8">

      {/* Header */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <Volume2 className="w-5 h-5 text-violet-400" />
        <h3 className="font-bold text-white">Try It Live — Browser Demo</h3>
        <span className="ml-auto text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Free — No Sign-Up
        </span>
      </div>

      {/* Script style tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {DEMO_SCRIPTS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => { setScriptIndex(i); setIsSpeaking(false); stopSpeaking(); }}
            className={cn(
              'text-xs px-3 py-1.5 rounded-lg border transition-all',
              scriptIndex === i
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                : 'bg-white/4 border-white/10 text-white/45 hover:text-white hover:bg-white/8'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Script preview */}
      <div className="rounded-xl bg-black/25 border border-white/8 p-4 mb-4 min-h-[60px] flex items-center">
        <p className="text-sm text-white/65 italic leading-relaxed">"{script.text}"</p>
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Preset picker */}
        <Select value={selectedPresetId} onValueChange={(id) => {
          setSelectedPresetId(id);
          if (isSpeaking) { stopSpeaking(); setIsSpeaking(false); }
        }}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEMO_PRESETS.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Play / Stop */}
        <Button
          variant={isSpeaking ? 'destructive' : 'glow'}
          onClick={handleToggle}
          disabled={!supported}
          className="min-w-[120px]"
        >
          {isSpeaking
            ? <><Square className="w-4 h-4 mr-1.5" /> Stop</>
            : <><Play  className="w-4 h-4 mr-1.5" /> {supported ? 'Play Demo' : 'Not Supported'}</>}
        </Button>

        {/* Open full studio */}
        <Button variant="outline" asChild>
          <Link href="/generate" className="flex items-center gap-1.5">
            Full Studio
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>

      {/* Waveform while speaking */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-end gap-[3px] h-7 mt-4 justify-center">
              {Array.from({ length: 36 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full flex-1 max-w-[6px] bg-gradient-to-t from-violet-600 to-cyan-400"
                  animate={{ height: [3, 5 + (i % 6) * 3, 3] }}
                  transition={{
                    duration: 0.35 + (i % 4) * 0.07,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Not supported message */}
      {!supported && (
        <p className="mt-3 text-xs text-amber-400/80">
          ⚠️ Web Speech API not found. Open in Chrome, Edge, or Safari to hear the demo.
        </p>
      )}

      {/* Voice count info */}
      {supported && voiceCount > 0 && !isSpeaking && (
        <p className="mt-3 text-[10px] text-white/25 text-center">
          {voiceCount} voices available on your device
        </p>
      )}
    </div>
  );
}
