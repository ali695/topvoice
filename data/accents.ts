export type AccentInfo = {
  id: string;
  label: string;
  category: string;
  description: string;
  bestFor: string[];
};

export const ACCENTS: AccentInfo[] = [
  { id: 'neutral_en', label: 'Neutral EN', category: 'Standard', description: 'Clean, accent-neutral American English', bestFor: ['E-learning', 'Corporate', 'Explainer'] },
  { id: 'british_warm', label: 'British Warm', category: 'Regional', description: 'Warm, polished British RP with cinematic quality', bestFor: ['Documentary', 'Narration', 'Thriller'] },
  { id: 'american_reels', label: 'American Reels Style', category: 'Social Media', description: 'Punchy American accent optimized for short-form content', bestFor: ['TikTok', 'Reels', 'Ads'] },
  { id: 'german_soft', label: 'German Soft', category: 'Regional', description: 'Soft German-inflected English accent', bestFor: ['Corporate', 'Tech', 'Documentary'] },
  { id: 'turkish_soft', label: 'Turkish Soft', category: 'Regional', description: 'Gentle Turkish-inflected English with melodic flow', bestFor: ['Narration', 'Drama', 'Storytelling'] },
  { id: 'emotional_urdu', label: 'Emotional Urdu', category: 'Regional', description: 'Deeply emotional Urdu-inflected delivery', bestFor: ['Poetry', 'Drama', 'Emotional Content'] },
  { id: 'emotional_arabic', label: 'Emotional Arabic', category: 'Regional', description: 'Rich Arabic-inflected emotional delivery', bestFor: ['Religious Content', 'Drama', 'Poetry'] },
  { id: 'velvet_indian', label: 'Velvet Indian', category: 'Regional', description: 'Smooth velvet-textured Indian English', bestFor: ['Podcast', 'Audiobooks', 'Calm Content'] },
  { id: 'cinematic_deep', label: 'Cinematic Deep', category: 'Cinematic', description: 'Deep, resonant cinematic delivery for trailers', bestFor: ['Movie Trailers', 'Promos', 'Epic Content'] },
  { id: 'documentary', label: 'Documentary', category: 'Cinematic', description: 'BBC/National Geographic-style documentary voice', bestFor: ['Documentaries', 'Educational', 'Nature'] },
  { id: 'viral_short_form', label: 'Viral Short-Form', category: 'Social Media', description: 'Optimized for viral social media content', bestFor: ['TikTok', 'YouTube Shorts', 'Viral Hooks'] },
  { id: 'whisper_accent', label: 'Whisper Accent', category: 'ASMR', description: 'Ultra-soft whisper delivery for ASMR and intimate content', bestFor: ['ASMR', 'Sleep', 'Intimate Narration'] },
  { id: 'gentle_therapist', label: 'Gentle Therapist', category: 'Wellness', description: 'Warm, reassuring therapist-style delivery', bestFor: ['Meditation', 'Wellness', 'Sleep'] },
  { id: 'horror_whisper', label: 'Horror Whisper', category: 'Horror', description: 'Creepy whispering optimized for horror content', bestFor: ['Horror', 'Thriller', 'Scary Stories'] },
  { id: 'ghostly_echo', label: 'Ghostly Echo', category: 'Horror', description: 'Ethereal voice with natural ghostly resonance', bestFor: ['Horror', 'Paranormal', 'Ghost Stories'] },
  { id: 'demonic_distortion', label: 'Demonic Distortion', category: 'Horror', description: 'Heavy pitch manipulation for demonic character voices', bestFor: ['Horror', 'Characters', 'Dark Content'] },
  { id: 'quranic_tajweed', label: 'Quranic Tajweed', category: 'Islamic', description: 'Tajweed-conscious pacing with proper elongation controls', bestFor: ['Quranic Recitation', 'Islamic Content'] },
  { id: 'egyptian_qari', label: 'Egyptian Qari', category: 'Islamic', description: 'Egyptian Maqam-influenced recitation style', bestFor: ['Quranic Recitation', 'Islamic Audio'] },
  { id: 'saudi_qari', label: 'Saudi Qari', category: 'Islamic', description: 'Hafs recitation style-inspired pacing and breath', bestFor: ['Quranic Recitation', 'Islamic Audio'] },
  { id: 'transatlantic_1920s', label: 'Transatlantic (1920s)', category: 'Vintage', description: 'Classic 1920s-1940s mid-Atlantic broadcasting style', bestFor: ['Period Drama', 'Vintage Content', 'Audiobooks'] },
  { id: 'nature_documentary', label: 'Nature Documentary', category: 'Cinematic', description: 'David Attenborough-inspired calm documentary style', bestFor: ['Nature Content', 'Documentary', 'Educational'] },
  { id: 'robotic_filter', label: 'Robotic Filter', category: 'Sci-Fi', description: 'Synthetic robotic voice processing for AI characters', bestFor: ['Sci-Fi', 'Tech', 'AI Characters'] },
  { id: 'heavy_distortion', label: 'Heavy Distortion', category: 'Characters', description: 'Heavy voice distortion for monster and character voices', bestFor: ['Characters', 'Fantasy', 'Horror'] },
];

export const ACCENT_MAP: Record<string, AccentInfo> = Object.fromEntries(
  ACCENTS.map((a) => [a.id, a])
);

export const ACCENT_CATEGORIES = [...new Set(ACCENTS.map((a) => a.category))];
