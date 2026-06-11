import { Metadata } from 'next';
import { VoiceGeneratorForm } from '@/components/VoiceGeneratorForm';
import { Mic2, Zap, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Voice Studio — Generate AI Voices',
  description: 'Generate AI voices with 130+ presets. Control speed, pitch, accent, vibe, emotional depth, and more.',
};

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-[#07070f] pt-20">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white">Voice Studio</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-white/50 text-sm">
              Select a preset, customize your voice settings, and generate studio-quality audio.
            </p>
          </div>

          {/* Provider indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">TTS Provider: Active</span>
          </div>
        </div>

        {/* Mock mode notice */}
        <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-400/80">
            <span className="font-semibold text-amber-400">Development Mode:</span> The backend uses the mock TTS provider.
            To enable real voice generation, configure <code className="font-mono bg-amber-500/10 px-1 rounded">TTS_PROVIDER</code> and{' '}
            <code className="font-mono bg-amber-500/10 px-1 rounded">TTS_API_KEY</code> in your backend <code className="font-mono bg-amber-500/10 px-1 rounded">.env</code> file.
          </div>
        </div>

        {/* Generator form */}
        <VoiceGeneratorForm />
      </div>
    </div>
  );
}
