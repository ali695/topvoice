"""
Preset routes for VoiceGen Studio API.

GET  /api/presets      — List all presets
GET  /api/presets/:id  — Get preset by ID
POST /api/presets/favorite — Favorite a preset
"""
from fastapi import APIRouter, HTTPException
from models import FavoriteRequest

router = APIRouter()

# Embedded preset data (mirrors frontend /data/seedPresets.ts)
# In production, this would be stored in a database
PRESETS = [
    {
        "id": "daniel_british_cinematic",
        "name": "Daniel",
        "description": "Polished British cinematic narrator with deep warmth and theatrical gravitas.",
        "category": "British Cinematic & Thriller",
        "vibe": "Dramatic",
        "settings": {
            "language": "EN", "speed": 0.9, "pitch": 0.85, "temperature": 0.5,
            "emotionalDepth": 0.7, "clarity": 0.8, "breathingLevel": 0.5,
            "stability": 0.8, "accent": "british_warm", "reverb": 0.1
        },
        "tags": ["british", "cinematic", "deep", "dramatic", "premium", "male"],
        "useCases": ["YouTube Documentary", "Thriller Narration", "Audiobook", "Corporate Film"],
        "isPremium": False,
    },
    {
        "id": "haunted_whisper_narrator",
        "name": "Haunted Whisper Narrator",
        "description": "A presence that should not exist. Breathless, cold whisper narration for horror content.",
        "category": "Horror & Thriller",
        "vibe": "Eerie",
        "settings": {
            "language": "EN", "speed": 0.8, "pitch": 1.1, "temperature": 0.7,
            "emotionalDepth": 0.7, "clarity": 0.6, "breathingLevel": 1.0,
            "stability": 0.6, "accent": "horror_whisper", "creepiness": 0.8
        },
        "tags": ["horror", "whisper", "eerie", "creepy", "atmospheric"],
        "useCases": ["Horror Short Film", "Creepypasta", "Scary Stories"],
        "isPremium": False,
    },
    {
        "id": "viral_tiktok_voice",
        "name": "Viral TikTok Voice",
        "description": "The voice that stops the scroll. High energy, punchy, optimized for viral content.",
        "category": "Social Media",
        "vibe": "Friendly",
        "settings": {
            "language": "EN", "speed": 1.2, "pitch": 1.1, "temperature": 0.9,
            "emotionalDepth": 0.7, "clarity": 0.85, "breathingLevel": 0.1,
            "stability": 0.7, "accent": "viral_short_form"
        },
        "tags": ["tiktok", "viral", "social", "fast", "energetic"],
        "useCases": ["TikTok", "Instagram Reels", "YouTube Shorts"],
        "isPremium": False,
    },
    {
        "id": "saudi_emotional_qari_style",
        "name": "Saudi Emotional Qari Style",
        "description": "Deeply emotional Hafs-style recitation pacing with rich breath control.",
        "category": "Quranic Recitation",
        "vibe": "Islamic Recitation",
        "settings": {
            "language": "AR", "speed": 0.9, "pitch": 1.0, "temperature": 0.4,
            "emotionalDepth": 0.9, "clarity": 1.0, "breathingLevel": 0.7,
            "stability": 0.9, "accent": "saudi_qari"
        },
        "tags": ["quran", "arabic", "recitation", "emotional", "saudi"],
        "useCases": ["Quranic Audio", "Islamic App", "Religious Content"],
        "isPremium": False,
    },
    {
        "id": "soothing_meditation",
        "name": "Soothing Meditation",
        "description": "The ultimate calm. Designed for guided meditation and deep relaxation.",
        "category": "Relaxation",
        "vibe": "Calm Therapist",
        "settings": {
            "language": "EN", "speed": 0.75, "pitch": 0.95, "temperature": 0.3,
            "emotionalDepth": 0.7, "clarity": 0.9, "breathingLevel": 0.6,
            "stability": 0.95, "accent": "gentle_therapist"
        },
        "tags": ["meditation", "calm", "relaxation", "wellness"],
        "useCases": ["Meditation App", "Yoga Content", "Wellness Podcast"],
        "isPremium": False,
    },
]

# In-memory favorites (replace with DB in production)
_favorites: set[str] = set()


@router.get("/presets")
async def list_presets():
    """Return all available voice presets."""
    return {"presets": PRESETS, "total": len(PRESETS)}


@router.get("/presets/{preset_id}")
async def get_preset(preset_id: str):
    """Return a single preset by ID."""
    preset = next((p for p in PRESETS if p["id"] == preset_id), None)
    if not preset:
        raise HTTPException(status_code=404, detail=f"Preset '{preset_id}' not found.")
    return preset


@router.post("/presets/favorite")
async def favorite_preset(request: FavoriteRequest):
    """Toggle favorite status for a preset."""
    if request.presetId in _favorites:
        _favorites.discard(request.presetId)
        return {"success": True, "favorited": False, "presetId": request.presetId}
    else:
        _favorites.add(request.presetId)
        return {"success": True, "favorited": True, "presetId": request.presetId}


@router.get("/presets/{preset_id}/favorites")
async def get_favorites():
    """Return all favorited preset IDs."""
    return {"favorites": list(_favorites)}
