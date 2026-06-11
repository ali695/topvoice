import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { LandingDemoWidget } from '@/components/LandingDemoWidget';
import { HowItWorks } from '@/components/HowItWorks';
import { CategoryTabs } from '@/components/CategoryTabs';
import { FreeTechSection } from '@/components/FreeTechSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { UseCasesSection } from '@/components/UseCasesSection';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'VoiceGen Studio — Free AI Voice Generator in Your Browser',
  description:
    'Generate cinematic narrations, horror whispers, TikTok voices, Quranic-style Arabic recitation pacing, sleep learning audio, and multilingual voiceovers. 130+ voice presets. No API key. Free.',
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      {/* Demo widget — compact section */}
      <section className="py-12 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">
              Hear It Now — No Sign-Up Required
            </h2>
            <p className="text-white/45 text-sm">
              Select a preset, pick a script style, and press play. Your browser does the rest.
            </p>
          </div>
          <LandingDemoWidget />
        </div>
      </section>

      <HowItWorks />
      <CategoryTabs />
      <FeaturesSection />
      <FreeTechSection />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Start Creating Voiceovers{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              in Seconds
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-8">
            No account. No API key. No cost. Just open the studio and speak.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/30 transition-all"
            >
              Open Voice Studio →
            </a>
            <a
              href="/presets"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Browse Presets
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
