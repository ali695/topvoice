'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Download, RefreshCw, Mic2 } from 'lucide-react';
import { useVoiceGenStore } from '@/lib/store';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { VibeBadge } from '@/components/VibeBadge';
import { ALL_PRESETS } from '@/data/allPresets';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const { history, removeFromHistory, clearHistory, setSelectedPreset, setScriptText } = useVoiceGenStore();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleRegenerate = (item: typeof history[number]) => {
    const preset = ALL_PRESETS.find((p) => p.id === item.presetId);
    if (preset) {
      setSelectedPreset(preset);
      setScriptText(item.text);
      router.push('/generate');
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <History className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white">Generation History</h1>
            </div>
            <p className="text-white/50 text-sm">{history.length} generations saved</p>
          </div>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-400 hover:text-red-300">
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </Button>
          )}
        </div>

        {/* Empty state */}
        {history.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Mic2 className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-white/40 font-semibold mb-2">No generations yet</h3>
            <p className="text-white/25 text-sm mb-6">Generate your first voice in the studio</p>
            <Button variant="glow" size="lg" onClick={() => router.push('/generate')}>
              Open Voice Studio
            </Button>
          </div>
        )}

        {/* History list */}
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
              >
                {/* Item header */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-white text-sm">{item.presetName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/30 font-mono uppercase">
                        {item.format}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate mb-2">"{item.text.slice(0, 80)}..."</p>
                    <div className="flex items-center gap-3 text-[10px] text-white/30">
                      <span>{formatDate(item.createdAt)}</span>
                      <span>≈ {Math.round(item.duration)}s</span>
                      <span className="font-mono">{item.settingsUsed.language}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      title="Regenerate with same settings"
                      onClick={() => handleRegenerate(item)}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = item.audioUrl;
                        a.download = `${item.presetName}-${item.id.slice(0, 8)}.${item.format}`;
                        a.click();
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-red-400/60 hover:text-red-400"
                      onClick={() => removeFromHistory(item.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Expand to show player */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors mb-3"
                  >
                    {expandedId === item.id ? 'Hide player' : 'Show audio player'}
                  </button>
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <AudioPlayer
                          audioUrl={item.audioUrl}
                          duration={item.duration}
                          fileName={`${item.presetName}-${item.id.slice(0, 8)}.${item.format}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
