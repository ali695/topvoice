import { Metadata } from 'next';
import { BrowserVoiceGenerator } from '@/components/BrowserVoiceGenerator';
import { Mic2, Volume2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Voice Studio — Generate AI Voices Free',
  description:
    'Generate AI voices instantly in your browser. 130+ presets, 11 languages. No API key, no sign-up, no cost.',
};

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-[#07070f] pt-20">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.07)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white">Voice Studio</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-xs font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-white/45 text-sm">
              Select a preset → customize settings → enter your script → press Generate.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/6">
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Browser Speech Engine — No API Key</span>
          </div>
        </div>

        {/* Generator */}
        <BrowserVoiceGenerator />

        {/* Bottom info */}
        <div className="mt-8 rounded-xl border border-white/6 bg-white/2 p-4">
          <p className="text-xs text-white/30 leading-relaxed text-center">
            🔊 Voice is generated using your browser's built-in Web Speech API (SpeechSynthesis). Quality varies by OS and browser.
            Chrome and Edge on Windows/Mac provide the most voice options.
            Your text is processed locally — nothing is sent to a server.
          </p>
        </div>
      </div>
    </div>
  );
}
