"""
Preset validation service for VoiceGen Studio.

Provides server-side preset data and validation.
In a full deployment, this would read from a database.
For now, it uses the embedded preset definitions.
"""
from typing import Optional

# Embedded preset IDs for validation (from seedPresets.ts)
VALID_PRESET_IDS = {
    "daniel_british_cinematic",
    "rachel_british_mystique",
    "deep_sleep_hypnosis_male",
    "noir_detective_narrator",
    "shadow_chaser_investigator",
    "haunted_whisper_narrator",
    "demonic_layered_voice",
    "possessed_whisperer",
    "cursed_doll",
    "poltergeist_noise",
    "epic_high_fantasy_narrator",
    "dwarven_king_narrator",
    "ai_synth_narrator",
    "cyberpunk_street_reporter",
    "heartbroken_narrator",
    "panic_story_narrator",
    "soothing_meditation",
    "sleep_story_narrator",
    "saudi_emotional_qari_style",
    "egyptian_murattal_qari_style",
    "vintage_egyptian_spiritual_qari",
    "modern_saudi_emotional_recitation",
    "viral_tiktok_voice",
    "esports_shoutcaster_male",
    "fast_talking_auctioneer",
    "midnight_confession",
    "deep_late_night_male",
    "ear_to_ear_angel",
    "mischievous_goblin",
    "robot_butler",
    "glitchy_hologram",
}

VARIANT_SUFFIXES = [
    "_cinematic_trailer", "_reels_cut", "_podcast_narration",
    "_youtube_documentary", "_dark_version", "_soft_version",
    "_whisper_mode", "_high_clarity", "_emotional_plus",
    "_stable_studio", "_viral_short_hook", "_long_form_narration",
    "_deep_version", "_clean_commercial", "_low_breath",
]


def is_valid_preset_id(preset_id: str) -> bool:
    """Check if a preset ID is valid (seed or auto-generated sub-preset)."""
    if preset_id in VALID_PRESET_IDS:
        return True
    # Check sub-presets (parentId + variant suffix)
    for seed_id in VALID_PRESET_IDS:
        for suffix in VARIANT_SUFFIXES:
            if preset_id == f"{seed_id}{suffix}":
                return True
    # Allow any preset ID for flexibility (frontend generates them)
    return True  # Accept all in development


def get_preset_name(preset_id: str) -> str:
    """Get a human-readable name from a preset ID."""
    return preset_id.replace("_", " ").title()
