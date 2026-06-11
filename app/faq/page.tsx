import { Metadata } from 'next';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ — VoiceGen Studio',
  description: 'Frequently asked questions about VoiceGen Studio AI voice generation platform.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="pt-10 text-center py-10">
        <h1 className="text-4xl font-black text-white mb-3">FAQ</h1>
        <p className="text-white/50">Everything you need to know about VoiceGen Studio.</p>
      </div>
      <FAQSection />
    </div>
  );
}
