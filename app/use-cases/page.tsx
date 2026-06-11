import { Metadata } from 'next';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Use Cases — VoiceGen Studio',
  description: 'See how VoiceGen Studio powers YouTube narration, TikTok voices, horror stories, sleep learning, audiobooks, game characters, and more.',
};

const USE_CASES = [
  {
    id: 'youtube',
    emoji: '🎬',
    title: 'YouTube Narration',
    desc: 'Create authoritative documentary voices, explainer narrations, and channel intro voices. Perfect for faceless YouTube channels.',
    presets: ['Daniel — British Cinematic', 'Noir Detective Narrator', 'Epic High-Fantasy Narrator'],
    settings: 'Speed 0.9, Pitch 0.85, Clarity 0.9, Stability 0.8',
    tip: 'Use British Warm or Documentary accent for maximum authority.',
  },
  {
    id: 'tiktok',
    emoji: '📱',
    title: 'TikTok & Instagram Reels',
    desc: 'Stop-the-scroll energy. High tempo, punchy delivery, optimized for 15–60 second viral content.',
    presets: ['Viral TikTok Voice', 'E-sports Shoutcaster', 'Fast-Talking Auctioneer'],
    settings: 'Speed 1.2–1.9, Pitch 1.1, High emotional depth',
    tip: 'Viral Short-Form accent + high emotional depth = maximum engagement.',
  },
  {
    id: 'horror',
    emoji: '👻',
    title: 'Horror Storytelling',
    desc: 'Creepypasta, haunted narrations, demonic characters, and supernatural atmosphere for short films and podcasts.',
    presets: ['Haunted Whisper Narrator', 'Demonic Layered Voice', 'Cursed Doll'],
    settings: 'Low speed, Pitch 1.1+, Max breathing level, Creepiness 0.8–1.0',
    tip: 'Combine Horror Whisper accent with creepiness 0.9 for maximum effect.',
  },
  {
    id: 'sleep',
    emoji: '😴',
    title: 'Sleep Learning & Meditation',
    desc: 'Hypnotic pacing for language learning during sleep, guided meditation, breathwork, and long-form relaxation.',
    presets: ['Deep Sleep Hypnosis — Male', 'Soothing Meditation', 'Sleep Story Narrator'],
    settings: 'Speed 0.7–0.8, Pitch 0.8–0.95, Stability 0.95, Gentle Therapist accent',
    tip: 'Keep speed below 0.8 and stability above 0.9 for sleep content.',
  },
  {
    id: 'audiobooks',
    emoji: '📚',
    title: 'Audiobooks',
    desc: 'Sustained narration for full books. Low listener fatigue, clear articulation, character differentiation.',
    presets: ['Daniel — British Cinematic', 'Epic High-Fantasy Narrator', 'Dwarven King Narrator'],
    settings: 'Speed 0.9, Clarity 0.9, Long-Form Narration variant',
    tip: 'Use sub-preset "Long-Form Narration" for books — it optimizes for sustained listening.',
  },
  {
    id: 'islamic',
    emoji: '🕌',
    title: 'Islamic & Arabic Recitation Style',
    desc: 'Tajweed-paced Arabic audio with breath controls, emotional depth, and clarity parameters for Quranic-style projects.',
    presets: ['Saudi Emotional Qari Style', 'Egyptian Murattal Qari Style', 'Vintage Egyptian Spiritual Qari'],
    settings: 'Language AR, Speed 0.75–0.9, Clarity 1.0, Breathing 0.7–0.9',
    tip: 'These presets use generic style labels and do not imitate any named reciter.',
  },
  {
    id: 'gaming',
    emoji: '🎮',
    title: 'Game Characters & NPCs',
    desc: 'Memorable NPCs, bosses, goblin tricksters, robot assistants, and glitchy AI holograms.',
    presets: ['Mischievous Goblin', 'Robot Butler', 'Glitchy Hologram', 'Dwarven King Narrator'],
    settings: 'Varies by character — see preset detail pages',
    tip: 'Each character preset has sub-presets tuned for different scene types.',
  },
  {
    id: 'ads',
    emoji: '📺',
    title: 'Advertisements & Product Videos',
    desc: 'Commercial voiceovers, product explainers, radio ads, and brand authority voices.',
    presets: ['Robot Butler', 'Viral TikTok Voice', 'AI Synth Narrator'],
    settings: 'High clarity, moderate speed, Clean Commercial sub-preset',
    tip: 'Use the "Clean Commercial" sub-preset variant for any seed preset.',
  },
  {
    id: 'podcasts',
    emoji: '🎙️',
    title: 'Podcasts',
    desc: 'Warm, intimate podcast narration with consistent pacing. Intro voices, segment narrators, and co-host styles.',
    presets: ['Daniel — British Cinematic', 'Heartbroken Narrator', 'Midnight Confession'],
    settings: 'Speed 0.95, Clarity 0.9, Stability 0.85, Podcast Narration sub-preset',
    tip: 'Podcast Narration sub-preset reduces breathing artifacts for clean audio.',
  },
  {
    id: 'elearning',
    emoji: '🎓',
    title: 'E-Learning & Corporate Training',
    desc: 'Professional, clear narration for courses, training videos, onboarding, and explainer content.',
    presets: ['Robot Butler', 'AI Synth Narrator', 'Daniel — British Cinematic'],
    settings: 'Clarity 1.0, Stability 1.0, Speed 1.0, Neutral or British accent',
    tip: 'Use the "High Clarity" or "Stable Studio" sub-presets for maximum intelligibility.',
  },
  {
    id: 'motivational',
    emoji: '🔥',
    title: 'Motivational & Inspirational Videos',
    desc: 'High-energy motivational content, speech highlights, and sports hype reels.',
    presets: ['E-sports Shoutcaster', 'Fast-Talking Auctioneer', 'Panic Story Narrator'],
    settings: 'Speed 1.3–1.6, High emotional depth, Dramatic vibe',
    tip: 'Combine with the Viral Short Hook sub-preset for maximum impact.',
  },
  {
    id: 'documentary',
    emoji: '🌍',
    title: 'Documentary Narration',
    desc: 'Nature documentaries, history content, and educational video narration with authoritative tone.',
    presets: ['Daniel — British Cinematic', 'Noir Detective Narrator', 'Deep Sleep Hypnosis — Male'],
    settings: 'Speed 0.85–0.95, Documentary accent, Clarity 0.9',
    tip: 'Nature Documentary or Documentary accent gives the most classic narration feel.',
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Use Cases</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            VoiceGen Studio is built for creators. Here's how different creators use it.
          </p>
        </div>

        <div className="space-y-6">
          {USE_CASES.map((uc, i) => (
            <div
              key={uc.id}
              id={uc.id}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 scroll-mt-24"
            >
              <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                <span className="text-4xl flex-shrink-0">{uc.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white mb-2">{uc.title}</h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{uc.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-1.5">Top Presets</p>
                      <ul className="space-y-1">
                        {uc.presets.map((p) => (
                          <li key={p} className="text-xs text-violet-400">{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-1.5">Recommended Settings</p>
                      <p className="text-xs text-white/50 leading-relaxed">{uc.settings}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-1.5">Pro Tip</p>
                      <p className="text-xs text-emerald-400/80 leading-relaxed">{uc.tip}</p>
                    </div>
                  </div>

                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    <Zap className="w-3 h-3" />
                    Generate with these presets →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
