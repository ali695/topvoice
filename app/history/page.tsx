'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, RefreshCw, Mic2, Play, Square, Download, FileJson } from 'lucide-react';
import { useVoiceGenStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ALL_PRESETS } from '@/data/allPresets';
import { speak, stopSpeaking } from '@/lib/speech';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const { history, removeFromHistory, clearHistory, setSelectedPreset, setScriptText } = useVoiceGenStore();
  const router = useRouter();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleRegenerate = (item: typeof history[number]) => {
    const preset = ALL_PRESETS.find((p) => p.id === item.presetId);
    if (preset) {
      setSelectedPreset(preset);
      setScriptText(item.text);
      router.push('/generate');
    }
  };

  const handlePlay = (item: typeof history[number]) => {
    if (playingId === item.id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    stopSpeaking();
    setPlayingId(item.id);
    speak({
      text: item.text,
      settings: item.settingsUsed,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  const exportHistoryJSON = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voicegen-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <History className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white">Generation History</h1>
            </div>
            <p className="text-white/45 text-sm">{history.length} generation{history.length !== 1 ? 's' : ''} saved to browser storage</p>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={exportHistoryJSON}>
                <FileJson className="w-3.5 h-3.5" />
                Export JSON
              </Button>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Empty state */}
        {history.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
              <Mic2 className="w-8 h-8 text-white/15" />
            </div>
            <h3 className="text-white/40 font-semibold mb-2">No generations yet</h3>
            <p className="text-white/25 text-sm mb-6">Generate your first voice in the studio and save it here.</p>
            <Button variant="glow" size="lg" onClick={() => router.push('/generate')}>
              Open Voice Studio
            </Button>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-white/12 transition-all"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-semibold text-white text-sm">{item.presetName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/8 text-white/35 font-mono uppercase">
                          {item.format}
                        </span>
                        <span className="text-[10px] text-white/30 ml-auto">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      {/* Text snippet */}
                      <p className="text-xs text-white/45 line-clamp-2 mb-3 leading-relaxed">
                        "{item.text.slice(0, 120)}{item.text.length > 120 ? '…' : ''}"
                      </p>

                      {/* Settings pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          item.settingsUsed.language,
                          `${item.settingsUsed.speed.toFixed(1)}x`,
                          `pitch ${item.settingsUsed.pitch.toFixed(2)}`,
                          `≈${Math.round(item.duration)}s`,
                        ].map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/35 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Button
                        variant={playingId === item.id ? 'destructive' : 'outline'}
                        size="icon-sm"
                        title="Play/Stop in browser"
                        onClick={() => handlePlay(item)}
                      >
                        {playingId === item.id
                          ? <Square className="w-3.5 h-3.5" />
                          : <Play className="w-3.5 h-3.5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Load into generator"
                        onClick={() => handleRegenerate(item)}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Delete"
                        className="text-red-400/60 hover:text-red-400"
                        onClick={() => removeFromHistory(item.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Active playing indicator */}
                  {playingId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-end gap-0.5 h-5 mt-3"
                    >
                      {Array.from({ length: 32 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-0.5 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"
                          animate={{ height: [2, Math.random() * 16 + 3, 2] }}
                          transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, delay: j * 0.04 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Storage note */}
        {history.length > 0 && (
          <p className="mt-6 text-xs text-white/20 text-center">
            History is stored in your browser's localStorage. It will persist across sessions on this device.
          </p>
        )}
      </div>
    </div>
  );
}
