'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Square, Pause, RotateCcw, Copy, Check,
  ChevronDown, ChevronUp, Volume2, Info, Save,
  Download, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { VoiceSettingsPanel } from './VoiceSettingsPanel';
import { VibeBadge } from './VibeBadge';
import { useVoiceGenStore } from '@/lib/store';
import { ALL_PRESETS, PRESET_CATEGORIES } from '@/data/allPresets';
import { generateTtsWithVibe, revokeBlobUrl } from '@/lib/tts';
import { estimateAudioDuration } from '@/lib/presets';
import { cn } from '@/lib/utils';

const MAX_CHARS = 4000;

const DEMO_TEXTS: Record<string, string> = {
  cinematic: 'In the heart of the ancient city, a whisper echoed through time. The narrator began, and the world fell silent.',
  horror: 'Something moved in the darkness. You told yourself it was nothing. You were wrong.',
  tiktok: 'Wait for it… THIS is the voice hack everyone is using right now! Subscribe before it gets taken down!',
  meditation: 'Breathe in slowly… and release. Let your mind drift into a place of deep, peaceful stillness.',
  arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
};

export function BrowserVoiceGenerator() {
  const {
    selectedPreset, setSelectedPreset,
    currentSettings, resetToPresetDefaults,
    scriptText, setScriptText,
    generationError, setGenerationError,
    addToHistory,
  } = useVoiceGenStore();

  // ── Local state ───────────────────────────────────────────────────────────
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [copied,       setCopied]       = useState(false);
  const [savedToHistory, setSavedToHistory] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevBlobRef = useRef<string | null>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (prevBlobRef.current) revokeBlobUrl(prevBlobRef.current);
      if (audioBlobUrl) revokeBlobUrl(audioBlobUrl);
    };
  }, []);

  // ── Audio element setup ───────────────────────────────────────────────────
  useEffect(() => {
    if (!audioBlobUrl) return;
    const audio = new Audio(audioBlobUrl);
    audioRef.current = audio;

    audio.onplay     = () => { setIsPlaying(true); setIsPaused(false); };
    audio.onpause    = () => { setIsPaused(true);  setIsPlaying(false); };
    audio.onended    = () => { setIsPlaying(false); setIsPaused(false); setCurrentTime(0); };
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setAudioDuration(audio.duration);

    // Auto-play immediately after generation
    audio.play().catch((e) => {
      // Autoplay blocked — user will need to click Play
      console.warn('Autoplay blocked:', e.message);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioBlobUrl]);

  // ── Preset filter ─────────────────────────────────────────────────────────
  const filteredPresets = ALL_PRESETS.filter((p) => {
    if (p.parentPresetId) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  // ── Generate voice via Groq ───────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!scriptText.trim()) {
      setGenerationError('Please enter some text first.');
      return;
    }
    if (!selectedPreset) {
      setGenerationError('Please select a voice preset.');
      return;
    }

    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (prevBlobRef.current) {
      revokeBlobUrl(prevBlobRef.current);
    }
    setAudioBlobUrl(null);
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
    setGenerationError(null);
    setIsGenerating(true);
    setSavedToHistory(false);

    const result = await generateTtsWithVibe(
      scriptText,
      currentSettings,
      selectedPreset.vibe,
      selectedPreset.id
    );

    setIsGenerating(false);

    if (!result.ok) {
      setGenerationError(result.error);
      return;
    }

    prevBlobRef.current = result.blobUrl;
    setAudioBlobUrl(result.blobUrl);
    setAudioDuration(result.durationEstimate);
  }, [scriptText, currentSettings, selectedPreset, setGenerationError]);

  // ── Playback controls ─────────────────────────────────────────────────────
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const handleDownload = () => {
    if (!audioBlobUrl) return;
    const a = document.createElement('a');
    a.href = audioBlobUrl;
    a.download = `${selectedPreset?.name ?? 'voice'}-${Date.now()}.wav`;
    a.click();
  };

  const handleSave = () => {
    if (!selectedPreset || !scriptText.trim()) return;
    addToHistory({
      id: `groq_${Date.now()}`,
      presetId: selectedPreset.id,
      presetName: selectedPreset.name,
      text: scriptText,
      audioUrl: audioBlobUrl ?? '',
      duration: Math.round(audioDuration || estimateAudioDuration(scriptText, currentSettings.speed)),
      settingsUsed: currentSettings,
      createdAt: new Date().toISOString(),
      format: 'browser',
    });
    setSavedToHistory(true);
    setTimeout(() => setSavedToHistory(false), 2500);
  };

  const handleCopySettings = () => {
    navigator.clipboard.writeText(JSON.stringify({ preset: selectedPreset?.name, settings: currentSettings }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const progress = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;
  const estDuration = estimateAudioDuration(scriptText, currentSettings.speed);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ══════════════════════════════
          LEFT — Preset + Settings
      ══════════════════════════════ */}
      <div className="lg:col-span-1 space-y-4">

        {/* Step 1 — Preset */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">1</span>
            Voice Preset
          </h3>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-8 text-xs mb-2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRESET_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedPreset?.id ?? ''}
            onValueChange={(id) => {
              const p = ALL_PRESETS.find((x) => x.id === id);
              if (p) setSelectedPreset(p);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a voice preset…" />
            </SelectTrigger>
            <SelectContent>
              {filteredPresets.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedPreset && (
            <motion.div
              key={selectedPreset.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-violet-500/8 border border-violet-500/20"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-white leading-tight">{selectedPreset.name}</p>
                <VibeBadge vibe={selectedPreset.vibe} size="sm" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-2">
                {selectedPreset.description}
              </p>
              <div className="flex gap-2.5 text-[10px] font-mono text-violet-400/60">
                <span>{currentSettings.language}</span>
                <span>{currentSettings.speed.toFixed(1)}× speed</span>
                <span>pitch {currentSettings.pitch.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Step 2 — Advanced settings */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setShowAdvanced((v) => !v)}
          >
            <span className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-bold">2</span>
              Voice Settings
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <VoiceSettingsPanel />
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={resetToPresetDefaults} className="flex-1 text-xs">
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCopySettings} className="flex-1 text-xs">
                      {copied
                        ? <><Check className="w-3 h-3 mr-1 text-emerald-400" /> Copied!</>
                        : <><Copy className="w-3 h-3 mr-1" /> Copy JSON</>}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══════════════════════════════
          RIGHT — Script + Player
      ══════════════════════════════ */}
      <div className="lg:col-span-2 space-y-4">

        {/* Groq TTS badge */}
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 flex items-start gap-3">
          <Zap className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-violet-300/85">
            <span className="font-semibold text-violet-300">Powered by Groq TTS (Orpheus) — </span>
            Real AI voice generation. 18+ English voices, 6 Arabic voices. Speed up to 140 chars/sec.
          </p>
        </div>

        {/* Step 3 — Script */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/25 flex items-center justify-center text-amber-400 text-xs font-bold">3</span>
              Your Script
            </h3>
            <div className="flex gap-3 text-xs text-white/30">
              <span className={scriptText.length > MAX_CHARS * 0.9 ? 'text-amber-400' : ''}>
                {scriptText.length}/{MAX_CHARS}
              </span>
              {scriptText.length > 0 && <span>≈ {Math.round(estDuration)}s</span>}
            </div>
          </div>

          <Textarea
            placeholder={'Enter your script here…\n\nExample: "In the shadows of the ancient city, a voice whispered a secret that changed everything forever."'}
            className="min-h-[160px] text-sm leading-relaxed resize-y"
            value={scriptText}
            onChange={(e) => {
              setScriptText(e.target.value.slice(0, MAX_CHARS));
              setGenerationError(null);
            }}
          />

          {/* Demo fill buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2.5 items-center">
            <span className="text-[10px] text-white/25 mr-1">Quick fill:</span>
            {Object.entries(DEMO_TEXTS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => { setScriptText(val); setGenerationError(null); }}
                className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/8 text-white/40 hover:text-white hover:bg-white/10 transition-all capitalize"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Error banner */}
        <AnimatePresence>
          {generationError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3"
            >
              <Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-300 mb-0.5">Generation Error</p>
                <p className="text-xs text-red-400/80 leading-relaxed">{generationError}</p>
              </div>
              <button onClick={() => setGenerationError(null)} className="text-white/25 hover:text-white text-xs">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4 — Generate + Player */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">4</span>
            Generate &amp; Play
          </h3>

          {/* Waveform visualisation */}
          <div className="flex items-end gap-[3px] h-10 mb-4 justify-center overflow-hidden">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'rounded-full flex-1 max-w-[7px]',
                  isPlaying ? 'bg-gradient-to-t from-violet-600 to-cyan-400' : 'bg-white/10'
                )}
                animate={isGenerating
                  ? { height: [3, 6 + (i % 8) * 2, 3] }
                  : isPlaying
                  ? { height: [3, 6 + (i % 9) * 3.5, 3] }
                  : { height: 3 }
                }
                transition={{
                  duration: isGenerating ? 0.5 + (i % 4) * 0.1 : 0.4 + (i % 5) * 0.08,
                  repeat: (isGenerating || isPlaying) ? Infinity : 0,
                  delay: i * 0.03,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Status text */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mb-3">
                <motion.div
                  className="w-3 h-3 rounded-full border-2 border-violet-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                <span className="text-xs text-violet-400 font-medium">Generating with Groq AI…</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio progress bar — shows only when audio is ready */}
          {audioBlobUrl && !isGenerating && (
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={audioDuration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7c3aed ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
                  accentColor: '#7c3aed',
                }}
              />
              <div className="flex justify-between mt-1 text-[10px] font-mono text-white/30">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
            </div>
          )}

          {/* Buttons row */}
          <div className="flex flex-wrap gap-2.5">
            {/* Generate */}
            <Button
              variant="glow"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || !scriptText.trim() || !selectedPreset}
              className="flex-1 min-w-[140px]"
            >
              {isGenerating
                ? <><motion.div className="w-4 h-4 rounded-full border-2 border-white/60 border-t-transparent mr-1.5"
                    animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                  Generating…</>
                : <><Zap className="w-4 h-4 mr-1.5" /> Generate Voice</>}
            </Button>

            {/* Play / Pause — only if audio loaded */}
            {audioBlobUrl && !isGenerating && (
              <>
                <Button variant={isPlaying ? 'outline' : 'secondary'} size="lg" onClick={handlePlayPause}>
                  {isPlaying
                    ? <><Pause className="w-4 h-4 mr-1.5" /> Pause</>
                    : <><Play  className="w-4 h-4 mr-1.5" /> Play</>}
                </Button>

                {(isPlaying || isPaused) && (
                  <Button variant="ghost" size="lg" onClick={handleStop}>
                    <Square className="w-4 h-4 mr-1.5" /> Stop
                  </Button>
                )}

                <Button variant="secondary" size="lg" onClick={handleDownload} title="Download WAV">
                  <Download className="w-4 h-4 mr-1.5" /> Download
                </Button>
              </>
            )}

            {/* Save to history */}
            <Button
              variant="secondary" size="lg"
              onClick={handleSave}
              disabled={!scriptText.trim() || !selectedPreset}
            >
              {savedToHistory
                ? <><Check className="w-4 h-4 mr-1.5 text-emerald-400" /> Saved!</>
                : <><Save  className="w-4 h-4 mr-1.5" /> Save</>}
            </Button>
          </div>

          {/* Success: audio ready hint */}
          {audioBlobUrl && !isGenerating && !isPlaying && !isPaused && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-emerald-400/70 text-center"
            >
              ✅ Audio ready — press Play or Download
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
