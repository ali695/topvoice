import { Metadata } from 'next';
import { Check, Zap, Crown, Building2, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — VoiceGen Studio',
  description: 'Free browser-based AI voice generation. No paid API required. Future premium plans planned.',
};

const PLANS = [
  {
    name: 'Free Browser Studio',
    price: '$0',
    period: 'Forever',
    icon: Zap,
    badge: null,
    desc: 'Full voice generation using your browser\'s built-in speech engine.',
    features: [
      'Unlimited generations (browser-based)',
      '130+ voice presets',
      '100+ sub-presets',
      '11 languages',
      'All voice settings sliders',
      'Generation history (localStorage)',
      'Favorites system',
      'No API key required',
      'No sign-up required',
      'Works offline after load',
    ],
    cta: 'Start Now — Free',
    href: '/generate',
    highlight: false,
    available: true,
  },
  {
    name: 'Creator Pack',
    price: 'Coming Soon',
    period: '',
    icon: Crown,
    badge: 'Planned',
    desc: 'Enhanced features for content creators and professionals.',
    features: [
      'Everything in Free',
      'Premium preset packs',
      'Cloud voice export (MP3/WAV)',
      'Extended text limits',
      'Custom preset creation',
      'Preset sharing',
      'Priority browser voice rendering',
      'Email support',
    ],
    cta: 'Join Waitlist',
    href: '/faq',
    highlight: true,
    available: false,
  },
  {
    name: 'Pro Local Pack',
    price: 'Coming Soon',
    period: '',
    icon: Cpu,
    badge: 'Planned',
    desc: 'Run a local AI voice model for studio-quality output without cloud APIs.',
    features: [
      'Everything in Creator',
      'Local AI voice model (Coqui/StyleTTS)',
      'No internet required for generation',
      'Full privacy — 100% on-device',
      'Custom model fine-tuning',
      'Batch processing',
      'No per-generation cost',
    ],
    cta: 'Join Waitlist',
    href: '/faq',
    highlight: false,
    available: false,
  },
  {
    name: 'Agency Pack',
    price: 'Coming Soon',
    period: '',
    icon: Building2,
    badge: 'Planned',
    desc: 'For teams and studios that need scalable voice production.',
    features: [
      'Everything in Pro Local',
      'Team workspaces',
      'Shared preset libraries',
      'API access for automation',
      'Usage analytics',
      'White-label options',
      'Dedicated support',
    ],
    cta: 'Contact Us',
    href: '/faq',
    highlight: false,
    available: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-5">
            <Zap className="w-3.5 h-3.5" />
            Current Version: 100% Free
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The current version is completely free — powered by your browser's speech engine.
            Premium plans are planned but never required for basic use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-violet-600/15 to-cyan-600/8 border border-violet-500/35'
                  : 'bg-white/3 border border-white/8'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center">
                  <plan.icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="font-bold text-white text-sm">{plan.name}</h3>
              </div>

              <div className="mb-3">
                <div className="text-2xl font-black text-white">{plan.price}</div>
                {plan.period && <div className="text-xs text-white/35">{plan.period}</div>}
              </div>

              <p className="text-xs text-white/45 mb-4 leading-relaxed">{plan.desc}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-white/60">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                  plan.available
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/25'
                    : plan.highlight
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/8'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="rounded-xl border border-white/8 bg-white/3 p-5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-white/50 leading-relaxed">
            <span className="text-white font-semibold">No hidden fees. No surprise charges.</span>{' '}
            The current free tier will always remain free. Premium plans are opt-in and will be clearly priced when available.
            You can upgrade or cancel at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
