'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Pause, ExternalLink, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { generateTtsWithVibe, revokeBlobUrl } from '@/lib/tts';
import { SEED_PRESETS } from '@/data/seedPresets';
import { cn } from '@/lib/utils';

const DEMO_PRESETS = [
  { id: 'daniel_british_cinematic',    name: 'Daniel — British Cinematic' },
  { id: 'haunted_whisper_narrator',    name: 'Haunted Whisper Narrator' },
  { id: 'viral_tiktok_voice',          name: 'Viral TikTok Voice' },
  { id: 'deep_sleep_hypnosis_male',    name: 'Deep Sleep Hypnosis' },
  { id: 'ai_synth_narrator',           name: 'AI Synth Narrator' },
  { id: 'soothing_meditation',         name: 'Soothing Meditation' },
  { id: 'noir_detective_narrator',     name: 'Noir Detective' },
  { id: 'robot_butler',                name: 'Robot Butler' },
].map((d) => ({
  ...d,
  preset: SEED_PRESETS.find((p) => p.id === d.id)!,
})).filter((d) => d.preset);

const SCRIPTS = [
  { label: 'Cinematic', text: 'In the shadows of the ancient city, a narrator began to speak. The world fell silent.' },
  { label: 'Horror',    text: 'There was something in the basement. You heard it last night. It heard you too.' },
  { label: 'TikTok',   text: 'Stop scrolling! This is the AI voice hack everyone is talking about right now!' },
  { label: 'Sleep',    text: 'Breathe in slowly… and release. Let your mind drift into deep, peaceful stillness.' },
];

export function LandingDemoWidget() {
  const [selectedPresetId, setSelectedPresetId] = useState(DEMO_PRESETS[0].id);
  const [scriptIndex,      setScriptIndex]      = useState(0);
  const [isGenerating,     setIsGenerating]     = useState(false);
  const [isPlaying,        setIsPlaying]        = useState(false);
  const [audioBlobUrl,     setAudioBlobUrl]     = useState<string | null>(null);
  const [error,            setError]            = useState<string | null>(null);

  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) revokeBlobUrl(prevUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (!audioBlobUrl) return;
    const audio = new Audio(audioBlobUrl);
    audioRef.current = audio;
    audio.onplay  = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.src = ''; };
  }, [audioBlobUrl]);

  const item = DEMO_PRESETS.find((d) => d.id === selectedPresetId) ?? DEMO_PRESETS[0];

  const handleGenerate = async () => {
    if (isGenerating) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; }
    if (prevUrlRef.current) revokeBlobUrl(prevUrlRef.current);
    setAudioBlobUrl(null);
    setIsPlaying(false);
    setError(null);
    setIsGenerating(true);

    const result = await generateTtsWithVibe(
      SCRIPTS[scriptIndex].text,
      item.preset.settings,
      item.preset.vibe,
      item.preset.id
    );

    setIsGenerating(false);
    if (!result.ok) { setError(result.error); return; }
    prevUrlRef.current = result.blobUrl;
    setAudioBlobUrl(result.blobUrl);
  };

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause(); else audio.play();
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/6 to-cyan-500/3 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <Zap className="w-5 h-5 text-violet-400" />
        <h3 className="font-bold text-white">Live Demo — Powered by Groq AI</h3>
        <span className="ml-auto text-[11px] font-semibold text-violet-300 bg-violet-500/15 border border-violet-500/25 px-2.5 py-0.5 rounded-full">
          Real AI Voice
        </span>
      </div>

      {/* Script style tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SCRIPTS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => { setScriptIndex(i); setAudioBlobUrl(null); setError(null); if(audioRef.current){audioRef.current.pause();} }}
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

      {/* Script text */}
      <div className="rounded-xl bg-black/25 border border-white/8 p-4 mb-4 min-h-[58px] flex items-center">
        <p className="text-sm text-white/65 italic leading-relaxed">"{SCRIPTS[scriptIndex].text}"</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedPresetId} onValueChange={(id) => {
          setSelectedPresetId(id);
          setAudioBlobUrl(null);
          setError(null);
          if (audioRef.current) audioRef.current.pause();
        }}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEMO_PRESETS.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Generate / Play-Pause buttons */}
        {!audioBlobUrl ? (
          <Button
            variant="glow"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="min-w-[140px]"
          >
            {isGenerating
              ? <><motion.div className="w-4 h-4 rounded-full border-2 border-white/60 border-t-transparent mr-1.5"
                  animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                Generating…</>
              : <><Zap className="w-4 h-4 mr-1.5" /> Generate Voice</>}
          </Button>
        ) : (
          <Button
            variant={isPlaying ? 'outline' : 'glow'}
            onClick={handleTogglePlay}
            className="min-w-[120px]"
          >
            {isPlaying
              ? <><Square className="w-4 h-4 mr-1.5" /> Stop</>
              : <><Play  className="w-4 h-4 mr-1.5" /> Play Audio</>}
          </Button>
        )}

        <Button variant="outline" asChild>
          <Link href="/generate" className="flex items-center gap-1.5 whitespace-nowrap">
            Full Studio
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>

      {/* Waveform */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <div className="flex items-end gap-[3px] h-7 mt-4 justify-center">
              {Array.from({ length: 36 }).map((_, i) => (
                <motion.div key={i} className="rounded-full flex-1 max-w-[6px] bg-gradient-to-t from-violet-600 to-cyan-400"
                  animate={{ height: [3, 5 + (i % 6) * 3, 3] }}
                  transition={{ duration: 0.35 + (i % 4) * 0.07, repeat: Infinity, delay: i * 0.04 }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="mt-3 text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">
          ⚠️ {error}
        </p>
      )}

      {/* Audio ready hint */}
      {audioBlobUrl && !isPlaying && !isGenerating && (
        <p className="mt-3 text-[11px] text-emerald-400/70 text-center">
          ✅ Audio ready — press Play Audio
        </p>
      )}
    </div>
  );
}
