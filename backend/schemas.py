"""
Schema validation helpers for VoiceGen Studio.
"""
from models import VoiceSettings, VALID_ACCENTS
from fastapi import HTTPException


MAX_TEXT_LENGTH = 5000
MAX_LONG_FORM_LENGTH = 50000
MIN_TEXT_LENGTH = 1


def validate_generation_request(text: str, settings: VoiceSettings, long_form: bool = False) -> None:
    """Validate a generation request and raise HTTPException on failure."""
    # Text length validation
    if len(text.strip()) < MIN_TEXT_LENGTH:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    max_len = MAX_LONG_FORM_LENGTH if long_form else MAX_TEXT_LENGTH
    if len(text) > max_len:
        raise HTTPException(
            status_code=400,
            detail=f"Text exceeds maximum length of {max_len} characters. Enable long-form mode for extended content.",
        )

    # Accent validation
    if settings.accent not in VALID_ACCENTS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid accent '{settings.accent}'. Must be one of: {', '.join(VALID_ACCENTS)}",
        )

    # Settings range enforcement (Pydantic handles most, but double-check)
    if not (0.5 <= settings.speed <= 2.0):
        raise HTTPException(status_code=400, detail="Speed must be between 0.5 and 2.0")

    if not (0.5 <= settings.pitch <= 1.5):
        raise HTTPException(status_code=400, detail="Pitch must be between 0.5 and 1.5")
