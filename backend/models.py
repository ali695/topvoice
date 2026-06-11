"""
Pydantic models for VoiceGen Studio backend.
"""
from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum


class Language(str, Enum):
    EN = "EN"
    UR = "UR"
    DE = "DE"
    AR = "AR"
    HI = "HI"
    TR = "TR"
    ES = "ES"
    FR = "FR"
    JA = "JA"
    RU = "RU"
    ZH = "ZH"


class VoiceSettings(BaseModel):
    language: Language = Language.EN
    speed: float = Field(default=1.0, ge=0.5, le=2.0)
    pitch: float = Field(default=1.0, ge=0.5, le=1.5)
    temperature: float = Field(default=0.5, ge=0.0, le=1.0)
    emotionalDepth: float = Field(default=0.5, ge=0.0, le=1.0)
    clarity: float = Field(default=0.8, ge=0.0, le=1.0)
    breathingLevel: float = Field(default=0.3, ge=0.0, le=1.0)
    stability: float = Field(default=0.8, ge=0.0, le=1.0)
    accent: str = "neutral_en"
    reverb: Optional[float] = Field(default=0.0, ge=0.0, le=1.0)
    creepiness: Optional[float] = Field(default=0.0, ge=0.0, le=1.0)


class GenerationRequest(BaseModel):
    text: str
    presetId: str
    settings: VoiceSettings
    format: Literal["mp3", "wav"] = "mp3"
    longFormMode: bool = False


class GenerationResult(BaseModel):
    success: bool
    audioUrl: str
    generationId: str
    duration: float
    settingsUsed: VoiceSettings
    provider: Optional[str] = None
    error: Optional[str] = None


class GenerationRecord(BaseModel):
    id: str
    presetId: str
    presetName: str
    text: str
    audioUrl: str
    duration: float
    settingsUsed: VoiceSettings
    createdAt: str
    format: str


class FavoriteRequest(BaseModel):
    presetId: str


VALID_ACCENTS = [
    "neutral_en", "british_warm", "american_reels", "german_soft",
    "turkish_soft", "emotional_urdu", "emotional_arabic", "velvet_indian",
    "cinematic_deep", "documentary", "viral_short_form", "whisper_accent",
    "gentle_therapist", "horror_whisper", "ghostly_echo", "demonic_distortion",
    "quranic_tajweed", "egyptian_qari", "saudi_qari", "transatlantic_1920s",
    "nature_documentary", "robotic_filter", "heavy_distortion",
]

VALID_VIBES = [
    "dramatic", "friendly", "sincere", "pirate", "smooth_jazz_dj",
    "whispering", "emotional", "documentary", "motivational", "villain",
    "news_anchor", "calm_therapist", "soft_asmr", "horror_narrator",
    "fairytale_teller", "action_narrator", "bedtime_story", "terrified",
    "demonic", "eerie", "ghostly", "poltergeist", "islamic_recitation",
    "spiritual", "murattal", "philosophical", "cybernetic", "divine",
    "hysterical", "grumpy", "hypnotic", "sleep_learning",
]
