from pathlib import Path
import os

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

from ai.pipeline import run_ai_pipeline
# LOAD ENVIRONMENT
PROJECT_DIR = Path(__file__).resolve().parent.parent
env_path = PROJECT_DIR / "ai" / ".env"
load_dotenv(env_path, override=True)
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")
# Gemini client
client = genai.Client(api_key=api_key)
# FASTAPI APPLICATION
app = FastAPI(
    title="Predictive Maintenance AI Agent",
    description="AI-powered predictive maintenance system",
    version="1.0.0"
)
# INPUT MODEL
class MachineInput(BaseModel):
    air_temperature: float
    process_temperature: float
    rotational_speed: float
    torque: float
    tool_wear: float
    machine_type: str
# HEALTH CHECK
@app.get("/")
def root():
    return {
        "message": "Predictive Maintenance AI Agent is running",
        "status": "healthy"
    }
# AI PREDICTION
@app.post("/api/predict")
def predict(machine: MachineInput):
    machine_data = {
        "Air temperature [K]": machine.air_temperature,
        "Process temperature [K]": machine.process_temperature,
        "Rotational speed [rpm]": machine.rotational_speed,
        "Torque [Nm]": machine.torque,
        "Tool wear [min]": machine.tool_wear,
        "Type": machine.machine_type
    }
    result = run_ai_pipeline(
        machine_data,
        client
    )
    return result