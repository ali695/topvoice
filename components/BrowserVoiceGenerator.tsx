'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Square, Pause, RotateCcw, Copy, Check,
  ChevronDown, ChevronUp, Volume2, Info, Save, Mic2,
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
import {
  speak, stopSpeaking, pauseSpeaking, resumeSpeaking,
  isBrowserSpeechSupported, waitForVoices,
} from '@/lib/speech';
import { estimateAudioDuration } from '@/lib/presets';
import { cn } from '@/lib/utils';

const MAX_CHARS = 3000;

const DEMO_TEXTS: Record<string, string> = {
  cinematic: 'In the heart of the ancient city, a whisper echoed through time. The narrator began, and the world fell silent.',
  horror: 'Something moved in the darkness. You told yourself it was nothing. You were wrong.',
  tiktok: 'Wait for it… THIS is the voice hack everyone is using! Subscribe before it gets taken down!',
  meditation: 'Breathe in slowly… and release. Let your mind drift into a place of deep, peaceful stillness.',
  arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
};

export function BrowserVoiceGenerator() {
  const {
    selectedPreset, setSelectedPreset,
    currentSettings, resetToPresetDefaults,
    scriptText, setScriptText,
    generationError, setGenerationError,
    addToHistory,
  } = useVoiceGenStore();

  // ── Local speech state (not in global store to avoid stale closure issues) ──
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused,   setIsPaused]   = useState(false);
  const [isLoading,  setIsLoading]  = useState(false);

  // ── UI state ─────────────────────────────────────────────────────────────
  const [showAdvanced,    setShowAdvanced]    = useState(false);
  const [copied,          setCopied]          = useState(false);
  const [savedToHistory,  setSavedToHistory]  = useState(false);
  const [filterCategory,  setFilterCategory]  = useState('all');
  const [voiceCount,      setVoiceCount]      = useState(0);
  const [supported,       setSupported]       = useState(true);

  // Keep latest handlers in a ref so the setTimeout closure never goes stale
  const stateRef = useRef({ isSpeaking, isPaused });
  useEffect(() => { stateRef.current = { isSpeaking, isPaused }; }, [isSpeaking, isPaused]);

  // ── Init: check browser support + load voices ─────────────────────────────
  useEffect(() => {
    const ok = isBrowserSpeechSupported();
    setSupported(ok);
    if (ok) {
      waitForVoices().then((voices) => setVoiceCount(voices.length));
    }
  }, []);

  // ── Filtered preset list (seed presets only for main selector) ────────────
  const filteredPresets = ALL_PRESETS.filter((p) => {
    if (p.parentPresetId) return false; // sub-presets hidden from main selector
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  // ── Generate / speak ─────────────────────────────────────────────────────
  const handleGenerate = useCallback(() => {
    if (!scriptText.trim()) {
      setGenerationError('Please enter some text first.');
      return;
    }
    if (!supported) {
      setGenerationError('Web Speech API is not supported. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Clear previous state
    setGenerationError(null);
    setIsLoading(true);
    setIsSpeaking(false);
    setIsPaused(false);
    setSavedToHistory(false);

    speak({
      text: scriptText,
      settings: currentSettings,
      // onStart fires immediately inside speak() before the synth.speak() call
      // so UI is guaranteed to update even if browser skips the utterance.onstart event
      onStart: () => {
        setIsLoading(false);
        setIsSpeaking(true);
      },
      onEnd: () => {
        setIsLoading(false);
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onError: (msg) => {
        setIsLoading(false);
        setIsSpeaking(false);
        setIsPaused(false);
        setGenerationError(`Speech error: "${msg}". Try refreshing or using Chrome/Edge.`);
      },
    });
  }, [scriptText, currentSettings, supported, setGenerationError]);

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeSpeaking();
      setIsPaused(false);
    } else {
      pauseSpeaking();
      setIsPaused(true);
    }
  };

  const handleSaveToHistory = () => {
    if (!selectedPreset || !scriptText.trim()) return;
    addToHistory({
      id: `local_${Date.now()}`,
      presetId: selectedPreset.id,
      presetName: selectedPreset.name,
      text: scriptText,
      audioUrl: '',
      duration: Math.round(estimateAudioDuration(scriptText, currentSettings.speed)),
      settingsUsed: currentSettings,
      createdAt: new Date().toISOString(),
      format: 'browser',
    });
    setSavedToHistory(true);
    setTimeout(() => setSavedToHistory(false), 2500);
  };

  const handleCopySettings = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSettings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedDuration = estimateAudioDuration(scriptText, currentSettings.speed);
  const isActive = isSpeaking || isLoading;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ══════════════════════════════════════════════
          LEFT — Preset + Settings
      ══════════════════════════════════════════════ */}
      <div className="lg:col-span-1 space-y-4">

        {/* ── Step 1: Preset selector ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">
              1
            </span>
            Choose Voice Preset
          </h3>

          {/* Category filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-8 text-xs mb-2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRESET_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Preset selector */}
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
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Preset info card */}
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
              <p className="text-xs text-white/45 leading-relaxed line-clamp-2 mb-2">
                {selectedPreset.description}
              </p>
              <div className="flex gap-3 text-[10px] font-mono text-violet-400/70">
                <span>{currentSettings.language}</span>
                <span>{currentSettings.speed.toFixed(1)}× speed</span>
                <span>pitch {currentSettings.pitch.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Step 2: Advanced settings ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setShowAdvanced((v) => !v)}
          >
            <span className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-bold">
                2
              </span>
              Voice Settings
            </span>
            {showAdvanced
              ? <ChevronUp  className="w-4 h-4 text-white/35" />
              : <ChevronDown className="w-4 h-4 text-white/35" />}
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
                    <Button
                      variant="ghost" size="sm"
                      onClick={resetToPresetDefaults}
                      className="flex-1 text-xs"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                    <Button
                      variant="ghost" size="sm"
                      onClick={handleCopySettings}
                      className="flex-1 text-xs"
                    >
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

      {/* ══════════════════════════════════════════════
          RIGHT — Script + Playback
      ══════════════════════════════════════════════ */}
      <div className="lg:col-span-2 space-y-4">

        {/* ── Browser info banner ── */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 flex items-start gap-3">
          <Volume2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400/85">
            <span className="font-semibold text-emerald-400">Free Browser Voice Generation — </span>
            Uses your device's built-in speech engine. No API key needed. Quality varies by OS &amp; browser.
            {voiceCount > 0 && (
              <span className="ml-1 text-emerald-400/60">({voiceCount} voices available)</span>
            )}
          </p>
        </div>

        {/* ── Step 3: Script input ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/25 flex items-center justify-center text-amber-400 text-xs font-bold">
                3
              </span>
              Your Script
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/35">
              <span className={scriptText.length > MAX_CHARS * 0.9 ? 'text-amber-400' : ''}>
                {scriptText.length} / {MAX_CHARS}
              </span>
              {scriptText.length > 0 && (
                <span>≈ {Math.round(estimatedDuration)}s</span>
              )}
            </div>
          </div>

          <Textarea
            placeholder={`Paste or type your script here…\n\nExample: "In the shadows of the ancient city, a voice whispered a secret that changed everything."`}
            className="min-h-[160px] text-sm leading-relaxed resize-y"
            value={scriptText}
            onChange={(e) => {
              setScriptText(e.target.value.slice(0, MAX_CHARS));
              setGenerationError(null);
            }}
          />

          {/* Quick-fill demo buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2.5 items-center">
            <span className="text-[10px] text-white/25 mr-1">Try sample:</span>
            {Object.entries(DEMO_TEXTS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => {
                  setScriptText(val);
                  setGenerationError(null);
                }}
                className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/8 text-white/45 hover:text-white hover:bg-white/10 transition-all capitalize"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* ── Error banner ── */}
        <AnimatePresence>
          {generationError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3"
            >
              <Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-300 mb-0.5">Error</p>
                <p className="text-xs text-red-400/80 leading-relaxed">{generationError}</p>
              </div>
              <button
                onClick={() => setGenerationError(null)}
                className="ml-auto text-white/30 hover:text-white text-sm leading-none"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 4: Generate & Play ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">
              4
            </span>
            Generate &amp; Play
          </h3>

          {/* Animated waveform bars */}
          <div className="flex items-end gap-[3px] h-10 mb-4 justify-center px-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'rounded-full flex-1 max-w-[6px]',
                  isSpeaking
                    ? 'bg-gradient-to-t from-violet-600 to-cyan-400'
                    : 'bg-white/10'
                )}
                animate={isSpeaking ? { height: [3, 8 + (i % 7) * 4, 3] } : { height: 3 }}
                transition={{
                  duration: 0.4 + (i % 5) * 0.08,
                  repeat: isSpeaking ? Infinity : 0,
                  delay: i * 0.03,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Live status indicator */}
          <AnimatePresence>
            {(isSpeaking || isLoading) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mb-3"
              >
                <span className={cn(
                  'w-2 h-2 rounded-full animate-pulse',
                  isSpeaking ? 'bg-emerald-400' : 'bg-violet-400'
                )} />
                <span className={cn(
                  'text-xs font-medium',
                  isSpeaking ? 'text-emerald-400' : 'text-violet-400'
                )}>
                  {isLoading ? 'Initialising speech engine…'
                    : isPaused ? 'Paused'
                    : 'Speaking…'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2.5">

            {/* Generate / Stop */}
            {!isActive ? (
              <Button
                variant="glow"
                size="lg"
                onClick={handleGenerate}
                disabled={!scriptText.trim() || !supported}
                className="flex-1 min-w-[140px]"
              >
                <Play className="w-4 h-4 mr-1" />
                Generate Voice
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleStop}
                className="flex-1 min-w-[140px]"
              >
                <Square className="w-4 h-4 mr-1" />
                Stop
              </Button>
            )}

            {/* Pause / Resume — only visible while speaking */}
            {isSpeaking && (
              <Button variant="outline" size="lg" onClick={handlePauseResume}>
                {isPaused
                  ? <><Play  className="w-4 h-4 mr-1" /> Resume</>
                  : <><Pause className="w-4 h-4 mr-1" /> Pause</>}
              </Button>
            )}

            {/* Save to history */}
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSaveToHistory}
              disabled={!scriptText.trim() || !selectedPreset}
            >
              {savedToHistory
                ? <><Check className="w-4 h-4 mr-1 text-emerald-400" /> Saved!</>
                : <><Save  className="w-4 h-4 mr-1" /> Save</>}
            </Button>
          </div>

          {/* Not supported warning */}
          {!supported && (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-xs text-amber-400">
              ⚠️ Web Speech API is not supported in this browser.
              Please open VoiceGen Studio in <strong>Chrome</strong>, <strong>Edge</strong>, or <strong>Safari</strong>.
            </div>
          )}

          {/* No voices loaded warning */}
          {supported && voiceCount === 0 && (
            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400/80">
              ⏳ Waiting for voices to load. If this persists, refresh the page.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
