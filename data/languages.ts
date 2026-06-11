import { Language } from '@/types/voice';

export type LanguageInfo = {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
  specialNotes?: string;
};

export const LANGUAGES: LanguageInfo[] = [
  { code: 'EN', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'UR', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true, specialNotes: 'Emotional cadence, Nastaliq script support' },
  { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', specialNotes: 'Strong consonants, precise pronunciation' },
  { code: 'AR', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, specialNotes: 'Tajweed pacing support, Modern Standard & dialectal' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', specialNotes: 'Bollywood emotional cadence' },
  { code: 'TR', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', specialNotes: 'Soft cadence, melodic rhythm' },
  { code: 'ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', specialNotes: 'Latin & Castilian variants' },
  { code: 'FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', specialNotes: 'Parisian & Canadian variants' },
  { code: 'JA', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', specialNotes: 'Honorific register support' },
  { code: 'RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', specialNotes: 'Dramatic Slavic cadence' },
  { code: 'ZH', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', specialNotes: 'Mandarin tonal support' },
];

export const LANGUAGE_MAP: Record<Language, LanguageInfo> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l])
) as Record<Language, LanguageInfo>;
