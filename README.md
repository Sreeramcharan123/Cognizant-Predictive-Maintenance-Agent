# Predictive Maintenance AI Agent for Manufacturing

## Cognizant 2026 Hackathon – PS9

An AI-powered predictive maintenance platform that helps manufacturing teams
identify potential machine failures before they occur, detect abnormal
operating behavior, explain model predictions, and generate grounded
maintenance recommendations for human review.

---

## 📌 Project Overview

Unexpected machine failures can cause:

- Production downtime
- Increased maintenance costs
- Reduced productivity
- Equipment damage
- Quality issues
- Delayed manufacturing operations

This project addresses the problem using an integrated AI/ML pipeline.

The system accepts machine operating conditions such as:

- Air temperature
- Process temperature
- Rotational speed
- Torque
- Tool wear
- Machine type

The system then:

1. Predicts machine failure probability
2. Assigns a risk level
3. Detects abnormal operating behavior
4. Identifies important prediction contributors
5. Generates an AI-assisted maintenance recommendation
6. Stores prediction history
7. Displays alerts and machine status
8. Keeps a maintenance engineer in the final decision loop

---

# 🎯 Objectives

The main objectives of the Predictive Maintenance AI Agent are:

### 1. Predict

Estimate the probability of machine failure from current operating
conditions using a trained machine learning model.

### 2. Detect

Identify unusual operating patterns independently using anomaly detection.

### 3. Explain

Use SHAP-based explainability to identify the features that contributed most
strongly to a prediction.

### 4. Recommend

Use Generative AI to convert structured ML findings into a grounded
maintenance recommendation.

### 5. Monitor

Maintain machine history, alerts, recommendations and machine lifecycle
information.

### 6. Human-in-the-Loop

AI recommendations are advisory. A maintenance engineer remains responsible
for reviewing and approving the recommended action.

---

# 🏗️ System Architecture

```text
                    MACHINE / SENSOR DATA
                            │
                            ▼
                  ┌─────────────────────┐
                  │   React Dashboard   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │     FastAPI API     │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Data Preprocessing  │
                  │ & Feature Handling  │
                  └──────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌────────────┐ ┌────────────┐ ┌────────────┐
       │  Gradient  │ │ Isolation  │ │    SHAP    │
       │  Boosting  │ │   Forest   │ │Explainable │
       │ Prediction │ │  Anomaly   │ │     AI     │
       └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                    ┌───────────────┐
                    │   Risk Logic  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Gemini Agent  │
                    │ Maintenance   │
                    │ Recommendation│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Human Review  │
                    └───────┬───────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ SQLite / History /   │
                 │ Alerts / Machines    │
                 └──────────┬───────────┘
                            │
                            ▼
                    React Dashboard