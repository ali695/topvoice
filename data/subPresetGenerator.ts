import { VoiceProfile, VoiceSettings } from '@/types/voice';
import { SEED_PRESETS } from './seedPresets';

// Clamp helper
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// Clamp settings to valid ranges
function clampSettings(s: VoiceSettings): VoiceSettings {
  return {
    ...s,
    speed: clamp(s.speed, 0.5, 2.0),
    pitch: clamp(s.pitch, 0.5, 1.5),
    temperature: clamp(s.temperature, 0.0, 1.0),
    emotionalDepth: clamp(s.emotionalDepth, 0.0, 1.0),
    clarity: clamp(s.clarity, 0.0, 1.0),
    breathingLevel: clamp(s.breathingLevel, 0.0, 1.0),
    stability: clamp(s.stability, 0.0, 1.0),
    reverb: s.reverb !== undefined ? clamp(s.reverb, 0.0, 1.0) : undefined,
    creepiness: s.creepiness !== undefined ? clamp(s.creepiness, 0.0, 1.0) : undefined,
  };
}

type VariantDef = {
  suffix: string;
  nameTemplate: (base: string) => string;
  descTemplate: (base: string, category: string) => string;
  settingsMod: (s: VoiceSettings) => Partial<VoiceSettings>;
  extraTags: string[];
  extraUseCases: string[];
  isPremium?: boolean;
};

const VARIANT_DEFS: VariantDef[] = [
  {
    suffix: '_cinematic_trailer',
    nameTemplate: (b) => `${b} — Cinematic Trailer`,
    descTemplate: (b, c) => `${b} tuned for maximum cinematic trailer impact. Optimized for ${c} promo content with elevated drama.`,
    settingsMod: (s) => ({ speed: s.speed * 0.92, pitch: s.pitch * 0.9, emotionalDepth: clamp((s.emotionalDepth || 0.5) + 0.15, 0, 1), reverb: clamp((s.reverb || 0) + 0.15, 0, 1) }),
    extraTags: ['cinematic', 'trailer', 'promo', 'dramatic'],
    extraUseCases: ['Movie Trailers', 'Promo Videos', 'Cinematic Content'],
  },
  {
    suffix: '_reels_cut',
    nameTemplate: (b) => `${b} — Reels Cut`,
    descTemplate: (b, c) => `${b} optimized for Instagram Reels and short-form vertical video. High retention hook energy.`,
    settingsMod: (s) => ({ speed: clamp(s.speed * 1.1, 0.5, 2.0), breathingLevel: clamp((s.breathingLevel || 0.5) * 0.5, 0, 1), temperature: clamp((s.temperature || 0.5) + 0.1, 0, 1) }),
    extraTags: ['reels', 'short-form', 'social', 'instagram', 'vertical'],
    extraUseCases: ['Instagram Reels', 'Short-Form Video', 'Social Media'],
  },
  {
    suffix: '_podcast_narration',
    nameTemplate: (b) => `${b} — Podcast Narration`,
    descTemplate: (b, c) => `${b} with podcast-optimized warmth and intimacy. Clear, engaging, built for long-form audio consumption.`,
    settingsMod: (s) => ({ clarity: clamp((s.clarity || 0.8) + 0.1, 0, 1), stability: clamp((s.stability || 0.7) + 0.1, 0, 1), breathingLevel: clamp((s.breathingLevel || 0.5) * 0.8, 0, 1) }),
    extraTags: ['podcast', 'long-form', 'warm', 'audio', 'narration'],
    extraUseCases: ['Podcast', 'Audio Drama', 'Long-Form Content'],
  },
  {
    suffix: '_youtube_documentary',
    nameTemplate: (b) => `${b} — YouTube Documentary`,
    descTemplate: (b, c) => `${b} calibrated for YouTube documentary format. Authoritative, engaging, holds attention across 10–30 min content.`,
    settingsMod: (s) => ({ speed: clamp(s.speed * 0.96, 0.5, 2.0), clarity: clamp((s.clarity || 0.8) + 0.08, 0, 1), emotionalDepth: clamp((s.emotionalDepth || 0.5) * 0.9, 0, 1) }),
    extraTags: ['youtube', 'documentary', 'educational', 'authoritative'],
    extraUseCases: ['YouTube Documentary', 'Educational Content', 'Explainer Video'],
  },
  {
    suffix: '_dark_version',
    nameTemplate: (b) => `${b} — Dark Version`,
    descTemplate: (b, c) => `${b} pushed into darker sonic territory. Increased creepiness and emotional intensity for mature content.`,
    settingsMod: (s) => ({
      temperature: clamp((s.temperature || 0.5) + 0.15, 0, 1),
      emotionalDepth: clamp((s.emotionalDepth || 0.5) + 0.15, 0, 1),
      stability: clamp((s.stability || 0.7) - 0.1, 0, 1),
      creepiness: clamp((s.creepiness || 0) + 0.2, 0, 1),
    }),
    extraTags: ['dark', 'intense', 'mature', 'deep'],
    extraUseCases: ['Dark Content', 'Mature Narration', 'Horror Adjacent'],
    isPremium: true,
  },
  {
    suffix: '_soft_version',
    nameTemplate: (b) => `${b} — Soft Version`,
    descTemplate: (b, c) => `${b} softened for gentle, intimate delivery. Reduced intensity for calm, accessible content.`,
    settingsMod: (s) => ({
      speed: clamp(s.speed * 0.9, 0.5, 2.0),
      breathingLevel: clamp((s.breathingLevel || 0.5) + 0.1, 0, 1),
      temperature: clamp((s.temperature || 0.5) - 0.1, 0, 1),
      emotionalDepth: clamp((s.emotionalDepth || 0.5) * 0.85, 0, 1),
    }),
    extraTags: ['soft', 'gentle', 'calm', 'intimate'],
    extraUseCases: ['Calm Content', 'Sleep Audio', 'Gentle Narration'],
  },
  {
    suffix: '_whisper_mode',
    nameTemplate: (b) => `${b} — Whisper Mode`,
    descTemplate: (b, c) => `${b} in full whisper mode. Maximum breath presence, intimate delivery for ASMR and sleep content.`,
    settingsMod: (s) => ({ speed: clamp(s.speed * 0.88, 0.5, 2.0), breathingLevel: clamp((s.breathingLevel || 0.5) + 0.25, 0, 1), accent: s.accent.includes('whisper') ? s.accent : 'whisper_accent' }),
    extraTags: ['whisper', 'asmr', 'intimate', 'breath'],
    extraUseCases: ['ASMR', 'Sleep Content', 'Intimate Audio'],
  },
  {
    suffix: '_high_clarity',
    nameTemplate: (b) => `${b} — High Clarity`,
    descTemplate: (b, c) => `${b} engineered for maximum speech clarity. Studio-clean output for professional broadcast and e-learning.`,
    settingsMod: (s) => ({ clarity: 1.0, stability: clamp((s.stability || 0.7) + 0.15, 0, 1), breathingLevel: clamp((s.breathingLevel || 0.5) * 0.7, 0, 1) }),
    extraTags: ['clarity', 'clean', 'broadcast', 'professional', 'studio'],
    extraUseCases: ['E-Learning', 'Corporate Training', 'Broadcast', 'IVR'],
  },
  {
    suffix: '_emotional_plus',
    nameTemplate: (b) => `${b} — Emotional+`,
    descTemplate: (b, c) => `${b} with elevated emotional intensity. Maximum feeling for dramatic or heartfelt content.`,
    settingsMod: (s) => ({ emotionalDepth: 1.0, temperature: clamp((s.temperature || 0.5) + 0.2, 0, 1), stability: clamp((s.stability || 0.7) - 0.15, 0, 1) }),
    extraTags: ['emotional', 'intense', 'heartfelt', 'dramatic'],
    extraUseCases: ['Emotional Stories', 'Drama', 'Poetry', 'Music Narration'],
  },
  {
    suffix: '_stable_studio',
    nameTemplate: (b) => `${b} — Stable Studio`,
    descTemplate: (b, c) => `${b} locked to maximum stability. Zero artifacts, consistent output, perfect for production pipelines.`,
    settingsMod: (s) => ({ stability: 1.0, temperature: clamp((s.temperature || 0.5) * 0.6, 0, 1), clarity: clamp((s.clarity || 0.8) + 0.1, 0, 1) }),
    extraTags: ['stable', 'studio', 'production', 'consistent', 'clean'],
    extraUseCases: ['Production', 'Professional Studio', 'Batch Generation'],
    isPremium: true,
  },
  {
    suffix: '_viral_short_hook',
    nameTemplate: (b) => `${b} — Viral Short Hook`,
    descTemplate: (b, c) => `${b} tuned for the viral hook moment. First 3 seconds optimized to stop the scroll.`,
    settingsMod: (s) => ({ speed: clamp(s.speed * 1.15, 0.5, 2.0), emotionalDepth: clamp((s.emotionalDepth || 0.5) + 0.2, 0, 1), temperature: clamp((s.temperature || 0.5) + 0.15, 0, 1) }),
    extraTags: ['viral', 'hook', 'short', 'engaging', 'scroll-stop'],
    extraUseCases: ['Viral Content', 'Social Media Hook', 'Ad Creative'],
  },
  {
    suffix: '_long_form_narration',
    nameTemplate: (b) => `${b} — Long-Form Narration`,
    descTemplate: (b, c) => `${b} optimized for 30–90 minute long-form audio. Sustainable pacing, low listener fatigue.`,
    settingsMod: (s) => ({ speed: clamp(s.speed * 0.93, 0.5, 2.0), stability: clamp((s.stability || 0.7) + 0.12, 0, 1), breathingLevel: clamp((s.breathingLevel || 0.5) * 0.85, 0, 1) }),
    extraTags: ['long-form', 'audiobook', 'sustained', 'narration'],
    extraUseCases: ['Audiobooks', 'Long Podcast', 'Extended Content'],
  },
  {
    suffix: '_deep_version',
    nameTemplate: (b) => `${b} — Deep Version`,
    descTemplate: (b, c) => `${b} tuned lower for deeper chest resonance. More authority and gravitas.`,
    settingsMod: (s) => ({ pitch: clamp(s.pitch * 0.88, 0.5, 1.5), speed: clamp(s.speed * 0.94, 0.5, 2.0), breathingLevel: clamp((s.breathingLevel || 0.5) + 0.1, 0, 1) }),
    extraTags: ['deep', 'bass', 'authoritative', 'low', 'resonant'],
    extraUseCases: ['Authority Content', 'Deep Narration', 'Masculine Voice'],
  },
  {
    suffix: '_clean_commercial',
    nameTemplate: (b) => `${b} — Clean Commercial`,
    descTemplate: (b, c) => `${b} polished for commercial and advertising use. Clear, trust-building, conversion-optimized.`,
    settingsMod: (s) => ({ clarity: clamp((s.clarity || 0.8) + 0.12, 0, 1), temperature: clamp((s.temperature || 0.5) * 0.7, 0, 1), emotionalDepth: clamp((s.emotionalDepth || 0.5) * 0.8, 0, 1), stability: clamp((s.stability || 0.7) + 0.1, 0, 1) }),
    extraTags: ['commercial', 'advertising', 'clean', 'trust', 'conversion'],
    extraUseCases: ['Commercials', 'Product Ads', 'Brand Voice', 'Radio Ad'],
  },
  {
    suffix: '_low_breath',
    nameTemplate: (b) => `${b} — Low Breath`,
    descTemplate: (b, c) => `${b} with minimal breath artifacts. Studio-clean breath control for seamless audio.`,
    settingsMod: (s) => ({ breathingLevel: clamp((s.breathingLevel || 0.5) * 0.3, 0, 1), clarity: clamp((s.clarity || 0.8) + 0.08, 0, 1) }),
    extraTags: ['clean', 'no-breath', 'studio', 'professional'],
    extraUseCases: ['Corporate', 'Professional Audio', 'Clean Production'],
  },
];

export function generateSubPresets(seedPresets: VoiceProfile[] = SEED_PRESETS): VoiceProfile[] {
  const subPresets: VoiceProfile[] = [];

  // Distribute variants across all seed presets to ensure 100+
  // We have 28 seeds and 15 variant types — each seed gets ~4 variants = 112+ sub-presets
  const variantsPerPreset = Math.ceil(110 / seedPresets.length);

  seedPresets.forEach((seed, seedIndex) => {
    // Rotate variant selection to ensure variety
    const startVariant = (seedIndex * 3) % VARIANT_DEFS.length;
    const selectedVariants = [];

    for (let i = 0; i < variantsPerPreset && i < VARIANT_DEFS.length; i++) {
      selectedVariants.push(VARIANT_DEFS[(startVariant + i) % VARIANT_DEFS.length]);
    }

    selectedVariants.forEach((variant) => {
      const modifiedSettings = clampSettings({
        ...seed.settings,
        ...variant.settingsMod(seed.settings),
      });

      const subPreset: VoiceProfile = {
        id: `${seed.id}${variant.suffix}`,
        name: variant.nameTemplate(seed.name),
        description: variant.descTemplate(seed.name, seed.category),
        category: seed.category,
        vibe: seed.vibe,
        settings: modifiedSettings,
        tags: [...new Set([...seed.tags, ...variant.extraTags])],
        useCases: [...new Set([...seed.useCases, ...variant.extraUseCases])],
        isPremium: variant.isPremium ?? seed.isPremium ?? false,
        parentPresetId: seed.id,
        subVariant: variant.suffix.replace(/_/g, ' ').trim(),
      };

      subPresets.push(subPreset);
    });
  });

  return subPresets;
}

export const SUB_PRESETS: VoiceProfile[] = generateSubPresets(SEED_PRESETS);
