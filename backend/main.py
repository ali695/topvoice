"""
VoiceGen Studio — FastAPI Backend

Main application entry point.
Configures CORS, mounts routes, serves audio files, and provides health checks.

Environment variables:
  TTS_PROVIDER       — mock | external_api | local_model (default: mock)
  TTS_API_KEY        — API key for external TTS provider
  AUDIO_STORAGE_PATH — Local path for generated audio files
  DATABASE_URL       — PostgreSQL connection string (optional)

Run:
  uvicorn main:app --reload --port 8000
"""
import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# Import routes
from routes.generate import router as generate_router
from routes.presets import router as presets_router
from routes.history import router as history_router

# Audio storage path
AUDIO_STORAGE_PATH = os.environ.get("AUDIO_STORAGE_PATH", "./audio_storage")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    provider_name = os.environ.get("TTS_PROVIDER", "mock")
    logger.info(f"🎙️  VoiceGen Studio API starting...")
    logger.info(f"📡 TTS Provider: {provider_name}")

    if provider_name == "mock":
        logger.warning(
            "⚠️  DEVELOPMENT MODE: Using mock TTS provider. "
            "Set TTS_PROVIDER=external_api and TTS_API_KEY for production."
        )
    elif provider_name == "external_api":
        api_key = os.environ.get("TTS_API_KEY", "")
        if not api_key:
            logger.error("❌ TTS_API_KEY is not set! Voice generation will fail.")
        else:
            logger.info("✅ External TTS API configured.")

    # Ensure audio storage directory exists
    Path(AUDIO_STORAGE_PATH).mkdir(parents=True, exist_ok=True)
    logger.info(f"💾 Audio storage: {AUDIO_STORAGE_PATH}")

    yield

    # Shutdown
    logger.info("VoiceGen Studio API shutting down.")


app = FastAPI(
    title="VoiceGen Studio API",
    description="AI Voice Generation Platform — Backend API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server and production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://voicegen.studio",
        os.environ.get("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Mount static audio files
audio_dir = Path(AUDIO_STORAGE_PATH)
audio_dir.mkdir(parents=True, exist_ok=True)
app.mount("/api/audio", StaticFiles(directory=str(audio_dir)), name="audio")

# Register API routes
app.include_router(generate_router, prefix="/api", tags=["Generation"])
app.include_router(presets_router, prefix="/api", tags=["Presets"])
app.include_router(history_router, prefix="/api", tags=["History"])


@app.get("/")
async def root():
    """API root — returns status info."""
    return {
        "service": "VoiceGen Studio API",
        "version": "1.0.0",
        "status": "running",
        "provider": os.environ.get("TTS_PROVIDER", "mock"),
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    provider = os.environ.get("TTS_PROVIDER", "mock")
    api_key_set = bool(os.environ.get("TTS_API_KEY", ""))

    return {
        "status": "healthy",
        "provider": provider,
        "providerReady": provider == "mock" or (provider == "external_api" and api_key_set),
        "apiKeyConfigured": api_key_set,
        "audioStoragePath": AUDIO_STORAGE_PATH,
    }


@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not found", "path": str(request.url.path)},
    )


@app.exception_handler(500)
async def server_error_handler(request, exc):
    logger.error(f"Unhandled server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error. Please try again."},
    )
