"""
Audio file storage service for VoiceGen Studio.

Handles saving generated audio files to local disk or cloud storage.
Provides cleanup utilities for file management.
"""
import os
import asyncio
import aiofiles
import uuid
from pathlib import Path
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)


async def save_audio_file(
    audio_content: bytes,
    generation_id: str,
    format: str,
    storage_path: str = "./audio_storage",
) -> tuple[str, str]:
    """
    Save audio content to local storage.
    
    Returns:
        tuple of (file_path, file_url)
    """
    storage_dir = Path(storage_path)
    storage_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{generation_id}.{format}"
    file_path = storage_dir / filename

    async with aiofiles.open(file_path, "wb") as f:
        await f.write(audio_content)

    logger.info(f"Saved audio file: {filename} ({len(audio_content)} bytes)")

    # In production, this would return a CDN URL or signed storage URL
    file_url = f"/api/audio/{filename}"

    return str(file_path), file_url


def get_audio_file_path(filename: str, storage_path: str = "./audio_storage") -> Path:
    """Get the full path for an audio file."""
    # Security: prevent path traversal
    safe_name = Path(filename).name
    return Path(storage_path) / safe_name


async def delete_audio_file(filename: str, storage_path: str = "./audio_storage") -> bool:
    """Delete an audio file from storage."""
    file_path = get_audio_file_path(filename, storage_path)
    try:
        if file_path.exists():
            file_path.unlink()
            logger.info(f"Deleted audio file: {filename}")
            return True
    except Exception as e:
        logger.error(f"Failed to delete {filename}: {e}")
    return False


async def cleanup_old_files(
    storage_path: str = "./audio_storage",
    max_age_hours: int = 24,
) -> int:
    """
    Clean up audio files older than max_age_hours.
    
    Returns number of files deleted.
    Should be called periodically (e.g., via scheduled task).
    """
    storage_dir = Path(storage_path)
    if not storage_dir.exists():
        return 0

    cutoff = datetime.now() - timedelta(hours=max_age_hours)
    deleted = 0

    for file_path in storage_dir.glob("*.mp3"):
        try:
            mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
            if mtime < cutoff:
                file_path.unlink()
                deleted += 1
        except Exception as e:
            logger.warning(f"Could not clean up {file_path}: {e}")

    for file_path in storage_dir.glob("*.wav"):
        try:
            mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
            if mtime < cutoff:
                file_path.unlink()
                deleted += 1
        except Exception as e:
            logger.warning(f"Could not clean up {file_path}: {e}")

    if deleted:
        logger.info(f"Cleanup: removed {deleted} old audio files")

    return deleted
