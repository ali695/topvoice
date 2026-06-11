export type VibeInfo = {
  id: string;
  label: string;
  emoji: string;
  category: string;
  description: string;
  color: string;
};

export const VIBES: VibeInfo[] = [
  { id: 'dramatic', label: 'Dramatic', emoji: '🎭', category: 'Cinematic', description: 'High-stakes emotional delivery', color: 'from-red-500 to-orange-500' },
  { id: 'friendly', label: 'Friendly', emoji: '😊', category: 'Social', description: 'Warm and approachable tone', color: 'from-yellow-400 to-green-400' },
  { id: 'sincere', label: 'Sincere', emoji: '💙', category: 'Professional', description: 'Honest and heartfelt delivery', color: 'from-blue-400 to-cyan-400' },
  { id: 'pirate', label: 'Pirate', emoji: '☠️', category: 'Character', description: 'Swashbuckling sea captain energy', color: 'from-amber-600 to-yellow-500' },
  { id: 'smooth_jazz_dj', label: 'Smooth Jazz DJ', emoji: '🎷', category: 'Entertainment', description: 'Cool, laid-back late-night radio vibe', color: 'from-purple-500 to-pink-500' },
  { id: 'whispering', label: 'Whispering', emoji: '🤫', category: 'ASMR', description: 'Soft intimate whisper delivery', color: 'from-slate-400 to-blue-300' },
  { id: 'emotional', label: 'Emotional', emoji: '💔', category: 'Dramatic', description: 'Deep emotional resonance and feeling', color: 'from-rose-500 to-pink-400' },
  { id: 'documentary', label: 'Documentary', emoji: '🎬', category: 'Cinematic', description: 'Authoritative factual narration', color: 'from-stone-400 to-amber-400' },
  { id: 'motivational', label: 'Motivational', emoji: '🔥', category: 'Social', description: 'High energy inspirational delivery', color: 'from-orange-500 to-red-400' },
  { id: 'villain', label: 'Villain', emoji: '😈', category: 'Character', description: 'Cold calculating antagonist energy', color: 'from-violet-600 to-purple-800' },
  { id: 'news_anchor', label: 'News Anchor', emoji: '📰', category: 'Professional', description: 'Authoritative broadcast journalism style', color: 'from-blue-600 to-indigo-500' },
  { id: 'calm_therapist', label: 'Calm Therapist', emoji: '🌿', category: 'Wellness', description: 'Deeply soothing and reassuring', color: 'from-green-400 to-teal-400' },
  { id: 'soft_asmr', label: 'Soft ASMR', emoji: '✨', category: 'ASMR', description: 'Tingles-inducing soft sound design', color: 'from-pink-300 to-purple-300' },
  { id: 'horror_narrator', label: 'Horror Narrator', emoji: '👻', category: 'Horror', description: 'Chilling horror storytelling', color: 'from-gray-700 to-red-900' },
  { id: 'fairytale_teller', label: 'Fairytale Teller', emoji: '🧚', category: 'Children', description: 'Magical whimsical story narration', color: 'from-pink-400 to-purple-400' },
  { id: 'action_narrator', label: 'Action Narrator', emoji: '⚡', category: 'Entertainment', description: 'Fast-paced adrenaline narration', color: 'from-yellow-500 to-orange-600' },
  { id: 'bedtime_story', label: 'Bedtime Story', emoji: '🌙', category: 'Children', description: 'Soft and sleepy story delivery', color: 'from-indigo-400 to-blue-300' },
  { id: 'terrified', label: 'Terrified', emoji: '😱', category: 'Horror', description: 'Fear-stricken panicked delivery', color: 'from-red-600 to-orange-700' },
  { id: 'demonic', label: 'Demonic', emoji: '👹', category: 'Horror', description: 'Deep disturbing demonic voice', color: 'from-red-900 to-black' },
  { id: 'eerie', label: 'Eerie', emoji: '🕯️', category: 'Horror', description: 'Unsettling atmospheric unease', color: 'from-gray-500 to-green-900' },
  { id: 'ghostly', label: 'Ghostly', emoji: '👁️', category: 'Horror', description: 'Ethereal haunting presence', color: 'from-slate-300 to-cyan-200' },
  { id: 'poltergeist', label: 'Poltergeist', emoji: '🌀', category: 'Horror', description: 'Chaotic supernatural energy', color: 'from-purple-700 to-red-700' },
  { id: 'islamic_recitation', label: 'Islamic Recitation', emoji: '🕌', category: 'Spiritual', description: 'Reverent Quranic recitation pacing', color: 'from-emerald-500 to-teal-600' },
  { id: 'spiritual', label: 'Spiritual', emoji: '🌟', category: 'Spiritual', description: 'Sacred meditative spiritual delivery', color: 'from-amber-400 to-yellow-300' },
  { id: 'murattal', label: 'Murattal', emoji: '📿', category: 'Spiritual', description: 'Measured melodic recitation style', color: 'from-green-600 to-emerald-400' },
  { id: 'philosophical', label: 'Philosophical', emoji: '🔮', category: 'Intellectual', description: 'Deep contemplative thought voice', color: 'from-indigo-500 to-violet-600' },
  { id: 'cybernetic', label: 'Cybernetic', emoji: '🤖', category: 'Sci-Fi', description: 'Synthetic AI-processed voice', color: 'from-cyan-400 to-blue-500' },
  { id: 'divine', label: 'Divine', emoji: '✝️', category: 'Spiritual', description: 'Ethereal divine presence voice', color: 'from-yellow-200 to-amber-300' },
  { id: 'hysterical', label: 'Hysterical', emoji: '🤪', category: 'Character', description: 'Over-the-top hysterical energy', color: 'from-lime-400 to-yellow-400' },
  { id: 'grumpy', label: 'Grumpy', emoji: '😤', category: 'Character', description: 'Irritable gruff character voice', color: 'from-stone-500 to-amber-600' },
  { id: 'hypnotic', label: 'Hypnotic', emoji: '💫', category: 'Wellness', description: 'Deep trance-inducing rhythm', color: 'from-violet-400 to-indigo-500' },
  { id: 'sleep_learning', label: 'Sleep Learning', emoji: '😴', category: 'Education', description: 'Optimal cadence for sleep-state learning', color: 'from-blue-300 to-indigo-300' },
];

export const VIBE_MAP: Record<string, VibeInfo> = Object.fromEntries(
  VIBES.map((v) => [v.id, v])
);

export const VIBE_CATEGORIES = [...new Set(VIBES.map((v) => v.category))];
