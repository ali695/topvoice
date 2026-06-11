import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'VoiceGen Studio — AI Voice Generation Platform',
    template: '%s | VoiceGen Studio',
  },
  description:
    'Generate cinematic narrations, horror whispers, TikTok voices, Quranic-style Arabic recitation, sleep learning audio, character voices, and multilingual voiceovers. 130+ voice presets.',
  keywords: [
    'AI voice generator',
    'text to speech',
    'voice synthesis',
    'TTS',
    'narration',
    'audiobook',
    'TikTok voice',
    'horror voice',
    'ASMR',
    'Quranic recitation',
    'multilingual TTS',
  ],
  authors: [{ name: 'VoiceGen Studio' }],
  openGraph: {
    title: 'VoiceGen Studio — AI Voice Generation Platform',
    description: '130+ voice presets. Every accent, vibe, and language. Generate in seconds.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoiceGen Studio',
    description: '130+ AI voice presets for creators, developers, and studios.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07070f] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
