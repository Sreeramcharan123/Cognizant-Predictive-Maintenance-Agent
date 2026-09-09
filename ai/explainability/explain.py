import shap


def get_top_contributors(model, input_data, top_n=3):

    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(input_data)

    # Handle binary classification output
    if isinstance(shap_values, list):
        values = shap_values[1][0]
    else:
        values = shap_values[0]

    contributions = []

    for feature, shap_value, machine_value in zip(
        input_data.columns,
        values,
        input_data.iloc[0].values
    ):
        contributions.append({
            "feature": feature,
            "shap_value": round(float(shap_value), 4),
            "machine_value": float(machine_value)
        })

    contributions.sort(
        key=lambda x: abs(x["shap_value"]),
        reverse=True
    )

    return contributions[:top_n]