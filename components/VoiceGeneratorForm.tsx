'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, RotateCcw, Copy, Check, AlertCircle, Info,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AudioPlayer } from './AudioPlayer';
import { VoiceSettingsPanel } from './VoiceSettingsPanel';
import { useVoiceGenStore } from '@/lib/store';
import { ALL_PRESETS, PRESET_CATEGORIES } from '@/data/allPresets';
import { generateVoice } from '@/lib/api';
import { estimateAudioDuration, estimateCredits } from '@/lib/presets';
import { VIBES } from '@/data/vibes';

const MAX_CHARS = 5000;

export function VoiceGeneratorForm() {
  const {
    selectedPreset,
    setSelectedPreset,
    currentSettings,
    updateSettings,
    resetToPresetDefaults,
    scriptText,
    setScriptText,
    audioFormat,
    setAudioFormat,
    isGenerating,
    setIsGenerating,
    lastGenerationResult,
    setGenerationResult,
    generationError,
    setGenerationError,
    addToHistory,
  } = useVoiceGenStore();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterVibe, setFilterVibe] = useState('all');

  const filteredPresets = ALL_PRESETS.filter((p) => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (filterVibe !== 'all' && p.vibe.toLowerCase() !== filterVibe) return false;
    return true;
  });

  const handleGenerate = async () => {
    if (!scriptText.trim()) return;
    if (!selectedPreset) return;

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationResult(null);

    try {
      const result = await generateVoice({
        text: scriptText,
        presetId: selectedPreset.id,
        settings: currentSettings,
        format: audioFormat,
      });

      if (result.success) {
        setGenerationResult({
          audioUrl: result.audioUrl,
          generationId: result.generationId,
          duration: result.duration,
        });

        addToHistory({
          id: result.generationId,
          presetId: selectedPreset.id,
          presetName: selectedPreset.name,
          text: scriptText,
          audioUrl: result.audioUrl,
          duration: result.duration,
          settingsUsed: result.settingsUsed,
          createdAt: new Date().toISOString(),
          format: audioFormat,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Generation failed. Please try again.';
      setGenerationError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const copySettings = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSettings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedDuration = estimateAudioDuration(scriptText, currentSettings.speed);
  const credits = estimateCredits(scriptText);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Settings */}
      <div className="lg:col-span-1 space-y-5">
        {/* Preset selector */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs">1</span>
            Select Preset
          </h3>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="text-xs h-8">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {PRESET_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterVibe} onValueChange={setFilterVibe}>
              <SelectTrigger className="text-xs h-8">
                <SelectValue placeholder="Vibe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vibes</SelectItem>
                {VIBES.slice(0, 15).map((v) => (
                  <SelectItem key={v.id} value={v.id}>{v.emoji} {v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select
            value={selectedPreset?.id || ''}
            onValueChange={(id) => {
              const preset = ALL_PRESETS.find((p) => p.id === id);
              if (preset) setSelectedPreset(preset);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a voice preset..." />
            </SelectTrigger>
            <SelectContent>
              {filteredPresets.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} — {p.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedPreset && (
            <div className="mt-3 p-3 rounded-xl bg-violet-500/5 border border-violet-500/20">
              <p className="text-xs text-white/70 font-medium mb-1">{selectedPreset.name}</p>
              <p className="text-xs text-white/40 leading-relaxed">{selectedPreset.description}</p>
            </div>
          )}
        </div>

        {/* Advanced voice settings */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">2</span>
              Voice Settings
            </h3>
            {showAdvanced ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
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

          {!showAdvanced && selectedPreset && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { l: 'Speed', v: currentSettings.speed.toFixed(1) },
                { l: 'Pitch', v: currentSettings.pitch.toFixed(2) },
                { l: 'Stability', v: currentSettings.stability.toFixed(1) },
              ].map(({ l, v }) => (
                <div key={l} className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
                  <div className="text-[10px] text-white/30">{l}</div>
                  <div className="text-xs font-mono text-violet-400">{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Script & Output */}
      <div className="lg:col-span-2 space-y-5">
        {/* Script input */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs">3</span>
              Your Script
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className={scriptText.length > MAX_CHARS * 0.9 ? 'text-amber-400' : ''}>
                {scriptText.length}/{MAX_CHARS}
              </span>
              <span>≈ {Math.round(estimatedDuration)}s</span>
              <span className="text-violet-400">{credits} cr</span>
            </div>
          </div>

          <Textarea
            placeholder="Enter your script here... Describe a scene, write a monologue, add a TikTok hook, or paste your Quranic ayah for Arabic recitation-style audio."
            className="min-h-[180px] text-sm leading-relaxed"
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value.slice(0, MAX_CHARS))}
          />

          <div className="flex items-center justify-between mt-4">
            {/* Format selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Format:</span>
              {(['mp3', 'wav'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setAudioFormat(fmt)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    audioFormat === fmt
                      ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                      : 'text-white/40 hover:text-white/70 border border-transparent'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              variant="glow"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || !scriptText.trim() || !selectedPreset}
              className="min-w-[160px]"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 h-4 bg-white/80 rounded-full"
                        animate={{ scaleY: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  Generating...
                </div>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Voice
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error state */}
        <AnimatePresence>
          {generationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-300">Generation Failed</p>
                <p className="text-xs text-red-400/80 mt-1">{generationError}</p>
                <p className="text-xs text-white/40 mt-2">
                  Make sure the backend is running and TTS_PROVIDER is configured.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {lastGenerationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Generated Audio</h3>
                  <span className="text-xs text-white/40">ID: {lastGenerationResult.generationId.slice(0, 8)}...</span>
                </div>
                <AudioPlayer
                  audioUrl={lastGenerationResult.audioUrl}
                  duration={lastGenerationResult.duration}
                  fileName={`${selectedPreset?.name || 'voicegen'}-${Date.now()}.${audioFormat}`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info banner */}
        {!lastGenerationResult && !generationError && (
          <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-white/25 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/30 leading-relaxed">
              Select a preset, customize your voice settings, enter your script, and hit Generate Voice.
              Your audio will be generated by the backend TTS provider and ready for preview and download.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
