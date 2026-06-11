// Core Voice Types for VoiceGen Studio

export type Language = 'EN' | 'UR' | 'DE' | 'AR' | 'HI' | 'TR' | 'ES' | 'FR' | 'JA' | 'RU' | 'ZH';

export type VoiceSettings = {
  language: Language;
  speed: number;        // 0.5 – 2.0
  pitch: number;        // 0.5 – 1.5
  temperature: number;  // 0.0 – 1.0
  emotionalDepth: number;  // 0.0 – 1.0
  clarity: number;      // 0.0 – 1.0
  breathingLevel: number;  // 0.0 – 1.0
  stability: number;    // 0.0 – 1.0
  accent: string;
  reverb?: number;      // 0.0 – 1.0
  creepiness?: number;  // 0.0 – 1.0
};

export type VoiceProfile = {
  id: string;
  name: string;
  description: string;
  category: string;
  vibe: string;
  settings: VoiceSettings;
  tags: string[];
  useCases: string[];
  isPremium?: boolean;
  parentPresetId?: string;
  subVariant?: string;
};

export type PresetCategory =
  | 'British Cinematic & Thriller'
  | 'Sleep Learning & Long Form'
  | 'Detective & Crime'
  | 'Horror & Thriller'
  | 'Fantasy & Adventure'
  | 'Sci-Fi & Cyberpunk'
  | 'Human Narrators'
  | 'Emotional Narrators'
  | 'Cinematic Trailer'
  | 'Children & Family'
  | 'Character Voices'
  | 'Quranic Recitation'
  | 'Narration'
  | 'Storytelling'
  | 'Social Media'
  | 'Soft Intimate Whisper'
  | 'Relaxation'
  | 'Languages'
  | 'Background Horror'
  | 'Ultra-Horror'
  | 'Characters'
  | 'Accents';

export type Vibe =
  | 'Dramatic'
  | 'Friendly'
  | 'Sincere'
  | 'Pirate'
  | 'Smooth Jazz DJ'
  | 'Whispering'
  | 'Emotional'
  | 'Documentary'
  | 'Motivational'
  | 'Villain'
  | 'News Anchor'
  | 'Calm Therapist'
  | 'Soft ASMR'
  | 'Horror Narrator'
  | 'Fairytale Teller'
  | 'Action Narrator'
  | 'Bedtime Story'
  | 'Terrified'
  | 'Demonic'
  | 'Eerie'
  | 'Ghostly'
  | 'Poltergeist'
  | 'Islamic Recitation'
  | 'Spiritual'
  | 'Murattal'
  | 'Philosophical'
  | 'Cybernetic'
  | 'Divine'
  | 'Hysterical'
  | 'Grumpy'
  | 'Hypnotic'
  | 'Sleep Learning';

export type GenerationRequest = {
  text: string;
  presetId: string;
  settings: VoiceSettings;
  format: 'mp3' | 'wav';
};

export type GenerationResult = {
  success: boolean;
  audioUrl: string;
  generationId: string;
  duration: number;
  settingsUsed: VoiceSettings;
  error?: string;
};

export type GenerationHistory = {
  id: string;
  presetId: string;
  presetName: string;
  text: string;
  audioUrl: string;
  duration: number;
  settingsUsed: VoiceSettings;
  createdAt: string;
  format: 'mp3' | 'wav' | 'browser';
};

export type FilterState = {
  category: string;
  language: string;
  vibe: string;
  accent: string;
  useCase: string;
  search: string;
  speedMin: number;
  speedMax: number;
  showPremiumOnly: boolean;
};
