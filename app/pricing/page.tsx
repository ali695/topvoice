import { Metadata } from 'next';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Pricing — VoiceGen Studio',
  description: 'Simple transparent pricing for AI voice generation. Start free, upgrade when ready.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="pt-10">
        <div className="text-center py-10">
          <h1 className="text-4xl font-black text-white mb-3">Plans & Pricing</h1>
          <p className="text-white/50">Everything you need to create professional AI audio content.</p>
        </div>
        <PricingSection />
        <FAQSection />
      </div>
    </div>
  );
}
