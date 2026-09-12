from fastapi import APIRouter, Request
from backend.schemas.prediction_schema import MachineInput
from backend.services.ai_service import run_prediction
# PREDICTION ROUTER
router = APIRouter(
    prefix="/api",
    tags=["Prediction"]
)
# PREDICT MACHINE FAILURE
@router.post("/predict")
def predict(
    machine: MachineInput,
    request: Request
):
    """
    Run the complete predictive maintenance AI pipeline.

    Flow:
        Frontend/Swagger
            ↓
        FastAPI
            ↓
        AI Service
            ↓
        ML + Anomaly Detection + SHAP + Gemini
            ↓
        Database
            ↓
        JSON Response
    """

    # Get the Gemini client created in main.py
    client = request.app.state.gemini_client
    # Run AI prediction and save the result
    result = run_prediction(
        machine,
        client
    )
    return result