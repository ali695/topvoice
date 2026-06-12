// ── Browser Speech Synthesis Engine ──────────────────────────────────────────
// Uses the Web Speech API — free, no API key, runs entirely in the browser.
// NOTE: No 'use client' directive here — this is a plain utility module.

import { VoiceSettings } from '@/types/voice';

export type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'error';

export interface SpeakOptions {
  text: string;
  settings: VoiceSettings;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (msg: string) => void;
}

export function isBrowserSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function getBrowserVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

/** Wait for voices to load — Chrome fires voiceschanged async, others are sync. */
export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }
    const v = window.speechSynthesis.getVoices();
    if (v.length > 0) {
      resolve(v);
      return;
    }
    const handler = () => resolve(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener('voiceschanged', handler, { once: true });
    // Fallback — if event never fires (some browsers), resolve after 2s anyway
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(window.speechSynthesis.getVoices());
    }, 2000);
  });
}

/** Pick best matching voice for a language code. */
export function pickVoiceForLanguage(lang: string): SpeechSynthesisVoice | null {
  const voices = getBrowserVoices();
  if (!voices.length) return null;

  const langMap: Record<string, string[]> = {
    EN: ['en-US', 'en-GB', 'en-AU', 'en-IN', 'en'],
    AR: ['ar-SA', 'ar-EG', 'ar-AE', 'ar'],
    UR: ['ur-PK', 'ur-IN', 'ur'],
    HI: ['hi-IN', 'hi'],
    DE: ['de-DE', 'de-AT', 'de-CH', 'de'],
    TR: ['tr-TR', 'tr'],
    ES: ['es-ES', 'es-MX', 'es-US', 'es'],
    FR: ['fr-FR', 'fr-CA', 'fr'],
    JA: ['ja-JP', 'ja'],
    RU: ['ru-RU', 'ru'],
    ZH: ['zh-CN', 'zh-TW', 'zh-HK', 'zh'],
  };

  const prefixes = langMap[lang.toUpperCase()] || [lang.toLowerCase()];
  for (const prefix of prefixes) {
    const match = voices.find(
      (v) => v.lang === prefix || v.lang.startsWith(prefix + '-') || v.lang.startsWith(prefix)
    );
    if (match) return match;
  }
  // Fallback: any English voice, then first available
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}

/**
 * Speak text using Web Speech API.
 *
 * Key fixes:
 * - No cancel() before speak (causes Chrome onstart to not fire)
 * - Use a small setTimeout before speak() to avoid Chrome race condition
 * - onStart fires immediately before speechSynthesis.speak() call as fallback
 */
export function speak(options: SpeakOptions): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    options.onError?.('Web Speech API not supported in this browser. Try Chrome or Edge.');
    return;
  }

  const synth = window.speechSynthesis;

  // Cancel any current speech first
  synth.cancel();

  const { text, settings } = options;

  // Small delay after cancel to let Chrome stabilise
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);

    // ── Map settings ─────────────────────────────────────────────────────────
    // rate: 0.1 – 10 in Web Speech API; presets use 0.5 – 2.0
    utterance.rate = Math.max(0.1, Math.min(10, settings.speed ?? 1.0));

    // pitch: 0 – 2 in Web Speech API; presets use 0.5 – 1.5
    utterance.pitch = Math.max(0, Math.min(2, settings.pitch ?? 1.0));

    // volume: 0 – 1; use clarity as a proxy
    utterance.volume = Math.max(0.3, Math.min(1.0, 0.6 + (settings.clarity ?? 0.8) * 0.4));

    // Language & voice
    const voice = pickVoiceForLanguage(settings.language ?? 'EN');
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    // ── Events ───────────────────────────────────────────────────────────────
    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      // 'interrupted' is normal when user presses Stop — don't treat as error
      if (e.error === 'interrupted' || e.error === 'canceled') {
        options.onEnd?.();
        return;
      }
      options.onError?.(e.error || 'Speech synthesis failed');
    };

    // ── Fire onStart immediately as fallback (Chrome sometimes skips onstart) ─
    // We call onStart ourselves before speak() so UI never gets stuck
    options.onStart?.();

    synth.speak(utterance);

    // Chrome desktop bug: speechSynthesis can silently stop mid-sentence.
    // Workaround: ping resume() every 10 seconds to keep it alive.
    const keepAlive = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(keepAlive);
        return;
      }
      synth.pause();
      synth.resume();
    }, 10000);

    // Clear keepAlive when utterance ends
    utterance.onend = () => {
      clearInterval(keepAlive);
      options.onEnd?.();
    };
    utterance.onerror = (e) => {
      clearInterval(keepAlive);
      if (e.error === 'interrupted' || e.error === 'canceled') {
        options.onEnd?.();
        return;
      }
      options.onError?.(e.error || 'Speech synthesis failed');
    };
  }, 100);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
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

export function checkIsSpeaking(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  return window.speechSynthesis.speaking;
}
