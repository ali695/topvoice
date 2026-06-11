import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service — VoiceGen Studio' };

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: June 2026</p>

        {[
          ['Acceptance of Terms', 'By using VoiceGen Studio, you agree to these terms. If you do not agree, do not use the service.'],
          ['Permitted Use', 'You may use VoiceGen Studio to generate AI voice audio for personal, commercial, and creative projects within your plan limits. Commercial usage rights are included in Creator and Studio plans.'],
          ['Prohibited Content', 'You may not use VoiceGen Studio to: (1) impersonate real individuals without consent, (2) generate content that facilitates illegal activity, (3) create non-consensual intimate content, (4) generate content targeting minors inappropriately, (5) clone voices of public figures without authorization.'],
          ['Quranic Content', 'Quranic recitation presets provide pacing, clarity, and breath controls for Arabic audio production. They do not claim to replicate or imitate specific named reciters. Users are responsible for the accuracy and respectfulness of any religious content they generate.'],
          ['Intellectual Property', 'Audio generated using your inputs is owned by you, subject to the rights of any third-party TTS provider used in generation. VoiceGen Studio and its preset system remain our intellectual property.'],
          ['Service Availability', 'We strive for high availability but do not guarantee uninterrupted service. Generation quality depends on the configured TTS provider.'],
          ['Limitation of Liability', 'VoiceGen Studio is provided as-is. We are not liable for indirect, incidental, or consequential damages arising from your use of the service.'],
          ['Changes to Terms', 'We may update these terms at any time. Continued use constitutes acceptance of updated terms.'],
        ].map(([title, body]) => (
          <div key={title as string} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
