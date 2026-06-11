import { Metadata } from 'next';
import { Code2 } from 'lucide-react';

export const metadata: Metadata = { title: 'API Docs — VoiceGen Studio' };

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/generate',
    description: 'Generate voice audio from text',
    requestBody: `{
  "text": "string (required, max 5000 chars)",
  "presetId": "string (required)",
  "settings": {
    "language": "EN | UR | DE | AR | HI | TR | ES | FR | JA | RU | ZH",
    "speed": "float (0.5 – 2.0)",
    "pitch": "float (0.5 – 1.5)",
    "temperature": "float (0.0 – 1.0)",
    "emotionalDepth": "float (0.0 – 1.0)",
    "clarity": "float (0.0 – 1.0)",
    "breathingLevel": "float (0.0 – 1.0)",
    "stability": "float (0.0 – 1.0)",
    "accent": "string",
    "reverb": "float (0.0 – 1.0, optional)",
    "creepiness": "float (0.0 – 1.0, optional)"
  },
  "format": "mp3 | wav",
  "longFormMode": "boolean (optional)"
}`,
    response: `{
  "success": true,
  "audioUrl": "string",
  "generationId": "uuid",
  "duration": 12.5,
  "settingsUsed": { ... },
  "provider": "mock (dev-only) | external_api"
}`,
    color: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  {
    method: 'GET',
    path: '/api/presets',
    description: 'List all available voice presets',
    requestBody: null,
    response: `{
  "presets": [ { "id": "...", "name": "...", ... } ],
  "total": 28
}`,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    method: 'GET',
    path: '/api/presets/:id',
    description: 'Get a single preset by ID',
    requestBody: null,
    response: `{
  "id": "daniel_british_cinematic",
  "name": "Daniel",
  "category": "British Cinematic & Thriller",
  "vibe": "Dramatic",
  "settings": { ... },
  "tags": [...],
  "useCases": [...],
  "isPremium": false
}`,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    method: 'GET',
    path: '/api/generations',
    description: 'List generation history',
    requestBody: null,
    response: `{
  "generations": [...],
  "total": 42
}`,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    method: 'DELETE',
    path: '/api/generations/:id',
    description: 'Delete a generation record',
    requestBody: null,
    response: `{
  "success": true,
  "deletedId": "uuid"
}`,
    color: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  {
    method: 'POST',
    path: '/api/presets/favorite',
    description: 'Toggle favorite a preset',
    requestBody: `{ "presetId": "daniel_british_cinematic" }`,
    response: `{
  "success": true,
  "favorited": true,
  "presetId": "daniel_british_cinematic"
}`,
    color: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
];

export default function APIDocsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">API Reference</h1>
        </div>
        <p className="text-white/50 mb-2">Base URL: <code className="text-violet-400 text-sm">http://localhost:8000</code></p>
        <p className="text-white/30 text-sm mb-10">
          Interactive docs available at <code className="text-cyan-400">/docs</code> when the backend is running.
        </p>

        <div className="space-y-8">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold font-mono ${ep.color}`}>
                  {ep.method}
                </span>
                <code className="text-white font-mono text-sm">{ep.path}</code>
                <span className="text-white/40 text-sm ml-auto hidden sm:block">{ep.description}</span>
              </div>

              <div className={`grid ${ep.requestBody ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-0`}>
                {ep.requestBody && (
                  <div className="p-5 border-r border-white/5">
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Request Body</p>
                    <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                      {ep.requestBody}
                    </pre>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Response</p>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {ep.response}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
