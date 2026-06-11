'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VoiceProfile, VoiceSettings, GenerationHistory, FilterState } from '@/types/voice';
import { SEED_PRESETS } from '@/data/seedPresets';

interface VoiceGenStore {
  // Current generation state
  selectedPreset: VoiceProfile | null;
  currentSettings: VoiceSettings;
  scriptText: string;
  audioFormat: 'mp3' | 'wav';
  isGenerating: boolean;
  lastGenerationResult: { audioUrl: string; generationId: string; duration: number } | null;
  generationError: string | null;

  // History
  history: GenerationHistory[];

  // Favorites
  favoritePresetIds: string[];

  // Preset filters
  filters: Partial<FilterState>;

  // Actions
  setSelectedPreset: (preset: VoiceProfile) => void;
  updateSettings: (settings: Partial<VoiceSettings>) => void;
  resetToPresetDefaults: () => void;
  setScriptText: (text: string) => void;
  setAudioFormat: (format: 'mp3' | 'wav') => void;
  setIsGenerating: (v: boolean) => void;
  setGenerationResult: (result: { audioUrl: string; generationId: string; duration: number } | null) => void;
  setGenerationError: (error: string | null) => void;
  addToHistory: (item: GenerationHistory) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  toggleFavorite: (presetId: string) => void;
  isFavorite: (presetId: string) => boolean;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const DEFAULT_SETTINGS: VoiceSettings = {
  language: 'EN',
  speed: 1.0,
  pitch: 1.0,
  temperature: 0.5,
  emotionalDepth: 0.5,
  clarity: 0.8,
  breathingLevel: 0.3,
  stability: 0.8,
  accent: 'neutral_en',
  reverb: 0,
  creepiness: 0,
};

const DEFAULT_PRESET = SEED_PRESETS[0];

export const useVoiceGenStore = create<VoiceGenStore>()(
  persist(
    (set, get) => ({
      selectedPreset: DEFAULT_PRESET,
      currentSettings: DEFAULT_PRESET ? { ...DEFAULT_PRESET.settings } : DEFAULT_SETTINGS,
      scriptText: '',
      audioFormat: 'mp3',
      isGenerating: false,
      lastGenerationResult: null,
      generationError: null,
      history: [],
      favoritePresetIds: [],
      filters: {},

      setSelectedPreset: (preset) =>
        set({ selectedPreset: preset, currentSettings: { ...preset.settings }, generationError: null }),

      updateSettings: (settings) =>
        set((state) => ({ currentSettings: { ...state.currentSettings, ...settings } })),

      resetToPresetDefaults: () => {
        const { selectedPreset } = get();
        if (selectedPreset) {
          set({ currentSettings: { ...selectedPreset.settings } });
        }
      },

      setScriptText: (text) => set({ scriptText: text }),
      setAudioFormat: (format) => set({ audioFormat: format }),
      setIsGenerating: (v) => set({ isGenerating: v }),
      setGenerationResult: (result) => set({ lastGenerationResult: result }),
      setGenerationError: (error) => set({ generationError: error }),

      addToHistory: (item) =>
        set((state) => ({ history: [item, ...state.history].slice(0, 100) })),

      removeFromHistory: (id) =>
        set((state) => ({ history: state.history.filter((h) => h.id !== id) })),

      clearHistory: () => set({ history: [] }),

      toggleFavorite: (presetId) =>
        set((state) => ({
          favoritePresetIds: state.favoritePresetIds.includes(presetId)
            ? state.favoritePresetIds.filter((id) => id !== presetId)
            : [...state.favoritePresetIds, presetId],
        })),

      isFavorite: (presetId) => get().favoritePresetIds.includes(presetId),

      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),

      resetFilters: () => set({ filters: {} }),
    }),
    {
      name: 'voicegen-store',
      partialize: (state) => ({
        history: state.history,
        favoritePresetIds: state.favoritePresetIds,
        audioFormat: state.audioFormat,
      }),
    }
  )
);
