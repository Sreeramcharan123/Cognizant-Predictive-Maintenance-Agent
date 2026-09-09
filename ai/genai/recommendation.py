from google import genai


def generate_maintenance_recommendation(
    client,
    prompt,
    model_name="gemini-3.6-flash"
):
    """
    Generate a grounded maintenance recommendation
    using the provided ML analysis.
    """

    response = client.models.generate_content(
        model=model_name,
        contents=prompt
    )

    return response.text