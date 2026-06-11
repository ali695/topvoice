"""
TTS Provider Abstraction Layer for VoiceGen Studio.

This module defines the base TTSProvider interface and the factory
function to instantiate the correct provider based on environment config.

Supported providers:
  - mock        : Development-only fake generation (returns a placeholder URL)
  - external_api: Real API-based TTS (configured via TTS_API_KEY)
  - local_model : Placeholder for future local model integration
"""
from abc import ABC, abstractmethod
from models import VoiceSettings
import os


class TTSProvider(ABC):
    """Base interface for all TTS providers."""

    @abstractmethod
    async def generate_voice(
        self,
        text: str,
        settings: VoiceSettings,
        preset_id: str,
        format: str = "mp3",
    ) -> dict:
        """
        Generate audio from text with the given settings.

        Returns:
            dict with keys:
              - audio_url: str  — URL or path to the generated audio
              - duration: float — estimated/actual duration in seconds
              - provider: str   — provider name for transparency
        """
        pass

    @property
    @abstractmethod
    def provider_name(self) -> str:
        pass


def get_tts_provider() -> TTSProvider:
    """
    Factory function — returns the configured TTS provider.
    
    Reads TTS_PROVIDER from environment. Defaults to 'mock'.
    """
    provider_name = os.environ.get("TTS_PROVIDER", "mock").lower().strip()

    if provider_name == "mock":
        from services.mock_provider import MockTTSProvider
        return MockTTSProvider()

    elif provider_name == "external_api":
        api_key = os.environ.get("TTS_API_KEY", "")
        if not api_key:
            raise EnvironmentError(
                "TTS_PROVIDER is set to 'external_api' but TTS_API_KEY is not configured. "
                "Please set TTS_API_KEY in your .env file. "
                "Switch to TTS_PROVIDER=mock for local development."
            )
        from services.external_provider import ExternalAPITTSProvider
        return ExternalAPITTSProvider(api_key=api_key)

    elif provider_name == "local_model":
        raise NotImplementedError(
            "Local model TTS provider is not yet implemented. "
            "Use TTS_PROVIDER=mock for development or TTS_PROVIDER=external_api for production."
        )

    else:
        raise ValueError(
            f"Unknown TTS_PROVIDER: '{provider_name}'. "
            "Valid values: mock, external_api, local_model"
        )
