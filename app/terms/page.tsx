import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service — VoiceGen Studio' };

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-white/35 text-sm mb-10">Last updated: June 2026</p>

        {[
          {
            title: 'Acceptance',
            body: 'By using VoiceGen Studio, you agree to these terms. If you do not agree, please do not use the app.',
          },
          {
            title: 'Free Use',
            body: 'The current version is free to use for personal and commercial projects. You may generate voices for YouTube videos, podcasts, presentations, apps, and other content without restriction, subject to the prohibited uses below.',
          },
          {
            title: 'Prohibited Uses',
            body: 'You must not use VoiceGen Studio to: (1) Impersonate real individuals, public figures, celebrities, or political leaders without their explicit consent. (2) Create deepfakes, misinformation, or fraudulent content. (3) Generate content that harasses, threatens, or harms individuals. (4) Create content that violates any applicable laws. (5) Clone voices of real people to misrepresent their statements.',
          },
          {
            id: 'responsible',
            title: 'Responsible Use of Voice Technology',
            body: 'Voice generation is a powerful tool. You are solely responsible for the content you generate and how you use it. VoiceGen Studio provides the technology; you provide the content. Always clearly disclose when content is AI-generated where required by platform policies or law.',
          },
          {
            title: 'Quranic Recitation Controls',
            body: 'The Quranic recitation presets provide technical pacing, breath, and clarity controls for Arabic audio production. They use generic style labels and do not claim to replicate any named reciter. Users must ensure their use of these controls is respectful and aligned with Islamic sensibilities. VoiceGen Studio does not endorse any particular recitation interpretation.',
          },
          {
            title: 'Browser Voice Limitations',
            body: 'Voice generation quality in the free version is determined by your operating system and browser, not by VoiceGen Studio. We make no warranty about voice quality, accuracy, or availability of specific voices on any platform.',
          },
          {
            title: 'Intellectual Property',
            body: 'The preset system, application code, UI design, and brand are the property of VoiceGen Studio. Your generated audio content, based on your own scripts, belongs to you.',
          },
          {
            title: 'Limitation of Liability',
            body: 'VoiceGen Studio is provided as-is. We are not liable for misuse of generated content, loss of data, or issues arising from browser speech API limitations.',
          },
          {
            title: 'Changes',
            body: 'We may update these terms. Continued use after updates constitutes acceptance.',
          },
        ].map(({ title, body, id }) => (
          <div key={title} id={id} className="mb-8 scroll-mt-24">
            <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
            <p className="text-white/55 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
