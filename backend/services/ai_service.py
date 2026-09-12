from ai.pipeline import run_ai_pipeline

from backend.database.database import save_prediction


def run_prediction(machine, client):
    """
    Run the complete AI pipeline and save
    the prediction result to the database.
    """
    # Convert API input to AI pipeline format
    machine_data = {
        "Air temperature [K]": machine.air_temperature,
        "Process temperature [K]": machine.process_temperature,
        "Rotational speed [rpm]": machine.rotational_speed,
        "Torque [Nm]": machine.torque,
        "Tool wear [min]": machine.tool_wear,
        "Type": machine.machine_type
    }
    # Run AI pipeline
    result = run_ai_pipeline(
        machine_data,
        client
    )
    # Extract AI results
    prediction_result = (
        result["failure_prediction"]
    )
    anomaly_result = (
        result["anomaly_detection"]
    )
    recommendation = (
        result["maintenance_recommendation"]
    )
    human_review_required = (
        result["human_review_required"]
    )
    # Save result to database
    prediction_id = save_prediction(
        machine_id=machine.machine_id,

        machine_type=machine.machine_type,

        machine_data=machine_data,

        prediction_result=prediction_result,

        anomaly_result=anomaly_result,

        recommendation=recommendation,

        human_review_required=human_review_required
    )
    # Add database ID to response
    result["prediction_id"] = prediction_id

    result["machine_id"] = machine.machine_id

    return result