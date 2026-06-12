// ── Groq TTS Client ───────────────────────────────────────────────────────────
// Calls the Next.js /api/tts route which securely calls Groq server-side.
// Returns a Blob URL that can be played with an <audio> element.

import { VoiceSettings } from '@/types/voice';

export type TtsResult =
  | { ok: true;  blobUrl: string; durationEstimate: number }
  | { ok: false; error: string };

export async function generateTts(
  text: string,
  settings: VoiceSettings,
  presetId: string = ''
): Promise<TtsResult> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: settings.language,
        accent: settings.accent,
        vibe: '',           // filled by caller if needed
        presetId,
        speed: settings.speed,
        emotionalDepth: settings.emotionalDepth,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      return { ok: false, error: json.error ?? 'Generation failed.' };
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    // Estimate duration: ~150 wpm, adjusted for speed
    const words = text.trim().split(/\s+/).length;
    const durationEstimate = (words / 150) * 60 / settings.speed;

    return { ok: true, blobUrl, durationEstimate };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Network error: ${msg}` };
  }
}

export async function generateTtsWithVibe(
  text: string,
  settings: VoiceSettings,
  vibe: string,
  presetId: string = ''
): Promise<TtsResult> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: settings.language,
        accent: settings.accent,
        vibe,
        presetId,
        speed: settings.speed,
        emotionalDepth: settings.emotionalDepth,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      return { ok: false, error: json.error ?? 'Generation failed.' };
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const words = text.trim().split(/\s+/).length;
    const durationEstimate = (words / 150) * 60 / settings.speed;

    return { ok: true, blobUrl, durationEstimate };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Network error: ${msg}` };
  }
}

/** Revoke a blob URL when done to free memory. */
export function revokeBlobUrl(url: string) {
  if (url.startsWith('blob:')) URL.revokeObjectURL(url);
}
