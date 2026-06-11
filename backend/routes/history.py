"""
Generation history routes for VoiceGen Studio API.

GET    /api/generations      — List generation history
DELETE /api/generations/:id  — Delete a generation
"""
from fastapi import APIRouter, HTTPException
from routes.generate import get_history, delete_from_history

router = APIRouter()


@router.get("/generations")
async def list_generations():
    """Return generation history (most recent first)."""
    history = get_history()
    return {
        "generations": history,
        "total": len(history),
    }


@router.delete("/generations/{generation_id}")
async def delete_generation(generation_id: str):
    """Delete a specific generation from history."""
    deleted = delete_from_history(generation_id)
    if not deleted:
        raise HTTPException(
            status_code=404,
            detail=f"Generation '{generation_id}' not found."
        )
    return {"success": True, "deletedId": generation_id}
