from pathlib import Path
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai

from backend.routes.prediction import router as prediction_router
from backend.routes.machines import router as machines_router
from backend.routes.alerts import router as alerts_router
from backend.routes.recommendations import router as recommendations_router
from backend.routes.auth import router as auth_router
from backend.auth import seed_default_users

from backend.database.database import initialize_database


# ============================================================
# PROJECT CONFIGURATION
# ============================================================

PROJECT_DIR = Path(__file__).resolve().parent.parent
env_path = PROJECT_DIR / "ai" / ".env"

load_dotenv(env_path, override=True)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")


# ============================================================
# GEMINI CLIENT
# ============================================================

client = genai.Client(
    api_key=api_key
)


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Predictive Maintenance AI Agent",
    description="AI-powered predictive maintenance system for manufacturing equipment",
    version="1.0.0"
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ============================================================
# APPLICATION STATE
# ============================================================

app.state.gemini_client = client


# ============================================================
# DATABASE INITIALIZATION
# ============================================================

initialize_database()
seed_default_users()


# ============================================================
# REGISTER API ROUTES
# ============================================================

app.include_router(
    prediction_router
)

app.include_router(
    machines_router
)

app.include_router(
    alerts_router
)

app.include_router(
    recommendations_router
)
app.include_router(
    auth_router
)
# HEALTH CHECK
@app.get("/")
def root():
    return {
        "message": "Predictive Maintenance AI Agent is running",
        "status": "healthy"
    }
    