import time


def generate_maintenance_recommendation(
    client,
    prompt,
    model_name="gemini-3.6-flash",
    max_retries=3
):
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )

            return response.text

        except Exception as e:
            error_message = str(e)

            # Retry temporary Gemini server errors
            if "503" in error_message or "UNAVAILABLE" in error_message:
                if attempt < max_retries - 1:
                    wait_time = 5 * (attempt + 1)
                    print(
                        f"Gemini temporarily unavailable. "
                        f"Retrying in {wait_time} seconds..."
                    )
                    time.sleep(wait_time)
                    continue

            # Other errors should be reported immediately
            raise e

    raise RuntimeError(
        "Gemini recommendation service is temporarily unavailable."
    )