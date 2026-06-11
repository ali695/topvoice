'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: 0,
    period: 'Forever',
    icon: Zap,
    description: 'Perfect for exploring and prototyping',
    features: [
      '50 generations/month',
      '30 voice presets',
      'MP3 export',
      'Basic accents',
      '5,000 char/generation',
      'Community support',
    ],
    cta: 'Get Started Free',
    href: '/generate',
    highlight: false,
  },
  {
    name: 'Creator',
    price: 19,
    period: 'per month',
    icon: Crown,
    description: 'For content creators and developers',
    features: [
      '500 generations/month',
      'All 130+ voice presets',
      'MP3 + WAV export',
      'All accents & vibes',
      '25,000 char/generation',
      'Generation history',
      'Preset favorites',
      'Priority generation',
      'Email support',
    ],
    cta: 'Start Creator Plan',
    href: '/generate',
    highlight: true,
  },
  {
    name: 'Studio',
    price: 79,
    period: 'per month',
    icon: Building2,
    description: 'For studios and production teams',
    features: [
      'Unlimited generations',
      'All 130+ voice presets',
      'MP3 + WAV + API access',
      'Custom voice settings',
      'Batch generation',
      'Long-form mode (1hr+)',
      'Priority API access',
      'Usage analytics',
      'Dedicated support',
    ],
    cta: 'Start Studio Plan',
    href: '/generate',
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Simple,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Transparent
            </span>{' '}
            Pricing
          </h2>
          <p className="text-white/50 text-lg">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-violet-600/20 to-cyan-600/10 border border-violet-500/40'
                  : 'bg-white/3 border border-white/8'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-bold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.highlight ? 'bg-violet-500/30' : 'bg-white/8'
                }`}>
                  <plan.icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-white/40">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  <span className="text-white/40 text-sm mb-1.5">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? 'glow' : 'outline'}
                size="lg"
                className="w-full"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
