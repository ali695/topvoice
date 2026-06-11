# 🎙️ VoiceGen Studio

> **Production-ready AI voice generation platform** — 130+ voice presets, 11 languages, real TTS backend, premium SaaS UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-green?logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Python](https://img.shields.io/badge/Python-3.10+-yellow?logo=python)

---

## ✨ What Is This?

VoiceGen Studio is a full-stack SaaS-style AI voice generation platform. It includes:

- 🎨 **Premium cinematic dark UI** — animated waveform backgrounds, glassmorphism cards, Framer Motion animations
- 🎙️ **130+ voice presets** — British Cinematic, Horror, Ultra-Horror, Social Media, Quranic Recitation, ASMR, Characters, Sci-Fi, and more
- 🔄 **100+ auto-generated sub-presets** — Cinematic Trailer, Podcast, Reels, Whisper, Dark, Emotional+, Studio, and 9 more variants per seed preset
- 🌍 **11 languages** — EN, UR, DE, AR, HI, TR, ES, FR, JA, RU, ZH
- 🔌 **Real TTS backend** — FastAPI with provider abstraction (mock for dev, external API for production)
- 📜 **Generation history** — saved to Zustand persistent store with audio player and regenerate
- 💾 **Favorites system** — favorite any preset, persisted to localStorage

---

## 🖥️ Screenshots (Pages)

| Page | Route |
|------|-------|
| Landing Page | `/` |
| Voice Studio | `/generate` |
| Preset Library | `/presets` |
| Preset Detail | `/presets/[id]` |
| History | `/history` |
| Pricing | `/pricing` |
| API Docs | `/api-docs` |
| Documentation | `/docs` |
| FAQ | `/faq` |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.10+
- **npm** or **yarn**

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/voicegen-studio.git
cd voicegen-studio
```

### 2. Frontend Setup

```bash
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the dev server:
```bash
npm run dev
# → http://localhost:3000
```

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env`:
```env
TTS_PROVIDER=mock
TTS_API_KEY=
AUDIO_STORAGE_PATH=./audio_storage
```

Start the API server:
```bash
uvicorn main:app --reload --port 8000
# → http://localhost:8000
# → Interactive docs: http://localhost:8000/docs
```

---

## ⚙️ TTS Provider Configuration

| Provider | `TTS_PROVIDER` value | Requires API Key? | Use Case |
|----------|---------------------|-------------------|----------|
| Mock | `mock` | ❌ No | Local development & UI testing |
| External API | `external_api` | ✅ Yes | Production voice generation |
| Local Model | `local_model` | ❌ No | Planned — future local inference |

### Mock Mode (Default)
```env
TTS_PROVIDER=mock
```
Simulates generation with realistic delays. Returns placeholder audio URLs. **Never use in production.**

### Production Mode (External API)
```env
TTS_PROVIDER=external_api
TTS_API_KEY=your_api_key_here
TTS_API_BASE_URL=https://api.elevenlabs.io/v1   # optional
TTS_API_VOICE_ID=21m00Tcm4TlvDq8ikWAM           # optional
```

Customize `backend/services/external_provider.py` → `_map_settings_to_api()` for your specific TTS provider (ElevenLabs, OpenAI TTS, Google Cloud TTS, Azure, etc.).

---

## 🗂️ Project Structure

```
voicegen-studio/
│
├── app/                        # Next.js App Router
│   ├── page.tsx                # 🏠 Landing page
│   ├── layout.tsx              # Root layout + metadata
│   ├── globals.css             # Global styles
│   ├── generate/page.tsx       # 🎙️ Voice Studio
│   ├── presets/
│   │   ├── page.tsx            # 📚 Preset Library
│   │   └── [id]/page.tsx       # 🔍 Preset Detail
│   ├── history/page.tsx        # 📜 Generation History
│   ├── pricing/page.tsx        # 💳 Pricing Plans
│   ├── api-docs/page.tsx       # 🔌 API Reference
│   ├── docs/page.tsx           # 📖 Documentation
│   ├── faq/page.tsx            # ❓ FAQ
│   ├── privacy/page.tsx        # 🔒 Privacy Policy
│   └── terms/page.tsx          # 📋 Terms of Service
│
├── components/                 # React components
│   ├── ui/                     # Base UI primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── textarea.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx         # Animated hero with waveform
│   ├── WaveformBackground.tsx  # Canvas waveform animation
│   ├── FeaturesSection.tsx
│   ├── CategoryTabs.tsx
│   ├── UseCasesSection.tsx
│   ├── PricingSection.tsx
│   ├── FAQSection.tsx
│   ├── PresetCard.tsx
│   ├── PresetFilters.tsx
│   ├── VoiceGeneratorForm.tsx  # Main studio form
│   ├── VoiceSettingsPanel.tsx  # Advanced sliders panel
│   ├── AudioPlayer.tsx         # Waveform audio player
│   ├── VibeBadge.tsx
│   └── AccentBadge.tsx
│
├── data/                       # Preset data files
│   ├── languages.ts            # 11 languages
│   ├── accents.ts              # 23 accents
│   ├── vibes.ts                # 32 vibes
│   ├── seedPresets.ts          # 31 seed presets
│   ├── subPresetGenerator.ts   # Auto-generates 100+ sub-presets
│   └── allPresets.ts           # Combined + filter utils
│
├── lib/                        # Utilities & state
│   ├── api.ts                  # Frontend API client
│   ├── presets.ts              # Filter, group, estimate utils
│   ├── store.ts                # Zustand global store
│   └── utils.ts                # cn() helper
│
├── types/
│   └── voice.ts                # All TypeScript types
│
├── backend/                    # 🐍 Python FastAPI
│   ├── main.py                 # App entry + CORS + routes
│   ├── models.py               # Pydantic models
│   ├── schemas.py              # Request validation
│   ├── requirements.txt
│   ├── .env.example            # Environment template
│   ├── routes/
│   │   ├── generate.py         # POST /api/generate
│   │   ├── presets.py          # GET /api/presets
│   │   └── history.py          # GET/DELETE /api/generations
│   └── services/
│       ├── tts_provider.py     # Provider abstraction + factory
│       ├── mock_provider.py    # ⚠️ Dev-only mock
│       ├── external_provider.py # 🚀 Production API provider
│       ├── storage.py          # Audio file storage
│       └── preset_validation.py
│
├── public/
│   └── audio/                  # Generated audio files (gitignored)
│
├── .env.local.example          # Frontend env template
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎙️ Voice Preset System

### Seed Presets (31)

Hand-crafted presets across 22 categories:

| Category | Examples |
|----------|---------|
| British Cinematic & Thriller | Daniel, Rachel — British Mystique |
| Horror & Thriller | Haunted Whisper Narrator |
| Ultra-Horror | Demonic Layered Voice, Possessed Whisperer, Cursed Doll |
| Background Horror | Poltergeist Noise |
| Detective & Crime | Noir Detective, Shadow-Chaser Investigator |
| Fantasy & Adventure | Epic High-Fantasy Narrator, Dwarven King |
| Sci-Fi & Cyberpunk | AI Synth Narrator, Cyberpunk Street Reporter |
| Quranic Recitation | Saudi Emotional Qari Style, Egyptian Murattal Style |
| Social Media | Viral TikTok Voice, E-sports Shoutcaster, Fast Auctioneer |
| Soft Intimate Whisper | Midnight Confession, Ear-to-Ear Angel |
| Relaxation | Soothing Meditation, Sleep Story Narrator |
| Emotional Narrators | Heartbroken Narrator, Panic Story Narrator |
| Characters | Mischievous Goblin, Robot Butler, Glitchy Hologram |

### Sub-Presets (100+)

Auto-generated by `generateSubPresets()` — each seed gets 4 variants:

| Variant Suffix | Effect |
|----------------|--------|
| `_cinematic_trailer` | Slower, deeper, +reverb |
| `_reels_cut` | Faster, less breath |
| `_podcast_narration` | Warmer clarity, higher stability |
| `_youtube_documentary` | Authoritative pacing |
| `_dark_version` | More creepiness, less stability |
| `_soft_version` | Slower, more breathing |
| `_whisper_mode` | Max breath, whisper accent |
| `_high_clarity` | Clarity → 1.0, clean audio |
| `_emotional_plus` | Emotional depth → 1.0 |
| `_stable_studio` | Stability → 1.0 |
| `_viral_short_hook` | Fast, high energy |
| `_long_form_narration` | Sustained pacing |
| `_deep_version` | Lower pitch, more bass |
| `_clean_commercial` | Trust-optimized |
| `_low_breath` | Minimal breath artifacts |

### Voice Settings

| Parameter | Range | Description |
|-----------|-------|-------------|
| `speed` | 0.5 – 2.0 | Speaking rate |
| `pitch` | 0.5 – 1.5 | Voice pitch |
| `temperature` | 0.0 – 1.0 | Randomness / expressiveness |
| `emotionalDepth` | 0.0 – 1.0 | Emotional intensity |
| `clarity` | 0.0 – 1.0 | Diction clarity |
| `breathingLevel` | 0.0 – 1.0 | Audible breathing |
| `stability` | 0.0 – 1.0 | Output consistency |
| `reverb` | 0.0 – 1.0 | Room reverb effect |
| `creepiness` | 0.0 – 1.0 | Horror-specific effect |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate` | Generate voice from text |
| `GET` | `/api/presets` | List all presets |
| `GET` | `/api/presets/:id` | Get single preset |
| `GET` | `/api/generations` | Generation history |
| `DELETE` | `/api/generations/:id` | Delete generation |
| `POST` | `/api/presets/favorite` | Toggle favorite |
| `GET` | `/health` | Health check + provider status |

Full interactive docs at `http://localhost:8000/docs` when backend is running.

### Generate Request Example

```json
POST /api/generate
{
  "text": "In the shadows of the ancient city, a voice whispered...",
  "presetId": "haunted_whisper_narrator",
  "settings": {
    "language": "EN",
    "speed": 0.8,
    "pitch": 1.1,
    "temperature": 0.7,
    "emotionalDepth": 0.7,
    "clarity": 0.6,
    "breathingLevel": 1.0,
    "stability": 0.6,
    "accent": "horror_whisper",
    "creepiness": 0.8
  },
  "format": "mp3"
}
```

---

## 🏗️ Adding New Presets

1. Add a `VoiceProfile` object to `SEED_PRESETS` in `/data/seedPresets.ts`
2. Sub-presets are auto-generated on the next import — no extra steps needed
3. Optionally add the preset to `backend/routes/presets.py` for server-side access

---

## 🚢 Deployment

### Frontend (Vercel — Recommended)

```bash
npm run build     # Verify build passes first
```

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set env var: `NEXT_PUBLIC_API_URL=https://your-backend.com`

### Backend (Railway / Render / Fly.io)

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Set these environment variables on your hosting platform:
```env
TTS_PROVIDER=external_api
TTS_API_KEY=your_production_key
AUDIO_STORAGE_PATH=/tmp/audio
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 📋 Production Checklist

- [ ] Set `TTS_PROVIDER=external_api` and `TTS_API_KEY`
- [ ] Configure `FRONTEND_URL` for CORS
- [ ] Set `DATABASE_URL` for persistent generation history
- [ ] Configure cloud audio storage (AWS S3, Cloudflare R2)
- [ ] Add rate limiting middleware (`slowapi`)
- [ ] Add authentication (JWT / OAuth)
- [ ] Schedule audio file cleanup (`services/storage.py → cleanup_old_files()`)
- [ ] Set up error monitoring (Sentry)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Customize `external_provider.py` for your TTS API

---

## ⚠️ Known Limitations

1. **Mock provider** generates no real audio — configure `external_api` for production
2. **In-memory history** resets on backend restart — add `DATABASE_URL` for persistence
3. **Audio file cleanup** requires a scheduled job in production
4. **No authentication** — add JWT middleware for multi-user deployments
5. **Long-form audio** (30+ min) needs background job processing (Celery / ARQ)

---

## 🕌 Note on Quranic Presets

All Quranic recitation presets use generic style labels (e.g., "Saudi Qari Style", "Egyptian Murattal Style"). They do **not** claim to clone, imitate, or replicate any specific named reciter. The controls provide pacing, breath, clarity, and emotional resonance parameters to support professional Quranic audio production. Users are responsible for accuracy and respectfulness of any religious content they generate.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| UI Primitives | Radix UI |
| State | Zustand (with persistence) |
| Backend | Python FastAPI |
| Validation | Pydantic v2 |
| HTTP Client | httpx (async) |
| Audio Storage | Local filesystem (configurable) |

---

## 📄 License

MIT — free for personal and commercial use.

---

<div align="center">
  <b>Built with ❤️ for creators, developers, and studios.</b>
</div>
