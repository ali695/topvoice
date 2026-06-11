'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PRESET_CATEGORIES } from '@/data/allPresets';
import { VIBES } from '@/data/vibes';
import { ACCENTS } from '@/data/accents';
import { LANGUAGES } from '@/data/languages';
import { FilterState } from '@/types/voice';
import { useVoiceGenStore } from '@/lib/store';

interface PresetFiltersProps {
  filters: Partial<FilterState>;
  onChange: (filters: Partial<FilterState>) => void;
  total: number;
}

export function PresetFilters({ filters, onChange, total }: PresetFiltersProps) {
  const hasFilters = !!(filters.search || filters.category || filters.language || filters.vibe || filters.accent);

  const reset = () => onChange({});

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search presets, tags, use cases..."
            className="pl-9"
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>
        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={reset}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.category || 'all'}
          onValueChange={(v) => onChange({ ...filters, category: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-auto min-w-[160px] text-xs h-8">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {PRESET_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.language || 'all'}
          onValueChange={(v) => onChange({ ...filters, language: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-auto min-w-[120px] text-xs h-8">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.code} value={l.code}>{l.flag} {l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.vibe || 'all'}
          onValueChange={(v) => onChange({ ...filters, vibe: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-auto min-w-[130px] text-xs h-8">
            <SelectValue placeholder="Vibe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vibes</SelectItem>
            {VIBES.map((v) => (
              <SelectItem key={v.id} value={v.id}>{v.emoji} {v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.accent || 'all'}
          onValueChange={(v) => onChange({ ...filters, accent: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-auto min-w-[150px] text-xs h-8">
            <SelectValue placeholder="Accent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accents</SelectItem>
            {ACCENTS.map((a) => (
              <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <SlidersHorizontal className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs text-white/40">{total} presets</span>
        </div>
      </div>
    </div>
  );
}
