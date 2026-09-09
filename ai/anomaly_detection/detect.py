def detect_anomaly(model, input_data):
    """
    Detect whether the machine operating condition is anomalous.
    """

    prediction = model.predict(input_data)[0]

    return {
        "anomaly_detected": bool(prediction == -1)
    }