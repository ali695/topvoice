import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy — VoiceGen Studio' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-invert prose-sm max-w-none">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: June 2026</p>

        {[
          ['Information We Collect', 'We collect information you provide directly, including text submitted for voice generation, account details, and usage patterns. Generated audio files are stored temporarily for download purposes.'],
          ['How We Use Your Information', 'Your text and settings are used solely to generate audio through our TTS provider. We do not train AI models on your content without explicit consent. Usage data is used to improve the service.'],
          ['Data Security', 'All API requests are encrypted in transit. TTS provider keys are stored server-side only and never exposed to the client. Generated audio files are stored securely and cleaned up according to our retention policy.'],
          ['Third-Party Services', 'Voice generation may use third-party TTS providers depending on your configuration. Please review the privacy policy of your configured provider.'],
          ['Your Rights', 'You may request deletion of your account data, generation history, and any stored audio files at any time by contacting support.'],
          ['Contact', 'For privacy inquiries, contact us through the support channel in your account dashboard.'],
        ].map(([title, body]) => (
          <div key={title as string} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
            <p className="text-white/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
