import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { CategoryTabs } from '@/components/CategoryTabs';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';
import { UseCasesSection } from '@/components/UseCasesSection';
import { FeaturesSection } from '@/components/FeaturesSection';

export const metadata: Metadata = {
  title: 'VoiceGen Studio — AI Voice Generation Platform',
  description:
    'Generate cinematic narrations, horror whispers, TikTok voices, Quranic-style Arabic recitation, sleep learning audio, and multilingual voiceovers with 130+ AI voice presets.',
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <CategoryTabs />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
