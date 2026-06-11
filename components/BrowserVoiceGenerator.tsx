'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Square, Pause, RotateCcw, Copy, Check,
  ChevronDown, ChevronUp, Mic2, Volume2, Info, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VoiceSettingsPanel } from './VoiceSettingsPanel';
import { useVoiceGenStore } from '@/lib/store';
import { ALL_PRESETS, PRESET_CATEGORIES } from '@/data/allPresets';
import { speak, stopSpeaking, pauseSpeaking, resumeSpeaking, isBrowserSpeechSupported, waitForVoices } from '@/lib/speech';
import { estimateAudioDuration } from '@/lib/presets';
import { VIBES } from '@/data/vibes';
import { cn } from '@/lib/utils';
import { VibeBadge } from './VibeBadge';

const MAX_CHARS = 3000;
const DEMO_TEXTS: Record<string, string> = {
  default: 'In the heart of the ancient city, a whisper echoed through time. The narrator began, and the world fell silent.',
  horror: 'Something moved in the darkness. You told yourself it was nothing. You were wrong.',
  tiktok: 'Wait for it... THIS is the voice hack everyone is using! Subscribe before it gets taken down!',
  meditation: 'Breathe in slowly... and release. Let your mind drift into a place of calm and stillness.',
  arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
};

export function BrowserVoiceGenerator() {
  const {
    selectedPreset, setSelectedPreset,
    currentSettings, updateSettings, resetToPresetDefaults,
    scriptText, setScriptText,
    isGenerating, setIsGenerating,
    isSpeaking, setIsSpeaking,
    generationError, setGenerationError,
    addToHistory,
  } = useVoiceGenStore();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [savedToHistory, setSavedToHistory] = useState(false);

  useEffect(() => {
    setSpeechSupported(isBrowserSpeechSupported());
    waitForVoices().then((v) => setVoicesReady(v.length > 0));
  }, []);

  const filteredPresets = ALL_PRESETS.filter((p) => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return !p.parentPresetId; // show seed presets only in main selector
  });

  const handleSpeak = useCallback(() => {
    if (!scriptText.trim()) {
      setGenerationError('Please enter some text to generate.');
      return;
    }
    if (!speechSupported) {
      setGenerationError('Web Speech API is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);
    setIsSpeaking(false);
    setIsPaused(false);
    setSavedToHistory(false);

    speak({
      text: scriptText,
      settings: currentSettings,
      onStart: () => {
        setIsGenerating(false);
        setIsSpeaking(true);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onError: (msg) => {
        setIsGenerating(false);
        setIsSpeaking(false);
        setGenerationError(`Speech error: ${msg}. Try a shorter text or refresh the page.`);
      },
    });
  }, [scriptText, currentSettings, speechSupported, setGenerationError, setIsGenerating, setIsSpeaking]);

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handlePause = () => {
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
    setTimeout(() => setSavedToHistory(false), 3000);
  };

  const copySettings = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSettings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedDuration = estimateAudioDuration(scriptText, currentSettings.speed);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Left panel: Preset + Settings ── */}
      <div className="lg:col-span-1 space-y-4">

        {/* Preset selector */}
        <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">1</span>
            Choose Voice Preset
          </h3>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="text-xs h-8 mb-2">
              <SelectValue placeholder="Filter category…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRESET_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedPreset?.id || ''}
            onValueChange={(id) => {
              const preset = ALL_PRESETS.find((p) => p.id === id);
              if (preset) setSelectedPreset(preset);
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

          {selectedPreset && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-violet-500/8 border border-violet-500/20"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-xs font-semibold text-white">{selectedPreset.name}</p>
                <VibeBadge vibe={selectedPreset.vibe} size="sm" />
              </div>
              <p className="text-xs text-white/45 leading-relaxed line-clamp-2">
                {selectedPreset.description}
              </p>
              <div className="mt-2 flex gap-3 text-[10px] font-mono text-violet-400/70">
                <span>Speed {currentSettings.speed.toFixed(1)}x</span>
                <span>Pitch {currentSettings.pitch.toFixed(2)}</span>
                <span>{currentSettings.language}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Advanced settings */}
        <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-cyan-500/25 flex items-center justify-center text-cyan-400 text-xs font-bold">2</span>
              Voice Settings
            </span>
            {showAdvanced
              ? <ChevronUp className="w-4 h-4 text-white/35" />
              : <ChevronDown className="w-4 h-4 text-white/35" />}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <VoiceSettingsPanel />
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={resetToPresetDefaults} className="flex-1 text-xs">
                      <RotateCcw className="w-3 h-3" /> Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={copySettings} className="flex-1 text-xs">
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy JSON'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right panel: Script + Playback ── */}
      <div className="lg:col-span-2 space-y-4">

        {/* Browser notice */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/6 px-4 py-3 flex items-start gap-3">
          <Volume2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-400/85">
            <span className="font-semibold text-emerald-400">Free Browser Voice Generation — </span>
            Uses your device's built-in speech engine. No API key required. Voice quality varies by OS and browser.
            {!voicesReady && (
              <span className="ml-1 text-amber-400"> Loading voices…</span>
            )}
          </div>
        </div>

        {/* Script input */}
        <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/25 flex items-center justify-center text-amber-400 text-xs font-bold">3</span>
              Your Script
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/35">
              <span className={scriptText.length > MAX_CHARS * 0.9 ? 'text-amber-400' : ''}>
                {scriptText.length}/{MAX_CHARS}
              </span>
              <span>≈ {Math.round(estimatedDuration)}s</span>
            </div>
          </div>

          <Textarea
            placeholder="Enter your script here… Try: 'In the shadows of the ancient city, a whisper echoed through time.' — or paste any text to hear it spoken."
            className="min-h-[160px] text-sm leading-relaxed"
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value.slice(0, MAX_CHARS))}
          />

          {/* Demo text buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="text-[10px] text-white/30 self-center">Try:</span>
            {Object.entries(DEMO_TEXTS).map(([key, text]) => (
              <button
                key={key}
                onClick={() => setScriptText(text)}
                className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/8 text-white/45 hover:text-white hover:bg-white/10 transition-all capitalize"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
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
                <p className="text-sm font-medium text-red-300">Generation Error</p>
                <p className="text-xs text-red-400/75 mt-1">{generationError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback controls */}
        <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/25 flex items-center justify-center text-violet-400 text-xs font-bold">4</span>
            Generate & Play
          </h3>

          {/* Waveform animation */}
          <div className="flex items-end gap-0.5 h-10 mb-4 justify-center">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'w-1 rounded-full',
                  isSpeaking
                    ? 'bg-gradient-to-t from-violet-600 to-cyan-400'
                    : 'bg-white/10'
                )}
                animate={isSpeaking ? {
                  height: [3, Math.random() * 28 + 4, 3],
                } : { height: 3 }}
                transition={{
                  duration: 0.35 + Math.random() * 0.35,
                  repeat: isSpeaking ? Infinity : 0,
                  delay: i * 0.025,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Status */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">
                {isPaused ? 'Paused' : 'Speaking…'}
              </span>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Main generate/stop button */}
            {!isSpeaking && !isGenerating ? (
              <Button
                variant="glow"
                size="lg"
                onClick={handleSpeak}
                disabled={!scriptText.trim() || !selectedPreset || !speechSupported}
                className="flex-1 min-w-[140px]"
              >
                <Play className="w-4 h-4" />
                Generate Voice
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleStop}
                className="flex-1 min-w-[140px]"
              >
                <Square className="w-4 h-4" />
                Stop
              </Button>
            )}

            {/* Pause/resume */}
            {isSpeaking && (
              <Button variant="outline" size="lg" onClick={handlePause}>
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            )}

            {/* Save to history */}
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSaveToHistory}
              disabled={!scriptText.trim() || !selectedPreset}
            >
              {savedToHistory ? (
                <><Check className="w-4 h-4 text-emerald-400" /> Saved!</>
              ) : (
                <><Save className="w-4 h-4" /> Save</>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
              <motion.div
                className="w-3 h-3 rounded-full border-2 border-violet-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              Initializing speech engine…
            </div>
          )}
        </div>

        {/* Not supported warning */}
        {!speechSupported && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-4 text-xs text-amber-400">
            ⚠️ Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari for voice generation.
          </div>
        )}
      </div>
    </div>
  );
}
