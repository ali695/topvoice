import { NextRequest, NextResponse } from 'next/server';

// ── Groq TTS Voice Mapping ────────────────────────────────────────────────────
function selectGroqVoice(
  language: string,
  accent: string,
  vibe: string
): { model: string; voice: string } {
  // Arabic language → Arabic model
  if (language === 'AR') {
    const vibeVoiceMap: Record<string, string> = {
      'Islamic Recitation': 'Abdullah-PlayAI',
      'Murattal': 'Ahmad-PlayAI',
      'Spiritual': 'Ahmad-PlayAI',
      'Emotional': 'Ahmad-PlayAI',
    };
    return {
      model: 'orpheus-tts-arabic',
      voice: vibeVoiceMap[vibe] ?? 'Ahmad-PlayAI',
    };
  }

  // English + other languages → English model
  // Map vibe/accent combos to voices
  const accentVoiceMap: Record<string, string> = {
    'horror_whisper': 'Briggs-PlayAI',
    'ghostly_echo': 'Mitch-PlayAI',
    'demonic_distortion': 'Briggs-PlayAI',
    'british_warm': 'Cillian-PlayAI',
    'documentary': 'Atlas-PlayAI',
    'cinematic_deep': 'Thunder-PlayAI',
    'gentle_therapist': 'Basil-PlayAI',
    'whisper_accent': 'Celeste-PlayAI',
    'viral_short_form': 'Chip-PlayAI',
    'american_reels': 'Calum-PlayAI',
    'robotic_filter': 'Erick-PlayAI',
    'heavy_distortion': 'Fritz-PlayAI',
    'neutral_en': 'Atlas-PlayAI',
    'nature_documentary': 'Atlas-PlayAI',
    'transatlantic_1920s': 'Gail-PlayAI',
  };

  const vibeVoiceMap: Record<string, string> = {
    'Dramatic': 'Thunder-PlayAI',
    'Horror Narrator': 'Briggs-PlayAI',
    'Eerie': 'Mitch-PlayAI',
    'Ghostly': 'Mitch-PlayAI',
    'Demonic': 'Briggs-PlayAI',
    'Poltergeist': 'Fritz-PlayAI',
    'Terrified': 'Deedee-PlayAI',
    'Whispering': 'Celeste-PlayAI',
    'Soft ASMR': 'Judy-PlayAI',
    'Calm Therapist': 'Basil-PlayAI',
    'Hypnotic': 'Mason-PlayAI',
    'Cybernetic': 'Erick-PlayAI',
    'Friendly': 'Cheyenne-PlayAI',
    'Emotional': 'Deedee-PlayAI',
    'News Anchor': 'Gail-PlayAI',
    'Motivational': 'Thunder-PlayAI',
    'Villain': 'Fritz-PlayAI',
    'Sincere': 'Atlas-PlayAI',
    'Documentary': 'Atlas-PlayAI',
    'Murattal': 'Ahmad-PlayAI',
  };

  const voice =
    accentVoiceMap[accent] ??
    vibeVoiceMap[vibe] ??
    'Atlas-PlayAI';

  return { model: 'orpheus-tts', voice };
}

// ── Build text with Orpheus emotion tags ─────────────────────────────────────
// Orpheus supports: <laugh>, <chuckle>, <sigh>, <cough>, <sniffle>,
//                   <groan>, <yawn>, <gasp>
function addEmotionTags(text: string, vibe: string, emotionalDepth: number): string {
  if (emotionalDepth < 0.4) return text;

  const prefix: Record<string, string> = {
    'Emotional': '<sigh> ',
    'Terrified': '<gasp> ',
    'Demonic': '',
    'Soft ASMR': '',
    'Whispering': '',
    'Horror Narrator': '',
    'Eerie': '',
    'Hypnotic': '<sigh> ',
    'Calm Therapist': '',
    'Motivational': '',
  };

  const tag = prefix[vibe] ?? '';
  return tag ? tag + text : text;
}

// ── POST /api/tts ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY not configured on server.' },
      { status: 503 }
    );
  }

  let body: {
    text: string;
    language?: string;
    accent?: string;
    vibe?: string;
    speed?: number;
    emotionalDepth?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    text,
    language = 'EN',
    accent = 'neutral_en',
    vibe = 'Dramatic',
    speed = 1.0,
    emotionalDepth = 0.5,
  } = body;

  // Validation
  if (!text || typeof text !== 'string' || !text.trim()) {
    return NextResponse.json({ error: 'text is required.' }, { status: 400 });
  }
  if (text.length > 4096) {
    return NextResponse.json(
      { error: 'Text too long. Maximum 4096 characters per generation.' },
      { status: 400 }
    );
  }

  const { model, voice } = selectGroqVoice(language, accent, vibe);

  // Optionally add emotion tags
  const processedText = addEmotionTags(text.trim(), vibe, emotionalDepth);

  // Clamp speed: Groq accepts 0.5 – 2.0
  const clampedSpeed = Math.max(0.5, Math.min(2.0, speed));

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
        input: processedText,
        response_format: 'wav',
        speed: clampedSpeed,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error(`Groq TTS error ${groqRes.status}:`, errText);

      // Parse Groq error message
      let userMessage = 'Voice generation failed. Please try again.';
      try {
        const errJson = JSON.parse(errText);
        if (errJson?.error?.message) {
          userMessage = errJson.error.message;
        }
      } catch {}

      return NextResponse.json({ error: userMessage }, { status: groqRes.status });
    }

    // Stream the audio back to client
    const audioBuffer = await groqRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'no-store',
        'X-Voice-Model': model,
        'X-Voice-Name': voice,
      },
    });
  } catch (err) {
    console.error('TTS generation error:', err);
    return NextResponse.json(
      { error: 'Network error reaching Groq API. Check your connection.' },
      { status: 502 }
    );
  }
}
