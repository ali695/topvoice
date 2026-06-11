import { VoiceProfile, FilterState } from '@/types/voice';
import { ALL_PRESETS } from '@/data/allPresets';

export function filterPresets(presets: VoiceProfile[], filters: Partial<FilterState>): VoiceProfile[] {
  return presets.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.useCases.some((u) => u.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (filters.category && filters.category !== 'all') {
      if (p.category !== filters.category) return false;
    }
    if (filters.language && filters.language !== 'all') {
      if (p.settings.language !== filters.language) return false;
    }
    if (filters.vibe && filters.vibe !== 'all') {
      if (p.vibe.toLowerCase() !== filters.vibe.toLowerCase()) return false;
    }
    if (filters.accent && filters.accent !== 'all') {
      if (p.settings.accent !== filters.accent) return false;
    }
    if (filters.useCase && filters.useCase !== 'all') {
      if (!p.useCases.some((u) => u.toLowerCase().includes(filters.useCase!.toLowerCase()))) return false;
    }
    if (filters.speedMin !== undefined) {
      if (p.settings.speed < filters.speedMin) return false;
    }
    if (filters.speedMax !== undefined) {
      if (p.settings.speed > filters.speedMax) return false;
    }
    if (filters.showPremiumOnly) {
      if (!p.isPremium) return false;
    }
    return true;
  });
}

export function groupPresetsByCategory(presets: VoiceProfile[]): Record<string, VoiceProfile[]> {
  return presets.reduce<Record<string, VoiceProfile[]>>((acc, preset) => {
    if (!acc[preset.category]) acc[preset.category] = [];
    acc[preset.category].push(preset);
    return acc;
  }, {});
}

export function getDefaultSettings(preset: VoiceProfile) {
  return { ...preset.settings };
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

export function estimateAudioDuration(text: string, speed: number): number {
  // Average English speaking rate ~150 words/min
  const words = text.trim().split(/\s+/).length;
  const baseDuration = (words / 150) * 60;
  return baseDuration / speed;
}

export function estimateCredits(text: string): number {
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 100));
}

export const ALL_USE_CASES = [
  ...new Set(ALL_PRESETS.flatMap((p) => p.useCases)),
].sort();
