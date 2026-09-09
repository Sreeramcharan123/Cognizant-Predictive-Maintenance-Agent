from pathlib import Path
import joblib
import pandas as pd

from ai.failure_prediction.predict import predict_failure
from ai.anomaly_detection.detect import detect_anomaly
from ai.explainability.explain import get_top_contributors
from ai.genai.prompts import build_maintenance_prompt
from ai.genai.recommendation import generate_maintenance_recommendation


# ============================================
# LOAD TRAINED MODELS
# ============================================

BASE_DIR = Path(__file__).resolve().parent

failure_model = joblib.load(
    BASE_DIR / "models" / "failure_model.pkl"
)

anomaly_model = joblib.load(
    BASE_DIR / "models" / "anomaly_model.pkl"
)

feature_config = joblib.load(
    BASE_DIR / "models" / "feature_config.pkl"
)


# ============================================
# PREPARE MACHINE INPUT
# ============================================

def prepare_input(machine):

    row = {
        "Air temperature [K]": machine["Air temperature [K]"],
        "Process temperature [K]": machine["Process temperature [K]"],
        "Rotational speed [rpm]": machine["Rotational speed [rpm]"],
        "Torque [Nm]": machine["Torque [Nm]"],
        "Tool wear [min]": machine["Tool wear [min]"],

        "Type_L": 1 if machine["Type"] == "L" else 0,
        "Type_M": 1 if machine["Type"] == "M" else 0
    }

    return pd.DataFrame(
        [row],
        columns=feature_config["features"]
    )


# ============================================
# COMPLETE AI PIPELINE
# ============================================

def run_ai_pipeline(machine, client):

    # 1. Prepare input
    input_data = prepare_input(machine)

    # 2. Failure prediction
    prediction = predict_failure(
        failure_model,
        input_data
    )

    # 3. Anomaly detection
    anomaly = detect_anomaly(
        anomaly_model,
        input_data
    )

    # 4. SHAP explainability
    contributors = get_top_contributors(
        failure_model,
        input_data,
        top_n=3
    )

    # 5. Create grounded machine context
    machine_context = {
        "failure_probability": prediction["failure_probability"],
        "risk_level": prediction["risk_level"],
        "risk_threshold": 0.40,
        "anomaly_detected": anomaly["anomaly_detected"],

        "machine_conditions": machine,

        "top_contributing_factors": contributors
    }

    # 6. Build GenAI prompt
    prompt = build_maintenance_prompt(
        machine_context
    )

    # 7. Generate maintenance recommendation
    recommendation = generate_maintenance_recommendation(
        client,
        prompt
    )

    # 8. Final combined result
    final_result = {
        "failure_prediction": prediction,

        "anomaly_detection": anomaly,

        "explainability": {
            "top_contributing_factors": contributors
        },

        "maintenance_recommendation": recommendation,

        "human_review_required": True
    }

    return final_result