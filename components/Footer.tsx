import Link from 'next/link';
import { Mic2, Sparkles } from 'lucide-react';

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Generate', href: '/generate' },
      { label: 'Presets', href: '/presets' },
      { label: 'Categories', href: '/categories' },
      { label: 'History', href: '/history' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Voice Settings Guide', href: '/docs#settings' },
      { label: 'Browser Support', href: '/docs#browser' },
      { label: 'Preset JSON Guide', href: '/docs#presets' },
    ],
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'YouTube Narration', href: '/use-cases#youtube' },
      { label: 'TikTok & Reels', href: '/use-cases#tiktok' },
      { label: 'Horror Stories', href: '/use-cases#horror' },
      { label: 'Sleep Learning', href: '/use-cases#sleep' },
      { label: 'Audiobooks', href: '/use-cases#audiobooks' },
      { label: 'Game Characters', href: '/use-cases#gaming' },
      { label: 'Ads & Product Videos', href: '/use-cases#ads' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Responsible Use', href: '/terms#responsible' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-[#07070f]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white">VoiceGen Studio</span>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed mb-4">
              A browser-based AI voice studio for creators, storytellers, educators, marketers, and developers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              Free — No API Key Needed
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white/35 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © 2026 VoiceGen Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/25">
            <span>No paid external API required.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Powered by free browser speech technology.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
