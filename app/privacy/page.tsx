import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy — VoiceGen Studio' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-white/35 text-sm mb-10">Last updated: June 2026</p>

        {[
          {
            title: '🔒 Free Version: Fully Local Processing',
            body: 'The free version of VoiceGen Studio processes all speech generation entirely in your browser using the Web Speech API (SpeechSynthesis). Your text is never transmitted to any server or external service. No audio files are created on any external server. Everything stays on your device.',
          },
          {
            title: '💾 Local Storage',
            body: 'Generation history, favorite presets, and voice settings are stored exclusively in your browser\'s localStorage. This data never leaves your device. You can clear it at any time by going to your browser settings → Clear browsing data → Local storage, or by using the "Clear All" button in the History page.',
          },
          {
            title: '🔑 No API Keys in Frontend',
            body: 'The frontend application does not contain, transmit, or store any API keys. If you configure a backend TTS provider for production use, API keys are stored server-side in environment variables only and are never exposed to the browser.',
          },
          {
            title: '🌐 Third-Party Services',
            body: 'The free version does not use any third-party analytics, tracking pixels, or advertising networks. No Google Analytics, no Facebook Pixel, no external scripts beyond the app itself.',
          },
          {
            title: '⚠️ Shared Device Warning',
            body: 'Do not enter sensitive personal information, confidential business text, or private content on shared devices. While the free version processes locally, anyone with access to your browser can view localStorage data through developer tools.',
          },
          {
            title: '📋 Future Premium Plans',
            body: 'If future premium features involve server-side generation, a separate and detailed privacy policy will be provided at that time. Any server-side processing will require explicit consent and will comply with applicable data protection regulations.',
          },
          {
            title: '📬 Contact',
            body: 'For privacy inquiries, please use the contact channel listed on our FAQ page.',
          },
        ].map(({ title, body }) => (
          <div key={title} className="mb-8">
            <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
            <p className="text-white/55 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
