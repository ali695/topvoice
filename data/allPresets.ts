import { VoiceProfile } from '@/types/voice';
import { SEED_PRESETS } from './seedPresets';
import { SUB_PRESETS } from './subPresetGenerator';

export const ALL_PRESETS: VoiceProfile[] = [...SEED_PRESETS, ...SUB_PRESETS];

export function getPresetById(id: string): VoiceProfile | undefined {
  return ALL_PRESETS.find((p) => p.id === id);
}

export function getPresetsByCategory(category: string): VoiceProfile[] {
  return ALL_PRESETS.filter((p) => p.category === category);
}

export function getPresetsByVibe(vibe: string): VoiceProfile[] {
  return ALL_PRESETS.filter((p) => p.vibe.toLowerCase() === vibe.toLowerCase());
}

export function getPresetsByLanguage(language: string): VoiceProfile[] {
  return ALL_PRESETS.filter((p) => p.settings.language === language);
}

export function getSubPresetsFor(parentId: string): VoiceProfile[] {
  return ALL_PRESETS.filter((p) => p.parentPresetId === parentId);
}

export function searchPresets(query: string): VoiceProfile[] {
  const q = query.toLowerCase();
  return ALL_PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.useCases.some((u) => u.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.vibe.toLowerCase().includes(q)
  );
}

export const PRESET_CATEGORIES = [...new Set(ALL_PRESETS.map((p) => p.category))].sort();

export { SEED_PRESETS, SUB_PRESETS };
