"""
⚠️  DEVELOPMENT-ONLY MOCK TTS PROVIDER ⚠️

This provider simulates TTS generation without calling any external API.
It returns a placeholder audio URL and estimated duration based on text length.

DO NOT use this provider in production. Switch to TTS_PROVIDER=external_api
and configure TTS_API_KEY for real voice generation.
"""
import asyncio
import math
from models import VoiceSettings
from services.tts_provider import TTSProvider


class MockTTSProvider(TTSProvider):
    """
    Development-only mock TTS provider.
    
    Simulates a realistic generation delay and returns a demo audio URL.
    Clearly labeled in all API responses as 'mock (dev-only)'.
    """

    @property
    def provider_name(self) -> str:
        return "mock (dev-only)"

    async def generate_voice(
        self,
        text: str,
        settings: VoiceSettings,
        preset_id: str,
        format: str = "mp3",
    ) -> dict:
        """
        Simulate TTS generation.
        
        - Adds realistic async delay proportional to text length
        - Returns a public domain sample audio URL for preview
        - Duration is estimated from word count and speed setting
        """
        # Simulate realistic processing delay (50ms base + 2ms per char, capped at 3s)
        char_count = len(text)
        delay = min(0.05 + (char_count * 0.002), 3.0)
        await asyncio.sleep(delay)

        # Estimate duration: ~150 words/min in English, adjusted for speed
        word_count = len(text.strip().split())
        base_duration = (word_count / 150) * 60  # seconds
        adjusted_duration = base_duration / settings.speed

        # Return a publicly accessible sample audio for demo purposes
        # This is a real audio file from Wikimedia Commons (public domain)
        sample_audio_url = (
            "https://upload.wikimedia.org/wikipedia/commons/2/21/"
            "sample_mp3_file.mp3"
        )

        # In production, this would return the generated file's storage URL
        mock_url = f"/api/audio/mock_{preset_id}_{hash(text) % 99999}.{format}"

        return {
            "audio_url": mock_url,
            "duration": round(adjusted_duration, 2),
            "provider": self.provider_name,
            "warning": (
                "⚠️ MOCK MODE: This is development-only audio. "
                "Configure TTS_PROVIDER=external_api and TTS_API_KEY for real voice generation."
            ),
        }
