'use client';

// ── Browser Speech Synthesis Engine ──────────────────────────────────────────
// Uses the Web Speech API (SpeechSynthesis) — free, no API key required.
// Works in Chrome, Edge, Safari, Firefox with varying voice availability.

import { VoiceSettings } from '@/types/voice';

export type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'error';

let currentUtterance: SpeechSynthesisUtterance | null = null;

/** Get all available browser voices, sorted by language. */
export function getBrowserVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

/** Pick the best matching voice for a language code. */
export function pickVoiceForLanguage(lang: string): SpeechSynthesisVoice | null {
  const voices = getBrowserVoices();
  if (!voices.length) return null;

  const langMap: Record<string, string[]> = {
    EN: ['en-US', 'en-GB', 'en-AU', 'en'],
    AR: ['ar-SA', 'ar-EG', 'ar'],
    UR: ['ur-PK', 'ur'],
    HI: ['hi-IN', 'hi'],
    DE: ['de-DE', 'de-AT', 'de'],
    TR: ['tr-TR', 'tr'],
    ES: ['es-ES', 'es-MX', 'es'],
    FR: ['fr-FR', 'fr-CA', 'fr'],
    JA: ['ja-JP', 'ja'],
    RU: ['ru-RU', 'ru'],
    ZH: ['zh-CN', 'zh-TW', 'zh'],
  };

  const prefixes = langMap[lang] || [lang.toLowerCase()];
  for (const prefix of prefixes) {
    const match = voices.find(
      (v) => v.lang.startsWith(prefix) || v.lang.toLowerCase() === prefix.toLowerCase()
    );
    if (match) return match;
  }
  // Fallback to any English voice
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}

export interface SpeakOptions {
  text: string;
  settings: VoiceSettings;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (msg: string) => void;
  onBoundary?: (charIndex: number) => void;
}

/**
 * Speak text using the Web Speech API with preset settings applied.
 * Maps VoiceSettings to SpeechSynthesisUtterance parameters.
 */
export function speak(options: SpeakOptions): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    options.onError?.('Web Speech API is not supported in this browser.');
    return;
  }

  // Cancel any in-progress speech
  window.speechSynthesis.cancel();

  const { text, settings } = options;
  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Map speed: Web Speech rate range is 0.1–10, we map 0.5–2.0
  utterance.rate = Math.max(0.1, Math.min(10, settings.speed));

  // Map pitch: Web Speech pitch range is 0–2, we map 0.5–1.5
  utterance.pitch = Math.max(0, Math.min(2, settings.pitch));

  // Volume: influenced by clarity (higher clarity = cleaner/slightly louder)
  utterance.volume = Math.max(0.1, Math.min(1.0, 0.7 + settings.clarity * 0.3));

  // Language / voice
  const voice = pickVoiceForLanguage(settings.language);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'en-US';
  }

  // Events
  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => {
    currentUtterance = null;
    options.onEnd?.();
  };
  utterance.onerror = (e) => {
    currentUtterance = null;
    options.onError?.(e.error || 'Speech synthesis error');
  };
  utterance.onboundary = (e) => options.onBoundary?.(e.charIndex);

  // Speak
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function pauseSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.resume();
  }
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  return window.speechSynthesis.speaking;
}

export function isBrowserSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Wait for voices to load (Chrome loads them asynchronously). */
export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      resolve(window.speechSynthesis.getVoices());
    }, { once: true });
    // Timeout fallback
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1500);
  });
}
