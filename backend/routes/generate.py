"""
Voice generation route for VoiceGen Studio API.

POST /api/generate — Generate audio from text using the configured TTS provider.
"""
import uuid
import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException
from models import GenerationRequest, GenerationResult
from schemas import validate_generation_request
from services.tts_provider import get_tts_provider
from services.preset_validation import get_preset_name

logger = logging.getLogger(__name__)
router = APIRouter()

# In-memory generation history (replace with DB in production)
_generation_history: list[dict] = []


@router.post("/generate", response_model=GenerationResult)
async def generate_voice(request: GenerationRequest):
    """
    Generate AI voice audio from text.

    - Validates text length and settings
    - Selects the configured TTS provider
    - Returns audio URL and generation metadata
    - Stores result in generation history

    Fails safely with user-friendly error messages if provider is not configured.
    """
    # Input validation
    try:
        validate_generation_request(request.text, request.settings, request.longFormMode)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Get TTS provider
    try:
        provider = get_tts_provider()
    except EnvironmentError as e:
        # User-friendly error when API key is missing
        raise HTTPException(
            status_code=503,
            detail=(
                "Voice generation is not configured. "
                "Please set TTS_PROVIDER and TTS_API_KEY in your backend .env file. "
                "Use TTS_PROVIDER=mock for local development without an API key."
            ),
        )
    except NotImplementedError as e:
        raise HTTPException(status_code=501, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Generate voice
    generation_id = str(uuid.uuid4())

    try:
        result = await provider.generate_voice(
            text=request.text,
            settings=request.settings,
            preset_id=request.presetId,
            format=request.format,
        )
    except TimeoutError as e:
        raise HTTPException(status_code=408, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Generation failed for preset {request.presetId}: {type(e).__name__}")
        raise HTTPException(
            status_code=500,
            detail=(
                "Voice generation failed. "
                "Please check your TTS provider configuration and try again."
            ),
        )

    # Store in history
    preset_name = get_preset_name(request.presetId)
    record = {
        "id": generation_id,
        "presetId": request.presetId,
        "presetName": preset_name,
        "text": request.text[:500],  # Store truncated text for privacy
        "audioUrl": result["audio_url"],
        "duration": result["duration"],
        "settingsUsed": request.settings.model_dump(),
        "createdAt": datetime.utcnow().isoformat() + "Z",
        "format": request.format,
    }
    _generation_history.insert(0, record)

    # Keep history bounded
    if len(_generation_history) > 500:
        _generation_history.pop()

    logger.info(
        f"Generated voice: preset={request.presetId}, "
        f"lang={request.settings.language}, "
        f"chars={len(request.text)}, "
        f"provider={result.get('provider', 'unknown')}"
    )

    return GenerationResult(
        success=True,
        audioUrl=result["audio_url"],
        generationId=generation_id,
        duration=result["duration"],
        settingsUsed=request.settings,
        provider=result.get("provider"),
    )


def get_history() -> list[dict]:
    """Get generation history (used by history route)."""
    return _generation_history


def delete_from_history(generation_id: str) -> bool:
    """Delete a generation from history."""
    global _generation_history
    original_len = len(_generation_history)
    _generation_history = [g for g in _generation_history if g["id"] != generation_id]
    return len(_generation_history) < original_len
