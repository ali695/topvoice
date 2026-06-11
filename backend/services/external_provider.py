"""
External API TTS Provider for VoiceGen Studio.

This module provides the production TTS provider implementation.
It uses a generic external API interface that can be adapted to:
  - ElevenLabs
  - OpenAI TTS
  - Google Cloud TTS
  - Azure Cognitive Services
  - Resemble AI
  - Any REST-based TTS API

Configure via environment variables:
  TTS_PROVIDER=external_api
  TTS_API_KEY=your_key_here
  TTS_API_BASE_URL=https://api.yourprovider.com (optional)
  TTS_API_VOICE_ID=voice_id (optional, provider-specific)
"""
import os
import httpx
import uuid
import aiofiles
from pathlib import Path
from models import VoiceSettings
from services.tts_provider import TTSProvider
from services.storage import save_audio_file


class ExternalAPITTSProvider(TTSProvider):
    """
    Production external API TTS provider.
    
    Sends generation requests to the configured external TTS API,
    downloads the resulting audio, saves it to storage, and returns
    a local URL for the frontend to access.
    """

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_base_url = os.environ.get("TTS_API_BASE_URL", "https://api.elevenlabs.io/v1")
        self.voice_id = os.environ.get("TTS_API_VOICE_ID", "")
        self.storage_path = os.environ.get("AUDIO_STORAGE_PATH", "./audio_storage")

    @property
    def provider_name(self) -> str:
        return "external_api"

    def _map_settings_to_api(self, settings: VoiceSettings) -> dict:
        """
        Map VoiceGen settings to external API parameters.
        Customize this method for your specific TTS provider.
        """
        return {
            "stability": settings.stability,
            "similarity_boost": settings.clarity,
            "style": settings.emotionalDepth,
            "use_speaker_boost": True,
            "speed": settings.speed,
            "pitch": settings.pitch,
        }

    async def generate_voice(
        self,
        text: str,
        settings: VoiceSettings,
        preset_id: str,
        format: str = "mp3",
    ) -> dict:
        """
        Generate voice via external TTS API.
        
        Makes an authenticated request to the TTS provider,
        streams the audio response, saves to local storage,
        and returns the file URL.
        """
        generation_id = str(uuid.uuid4())
        voice_settings = self._map_settings_to_api(settings)

        # Generic request body — adapt to your TTS provider
        request_body = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": voice_settings,
            "output_format": f"{format}_44100_128",
        }

        headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": f"audio/{format}",
        }

        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                voice_id = self.voice_id or "21m00Tcm4TlvDq8ikWAM"  # Default fallback
                url = f"{self.api_base_url}/text-to-speech/{voice_id}"

                response = await client.post(url, json=request_body, headers=headers)

                if response.status_code == 401:
                    raise ValueError(
                        "TTS API authentication failed. "
                        "Check your TTS_API_KEY in the backend .env file."
                    )
                elif response.status_code == 422:
                    raise ValueError(
                        f"TTS API rejected the request. Check text length and settings. "
                        f"Response: {response.text[:200]}"
                    )
                elif response.status_code != 200:
                    raise ValueError(
                        f"TTS API error {response.status_code}: {response.text[:200]}"
                    )

                # Save audio file
                audio_content = response.content
                file_path, file_url = await save_audio_file(
                    audio_content,
                    generation_id,
                    format,
                    self.storage_path,
                )

                # Estimate duration from file size (rough: 128kbps MP3 ≈ 16KB/s)
                file_size_kb = len(audio_content) / 1024
                estimated_duration = file_size_kb / 16.0

                return {
                    "audio_url": file_url,
                    "duration": round(estimated_duration, 2),
                    "provider": self.provider_name,
                }

        except httpx.TimeoutException:
            raise TimeoutError(
                "TTS generation timed out. The text may be too long or the provider is busy. "
                "Try a shorter text or enable long-form mode."
            )
        except (ValueError, TimeoutError):
            raise
        except Exception as e:
            # Log internal error without exposing secrets
            import logging
            logging.error(f"TTS generation error (internal): {type(e).__name__}")
            raise RuntimeError(
                "Voice generation failed due to an internal error. "
                "Please try again or contact support if the issue persists."
            )
