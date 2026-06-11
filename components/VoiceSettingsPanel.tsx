'use client';

import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceGenStore } from '@/lib/store';
import { LANGUAGES } from '@/data/languages';
import { ACCENTS } from '@/data/accents';
import { Language } from '@/types/voice';

export function VoiceSettingsPanel() {
  const { currentSettings, updateSettings } = useVoiceGenStore();

  const sliders = [
    { key: 'speed', label: 'Speed', min: 0.5, max: 2.0, step: 0.05, format: (v: number) => `${v.toFixed(2)}x` },
    { key: 'pitch', label: 'Pitch', min: 0.5, max: 1.5, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'temperature', label: 'Temperature', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'emotionalDepth', label: 'Emotional Depth', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'clarity', label: 'Clarity', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'breathingLevel', label: 'Breathing Level', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'stability', label: 'Stability', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'reverb', label: 'Reverb', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
    { key: 'creepiness', label: 'Creepiness', min: 0.0, max: 1.0, step: 0.05, format: (v: number) => v.toFixed(2) },
  ];

  return (
    <div className="space-y-5">
      {/* Language */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/60">Language</label>
        <Select
          value={currentSettings.language}
          onValueChange={(val) => updateSettings({ language: val as Language })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.flag} {lang.name} ({lang.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Accent */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/60">Accent</label>
        <Select
          value={currentSettings.accent}
          onValueChange={(val) => updateSettings({ accent: val })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ACCENTS.map((accent) => (
              <SelectItem key={accent.id} value={accent.id}>
                {accent.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sliders */}
      <div className="space-y-4 pt-1">
        {sliders.map(({ key, label, min, max, step, format }) => {
          const value = (currentSettings as unknown as Record<string, number>)[key] ?? 0;
          return (
            <Slider
              key={key}
              label={label}
              showValue
              valueFormatter={format}
              min={min}
              max={max}
              step={step}
              value={[value]}
              onValueChange={([v]) => updateSettings({ [key]: v } as Partial<typeof currentSettings>)}
            />
          );
        })}
      </div>
    </div>
  );
}
