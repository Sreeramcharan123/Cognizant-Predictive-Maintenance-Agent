import numpy as np


def calculate_risk_level(failure_probability):
    """
    Convert failure probability into the project's risk bands.
    """

    probability = failure_probability * 100

    if probability < 40:
        return "LOW"
    elif probability < 70:
        return "MEDIUM"
    elif probability < 90:
        return "HIGH"
    else:
        return "CRITICAL"


def predict_failure(model, input_data):
    """
    Predict machine failure probability and risk level.
    """

    probability = float(model.predict_proba(input_data)[0][1])

    risk_level = calculate_risk_level(probability)

    return {
        "failure_probability": round(probability, 4),
        "failure_probability_percent": round(probability * 100, 2),
        "risk_level": risk_level
    }