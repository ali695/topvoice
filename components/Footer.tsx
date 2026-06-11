import Link from 'next/link';
import { Mic2 } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Voice Studio', href: '/generate' },
    { label: 'Preset Library', href: '/presets' },
    { label: 'History', href: '/history' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Developers: [
    { label: 'API Docs', href: '/api-docs' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Changelog', href: '/docs' },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#07070f] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">VoiceGen Studio</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              The most advanced AI voice generation platform. 130+ voice presets across every language, accent, and vibe.
            </p>
            <div className="flex items-center gap-3">
              {['𝕏', '⌥', '▶'].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-xs">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} VoiceGen Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Powered by AI • Built for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
