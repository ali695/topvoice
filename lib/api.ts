import { GenerationRequest, GenerationResult, GenerationHistory, VoiceProfile } from '@/types/voice';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `API error: ${res.status}`;
    try {
      const data = await res.json();
      errorMessage = data.detail || data.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

// Voice Generation
export async function generateVoice(request: GenerationRequest): Promise<GenerationResult> {
  return apiFetch<GenerationResult>('/api/generate', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Presets
export async function fetchPresets(): Promise<VoiceProfile[]> {
  return apiFetch<VoiceProfile[]>('/api/presets');
}

export async function fetchPresetById(id: string): Promise<VoiceProfile> {
  return apiFetch<VoiceProfile>(`/api/presets/${id}`);
}

// Generation History
export async function fetchGenerationHistory(): Promise<GenerationHistory[]> {
  return apiFetch<GenerationHistory[]>('/api/generations');
}

export async function deleteGeneration(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/generations/${id}`, {
    method: 'DELETE',
  });
}

// Favorites
export async function favoritePreset(presetId: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/presets/favorite', {
    method: 'POST',
    body: JSON.stringify({ presetId }),
  });
}
