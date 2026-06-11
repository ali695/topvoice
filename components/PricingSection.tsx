'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Cpu } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free Studio',
    price: '$0',
    period: 'forever',
    icon: Zap,
    desc: 'Full voice generation with browser speech.',
    features: ['130+ presets', 'Unlimited generations', '11 languages', 'All sliders', 'History & favorites'],
    cta: 'Start Free Now',
    href: '/generate',
    highlight: false,
    available: true,
    badge: null,
  },
  {
    name: 'Creator Pack',
    price: 'Coming Soon',
    period: '',
    icon: Crown,
    desc: 'Cloud export, premium presets, custom voices.',
    features: ['Everything Free', 'MP3/WAV export', 'Premium presets', 'Custom preset builder', 'Extended text limits'],
    cta: 'Join Waitlist',
    href: '/faq',
    highlight: true,
    available: false,
    badge: 'Planned',
  },
  {
    name: 'Pro Local AI',
    price: 'Coming Soon',
    period: '',
    icon: Cpu,
    desc: 'Studio-quality voices with a local AI model.',
    features: ['Everything Creator', 'Local AI model', 'Full privacy', 'No per-gen cost', 'Batch generation'],
    cta: 'Join Waitlist',
    href: '/faq',
    highlight: false,
    available: false,
    badge: 'Planned',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Honest{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Pricing
            </span>
          </h2>
          <p className="text-white/45 text-lg">Free today. Premium when you need it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-5 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-violet-600/18 to-cyan-600/8 border border-violet-500/35'
                  : 'bg-white/3 border border-white/8'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <plan.icon className="w-4 h-4 text-violet-400" />
                <h3 className="font-bold text-white text-sm">{plan.name}</h3>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-white/35 text-sm ml-1">{plan.period}</span>}
              </div>

              <p className="text-xs text-white/45 mb-4">{plan.desc}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-white/60">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                  plan.available
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/25'
                    : 'bg-white/5 text-white/45 border border-white/10 hover:bg-white/8'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
