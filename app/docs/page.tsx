import { Metadata } from 'next';
import Link from 'next/link';
import { Book, Code2, Zap, Settings, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation — VoiceGen Studio',
};

const SECTIONS = [
  {
    icon: Zap,
    title: 'Quick Start',
    desc: 'Get started with VoiceGen Studio in minutes. Set up the frontend and backend.',
    href: '#quick-start',
  },
  {
    icon: Settings,
    title: 'Configuration',
    desc: 'Configure TTS providers, environment variables, and storage settings.',
    href: '#configuration',
  },
  {
    icon: Code2,
    title: 'API Reference',
    desc: 'Full REST API documentation for voice generation, presets, and history.',
    href: '/api-docs',
  },
  {
    icon: Book,
    title: 'Preset System',
    desc: 'Learn how seed presets and sub-preset generation works.',
    href: '#presets',
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-white mb-3">Documentation</h1>
        <p className="text-white/50 mb-10">Everything you need to deploy and extend VoiceGen Studio.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {SECTIONS.map((s) => (
            <Link key={s.title} href={s.href} className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-violet-500/30 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">{s.title}</h3>
                <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-violet-400 transition-colors" />
              </div>
              <p className="text-sm text-white/50">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="space-y-10">
          <section id="quick-start">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
            <div className="rounded-xl border border-white/8 bg-white/3 p-5 space-y-4 text-sm text-white/70">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Frontend Setup</h3>
                <pre className="bg-black/30 rounded-lg p-3 text-xs font-mono text-cyan-300 overflow-x-auto">{`cd voicegen-studio
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev`}</pre>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">2. Backend Setup</h3>
                <pre className="bg-black/30 rounded-lg p-3 text-xs font-mono text-cyan-300 overflow-x-auto">{`cd backend
pip install -r requirements.txt
cp .env.example .env
# Set TTS_PROVIDER=mock (for dev) or external_api (for prod)
# Set TTS_API_KEY=your_key_here
uvicorn main:app --reload`}</pre>
              </div>
            </div>
          </section>

          <section id="configuration">
            <h2 className="text-2xl font-bold text-white mb-4">Environment Variables</h2>
            <div className="rounded-xl border border-white/8 bg-white/3 p-5 text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-2 text-xs text-white/40 font-medium">Variable</th>
                    <th className="pb-2 text-xs text-white/40 font-medium">Default</th>
                    <th className="pb-2 text-xs text-white/40 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['TTS_PROVIDER', 'mock', 'TTS provider: mock | external_api | local_model'],
                    ['TTS_API_KEY', '—', 'API key for external TTS provider'],
                    ['AUDIO_STORAGE_PATH', './audio', 'Path to store generated audio files'],
                    ['DATABASE_URL', '—', 'PostgreSQL connection string (optional)'],
                    ['NEXT_PUBLIC_API_URL', 'http://localhost:8000', 'Backend API base URL'],
                  ].map(([key, def, desc]) => (
                    <tr key={key}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-violet-400">{key}</td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-white/30">{def}</td>
                      <td className="py-2.5 text-xs text-white/50">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="presets">
            <h2 className="text-2xl font-bold text-white mb-4">Preset System</h2>
            <div className="rounded-xl border border-white/8 bg-white/3 p-5 text-sm text-white/60 space-y-3">
              <p>VoiceGen Studio uses a two-tier preset system:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Seed Presets</strong> — 28+ hand-crafted presets defined in <code className="text-violet-400 text-xs">/data/seedPresets.ts</code>.</li>
                <li><strong className="text-white">Sub-Presets</strong> — 100+ auto-generated variations created by <code className="text-violet-400 text-xs">generateSubPresets()</code> in <code className="text-violet-400 text-xs">/data/subPresetGenerator.ts</code>.</li>
              </ul>
              <p>Each sub-preset keeps a <code className="text-violet-400 text-xs">parentPresetId</code> reference, applies one of 15 variant definitions, and clamps all settings to valid ranges.</p>
              <p>To add new presets, add to the <code className="text-violet-400 text-xs">SEED_PRESETS</code> array. Sub-presets are generated automatically on import.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
