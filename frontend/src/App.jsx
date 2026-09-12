import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Factory,
  Cpu,
  ShieldCheck,
  Wrench,
  Zap,
  RefreshCw,
  Database,
  BarChart3,
  Info,
  ClipboardCheck,
  CircleDot,
  ChevronRight,
  Download,
  TrendingUp,
  Layers3,
  Eye,
  EyeOff,
  User,
  LogOut,
  Globe2,
} from "lucide-react";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const LANGUAGE_STORAGE_KEY = "pm_language";
let ACTIVE_LANGUAGE = "English";

const UI_TRANSLATIONS = {
  Kannada: {
    "Checking session...": "ಸೆಷನ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    "Intelligent manufacturing equipment risk assessment platform": "ಬುದ್ಧಿವಂತ ಉತ್ಪಾದನಾ ಉಪಕರಣಗಳ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ವೇದಿಕೆ",
    "AI SYSTEM ACTIVE": "AI ಸಿಸ್ಟಮ್ ಸಕ್ರಿಯ",
    "Machines Monitored": "ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿರುವ ಯಂತ್ರಗಳು",
    "Unique machines analyzed": "ವಿಶ್ಲೇಷಿಸಲಾದ ಅನನ್ಯ ಯಂತ್ರಗಳು",
    "Current Risk": "ಪ್ರಸ್ತುತ ಅಪಾಯ",
    "Gradient Boosting prediction": "Gradient Boosting ಮುನ್ಸೂಚನೆ",
    "AI Engine": "AI ಎಂಜಿನ್",
    "Anomaly Status": "ಅಸಾಮಾನ್ಯ ಸ್ಥಿತಿ",
    "Machine Sensor Input": "ಯಂತ್ರ ಸೆನ್ಸರ್ ಇನ್‌ಪುಟ್",
    "Enter current operating conditions for AI analysis": "AI ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಪ್ರಸ್ತುತ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಗಳನ್ನು ನಮೂದಿಸಿ",
    "Machine ID": "ಯಂತ್ರ ID",
    "Machine Type": "ಯಂತ್ರದ ಪ್ರಕಾರ",
    "L - Low": "L - ಕಡಿಮೆ",
    "M - Medium": "M - ಮಧ್ಯಮ",
    "H - High": "H - ಹೆಚ್ಚು",
    "Air Temperature (K)": "ಗಾಳಿಯ ತಾಪಮಾನ (K)",
    "Process Temperature (K)": "ಪ್ರಕ್ರಿಯೆಯ ತಾಪಮಾನ (K)",
    "Rotational Speed (RPM)": "ತಿರುಗುವ ವೇಗ (RPM)",
    "Torque (Nm)": "ಟಾರ್ಕ್ (Nm)",
    "Tool Wear (min)": "ಟೂಲ್ ಉಡುಗೆ (min)",
    "AI Risk Assessment": "AI ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
    "Gradient Boosting failure prediction": "Gradient Boosting ವೈಫಲ್ಯ ಮುನ್ಸೂಚನೆ",
    "CURRENT RISK LEVEL": "ಪ್ರಸ್ತುತ ಅಪಾಯ ಮಟ್ಟ",
    "Failure Probability": "ವೈಫಲ್ಯದ ಸಂಭವನೀಯತೆ",
    "Anomaly Detection": "ಅಸಾಮಾನ್ಯತೆ ಪತ್ತೆ",
    "Human Review": "ಮಾನವ ಪರಿಶೀಲನೆ",
    "Analytics Overview": "ವಿಶ್ಲೇಷಣಾ ಅವಲೋಕನ",
    "Machine Health Radar": "ಯಂತ್ರ ಆರೋಗ್ಯ ರಾಡಾರ್",
    "Current Sensor Profile": "ಪ್ರಸ್ತುತ ಸೆನ್ಸರ್ ಪ್ರೊಫೈಲ್",
    "Failure Risk Indicator": "ವೈಫಲ್ಯ ಅಪಾಯ ಸೂಚಕ",
    "SHAP Feature Contribution": "SHAP ಫೀಚರ್ ಕೊಡುಗೆ",
    "Model contributors by absolute SHAP magnitude": "ಸಂಪೂರ್ಣ SHAP ಪ್ರಮಾಣದ ಆಧಾರದ ಮೇಲೆ ಮಾದರಿ ಕೊಡುಗೆಗಳು",
    "Prediction History Trend": "ಮುನ್ಸೂಚನಾ ಇತಿಹಾಸ ಪ್ರವೃತ್ತಿ",
    "Historical failure probability for this machine": "ಈ ಯಂತ್ರದ ಐತಿಹಾಸಿಕ ವೈಫಲ್ಯ ಸಂಭವನೀಯತೆ",
    "No history available for trend chart": "ಟ್ರೆಂಡ್ ಚಾರ್ಟ್‌ಗೆ ಇತಿಹಾಸ ಲಭ್ಯವಿಲ್ಲ",
    "Sensor Overview": "ಸೆನ್ಸರ್ ಅವಲೋಕನ",
    "Current operating conditions supplied to the AI pipeline": "AI ಪೈಪ್‌ಲೈನ್‌ಗೆ ನೀಡಲಾದ ಪ್ರಸ್ತುತ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಗಳು",
    "Explainable AI — Contributing Factors": "ವಿವರಿಸಬಹುದಾದ AI — ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು",
    "SHAP-based model contributors for the current prediction": "ಪ್ರಸ್ತುತ ಮುನ್ಸೂಚನೆಗೆ SHAP ಆಧಾರಿತ ಮಾದರಿ ಕೊಡುಗೆಗಳು",
    "No explanation available yet": "ಇನ್ನೂ ವಿವರಣೆ ಲಭ್ಯವಿಲ್ಲ",
    "Run the predictive analysis to calculate SHAP contributors.": "SHAP ಕೊಡುಗೆಗಳನ್ನು ಲೆಕ್ಕಿಸಲು ಮುನ್ಸೂಚನಾ ವಿಶ್ಲೇಷಣೆಯನ್ನು ರನ್ ಮಾಡಿ.",
    "WELCOME BACK": "ಮತ್ತೆ ಸ್ವಾಗತ",
    "Sign in to your workspace": "ನಿಮ್ಮ ವರ್ಕ್‌ಸ್ಪೇಸ್‌ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    "Access the manufacturing intelligence dashboard.": "ಉತ್ಪಾದನಾ ಬುದ್ಧಿವಂತಿಕೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಪ್ರವೇಶ ಪಡೆಯಿರಿ.",
    "Failure Prediction": "ವೈಫಲ್ಯ ಮುನ್ಸೂಚನೆ",
    "ML-powered risk scoring": "ML ಆಧಾರಿತ ಅಪಾಯ ಸ್ಕೋರಿಂಗ್",
    "Explainable AI": "ವಿವರಿಸಬಹುದಾದ AI",
    "SHAP-based contributors": "SHAP ಆಧಾರಿತ ಕೊಡುಗೆಗಳು",
    "Maintenance Agent": "ನಿರ್ವಹಣಾ ಏಜೆಂಟ್",
    "Grounded AI recommendations": "ಆಧಾರಿತ AI ಶಿಫಾರಸುಗಳು",
    "Sensor Data": "ಸೆನ್ಸರ್ ಡೇಟಾ",
    "Machine conditions": "ಯಂತ್ರದ ಸ್ಥಿತಿಗಳು",
    "Preprocessing": "ಪೂರ್ವ ಸಂಸ್ಕರಣೆ",
    "Feature preparation": "ಫೀಚರ್ ಸಿದ್ಧತೆ",
    "ML Prediction": "ML ಮುನ್ಸೂಚನೆ",
    "Failure probability": "ವೈಫಲ್ಯದ ಸಂಭವನೀಯತೆ",
    "Anomaly Detection": "ಅಸಾಮಾನ್ಯತೆ ಪತ್ತೆ",
    "Explainability": "ವಿವರಣೀಯತೆ",
    "Gemini Agent": "Gemini ಏಜೆಂಟ್",
    "Maintenance action": "ನಿರ್ವಹಣಾ ಕ್ರಮ",
    "AI Maintenance Recommendation": "AI ನಿರ್ವಹಣಾ ಶಿಫಾರಸು",
    "Gemini recommendation grounded in ML and SHAP analysis": "ML ಮತ್ತು SHAP ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ Gemini ಶಿಫಾರಸು",
    "Priority": "ಆದ್ಯತೆ",
    "Decision Mode": "ನಿರ್ಧಾರ ವಿಧಾನ",
    "AI + HUMAN": "AI + ಮಾನವ",
    "AI Decision Pipeline": "AI ನಿರ್ಧಾರ ಪೈಪ್‌ಲೈನ್",
    "End-to-end predictive maintenance workflow": "ಎಂಡ್-ಟು-ಎಂಡ್ ಮುನ್ಸೂಚನಾ ನಿರ್ವಹಣಾ ಕಾರ್ಯಪ್ರವಾಹ",
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Machines": "ಯಂತ್ರಗಳು",
    "AI Analysis": "AI ವಿಶ್ಲೇಷಣೆ",
    "Dataset & Models": "ಡೇಟಾಸೆಟ್ ಮತ್ತು ಮಾದರಿಗಳು",
    "Alerts": "ಎಚ್ಚರಿಕೆಗಳು",
    "Maintenance": "ನಿರ್ವಹಣೆ",
    "About": "ಕುರಿತು",
    "Machines Monitored": "ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿರುವ ಯಂತ್ರಗಳು",
    "ACTIVE": "ಸಕ್ರಿಯ",
    "DETECTED": "ಪತ್ತೆಯಾಗಿದೆ",
    "NORMAL": "ಸಾಮಾನ್ಯ",
    "READY": "ಸಿದ್ಧ",
    "WAITING": "ನಿರೀಕ್ಷೆಯಲ್ಲಿ",
    "No maintenance recommendations are stored yet. Run a prediction from the Dashboard.": "ಇನ್ನೂ ಯಾವುದೇ ನಿರ್ವಹಣಾ ಶಿಫಾರಸುಗಳನ್ನು ಸಂಗ್ರಹಿಸಲಾಗಿಲ್ಲ. ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಿಂದ ಮುನ್ಸೂಚನೆ ರನ್ ಮಾಡಿ.",
    "Run an AI analysis to generate a grounded maintenance recommendation.": "ಆಧಾರಿತ ನಿರ್ವಹಣಾ ಶಿಫಾರಸು ಪಡೆಯಲು AI ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ.",
    "Run Predictive Analysis": "ಮುನ್ಸೂಚನಾ ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ",
    "Running AI Analysis...": "AI ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
    "FLEET MANAGEMENT": "ಫ್ಲೀಟ್ ನಿರ್ವಹಣೆ",
    "View every machine that has submitted a predictive-maintenance analysis and open its individual history.": "ಮುನ್ಸೂಚನಾ ನಿರ್ವಹಣಾ ವಿಶ್ಲೇಷಣೆ ಸಲ್ಲಿಸಿದ ಪ್ರತಿಯೊಂದು ಯಂತ್ರವನ್ನು ನೋಡಿ ಮತ್ತು ಅದರ ವೈಯಕ್ತಿಕ ಇತಿಹಾಸವನ್ನು ತೆರೆಯಿರಿ.",
    "REGISTERED FROM ANALYSIS HISTORY": "ವಿಶ್ಲೇಷಣಾ ಇತಿಹಾಸದಿಂದ ನೋಂದಾಯಿಸಲಾಗಿದೆ",
    "Unique machine IDs stored in the database": "ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಅನನ್ಯ ಯಂತ್ರ IDs",
    "Refresh Fleet": "ಫ್ಲೀಟ್ ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    "Loading machine fleet...": "ಯಂತ್ರ ಫ್ಲೀಟ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    "MAX FAILURE RISK": "ಗರಿಷ್ಠ ವೈಫಲ್ಯ ಅಪಾಯ",
    "LAST ANALYSIS": "ಕೊನೆಯ ವಿಶ್ಲೇಷಣೆ",
    "Report": "ವರದಿ",
    "View details": "ವಿವರಗಳನ್ನು ನೋಡಿ",
    "No machines are registered yet. Run a prediction after entering a machine ID.": "ಇನ್ನೂ ಯಾವುದೇ ಯಂತ್ರಗಳು ನೋಂದಾಯಿಸಲಾಗಿಲ್ಲ. ಯಂತ್ರ ID ನಮೂದಿಸಿದ ನಂತರ ಮುನ್ಸೂಚನೆ ರನ್ ಮಾಡಿ.",
    "Return to Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    "MACHINE DETAILS": "ಯಂತ್ರ ವಿವರಗಳು",
    "Loading machine history and latest operating state.": "ಯಂತ್ರ ಇತಿಹಾಸ ಮತ್ತು ಇತ್ತೀಚಿನ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ.",
    "Loading machine details...": "ಯಂತ್ರ ವಿವರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "Machine-level analysis history.": "ಯಂತ್ರ ಮಟ್ಟದ ವಿಶ್ಲೇಷಣಾ ಇತಿಹಾಸ.",
    "No stored prediction history was found for this machine.": "ಈ ಯಂತ್ರಕ್ಕೆ ಯಾವುದೇ ಸಂಗ್ರಹಿತ ಮುನ್ಸೂಚನಾ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ.",
    "Run a prediction for this machine to create its history.": "ಇದರ ಇತಿಹಾಸ ರಚಿಸಲು ಈ ಯಂತ್ರಕ್ಕೆ ಮುನ್ಸೂಚನೆ ರನ್ ಮಾಡಿ.",
    "Run Machine Analysis": "ಯಂತ್ರ ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ",
    "CURRENT MACHINE STATE": "ಪ್ರಸ್ತುತ ಯಂತ್ರ ಸ್ಥಿತಿ",
    "LATEST FAILURE RISK": "ಇತ್ತೀಚಿನ ವೈಫಲ್ಯ ಅಪಾಯ",
    "Latest Sensor State": "ಇತ್ತೀಚಿನ ಸೆನ್ಸರ್ ಸ್ಥಿತಿ",
    "Most recently analysed operating conditions": "ಇತ್ತೀಚೆಗೆ ವಿಶ್ಲೇಷಿಸಲಾದ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಗಳು",
    "Latest Maintenance Decision": "ಇತ್ತೀಚಿನ ನಿರ್ವಹಣಾ ನಿರ್ಧಾರ",
    "Stored recommendation associated with the latest prediction": "ಇತ್ತೀಚಿನ ಮುನ್ಸೂಚನೆಗೆ ಸಂಬಂಧಿಸಿದ ಸಂಗ್ರಹಿತ ಶಿಫಾರಸು",
    "Risk Level": "ಅಪಾಯ ಮಟ್ಟ",
    "Prediction History": "ಮುನ್ಸೂಚನಾ ಇತಿಹಾಸ",
    "Every analysis stored for": "ಇದಕ್ಕಾಗಿ ಸಂಗ್ರಹಿಸಲಾದ ಪ್ರತಿಯೊಂದು ವಿಶ್ಲೇಷಣೆ",
    "TIME": "ಸಮಯ",
    "RISK": "ಅಪಾಯ",
    "FAILURE PROBABILITY": "ವೈಫಲ್ಯದ ಸಂಭವನೀಯತೆ",
    "ANOMALY": "ಅಸಾಮಾನ್ಯತೆ",
    "Back to Machines": "ಯಂತ್ರಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    "Run New Analysis": "ಹೊಸ ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ",
    "Resolve Machine": "ಯಂತ್ರ ಪರಿಹರಿಸಿ",
    "Resolving...": "ಪರಿಹರಿಸಲಾಗುತ್ತಿದೆ...",
    "MODEL INTELLIGENCE": "ಮಾದರಿ ಬುದ್ಧಿವಂತಿಕೆ",
    "AI Analysis & Explainability": "AI ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವಿವರಣೀಯತೆ",
    "Understand how the predictive maintenance agent turns machine sensor values into an actionable risk decision.": "ಮುನ್ಸೂಚನಾ ನಿರ್ವಹಣಾ ಏಜೆಂಟ್ ಯಂತ್ರದ ಸೆನ್ಸರ್ ಮೌಲ್ಯಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಬಹುದಾದ ಅಪಾಯ ನಿರ್ಧಾರವಾಗಿ ಹೇಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    "SELECTED MODEL": "ಆಯ್ಕೆ ಮಾಡಿದ ಮಾದರಿ",
    "CURRENT DECISION": "ಪ್ರಸ್ತುತ ನಿರ್ಧಾರ",
    "Predicted failure probability": "ಮುನ್ಸೂಚಿಸಲಾದ ವೈಫಲ್ಯದ ಸಂಭವನೀಯತೆ",
    "Model Comparison": "ಮಾದರಿ ಹೋಲಿಕೆ",
    "Models evaluated during the development workflow": "ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹದಲ್ಲಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿದ ಮಾದರಿಗಳು",
    "Model": "ಮಾದರಿ",
    "Role": "ಪಾತ್ರ",
    "Strength": "ಸಾಮರ್ಥ್ಯ",
    "Status": "ಸ್ಥಿತಿ",
    "Why Gradient Boosting?": "Gradient Boosting ಏಕೆ?",
    "SHAP Explainability": "SHAP ವಿವರಣೀಯತೆ",
    "Feature contribution for the current prediction": "ಪ್ರಸ್ತುತ ಮುನ್ಸೂಚನೆಗೆ ಫೀಚರ್ ಕೊಡುಗೆ",
    "XAI": "XAI",
    "Anomaly Layer": "ಅಸಾಮಾನ್ಯತೆ ಪದರ",
    "Isolation Forest behavioral check": "Isolation Forest ವರ್ತನೆ ಪರಿಶೀಲನೆ",
    "ML estimates failure probability": "ML ವೈಫಲ್ಯದ ಸಂಭವನೀಯತೆಯನ್ನು ಅಂದಾಜಿಸುತ್ತದೆ",
    "Risk logic maps probability to a risk band": "ಅಪಾಯ ತರ್ಕವು ಸಂಭವನೀಯತೆಯನ್ನು ಅಪಾಯ ಮಟ್ಟಕ್ಕೆ ನಕ್ಷೆ ಮಾಡುತ್ತದೆ",
    "Isolation Forest checks unusual behavior": "Isolation Forest ಅಸಾಮಾನ್ಯ ವರ್ತನೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ",
    "SHAP explains model contributors": "SHAP ಮಾದರಿ ಕೊಡುಗೆಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ",
    "Return to Live Dashboard": "ಲೈವ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    "DATA FOUNDATION": "ಡೇಟಾ ಆಧಾರ",
    "About the Dataset": "ಡೇಟಾಸೆಟ್ ಕುರಿತು",
    "What the model learns from machine operating conditions": "ಯಂತ್ರದ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಗಳಿಂದ ಮಾದರಿ ಕಲಿಯುವುದು",
    "Industrial Sensors": "ಕೈಗಾರಿಕಾ ಸೆನ್ಸರ್‌ಗಳು",
    "Data Preparation": "ಡೇಟಾ ಸಿದ್ಧತೆ",
    "Input path used by the AI engine": "AI ಎಂಜಿನ್ ಬಳಸುವ ಇನ್‌ಪುಟ್ ಮಾರ್ಗ",
    "Load": "ಲೋಡ್",
    "Read AI4I records": "AI4I ದಾಖಲೆಗಳನ್ನು ಓದಿ",
    "Clean": "ಶುದ್ಧೀಕರಿಸಿ",
    "Remove identifiers from features": "ಫೀಚರ್‌ಗಳಿಂದ ಗುರುತುಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
    "Encode": "ಎನ್‌ಕೋಡ್",
    "Convert machine type to model features": "ಯಂತ್ರದ ಪ್ರಕಾರವನ್ನು ಮಾದರಿ ಫೀಚರ್‌ಗಳಿಗೆ ಪರಿವರ್ತಿಸಿ",
    "Split": "ವಿಭಜಿಸಿ",
    "Train/test evaluation": "Train/test ಮೌಲ್ಯಮಾಪನ",
    "Model Input Features": "ಮಾದರಿ ಇನ್‌ಪುಟ್ ಫೀಚರ್‌ಗಳು",
    "Signals supplied to the failure prediction pipeline": "ವೈಫಲ್ಯ ಮುನ್ಸೂಚನಾ ಪೈಪ್‌ಲೈನ್‌ಗೆ ನೀಡಲಾದ ಸಿಗ್ನಲ್‌ಗಳು",
    "Development-time classifier comparison": "ಅಭಿವೃದ್ಧಿ ಸಮಯದ ಕ್ಲಾಸಿಫೈಯರ್ ಹೋಲಿಕೆ",
    "Final failure classifier": "ಅಂತಿಮ ವೈಫಲ್ಯ ಕ್ಲಾಸಿಫೈಯರ್",
    "Open Live Prediction": "ಲೈವ್ ಮುನ್ಸೂಚನೆ ತೆರೆಯಿರಿ",
    "Current Failure Risk": "ಪ್ರಸ್ತುತ ವೈಫಲ್ಯ ಅಪಾಯ",
    "Current Anomaly": "ಪ್ರಸ್ತುತ ಅಸಾಮಾನ್ಯತೆ",
    "Stored Alerts": "ಸಂಗ್ರಹಿತ ಎಚ್ಚರಿಕೆಗಳು",
    "Database risk events": "ಡೇಟಾಬೇಸ್ ಅಪಾಯ ಘಟನೆಗಳು",
    "Current Alert": "ಪ್ರಸ್ತುತ ಎಚ್ಚರಿಕೆ",
    "Most recent analysis from the active dashboard session": "ಸಕ್ರಿಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್‌ನ ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆ",
    "Human review required": "ಮಾನವ ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    "Alert History": "ಎಚ್ಚರಿಕೆ ಇತಿಹಾಸ",
    "High/critical predictions and anomaly events retrieved from SQLite": "SQLite ನಿಂದ ಪಡೆದ High/Critical ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಅಸಾಮಾನ್ಯ ಘಟನೆಗಳು",
    "Decision Rules": "ನಿರ್ಧಾರ ನಿಯಮಗಳು",
    "Prototype thresholds used by the hackathon system": "ಹ್ಯಾಕಥಾನ್ ಸಿಸ್ಟಮ್ ಬಳಸುವ ಪ್ರೋಟೋಟೈಪ್ ಮಿತಿಗಳು",
    "LOW": "ಕಡಿಮೆ",
    "MEDIUM": "ಮಧ್ಯಮ",
    "HIGH": "ಹೆಚ್ಚು",
    "CRITICAL": "ತೀವ್ರ",
    "Open Maintenance Center": "ನಿರ್ವಹಣಾ ಕೇಂದ್ರ ತೆರೆಯಿರಿ",
    "ACTION CENTER": "ಕ್ರಮ ಕೇಂದ್ರ",
    "Maintenance Center": "ನಿರ್ವಹಣಾ ಕೇಂದ್ರ",
    "Convert model signals into reviewable, grounded maintenance actions with database-backed recommendation history.": "ಮಾದರಿ ಸಿಗ್ನಲ್‌ಗಳನ್ನು ಡೇಟಾಬೇಸ್ ಆಧಾರಿತ ಶಿಫಾರಸು ಇತಿಹಾಸದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬಹುದಾದ ನಿರ್ವಹಣಾ ಕ್ರಮಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ.",
    "Recommendation generated from the current ML, anomaly and SHAP analysis.": "ಪ್ರಸ್ತುತ ML, ಅಸಾಮಾನ್ಯತೆ ಮತ್ತು SHAP ವಿಶ್ಲೇಷಣೆಯಿಂದ ಶಿಫಾರಸು ರಚಿಸಲಾಗಿದೆ.",
    "Run an analysis to generate a machine-specific recommendation.": "ಯಂತ್ರ-ನಿರ್ದಿಷ್ಟ ಶಿಫಾರಸು ಪಡೆಯಲು ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ.",
    "RECOMMENDED PRIORITY": "ಶಿಫಾರಸು ಮಾಡಿದ ಆದ್ಯತೆ",
    "Current AI Recommendation": "ಪ್ರಸ್ತುತ AI ಶಿಫಾರಸು",
    "Grounded Gemini maintenance response": "ಆಧಾರಿತ Gemini ನಿರ್ವಹಣಾ ಪ್ರತಿಕ್ರಿಯೆ",
    "Review Checklist": "ಪರಿಶೀಲನಾ ಚೆಕ್‌ಲಿಸ್ಟ್",
    "Suggested engineer verification sequence": "ಎಂಜಿನಿಯರ್ ಪರಿಶೀಲನೆಗೆ ಸೂಚಿಸಲಾದ ಕ್ರಮ",
    "Verify current machine operating conditions": "ಪ್ರಸ್ತುತ ಯಂತ್ರ ಕಾರ್ಯಾಚರಣಾ ಸ್ಥಿತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Inspect high-contribution sensor signals": "ಹೆಚ್ಚು ಕೊಡುಗೆ ನೀಡುವ ಸೆನ್ಸರ್ ಸಿಗ್ನಲ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Check recent maintenance history": "ಇತ್ತೀಚಿನ ನಿರ್ವಹಣಾ ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Confirm physical root cause before intervention": "ಹಸ್ತಕ್ಷೇಪಕ್ಕೂ ಮೊದಲು ಭೌತಿಕ ಮೂಲ ಕಾರಣವನ್ನು ದೃಢೀಕರಿಸಿ",
    "Approve or reject recommended action": "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮವನ್ನು ಅನುಮೋದಿಸಿ ಅಥವಾ ತಿರಸ್ಕರಿಸಿ",
    "Recommendation History": "ಶಿಫಾರಸು ಇತಿಹಾಸ",
    "Maintenance recommendations persisted by the backend database": "ಬ್ಯಾಕೆಂಡ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಉಳಿಸಲಾದ ನಿರ್ವಹಣಾ ಶಿಫಾರಸುಗಳು",
    "Current Contributing Signals": "ಪ್ರಸ್ತುತ ಕೊಡುಗೆ ನೀಡುವ ಸಿಗ್ನಲ್‌ಗಳು",
    "Model contributors to review — not confirmed physical causes": "ಪರಿಶೀಲಿಸಬೇಕಾದ ಮಾದರಿ ಕೊಡುಗೆಗಳು — ದೃಢೀಕರಿಸಿದ ಭೌತಿಕ ಕಾರಣಗಳಲ್ಲ",
    "No contributing factors yet. Run the live prediction first.": "ಇನ್ನೂ ಯಾವುದೇ ಕೊಡುಗೆ ಅಂಶಗಳಿಲ್ಲ. ಮೊದಲು ಲೈವ್ ಮುನ್ಸೂಚನೆ ರನ್ ಮಾಡಿ.",
    "SOLUTION OVERVIEW": "ಪರಿಹಾರದ ಅವಲೋಕನ",
    "About the Predictive Maintenance AI Agent": "Predictive Maintenance AI Agent ಕುರಿತು",
    "An explainable, human-in-the-loop AI workflow designed to detect risk early and support proactive maintenance.": "ಅಪಾಯವನ್ನು ಮೊದಲೇ ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಮುಂಚಿತ ನಿರ್ವಹಣೆಗೆ ಬೆಂಬಲ ನೀಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವಿವರಿಸಬಹುದಾದ, human-in-the-loop AI ಕಾರ್ಯಪ್ರವಾಹ.",
    "Predict": "ಮುನ್ಸೂಚಿಸಿ",
    "Detect": "ಪತ್ತೆಹಚ್ಚಿ",
    "Explain": "ವಿವರಿಸಿ",
    "Recommend": "ಶಿಫಾರಸು ಮಾಡಿ",
    "Technology Stack": "ತಂತ್ರಜ್ಞಾನ ಸ್ಟ್ಯಾಕ್",
    "End-to-end prototype architecture": "ಎಂಡ್-ಟು-ಎಂಡ್ ಪ್ರೋಟೋಟೈಪ್ ಆರ್ಕಿಟೆಕ್ಚರ್",
    "Solution Flow": "ಪರಿಹಾರ ಹರಿವು",
    "Designed for early warning, explainability and controlled action": "ಆರಂಭಿಕ ಎಚ್ಚರಿಕೆ, ವಿವರಣೀಯತೆ ಮತ್ತು ನಿಯಂತ್ರಿತ ಕ್ರಮಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ",
    "Design Principles": "ವಿನ್ಯಾಸ ತತ್ವಗಳು",
    "Important boundaries in the AI system": "AI ಸಿಸ್ಟಮ್‌ನ ಪ್ರಮುಖ ಮಿತಿಗಳು",
    "ML performs numerical failure prediction.": "ML ಸಂಖ್ಯಾತ್ಮಕ ವೈಫಲ್ಯ ಮುನ್ಸೂಚನೆಯನ್ನು ಮಾಡುತ್ತದೆ.",
    "GenAI does not replace the failure classifier.": "GenAI ವೈಫಲ್ಯ ಕ್ಲಾಸಿಫೈಯರ್ ಅನ್ನು ಬದಲಿಸುವುದಿಲ್ಲ.",
    "SHAP values are model contributors, not proof of causation.": "SHAP ಮೌಲ್ಯಗಳು ಮಾದರಿ ಕೊಡುಗೆಗಳು; ಅವು ಕಾರಣತ್ವದ ಸಾಕ್ಷ್ಯವಲ್ಲ.",
    "Maintenance recommendations remain human-reviewed.": "ನಿರ್ವಹಣಾ ಶಿಫಾರಸುಗಳು ಮಾನವ ಪರಿಶೀಲನೆಯಲ್ಲಿಯೇ ಇರುತ್ತವೆ.",
    "Sensor input can later be connected to industrial IoT/PLC streams.": "ಸೆನ್ಸರ್ ಇನ್‌ಪುಟ್ ಅನ್ನು ನಂತರ ಕೈಗಾರಿಕಾ IoT/PLC ಸ್ಟ್ರೀಮ್‌ಗಳಿಗೆ ಸಂಪರ್ಕಿಸಬಹುದು.",
    "Explore Dataset & Models": "ಡೇಟಾಸೆಟ್ ಮತ್ತು ಮಾದರಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "Awaiting analysis": "ವಿಶ್ಲೇಷಣೆಗಾಗಿ ನಿರೀಕ್ಷೆಯಲ್ಲಿ",
    "AI analysis ready": "AI ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧ",
    "Logout": "ಲಾಗ್‌ಔಟ್",
    "Operator": "ಆಪರೇಟರ್",
    "User": "ಬಳಕೆದಾರ",
    "REQUIRED": "ಅಗತ್ಯ",
    "NOT REQUIRED": "ಅಗತ್ಯವಿಲ್ಲ",
    "PENDING REVIEW": "ಪರಿಶೀಲನೆ ಬಾಕಿಯಿದೆ",
    "PENDING": "ಬಾಕಿಯಿದೆ",
    "Unknown time": "ಸಮಯ ತಿಳಿದಿಲ್ಲ",
  },
  Hindi: {
    "Checking session...": "सेशन जाँचा जा रहा है...",
    "Intelligent manufacturing equipment risk assessment platform": "बुद्धिमान विनिर्माण उपकरण जोखिम मूल्यांकन प्लेटफ़ॉर्म",
    "AI SYSTEM ACTIVE": "AI सिस्टम सक्रिय",
    "Machines Monitored": "निगरानी की गई मशीनें",
    "Unique machines analyzed": "विश्लेषित यूनिक मशीनें",
    "Current Risk": "वर्तमान जोखिम",
    "Gradient Boosting prediction": "Gradient Boosting पूर्वानुमान",
    "AI Engine": "AI इंजन",
    "Anomaly Status": "असामान्यता स्थिति",
    "Machine Sensor Input": "मशीन सेंसर इनपुट",
    "Enter current operating conditions for AI analysis": "AI विश्लेषण के लिए वर्तमान संचालन स्थितियाँ दर्ज करें",
    "Machine ID": "मशीन ID",
    "Machine Type": "मशीन प्रकार",
    "L - Low": "L - कम",
    "M - Medium": "M - मध्यम",
    "H - High": "H - उच्च",
    "Air Temperature (K)": "वायु तापमान (K)",
    "Process Temperature (K)": "प्रक्रिया तापमान (K)",
    "Rotational Speed (RPM)": "घूर्णन गति (RPM)",
    "Torque (Nm)": "टॉर्क (Nm)",
    "Tool Wear (min)": "टूल घिसाव (min)",
    "AI Risk Assessment": "AI जोखिम मूल्यांकन",
    "Gradient Boosting failure prediction": "Gradient Boosting विफलता पूर्वानुमान",
    "CURRENT RISK LEVEL": "वर्तमान जोखिम स्तर",
    "Failure Probability": "विफलता की संभावना",
    "Anomaly Detection": "असामान्यता पहचान",
    "Human Review": "मानव समीक्षा",
    "Analytics Overview": "विश्लेषण अवलोकन",
    "Machine Health Radar": "मशीन स्वास्थ्य रडार",
    "Current Sensor Profile": "वर्तमान सेंसर प्रोफ़ाइल",
    "Failure Risk Indicator": "विफलता जोखिम संकेतक",
    "SHAP Feature Contribution": "SHAP फीचर योगदान",
    "Model contributors by absolute SHAP magnitude": "पूर्ण SHAP परिमाण के आधार पर मॉडल योगदान",
    "Prediction History Trend": "पूर्वानुमान इतिहास प्रवृत्ति",
    "Historical failure probability for this machine": "इस मशीन की ऐतिहासिक विफलता संभावना",
    "No history available for trend chart": "ट्रेंड चार्ट के लिए इतिहास उपलब्ध नहीं है",
    "Sensor Overview": "सेंसर अवलोकन",
    "Current operating conditions supplied to the AI pipeline": "AI पाइपलाइन को दी गई वर्तमान संचालन स्थितियाँ",
    "Explainable AI — Contributing Factors": "व्याख्येय AI — योगदान देने वाले कारक",
    "SHAP-based model contributors for the current prediction": "वर्तमान पूर्वानुमान के लिए SHAP आधारित मॉडल योगदान",
    "No explanation available yet": "अभी कोई व्याख्या उपलब्ध नहीं है",
    "Run the predictive analysis to calculate SHAP contributors.": "SHAP योगदान की गणना करने के लिए पूर्वानुमान विश्लेषण चलाएँ।",
    "WELCOME BACK": "वापसी पर स्वागत है",
    "Sign in to your workspace": "अपने वर्कस्पेस में साइन इन करें",
    "Access the manufacturing intelligence dashboard.": "विनिर्माण इंटेलिजेंस डैशबोर्ड तक पहुँचें।",
    "Failure Prediction": "विफलता पूर्वानुमान",
    "ML-powered risk scoring": "ML आधारित जोखिम स्कोरिंग",
    "Explainable AI": "व्याख्येय AI",
    "SHAP-based contributors": "SHAP आधारित योगदान",
    "Maintenance Agent": "मेंटेनेंस एजेंट",
    "Grounded AI recommendations": "आधारित AI सिफारिशें",
    "Sensor Data": "सेंसर डेटा",
    "Machine conditions": "मशीन स्थितियाँ",
    "Preprocessing": "प्रीप्रोसेसिंग",
    "Feature preparation": "फीचर तैयारी",
    "ML Prediction": "ML पूर्वानुमान",
    "Failure probability": "विफलता की संभावना",
    "Explainability": "व्याख्येयता",
    "Gemini Agent": "Gemini एजेंट",
    "Maintenance action": "रखरखाव कार्रवाई",
    "AI Maintenance Recommendation": "AI रखरखाव सिफारिश",
    "Gemini recommendation grounded in ML and SHAP analysis": "ML और SHAP विश्लेषण पर आधारित Gemini सिफारिश",
    "Priority": "प्राथमिकता",
    "Decision Mode": "निर्णय मोड",
    "AI + HUMAN": "AI + मानव",
    "AI Decision Pipeline": "AI निर्णय पाइपलाइन",
    "End-to-end predictive maintenance workflow": "एंड-टू-एंड प्रेडिक्टिव मेंटेनेंस वर्कफ़्लो",
    "Dashboard": "डैशबोर्ड",
    "Machines": "मशीनें",
    "AI Analysis": "AI विश्लेषण",
    "Dataset & Models": "डेटासेट और मॉडल",
    "Alerts": "अलर्ट",
    "Maintenance": "रखरखाव",
    "About": "परिचय",
    "ACTIVE": "सक्रिय",
    "DETECTED": "पता चला",
    "NORMAL": "सामान्य",
    "READY": "तैयार",
    "WAITING": "प्रतीक्षा",
    "No maintenance recommendations are stored yet. Run a prediction from the Dashboard.": "अभी कोई रखरखाव सिफारिश संग्रहीत नहीं है। डैशबोर्ड से पूर्वानुमान चलाएँ।",
    "Run an AI analysis to generate a grounded maintenance recommendation.": "आधारित रखरखाव सिफारिश बनाने के लिए AI विश्लेषण चलाएँ।",
    "Run Predictive Analysis": "प्रेडिक्टिव विश्लेषण चलाएँ",
    "Running AI Analysis...": "AI विश्लेषण चल रहा है...",
    "FLEET MANAGEMENT": "फ्लीट प्रबंधन",
    "View every machine that has submitted a predictive-maintenance analysis and open its individual history.": "प्रेडिक्टिव मेंटेनेंस विश्लेषण वाली प्रत्येक मशीन देखें और उसका इतिहास खोलें।",
    "REGISTERED FROM ANALYSIS HISTORY": "विश्लेषण इतिहास से पंजीकृत",
    "Unique machine IDs stored in the database": "डेटाबेस में संग्रहीत यूनिक मशीन IDs",
    "Refresh Fleet": "फ्लीट रिफ्रेश करें",
    "Loading machine fleet...": "मशीन फ्लीट लोड हो रहा है...",
    "MAX FAILURE RISK": "अधिकतम विफलता जोखिम",
    "LAST ANALYSIS": "अंतिम विश्लेषण",
    "Report": "रिपोर्ट",
    "View details": "विवरण देखें",
    "No machines are registered yet. Run a prediction after entering a machine ID.": "अभी कोई मशीन पंजीकृत नहीं है। मशीन ID दर्ज करने के बाद पूर्वानुमान चलाएँ।",
    "Return to Dashboard": "डैशबोर्ड पर लौटें",
    "MACHINE DETAILS": "मशीन विवरण",
    "Loading machine history and latest operating state.": "मशीन इतिहास और नवीनतम संचालन स्थिति लोड हो रही है।",
    "Loading machine details...": "मशीन विवरण लोड हो रहा है...",
    "Machine-level analysis history.": "मशीन स्तर का विश्लेषण इतिहास।",
    "No stored prediction history was found for this machine.": "इस मशीन के लिए कोई संग्रहीत पूर्वानुमान इतिहास नहीं मिला।",
    "Run a prediction for this machine to create its history.": "इसका इतिहास बनाने के लिए इस मशीन का पूर्वानुमान चलाएँ।",
    "Run Machine Analysis": "मशीन विश्लेषण चलाएँ",
    "CURRENT MACHINE STATE": "वर्तमान मशीन स्थिति",
    "LATEST FAILURE RISK": "नवीनतम विफलता जोखिम",
    "Latest Sensor State": "नवीनतम सेंसर स्थिति",
    "Most recently analysed operating conditions": "हाल में विश्लेषित संचालन स्थितियाँ",
    "Latest Maintenance Decision": "नवीनतम रखरखाव निर्णय",
    "Stored recommendation associated with the latest prediction": "नवीनतम पूर्वानुमान से जुड़ी संग्रहीत सिफारिश",
    "Risk Level": "जोखिम स्तर",
    "Prediction History": "पूर्वानुमान इतिहास",
    "Every analysis stored for": "इसके लिए संग्रहीत प्रत्येक विश्लेषण",
    "TIME": "समय",
    "RISK": "जोखिम",
    "FAILURE PROBABILITY": "विफलता की संभावना",
    "ANOMALY": "असामान्यता",
    "Back to Machines": "मशीनों पर वापस जाएँ",
    "Run New Analysis": "नया विश्लेषण चलाएँ",
    "Resolve Machine": "मशीन हल करें",
    "Resolving...": "हल किया जा रहा है...",
    "MODEL INTELLIGENCE": "मॉडल इंटेलिजेंस",
    "AI Analysis & Explainability": "AI विश्लेषण और व्याख्येयता",
    "Understand how the predictive maintenance agent turns machine sensor values into an actionable risk decision.": "समझें कि प्रेडिक्टिव मेंटेनेंस एजेंट मशीन सेंसर मानों को कार्रवाई योग्य जोखिम निर्णय में कैसे बदलता है।",
    "SELECTED MODEL": "चयनित मॉडल",
    "CURRENT DECISION": "वर्तमान निर्णय",
    "Predicted failure probability": "पूर्वानुमानित विफलता संभावना",
    "Model Comparison": "मॉडल तुलना",
    "Models evaluated during the development workflow": "विकास वर्कफ़्लो के दौरान मूल्यांकन किए गए मॉडल",
    "Model": "मॉडल",
    "Role": "भूमिका",
    "Strength": "क्षमता",
    "Status": "स्थिति",
    "Why Gradient Boosting?": "Gradient Boosting क्यों?",
    "SHAP Explainability": "SHAP व्याख्येयता",
    "Feature contribution for the current prediction": "वर्तमान पूर्वानुमान के लिए फीचर योगदान",
    "Anomaly Layer": "असामान्यता परत",
    "Isolation Forest behavioral check": "Isolation Forest व्यवहार जाँच",
    "ML estimates failure probability": "ML विफलता संभावना का अनुमान लगाता है",
    "Risk logic maps probability to a risk band": "जोखिम तर्क संभावना को जोखिम स्तर में बदलता है",
    "Isolation Forest checks unusual behavior": "Isolation Forest असामान्य व्यवहार जाँचता है",
    "SHAP explains model contributors": "SHAP मॉडल योगदान समझाता है",
    "Return to Live Dashboard": "लाइव डैशबोर्ड पर लौटें",
    "DATA FOUNDATION": "डेटा आधार",
    "About the Dataset": "डेटासेट के बारे में",
    "What the model learns from machine operating conditions": "मॉडल मशीन संचालन स्थितियों से क्या सीखता है",
    "Industrial Sensors": "औद्योगिक सेंसर",
    "Data Preparation": "डेटा तैयारी",
    "Input path used by the AI engine": "AI इंजन द्वारा उपयोग किया गया इनपुट पथ",
    "Load": "लोड",
    "Read AI4I records": "AI4I रिकॉर्ड पढ़ें",
    "Clean": "साफ़ करें",
    "Remove identifiers from features": "फीचर्स से पहचानकर्ता हटाएँ",
    "Encode": "एन्कोड",
    "Convert machine type to model features": "मशीन प्रकार को मॉडल फीचर्स में बदलें",
    "Split": "विभाजित करें",
    "Train/test evaluation": "Train/test मूल्यांकन",
    "Model Input Features": "मॉडल इनपुट फीचर्स",
    "Signals supplied to the failure prediction pipeline": "विफलता पूर्वानुमान पाइपलाइन को दिए गए सिग्नल",
    "Development-time classifier comparison": "विकास समय क्लासिफायर तुलना",
    "Final failure classifier": "अंतिम विफलता क्लासिफायर",
    "Open Live Prediction": "लाइव पूर्वानुमान खोलें",
    "Current Failure Risk": "वर्तमान विफलता जोखिम",
    "Current Anomaly": "वर्तमान असामान्यता",
    "Stored Alerts": "संग्रहीत अलर्ट",
    "Database risk events": "डेटाबेस जोखिम घटनाएँ",
    "Current Alert": "वर्तमान अलर्ट",
    "Most recent analysis from the active dashboard session": "सक्रिय डैशबोर्ड सेशन का नवीनतम विश्लेषण",
    "Human review required": "मानव समीक्षा आवश्यक",
    "Alert History": "अलर्ट इतिहास",
    "High/critical predictions and anomaly events retrieved from SQLite": "SQLite से प्राप्त High/Critical पूर्वानुमान और असामान्यता घटनाएँ",
    "Decision Rules": "निर्णय नियम",
    "Prototype thresholds used by the hackathon system": "हैकथॉन सिस्टम द्वारा उपयोग की गई प्रोटोटाइप सीमाएँ",
    "LOW": "कम",
    "MEDIUM": "मध्यम",
    "HIGH": "उच्च",
    "CRITICAL": "गंभीर",
    "Open Maintenance Center": "मेंटेनेंस सेंटर खोलें",
    "ACTION CENTER": "कार्रवाई केंद्र",
    "Maintenance Center": "रखरखाव केंद्र",
    "Convert model signals into reviewable, grounded maintenance actions with database-backed recommendation history.": "मॉडल सिग्नल को डेटाबेस आधारित सिफारिश इतिहास के साथ समीक्षा योग्य रखरखाव कार्रवाइयों में बदलें।",
    "Recommendation generated from the current ML, anomaly and SHAP analysis.": "वर्तमान ML, असामान्यता और SHAP विश्लेषण से सिफारिश बनाई गई।",
    "Run an analysis to generate a machine-specific recommendation.": "मशीन-विशिष्ट सिफारिश बनाने के लिए विश्लेषण चलाएँ।",
    "RECOMMENDED PRIORITY": "अनुशंसित प्राथमिकता",
    "Current AI Recommendation": "वर्तमान AI सिफारिश",
    "Grounded Gemini maintenance response": "आधारित Gemini रखरखाव प्रतिक्रिया",
    "Review Checklist": "समीक्षा चेकलिस्ट",
    "Suggested engineer verification sequence": "इंजीनियर सत्यापन के लिए सुझाया गया क्रम",
    "Verify current machine operating conditions": "वर्तमान मशीन संचालन स्थितियों को सत्यापित करें",
    "Inspect high-contribution sensor signals": "उच्च योगदान वाले सेंसर सिग्नल की जाँच करें",
    "Check recent maintenance history": "हालिया रखरखाव इतिहास जाँचें",
    "Confirm physical root cause before intervention": "हस्तक्षेप से पहले भौतिक मूल कारण की पुष्टि करें",
    "Approve or reject recommended action": "सुझाई गई कार्रवाई को स्वीकृत या अस्वीकार करें",
    "Recommendation History": "सिफारिश इतिहास",
    "Maintenance recommendations persisted by the backend database": "बैकएंड डेटाबेस में सुरक्षित रखरखाव सिफारिशें",
    "Current Contributing Signals": "वर्तमान योगदान देने वाले सिग्नल",
    "Model contributors to review — not confirmed physical causes": "समीक्षा हेतु मॉडल योगदान — पुष्टि किए गए भौतिक कारण नहीं",
    "No contributing factors yet. Run the live prediction first.": "अभी कोई योगदान कारक नहीं हैं। पहले लाइव पूर्वानुमान चलाएँ।",
    "SOLUTION OVERVIEW": "समाधान अवलोकन",
    "About the Predictive Maintenance AI Agent": "Predictive Maintenance AI Agent के बारे में",
    "An explainable, human-in-the-loop AI workflow designed to detect risk early and support proactive maintenance.": "जोखिम को जल्दी पहचानने और सक्रिय रखरखाव में सहायता करने के लिए बनाया गया व्याख्येय human-in-the-loop AI वर्कफ़्लो।",
    "Predict": "पूर्वानुमान",
    "Detect": "पता लगाएँ",
    "Explain": "समझाएँ",
    "Recommend": "सिफारिश करें",
    "Technology Stack": "तकनीकी स्टैक",
    "End-to-end prototype architecture": "एंड-टू-एंड प्रोटोटाइप आर्किटेक्चर",
    "Solution Flow": "समाधान प्रवाह",
    "Designed for early warning, explainability and controlled action": "प्रारंभिक चेतावनी, व्याख्येयता और नियंत्रित कार्रवाई के लिए डिज़ाइन किया गया",
    "Design Principles": "डिज़ाइन सिद्धांत",
    "Important boundaries in the AI system": "AI सिस्टम की महत्वपूर्ण सीमाएँ",
    "ML performs numerical failure prediction.": "ML संख्यात्मक विफलता पूर्वानुमान करता है।",
    "GenAI does not replace the failure classifier.": "GenAI विफलता क्लासिफायर को प्रतिस्थापित नहीं करता।",
    "SHAP values are model contributors, not proof of causation.": "SHAP मान मॉडल योगदान हैं, कारण का प्रमाण नहीं।",
    "Maintenance recommendations remain human-reviewed.": "रखरखाव सिफारिशें मानव समीक्षा के अधीन रहती हैं।",
    "Sensor input can later be connected to industrial IoT/PLC streams.": "सेंसर इनपुट को बाद में औद्योगिक IoT/PLC स्ट्रीम से जोड़ा जा सकता है।",
    "Explore Dataset & Models": "डेटासेट और मॉडल देखें",
    "Awaiting analysis": "विश्लेषण की प्रतीक्षा",
    "AI analysis ready": "AI विश्लेषण तैयार",
    "Logout": "लॉगआउट",
    "Operator": "ऑपरेटर",
    "User": "उपयोगकर्ता",
    "REQUIRED": "आवश्यक",
    "NOT REQUIRED": "आवश्यक नहीं",
    "PENDING REVIEW": "समीक्षा लंबित",
    "PENDING": "लंबित",
    "Unknown time": "अज्ञात समय",
  },
};

function normalizeUiText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

const UI_FRAGMENT_TRANSLATIONS = {
  Kannada: [
    ["PREDICTION #", "ಮುನ್ಸೂಚನೆ #"],
    ["Machine value:", "ಯಂತ್ರ ಮೌಲ್ಯ:"],
    [" analyses", " ವಿಶ್ಲೇಷಣೆಗಳು"],
    [" records", " ದಾಖಲೆಗಳು"],
    [" STORED", " ಸಂಗ್ರಹಿಸಲಾಗಿದೆ"],
    ["Download report for", "ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"],
    ["Are you sure you want to resolve", "ನೀವು ಪರಿಹರಿಸಲು ಖಚಿತವಾಗಿದ್ದೀರಾ"],
    ["has been resolved successfully.", "ಯಶಸ್ವಿಯಾಗಿ ಪರಿಹರಿಸಲಾಗಿದೆ."],
  ],
  Hindi: [
    ["PREDICTION #", "पूर्वानुमान #"],
    ["Machine value:", "मशीन मान:"],
    [" analyses", " विश्लेषण"],
    [" records", " रिकॉर्ड"],
    [" STORED", " संग्रहीत"],
    ["Download report for", "रिपोर्ट डाउनलोड करें"],
    ["Are you sure you want to resolve", "क्या आप इसे हल करना चाहते हैं"],
    ["has been resolved successfully.", "सफलतापूर्वक हल कर दिया गया।"],
  ],
};

function translateUi(value) {
  if (ACTIVE_LANGUAGE === "English") return value;

  const normalized = normalizeUiText(value);
  const dictionary = UI_TRANSLATIONS[ACTIVE_LANGUAGE] || {};

  if (dictionary[normalized]) {
    return dictionary[normalized];
  }

  let translated = value;
  for (const [from, to] of UI_FRAGMENT_TRANSLATIONS[ACTIVE_LANGUAGE] || []) {
    translated = translated.replaceAll(from, to);
  }

  return translated;
}

function languageAwareMessage(value) {
  return translateUi(value);
}

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
let translatingUi = false;

function applyUiLanguage() {
  if (typeof document === "undefined") return;

  translatingUi = true;

  const root = document.body;
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "OPTION"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalizeUiText(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    const current = node.nodeValue;
    const normalizedCurrent = normalizeUiText(current);
    const savedOriginal = originalTextNodes.get(node);

    if (!savedOriginal || normalizeUiText(translateUi(savedOriginal)) !== normalizedCurrent) {
      originalTextNodes.set(node, normalizedCurrent);
    }

    const original = originalTextNodes.get(node);
    const translated = translateUi(original);
    if (translated !== current) node.nodeValue = translated;
  }

  const elements = root.querySelectorAll("input, button, select, [title], [aria-label]");
  elements.forEach((element) => {
    ["placeholder", "title", "aria-label"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute);
      const saved = originalAttributes.get(element)?.[attribute];

      if (!saved || normalizeUiText(translateUi(saved)) !== normalizeUiText(current)) {
        const record = originalAttributes.get(element) || {};
        record[attribute] = current;
        originalAttributes.set(element, record);
      }

      const original = originalAttributes.get(element)?.[attribute];
      const translated = translateUi(original);
      if (translated !== current) element.setAttribute(attribute, translated);
    });
  });

  translatingUi = false;
}

let uiLanguageObserver = null;

function startUiLanguageObserver() {
  if (typeof document === "undefined" || uiLanguageObserver) return;

  uiLanguageObserver = new MutationObserver(() => {
    if (!translatingUi) applyUiLanguage();
  });

  uiLanguageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}


const defaultMachine = {
  machine_id: "MACHINE-001",
  air_temperature: 298.7,
  process_temperature: 310.1,
  rotational_speed: 1402,
  torque: 69.7,
  tool_wear: 64,
  machine_type: "L",
};

const modelComparison = [
  {
    name: "Logistic Regression",
    role: "Baseline",
    description: "Interpretable linear benchmark",
    selected: false,
  },
  {
    name: "Random Forest",
    role: "Ensemble",
    description: "Captures nonlinear feature interactions",
    selected: false,
  },
  {
    name: "Gradient Boosting",
    role: "Selected",
    description: "Strong nonlinear classifier + SHAP explainability",
    selected: true,
  },
];

const datasetFeatures = [
  ["Air temperature", "K", "Thermal operating condition"],
  ["Process temperature", "K", "Process heat condition"],
  ["Rotational speed", "rpm", "Machine rotation"],
  ["Torque", "Nm", "Mechanical load"],
  ["Tool wear", "min", "Tool usage / wear"],
  ["Type", "L / M / H", "Machine product type"],
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [machine, setMachine] = useState(defaultMachine);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMachineId, setSelectedMachineId] = useState("MACHINE-001");
  const [machineCount, setMachineCount] = useState(0);
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANGUAGE_STORAGE_KEY) || "English"
  );

  useEffect(() => {
    ACTIVE_LANGUAGE = language;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    applyUiLanguage();
    startUiLanguageObserver();
  }, [language]);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (mounted) {
            setCurrentUser(data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    refreshMachineCount();
  }, [isAuthenticated]);

  if (authLoading) {
    return <div className="app-loading">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  const refreshMachineCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/machines`);
      if (!response.ok) return;
      const data = await response.json();
      setMachineCount(Number(data.count ?? (Array.isArray(data.machines) ? data.machines.length : 0)));
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachine((prev) => ({
      ...prev,
      [name]: (name === "machine_type" || name === "machine_id") ? value : Number(value),
    }));
  };

  const runPrediction = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(machine),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      await refreshMachineCount();
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the AI backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const probability =
    result?.failure_prediction?.failure_probability_percent ?? 0;

  const riskLevel =
    result?.failure_prediction?.risk_level ?? "WAITING";

  const anomaly =
    result?.anomaly_detection?.anomaly_detected ?? false;

  const contributors =
    result?.explainability?.top_contributing_factors ?? [];

  const recommendation =
    result?.maintenance_recommendation ??
    "Run an AI analysis to generate a grounded maintenance recommendation.";

  const getRiskClass = () => {
    if (riskLevel === "CRITICAL") return "critical";
    if (riskLevel === "HIGH") return "high";
    if (riskLevel === "MEDIUM") return "medium";
    if (riskLevel === "LOW") return "low";
    return "waiting";
  };

  const navigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const priority =
    probability >= 90
      ? "IMMEDIATE"
      : probability >= 70
      ? "HIGH"
      : probability >= 40
      ? "MEDIUM"
      : result
      ? "NORMAL"
      : "—";

  return (
    <div className="app">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <header className="header">
        <div className="brand">
          <div className="brand-icon">
            <Factory size={27} />
          </div>
          <div>
            <h1>Predictive Maintenance AI Agent</h1>
            <p>
              Intelligent manufacturing equipment risk assessment platform
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-language-control">
            <Globe2 size={14} />
            <select
              value={language}
              onChange={(e) => {
                const nextLanguage = e.target.value;
                setLanguage(nextLanguage);
                ACTIVE_LANGUAGE = nextLanguage;
                localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
                applyUiLanguage();
              }}
              aria-label="Website language"
            >
              <option>English</option>
              <option>Kannada</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            <div>
              <strong>AI SYSTEM ACTIVE</strong>
              <small>FastAPI + ML + SHAP + Gemini</small>
            </div>
          </div>
          <div className="user-session">
            <User size={15} />
            <div className="user-session-info">
              <span>{currentUser?.display_name || currentUser?.username || "Operator"}</span>
              <small>{currentUser?.role || "User"}</small>
            </div>
            <button
              className="logout-button"
              onClick={async () => {
                try {
                  await fetch(`${API_URL}/api/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                } catch (err) {
                  console.error("Logout failed:", err);
                }
                setCurrentUser(null);
                setIsAuthenticated(false);
                setActiveTab("dashboard");
              }}
              title="Sign out"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="nav">
        <button
          className={activeTab === "dashboard" ? "nav-active" : ""}
          onClick={() => navigate("dashboard")}
        >
          <Activity size={16} />
          Dashboard
        </button>

        <button
          className={activeTab === "machines" ? "nav-active" : ""}
          onClick={() => navigate("machines")}
        >
          <Factory size={16} />
          Machines
        </button>

        <button
          className={activeTab === "analysis" ? "nav-active" : ""}
          onClick={() => navigate("analysis")}
        >
          <Cpu size={16} />
          AI Analysis
        </button>

        <div className="nav-spacer" />

        <button
          className={activeTab === "dataset" ? "nav-active" : ""}
          onClick={() => navigate("dataset")}
        >
          <Database size={16} />
          Dataset & Models
        </button>

        <button
          className={activeTab === "alerts" ? "nav-active" : ""}
          onClick={() => navigate("alerts")}
        >
          <AlertTriangle size={16} />
          Alerts
        </button>

        <button
          className={activeTab === "maintenance" ? "nav-active" : ""}
          onClick={() => navigate("maintenance")}
        >
          <Wrench size={16} />
          Maintenance
        </button>

        <button
          className={activeTab === "about" ? "nav-active" : ""}
          onClick={() => navigate("about")}
        >
          <Info size={16} />
          About
        </button>
      </nav>

      {activeTab === "dashboard" && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue"><Factory /></div>
              <div>
                <span>Machines Monitored</span>
                <strong>{machineCount}</strong>
                <small>Unique machines analyzed</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red"><AlertTriangle /></div>
              <div>
                <span>Current Risk</span>
                <strong className={getRiskClass()}>{riskLevel}</strong>
                <small>Gradient Boosting prediction</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple"><BrainCircuit /></div>
              <div>
                <span>AI Engine</span>
                <strong>ACTIVE</strong>
                <small>ML + SHAP + Gemini</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green"><ShieldCheck /></div>
              <div>
                <span>Anomaly Status</span>
                <strong className={anomaly ? "critical" : "low"}>
                  {result ? (anomaly ? "DETECTED" : "NORMAL") : "READY"}
                </strong>
                <small>Isolation Forest</small>
              </div>
            </div>
          </section>

          <main className="main-grid">
            <section className="panel sensor-panel">
              <div className="panel-header">
                <div>
                  <h2><Gauge size={19} /> Machine Sensor Input</h2>
                  <p>Enter current operating conditions for AI analysis</p>
                </div>
                <span className="machine-badge">{machine.machine_id}</span>
              </div>

              <div className="sensor-grid">
                <div className="input-group">
                  <label>Machine ID</label>
                  <input
                    type="text"
                    name="machine_id"
                    value={machine.machine_id}
                    onChange={handleChange}
                    placeholder="e.g. MACHINE-001"
                  />
                </div>

                <div className="input-group">
                  <label>Machine Type</label>
                  <select
                    name="machine_type"
                    value={machine.machine_type}
                    onChange={handleChange}
                  >
                    <option value="L">L - Low</option>
                    <option value="M">M - Medium</option>
                    <option value="H">H - High</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Air Temperature (K)</label>
                  <input
                    type="number"
                    name="air_temperature"
                    value={machine.air_temperature}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="input-group">
                  <label>Process Temperature (K)</label>
                  <input
                    type="number"
                    name="process_temperature"
                    value={machine.process_temperature}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="input-group">
                  <label>Rotational Speed (RPM)</label>
                  <input
                    type="number"
                    name="rotational_speed"
                    value={machine.rotational_speed}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Torque (Nm)</label>
                  <input
                    type="number"
                    name="torque"
                    value={machine.torque}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="input-group">
                  <label>Tool Wear (min)</label>
                  <input
                    type="number"
                    name="tool_wear"
                    value={machine.tool_wear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="analyze-button"
                onClick={runPrediction}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="spin" size={18} />
                    Running AI Analysis...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Run Predictive Analysis
                  </>
                )}
              </button>

              {error && (
                <div className="error-box">
                  <AlertTriangle size={18} />
                  {error}
                </div>
              )}
            </section>

            <section className="panel risk-panel">
              <div className="panel-header">
                <div>
                  <h2><BrainCircuit size={19} /> AI Risk Assessment</h2>
                  <p>Gradient Boosting failure prediction</p>
                </div>
                <span className="ai-badge">ML ENGINE</span>
              </div>

              <div className={`risk-card ${getRiskClass()}`}>
                <div className="risk-label">CURRENT RISK LEVEL</div>
                <div className="risk-level">{riskLevel}</div>
                <div className="probability">{probability.toFixed(2)}%</div>
                <div className="probability-label">Failure Probability</div>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${Math.min(probability, 100)}%` }}
                  ></div>
                </div>

                <div className="risk-footer">
                  <span>0%</span><span>40%</span><span>70%</span>
                  <span>90%</span><span>100%</span>
                </div>
              </div>

              <div className="risk-explanation">
                <div className="mini-status">
                  <span className={anomaly ? "danger-dot" : "normal-dot"}></span>
                  <div>
                    <strong>Anomaly Detection</strong>
                    <p>
                      {result
                        ? anomaly
                          ? "Unusual machine behavior detected"
                          : "Operating pattern appears normal"
                        : "Awaiting AI analysis"}
                    </p>
                  </div>
                </div>

                <div className="mini-status">
                  <span className="blue-dot"></span>
                  <div>
                    <strong>Human Review</strong>
                    <p>
                      {result
                        ? "Maintenance engineer review required"
                        : "Triggered for high-risk predictions"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2><Activity size={19} /> Sensor Overview</h2>
                <p>Current operating conditions supplied to the AI pipeline</p>
              </div>
            </div>

            <div className="sensor-overview">
              <Metric label="Air Temperature" value={`${machine.air_temperature} K`} width={Math.min(((machine.air_temperature - 295) / 10) * 100, 100)} />
              <Metric label="Process Temperature" value={`${machine.process_temperature} K`} width={Math.min(((machine.process_temperature - 300) / 15) * 100, 100)} />
              <Metric label="Rotational Speed" value={`${machine.rotational_speed} RPM`} width={Math.min((machine.rotational_speed / 3000) * 100, 100)} />
              <Metric label="Torque" value={`${machine.torque} Nm`} width={Math.min((machine.torque / 100) * 100, 100)} />
              <Metric label="Tool Wear" value={`${machine.tool_wear} min`} width={Math.min((machine.tool_wear / 250) * 100, 100)} />
            </div>
          </section>

          <DashboardAnalytics machine={machine} probability={probability} contributors={contributors} />

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2><BrainCircuit size={19} /> Explainable AI — Contributing Factors</h2>
                <p>SHAP-based model contributors for the current prediction</p>
              </div>
              <span className="shap-badge">SHAP</span>
            </div>

            {contributors.length > 0 ? (
              <div className="contributors">
                {contributors.map((item, index) => {
                  const magnitude = Math.abs(Number(item.shap_value));
                  const maxMagnitude = Math.max(
                    ...contributors.map((x) => Math.abs(Number(x.shap_value)))
                  );
                  const width = maxMagnitude > 0 ? (magnitude / maxMagnitude) * 100 : 0;

                  return (
                    <div className="contributor" key={item.feature}>
                      <div className="contributor-top">
                        <span className="rank">#{index + 1}</span>
                        <strong>{item.feature}</strong>
                        <span className="machine-value">
                          Machine value: {item.machine_value}
                        </span>
                        <span
                          className={
                            Number(item.shap_value) >= 0
                              ? "shap-positive"
                              : "shap-negative"
                          }
                        >
                          SHAP {item.shap_value}
                        </span>
                      </div>
                      <div className="shap-bar">
                        <div style={{ width: `${width}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <BrainCircuit size={32} />
                <strong>No explanation available yet</strong>
                <p>Run the predictive analysis to calculate SHAP contributors.</p>
              </div>
            )}
          </section>

          <Recommendation recommendation={recommendation} priority={priority} result={result} />
          <Pipeline />
        </>
      )}

      {activeTab === "machines" && (
        <MachinesPage
          navigate={navigate}
          onOpenMachine={(id) => {
            setSelectedMachineId(id);
            setActiveTab("machine-detail");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {activeTab === "machine-detail" && (
        <MachineDetailPage
          machineId={selectedMachineId}
          navigate={navigate}
        />
      )}

      {activeTab === "analysis" && (
        <AnalysisPage
          result={result}
          probability={probability}
          riskLevel={riskLevel}
          contributors={contributors}
          anomaly={anomaly}
          navigate={navigate}
        />
      )}

      {activeTab === "dataset" && <DatasetPage navigate={navigate} />}

      {activeTab === "alerts" && (
        <AlertsPage
          result={result}
          riskLevel={riskLevel}
          probability={probability}
          anomaly={anomaly}
          navigate={navigate}
        />
      )}

      {activeTab === "maintenance" && (
        <MaintenancePage
          result={result}
          recommendation={recommendation}
          priority={priority}
          contributors={contributors}
          navigate={navigate}
        />
      )}

      {activeTab === "about" && <AboutPage navigate={navigate} />}

      <footer>
        <div>
          <strong>Predictive Maintenance AI Agent</strong>
          <span> • Cognizant Hackathon 2026</span>
        </div>
        <div className="footer-right">
          <CheckCircle2 size={15} />
          AI analysis ready
        </div>
      </footer>
    </div>
  );
}


function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANGUAGE_STORAGE_KEY) || "English"
  );
  const [remember, setRemember] = useState(true);
  const [loginError, setLoginError] = useState("");

  const copy = {
    English: {
      eyebrow: "SECURE OPERATIONS PORTAL",
      title: "Predictive Maintenance",
      subtitle: "AI Agent",
      description:
        "Monitor machine health, predict failures, detect anomalies and receive explainable maintenance recommendations.",
      email: "Work email or username",
      emailPlaceholder: "operator@company.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      remember: "Remember me",
      forgot: "Forgot password?",
      button: "Sign in to Operations",
      footer: "AI-assisted decisions • Human review enabled",
      invalid: "Please enter both username and password.",
      welcome: "WELCOME BACK",
      signInTitle: "Sign in to your workspace",
      signInDescription: "Access the manufacturing intelligence dashboard.",
      failurePrediction: "Failure Prediction",
      mlRisk: "ML-powered risk scoring",
      explainable: "Explainable AI",
      shapContributors: "SHAP-based contributors",
      maintenanceAgent: "Maintenance Agent",
      groundedRecommendations: "Grounded AI recommendations",
      sensorData: "Sensor Data",
      aiAgent: "AI Agent",
      security: "SECURITY",
      humanWorkflow: "Human-in-the-loop workflow",
      humanReviewText: "AI recommendations remain subject to maintenance engineer review.",
      passwordRecovery: "Password recovery will be connected with the authentication backend.",
      demo: "Hackathon prototype • Authentication UI",
    },
    Kannada: {
      eyebrow: "ಸುರಕ್ಷಿತ ಕಾರ್ಯಾಚರಣೆ ಪೋರ್ಟಲ್",
      title: "Predictive Maintenance",
      subtitle: "AI Agent",
      description:
        "ಯಂತ್ರದ ಆರೋಗ್ಯವನ್ನು ಗಮನಿಸಿ, ವೈಫಲ್ಯವನ್ನು ಊಹಿಸಿ ಮತ್ತು ನಿರ್ವಹಣಾ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
      email: "ಇಮೇಲ್ ಅಥವಾ ಬಳಕೆದಾರ ಹೆಸರು",
      emailPlaceholder: "operator@company.com",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      passwordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
      remember: "ನನ್ನನ್ನು ನೆನಪಿಡಿ",
      forgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
      button: "ಸೈನ್ ಇನ್",
      footer: "AI ಸಹಾಯಿತ ನಿರ್ಧಾರಗಳು • ಮಾನವ ಪರಿಶೀಲನೆ ಸಕ್ರಿಯ",
      invalid: "ಬಳಕೆದಾರ ಹೆಸರು ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",
      welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
      signInTitle: "ನಿಮ್ಮ ವರ್ಕ್‌ಸ್ಪೇಸ್‌ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
      signInDescription: "ಉತ್ಪಾದನಾ ಬುದ್ಧಿವಂತಿಕೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಪ್ರವೇಶ ಪಡೆಯಿರಿ.",
      failurePrediction: "ವೈಫಲ್ಯ ಮುನ್ಸೂಚನೆ",
      mlRisk: "ML ಆಧಾರಿತ ಅಪಾಯ ಸ್ಕೋರಿಂಗ್",
      explainable: "ವಿವರಿಸಬಹುದಾದ AI",
      shapContributors: "SHAP ಆಧಾರಿತ ಕೊಡುಗೆಗಳು",
      maintenanceAgent: "ನಿರ್ವಹಣಾ ಏಜೆಂಟ್",
      groundedRecommendations: "ಆಧಾರಿತ AI ಶಿಫಾರಸುಗಳು",
      sensorData: "ಸೆನ್ಸರ್ ಡೇಟಾ",
      aiAgent: "AI ಏಜೆಂಟ್",
      security: "ಭದ್ರತೆ",
      humanWorkflow: "Human-in-the-loop ಕಾರ್ಯಪ್ರವಾಹ",
      humanReviewText: "AI ಶಿಫಾರಸುಗಳು ನಿರ್ವಹಣಾ ಎಂಜಿನಿಯರ್ ಪರಿಶೀಲನೆಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.",
      passwordRecovery: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಪಡೆಯುವಿಕೆ authentication backend ಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.",
      demo: "ಹ್ಯಾಕಥಾನ್ ಪ್ರೋಟೋಟೈಪ್ • Authentication UI",
    },
    Hindi: {
      eyebrow: "सुरक्षित ऑपरेशंस पोर्टल",
      title: "Predictive Maintenance",
      subtitle: "AI Agent",
      description:
        "मशीन स्वास्थ्य की निगरानी करें, विफलता का अनुमान लगाएँ और रखरखाव की सिफारिशें प्राप्त करें।",
      email: "ईमेल या यूज़रनेम",
      emailPlaceholder: "operator@company.com",
      password: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड दर्ज करें",
      remember: "मुझे याद रखें",
      forgot: "पासवर्ड भूल गए?",
      button: "साइन इन",
      footer: "AI-सहायित निर्णय • मानव समीक्षा सक्षम",
      invalid: "यूज़रनेम और पासवर्ड दर्ज करें।",
      welcome: "वापसी पर स्वागत है",
      signInTitle: "अपने वर्कस्पेस में साइन इन करें",
      signInDescription: "विनिर्माण इंटेलिजेंस डैशबोर्ड तक पहुँचें।",
      failurePrediction: "विफलता पूर्वानुमान",
      mlRisk: "ML आधारित जोखिम स्कोरिंग",
      explainable: "व्याख्येय AI",
      shapContributors: "SHAP आधारित योगदान",
      maintenanceAgent: "मेंटेनेंस एजेंट",
      groundedRecommendations: "आधारित AI सिफारिशें",
      sensorData: "सेंसर डेटा",
      aiAgent: "AI एजेंट",
      security: "सुरक्षा",
      humanWorkflow: "Human-in-the-loop वर्कफ़्लो",
      humanReviewText: "AI सिफारिशें मेंटेनेंस इंजीनियर की समीक्षा के अधीन हैं।",
      passwordRecovery: "पासवर्ड रिकवरी को authentication backend से जोड़ा जाएगा।",
      demo: "हैकथॉन प्रोटोटाइप • Authentication UI",
    },
  }[language];

  const submit = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!email.trim() || !password.trim()) {
      setLoginError(copy.invalid);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: email.trim(),
          password,
          remember_me: remember,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          (language === "Kannada"
            ? "ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ."
            : language === "Hindi"
            ? "यूज़रनेम या पासवर्ड गलत है।"
            : "Invalid username or password.")
        );
      }

      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      ACTIVE_LANGUAGE = language;
      onLogin(data.user);
    } catch (err) {
      setLoginError(
        err.message ||
        (language === "Kannada"
          ? "ಸೈನ್ ಇನ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
          : language === "Hindi"
          ? "साइन इन नहीं हो सका।"
          : "Unable to sign in.")
      );
    }
  };

  return (
    <div className="login-shell">
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-layout">
        <section className="login-visual">
          <div className="login-brand">
            <div className="login-brand-icon">
              <Factory size={28} />
            </div>
            <div>
              <strong>Predictive Maintenance</strong>
              <span>AI Agent</span>
            </div>
          </div>

          <div className="login-hero-copy">
            <span className="login-eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <h2>{copy.subtitle}</h2>
            <p>{copy.description}</p>
          </div>

          <div className="login-capabilities">
            <div>
              <BrainCircuit size={18} />
              <span><strong>{copy.failurePrediction}</strong><small>{copy.mlRisk}</small></span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <span><strong>{copy.explainable}</strong><small>{copy.shapContributors}</small></span>
            </div>
            <div>
              <Wrench size={18} />
              <span><strong>{copy.maintenanceAgent}</strong><small>{copy.groundedRecommendations}</small></span>
            </div>
          </div>

          <div className="login-flow">
            <span className="login-flow-line"></span>
            <small>{copy.sensorData}</small>
            <b>→</b>
            <small>ML</small>
            <b>→</b>
            <small>SHAP</small>
            <b>→</b>
            <small>{copy.aiAgent}</small>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-top">
            <div className="login-mobile-brand">
              <div className="login-brand-icon"><Factory size={23} /></div>
            </div>
            <div className="language-control">
              <Globe2 size={14} />
              <select
                value={language}
                onChange={(e) => {
                  const nextLanguage = e.target.value;
                  setLanguage(nextLanguage);
                  ACTIVE_LANGUAGE = nextLanguage;
                  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
                  applyUiLanguage();
                }}
              >
                <option>English</option>
                <option>Kannada</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>

          <div className="login-heading">
            <span>{copy.welcome}</span>
            <h2>{copy.signInTitle}</h2>
            <p>{copy.signInDescription}</p>
          </div>

          <form onSubmit={submit} className="login-form">
            <div className="login-input-group">
              <label>{copy.email}</label>
              <div className="login-input-wrap">
                <User size={17} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>{copy.password}</label>
              <div className="login-input-wrap">
                <ShieldCheck size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={copy.passwordPlaceholder}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>{copy.remember}</span>
              </label>
              <button type="button" className="forgot-button" onClick={() => window.alert("{copy.passwordRecovery}")}>
                {copy.forgot}
              </button>
            </div>

            {loginError && (
              <div className="login-error">
                <AlertTriangle size={16} />
                {loginError}
              </div>
            )}

            <button className="login-submit" type="submit">
              <ShieldCheck size={18} />
              {copy.button}
              <ChevronRight size={17} />
            </button>
          </form>

          <div className="login-divider"><span>{copy.security}</span></div>

          <div className="login-security">
            <CheckCircle2 size={17} />
            <div>
              <strong>{copy.humanWorkflow}</strong>
              <span>{copy.humanReviewText}</span>
            </div>
          </div>

          <p className="login-footer-note">{copy.footer}</p>
          <small className="login-demo-note">{copy.demo}</small>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, width }) {
  return (
    <div className="sensor-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="metric-line">
        <div style={{ width: `${Math.max(0, Math.min(width, 100))}%` }} />
      </div>
    </div>
  );
}

function Recommendation({ recommendation, priority, result }) {
  return (
    <section className="recommendation-panel">
      <div className="recommendation-header">
        <div className="robot-icon"><BrainCircuit size={24} /></div>
        <div>
          <h2>AI Maintenance Recommendation</h2>
          <p>Gemini recommendation grounded in ML and SHAP analysis</p>
        </div>
        <span className="gemini-badge">GEMINI</span>
      </div>

      <div className="recommendation-content">
        <div className="recommendation-text">{recommendation}</div>

        <div className="recommendation-meta">
          <div>
            <span>Priority</span>
            <strong>{priority}</strong>
          </div>
          <div>
            <span>Human Review</span>
            <strong>{result ? "REQUIRED" : "—"}</strong>
          </div>
          <div>
            <span>Decision Mode</span>
            <strong>AI + HUMAN</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    ["01", "Sensor Data", "Machine conditions"],
    ["02", "Preprocessing", "Feature preparation"],
    ["03", "ML Prediction", "Failure probability"],
    ["04", "Anomaly Detection", "Isolation Forest"],
    ["05", "SHAP", "Explainability"],
    ["06", "Gemini Agent", "Maintenance action"],
  ];

  return (
    <section className="panel architecture-panel">
      <div className="panel-header">
        <div>
          <h2><Cpu size={19} /> AI Decision Pipeline</h2>
          <p>End-to-end predictive maintenance workflow</p>
        </div>
      </div>

      <div className="pipeline">
        {steps.map((step, index) => (
          <div className="pipeline-group" key={step[0]}>
            <div className="pipeline-step">
              <span>{step[0]}</span>
              <strong>{step[1]}</strong>
              <small>{step[2]}</small>
            </div>
            {index < steps.length - 1 && <div className="pipeline-arrow">→</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

async function downloadMachineReport(machine) {
  try {
    const response = await fetch(`${API_URL}/api/machines/${encodeURIComponent(machine.machine_id)}`);
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const data = await response.json();
    const history = Array.isArray(data.history) ? data.history : [];
    const latest = history[0] || machine;
    const rows = history.map(item => `<tr><td>${escapeReportHtml(formatDate(item.created_at))}</td><td>${escapeReportHtml(item.risk_level || "-")}</td><td>${Number(item.failure_probability_percent ?? 0).toFixed(2)}%</td><td>${item.anomaly_detected ? "DETECTED" : "NORMAL"}</td></tr>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeReportHtml(machine.machine_id)} Maintenance Report</title><style>body{font-family:Arial;margin:30px;background:#f5f7f9;color:#17212b}.sheet{max-width:900px;margin:auto;background:#fff;padding:30px;border:1px solid #dce3e8;border-radius:12px}h1{margin:0 0 6px}.muted{color:#657482}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.card{padding:13px;border:1px solid #dce3e8;border-radius:8px}.label{font-size:10px;color:#657482;text-transform:uppercase}.value{font-size:16px;font-weight:700;margin-top:5px}.risk{font-size:25px;font-weight:800}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:8px;border-bottom:1px solid #e4e9ed;font-size:12px}th{font-size:10px;color:#657482}.recommendation{padding:14px;background:#f2f7fa;border-left:4px solid #247ea5;line-height:1.6}footer{margin-top:25px;font-size:10px;color:#71808b}@media print{body{background:#fff;margin:0}.sheet{border:0}}</style></head><body><div class="sheet"><h1>Predictive Maintenance Machine Report</h1><div class="muted">${escapeReportHtml(machine.machine_id)} · Type ${escapeReportHtml(machine.machine_type || "-")}</div><div class="grid"><div class="card"><div class="label">Latest Risk</div><div class="risk">${escapeReportHtml(latest.risk_level || "-")}</div></div><div class="card"><div class="label">Failure Probability</div><div class="value">${Number(latest.failure_probability_percent ?? 0).toFixed(2)}%</div></div><div class="card"><div class="label">Anomaly</div><div class="value">${latest.anomaly_detected ? "DETECTED" : "NORMAL"}</div></div></div><h2>Latest Sensor State</h2><div class="grid"><div class="card"><div class="label">Air Temperature</div><div class="value">${latest.air_temperature} K</div></div><div class="card"><div class="label">Process Temperature</div><div class="value">${latest.process_temperature} K</div></div><div class="card"><div class="label">Rotational Speed</div><div class="value">${latest.rotational_speed} RPM</div></div><div class="card"><div class="label">Torque</div><div class="value">${latest.torque} Nm</div></div><div class="card"><div class="label">Tool Wear</div><div class="value">${latest.tool_wear} min</div></div><div class="card"><div class="label">Human Review</div><div class="value">${latest.human_review_required ? "REQUIRED" : "NOT REQUIRED"}</div></div></div><h2>Maintenance Recommendation</h2><div class="recommendation">${escapeReportHtml(latest.recommendation || "No recommendation stored.")}</div><h2>Prediction History</h2><table><thead><tr><th>Time</th><th>Risk</th><th>Failure Probability</th><th>Anomaly</th></tr></thead><tbody>${rows}</tbody></table><footer>Generated by Predictive Maintenance AI Agent. AI output supports maintenance review and does not replace qualified engineering inspection.</footer></div></body></html>`;
    const url = URL.createObjectURL(new Blob([html], {type:"text/html;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download=`${machine.machine_id}_maintenance_report.html`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  } catch (err) { console.error(err); window.alert("Unable to generate the machine report. Make sure the backend is running."); }
}

function escapeReportHtml(value) { return String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;"); }

function MachinesPage({ navigate, onOpenMachine }) {
  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(true);
  const [machinesError, setMachinesError] = useState("");

  const loadMachines = async () => {
    try {
      setLoadingMachines(true);
      setMachinesError("");

      const response = await fetch(`${API_URL}/api/machines`);
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      setMachines(Array.isArray(data.machines) ? data.machines : []);
    } catch (err) {
      console.error(err);
      setMachinesError("Unable to load machines from the backend.");
    } finally {
      setLoadingMachines(false);
    }
  };

  useEffect(() => {
    loadMachines();
  }, []);

  return (
    <div className="page-stack">
      <PageHero
        icon={<Factory />}
        eyebrow="FLEET MANAGEMENT"
        title="Machines"
        text="View every machine that has submitted a predictive-maintenance analysis and open its individual history."
      />

      <section className="fleet-toolbar">
        <div>
          <span>REGISTERED FROM ANALYSIS HISTORY</span>
          <strong>{machines.length}</strong>
          <small>Unique machine IDs stored in the database</small>
        </div>
        <button className="secondary-inline" onClick={loadMachines}>
          <RefreshCw size={15} /> Refresh Fleet
        </button>
      </section>

      {loadingMachines ? (
        <section className="panel">
          <EmptyMessage text="Loading machine fleet..." />
        </section>
      ) : machinesError ? (
        <section className="panel">
          <div className="error-box">
            <AlertTriangle size={18} />
            {machinesError}
          </div>
        </section>
      ) : machines.length > 0 ? (
        <section className="machine-fleet-grid">
          {machines.map((item) => {
            const risk = Number(item.maximum_failure_probability ?? 0);
            const riskClass =
              risk >= 90 ? "critical" :
              risk >= 70 ? "high" :
              risk >= 40 ? "medium" : "low";

            return (
              <div
                className="machine-fleet-card"
                key={item.machine_id}
              >
                <div className="machine-card-top">
                  <div className="machine-card-icon">
                    <Factory size={21} />
                  </div>
                  <span className={`alert-status ${riskClass}`}>
                    {riskClass.toUpperCase()}
                  </span>
                </div>

                <strong>{item.machine_id}</strong>
                <span className="machine-card-type">
                  Type {item.machine_type} · {item.prediction_count} analyses
                </span>

                <div className="machine-card-stats">
                  <div>
                    <small>MAX FAILURE RISK</small>
                    <b className={riskClass}>{risk.toFixed(2)}%</b>
                  </div>
                  <div>
                    <small>LAST ANALYSIS</small>
                    <b>{formatDate(item.last_prediction)}</b>
                  </div>
                </div>

                <div className="machine-card-actions">
                  <button className="machine-card-view" onClick={() => onOpenMachine(item.machine_id)}>
                    View details <ChevronRight size={15} />
                  </button>
                  <button className="machine-card-report" onClick={() => downloadMachineReport(item)} title={`Download report for ${item.machine_id}`}>
                    <Download size={14} /> Report
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="panel">
          <EmptyMessage text="No machines are registered yet. Run a prediction after entering a machine ID." />
        </section>
      )}

      <button className="primary-inline" onClick={() => navigate("dashboard")}>
        <Activity size={17} /> Return to Dashboard
      </button>
    </div>
  );
}

function MachineDetailPage({ machineId, navigate }) {
  const [machine, setMachine] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [machineStatus, setMachineStatus] = useState("ACTIVE");
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMachine = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/machines/${encodeURIComponent(machineId)}`
        );

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        if (active) {
          const rows = Array.isArray(data.history) ? data.history : [];
          setHistory(rows);
          setMachine(rows.length ? rows[0] : null);

          const statusValue =
            typeof data.status === "string"
              ? data.status
              : data.status?.status;

          setMachineStatus(statusValue || "ACTIVE");
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setError("Unable to load this machine's history.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMachine();

    return () => {
      active = false;
    };
  }, [machineId]);

  const handleResolveMachine = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to resolve ${machineId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setResolving(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/machines/${encodeURIComponent(machineId)}/resolve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();

      console.log("Resolve API status:", response.status);
      console.log("Resolve API response:", responseText);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      // The backend HTTP 2xx response is the success signal.
      // Do not require a specific { success: true } JSON field.
      setMachineStatus("RESOLVED");

      window.alert(`${machineId} has been resolved successfully.`);

      navigate("machines");
    } catch (err) {
      console.error("Resolve machine error:", err);
      setError(
        languageAwareMessage(
          "Unable to resolve this machine. Please try again."
        )
      );
    } finally {
      setResolving(false);
    }
  };

  const latest = history[0];
  const risk = Number(latest?.failure_probability_percent ?? 0);
  const riskClass =
    risk >= 90 ? "critical" :
    risk >= 70 ? "high" :
    risk >= 40 ? "medium" : "low";

  if (loading) {
    return (
      <div className="page-stack">
        <PageHero
          icon={<Factory />}
          eyebrow="MACHINE DETAILS"
          title={machineId}
          text="Loading machine history and latest operating state."
        />
        <section className="panel">
          <EmptyMessage text="Loading machine details..." />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-stack">
        <PageHero
          icon={<Factory />}
          eyebrow="MACHINE DETAILS"
          title={machineId}
          text="Machine-level analysis history."
        />
        <section className="panel">
          <div className="error-box">
            <AlertTriangle size={18} /> {error}
          </div>
        </section>
        <button className="primary-inline" onClick={() => navigate("machines")}>
          <Factory size={17} /> Back to Machines
        </button>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="page-stack">
        <PageHero
          icon={<Factory />}
          eyebrow="MACHINE DETAILS"
          title={machineId}
          text="No stored prediction history was found for this machine."
        />
        <section className="panel">
          <EmptyMessage text="Run a prediction for this machine to create its history." />
        </section>
        <button className="primary-inline" onClick={() => navigate("dashboard")}>
          <Activity size={17} /> Run Machine Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <PageHero
        icon={<Factory />}
        eyebrow="MACHINE DETAILS"
        title={machine.machine_id}
        text={`Individual operating history, risk state and maintenance information for machine ${machine.machine_id}.`}
      />

      <section className="machine-detail-header">
        <div>
          <span className="eyebrow">CURRENT MACHINE STATE</span>
          <h2>{machine.machine_id}</h2>
          <p>Type {machine.machine_type} · {history.length} recorded analyses</p>
        </div>
        <div className={`machine-detail-risk ${riskClass}`}>
          <small>LATEST FAILURE RISK</small>
          <strong>{risk.toFixed(2)}%</strong>
          <span>{machine.risk_level}</span>
        </div>
      </section>

      <section className="machine-detail-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><Gauge size={19} /> Latest Sensor State</h2>
              <p>Most recently analysed operating conditions</p>
            </div>
          </div>

          <div className="detail-sensor-grid">
            <DetailMetric label="Air Temperature" value={`${machine.air_temperature} K`} />
            <DetailMetric label="Process Temperature" value={`${machine.process_temperature} K`} />
            <DetailMetric label="Rotational Speed" value={`${machine.rotational_speed} RPM`} />
            <DetailMetric label="Torque" value={`${machine.torque} Nm`} />
            <DetailMetric label="Tool Wear" value={`${machine.tool_wear} min`} />
            <DetailMetric
              label="Anomaly"
              value={machine.anomaly_detected ? "DETECTED" : "NORMAL"}
              status={machine.anomaly_detected ? "critical" : "low"}
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><Wrench size={19} /> Latest Maintenance Decision</h2>
              <p>Stored recommendation associated with the latest prediction</p>
            </div>
          </div>

          <div className="detail-decision">
            <div className="detail-decision-row">
              <span>Risk Level</span>
              <strong className={riskClass}>{machine.risk_level}</strong>
            </div>
            <div className="detail-decision-row">
              <span>Human Review</span>
              <strong>{machine.human_review_required ? "REQUIRED" : "NOT REQUIRED"}</strong>
            </div>
            <p>{machine.recommendation || "No recommendation stored."}</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><TrendingUp size={19} /> Prediction History</h2>
            <p>Every analysis stored for {machine.machine_id}</p>
          </div>
          <span className="machine-badge">{history.length} RECORDS</span>
        </div>

        <div className="machine-history-table">
          <div className="machine-history-row machine-history-head">
            <span>TIME</span>
            <span>RISK</span>
            <span>FAILURE PROBABILITY</span>
            <span>ANOMALY</span>
          </div>

          {history.map((item) => {
            const p = Number(item.failure_probability_percent ?? 0);
            const cls =
              p >= 90 ? "critical" :
              p >= 70 ? "high" :
              p >= 40 ? "medium" : "low";

            return (
              <div className="machine-history-row" key={item.id}>
                <span>{formatDate(item.created_at)}</span>
                <strong className={cls}>{item.risk_level}</strong>
                <span>{p.toFixed(2)}%</span>
                <span className={item.anomaly_detected ? "critical" : "low"}>
                  {item.anomaly_detected ? "DETECTED" : "NORMAL"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <MachineHistoryTrend history={history} />

      <div className="machine-detail-actions">
        <button
          className="secondary-inline"
          onClick={() => navigate("machines")}
        >
          <ChevronRight
            size={15}
            style={{ transform: "rotate(180deg)" }}
          />
          Back to Machines
        </button>

        {machineStatus !== "RESOLVED" && (
          <button
            className="resolve-machine-button"
            onClick={handleResolveMachine}
            disabled={resolving}
          >
            {resolving ? "Resolving..." : "✓ Resolve Machine"}
          </button>
        )}

        <button
          className="primary-inline"
          onClick={() => navigate("dashboard")}
        >
          <Activity size={17} /> Run New Analysis
        </button>
      </div>
    </div>
  );
  
}

function DetailMetric({ label, value, status }) {
  return (
    <div className="detail-metric">
      <span>{label}</span>
      <strong className={status || ""}>{value}</strong>
    </div>
  );
}


function normalizeSensor(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, (n - min) / (max - min)));
}

function RadarChart({ machine }) {
  const labels = ["Air Temp", "Process Temp", "RPM", "Torque", "Tool Wear"];
  const values = [
    normalizeSensor(machine?.air_temperature, 295, 310),
    normalizeSensor(machine?.process_temperature, 300, 320),
    normalizeSensor(machine?.rotational_speed, 1000, 3000),
    normalizeSensor(machine?.torque, 0, 100),
    normalizeSensor(machine?.tool_wear, 0, 250),
  ];
  const cx = 130, cy = 112, radius = 76;
  const point = (r, i) => {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI / labels.length);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const polygon = (r) => labels.map((_, i) => point(r, i).join(",")).join(" ");
  const dataPolygon = values.map((v, i) => point(radius * (0.18 + v * 0.82), i).join(",")).join(" ");
  return (
    <div className="radar-wrap">
      <svg viewBox="0 0 260 225" className="radar-chart" role="img" aria-label="Machine health radar">
        {[1, 0.75, 0.5, 0.25].map((scale) => <polygon key={scale} points={polygon(radius * scale)} className="radar-grid" />)}
        {labels.map((label, i) => {
          const [x, y] = point(radius, i); const [tx, ty] = point(radius + 25, i);
          return <g key={label}><line x1={cx} y1={cy} x2={x} y2={y} className="radar-axis" /><text x={tx} y={ty} textAnchor="middle" className="radar-label">{label}</text></g>;
        })}
        <polygon points={dataPolygon} className="radar-data" />
        {values.map((v, i) => { const [x, y] = point(radius * (0.18 + v * 0.82), i); return <circle key={i} cx={x} cy={y} r="3.5" className="radar-point" />; })}
      </svg>
    </div>
  );
}

function RiskIndicator({ probability }) {
  // The gauge represents 0% at the far left and 100% at the far right.
  // Using 180° → 360° keeps the needle on the same upper semicircle as the arc.
  const value = Math.max(0, Math.min(100, Number(probability) || 0));
  const angle = 180 + (value / 100) * 180;
  const radius = 74;
  const cx = 100;
  const cy = 96;
  const rad = angle * Math.PI / 180;
  const x = cx + radius * Math.cos(rad);
  const y = cy + radius * Math.sin(rad);

  const riskLabel = value >= 90 ? "CRITICAL" : value >= 70 ? "HIGH" : value >= 40 ? "MEDIUM" : "LOW";

  return (
    <div className="risk-indicator-wrap">
      <svg viewBox="0 0 200 125" className="risk-gauge" role="img" aria-label={`Failure risk ${value.toFixed(1)} percent, ${riskLabel}`}>
        <path
          d="M 26 96 A 74 74 0 0 1 174 96"
          className="gauge-track"
        />
        <path
          d="M 26 96 A 74 74 0 0 1 174 96"
          className="gauge-progress"
          pathLength="100"
          strokeDasharray={`${value} ${100 - value}`}
        />
        <line
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          className="gauge-needle"
        />
        <circle cx={cx} cy={cy} r="6" className="gauge-center" />
        <text x="100" y="116" textAnchor="middle" className="gauge-value">
          {value.toFixed(1)}%
        </text>
      </svg>
      <div className="risk-thresholds">
        <span>0 LOW</span>
        <span>40 MED</span>
        <span>70 HIGH</span>
        <span>90 CRIT</span>
      </div>
    </div>
  );
}

function ShapChart({ contributors }) {
  const items = [...(contributors || [])].sort((a, b) => Math.abs(Number(b.shap_value)) - Math.abs(Number(a.shap_value))).slice(0, 5);
  const max = Math.max(...items.map((x) => Math.abs(Number(x.shap_value))), 1);
  return (
    <div className="shap-chart-list">
      {items.length ? items.map((item) => {
        const val = Number(item.shap_value) || 0; const width = (Math.abs(val) / max) * 100;
        return <div className="shap-chart-row" key={item.feature}><div className="shap-chart-label"><span>{item.feature}</span><b>{val.toFixed(3)}</b></div><div className="shap-chart-track"><div className={`shap-chart-fill ${val >= 0 ? "positive" : "negative"}`} style={{ width: `${width}%` }} /></div></div>;
      }) : <div className="chart-empty">Run a prediction to populate SHAP analytics.</div>}
    </div>
  );
}

function DashboardAnalytics({ machine, probability, contributors }) {
  return (
    <section className="panel analytics-panel">
      <div className="panel-header"><div><h2><BarChart3 size={19} /> Analytics Overview</h2><p>Machine health, failure risk and explainable model signals</p></div><span className="ai-badge">LIVE VIEW</span></div>
      <div className="analytics-grid">
        <div className="chart-card"><div className="chart-card-head"><div><strong>Machine Health Radar</strong><small>Current sensor profile</small></div><Gauge size={17} /></div><RadarChart machine={machine} /></div>
        <div className="chart-card"><div className="chart-card-head"><div><strong>Failure Risk Indicator</strong><small>Current ML failure probability</small></div><AlertTriangle size={17} /></div><RiskIndicator probability={probability} /></div>
        <div className="chart-card chart-card-wide"><div className="chart-card-head"><div><strong>SHAP Feature Contribution</strong><small>Model contributors by absolute SHAP magnitude</small></div><BrainCircuit size={17} /></div><ShapChart contributors={contributors} /></div>
      </div>
    </section>
  );
}

function AnalyticsCharts({ machine, probability, contributors }) {
  return (
    <section className="panel analytics-panel">
      <div className="panel-header"><div><h2><BarChart3 size={19} /> Analytics Overview</h2><p>Visual view of the current predictive decision</p></div><span className="shap-badge">XAI</span></div>
      <div className="analytics-grid analysis-analytics-grid">
        {machine && <div className="chart-card"><div className="chart-card-head"><div><strong>Machine Health Radar</strong><small>Current sensor profile</small></div><Gauge size={17} /></div><RadarChart machine={machine} /></div>}
        <div className="chart-card"><div className="chart-card-head"><div><strong>Failure Risk Indicator</strong><small>Current ML failure probability</small></div><AlertTriangle size={17} /></div><RiskIndicator probability={probability} /></div>
        <div className="chart-card chart-card-wide"><div className="chart-card-head"><div><strong>SHAP Feature Contribution</strong><small>Model contributors by absolute SHAP magnitude</small></div><BrainCircuit size={17} /></div><ShapChart contributors={contributors} /></div>
      </div>
    </section>
  );
}

function MachineHistoryTrend({ history }) {
  const points = [...(history || [])].reverse().slice(-12);
  const values = points.map((x) => Number(x.failure_probability_percent) || 0);
  const min = Math.min(...values, 0); const max = Math.max(...values, 100); const range = Math.max(max - min, 20);
  const coords = values.map((v, i) => { const x = points.length === 1 ? 50 : (i / (points.length - 1)) * 92 + 4; const y = 92 - ((v - min) / range) * 76; return [x, y]; });
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <section className="panel analytics-panel">
      <div className="panel-header"><div><h2><TrendingUp size={19} /> Prediction History Trend</h2><p>Historical failure probability for this machine</p></div><span className="machine-badge">{points.length} POINTS</span></div>
      {points.length ? <div className="trend-chart-wrap"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="trend-chart">{[20,40,60,80].map((y)=><line key={y} x1="4" x2="96" y1={y} y2={y} className="trend-grid"/>)}<polyline points={line} className="trend-line" fill="none"/>{coords.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.7" className="trend-point"/>)}</svg><div className="trend-axis"><span>Earlier</span><strong>{values.length ? `${values[values.length-1].toFixed(2)}% latest` : ""}</strong><span>Latest</span></div></div> : <div className="chart-empty">No history available for trend chart</div>}
    </section>
  );
}

function AnalysisPage({ result, probability, riskLevel, contributors, anomaly, navigate }) {
  return (
    <div className="page-stack">
      <PageHero
        icon={<BarChart3 />}
        eyebrow="MODEL INTELLIGENCE"
        title="AI Analysis & Explainability"
        text="Understand how the predictive maintenance agent turns machine sensor values into an actionable risk decision."
      />

      <section className="analysis-grid">
        <div className="insight-card featured">
          <span className="eyebrow">SELECTED MODEL</span>
          <h2>Gradient Boosting</h2>
          <p>
            The production failure classifier is a Gradient Boosting model.
            It captures nonlinear relationships in machine operating conditions
            and integrates naturally with SHAP for local explanations.
          </p>
          <div className="tag-row">
            <span>Classification</span>
            <span>Nonlinear</span>
            <span>SHAP-ready</span>
          </div>
        </div>

        <div className="insight-card">
          <span className="eyebrow">CURRENT DECISION</span>
          <div className={`big-risk ${riskLevel.toLowerCase()}`}>{riskLevel}</div>
          <div className="big-number">{probability.toFixed(2)}%</div>
          <p>Predicted failure probability</p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Layers3 size={19} /> Model Comparison</h2>
            <p>Models evaluated during the development workflow</p>
          </div>
        </div>

        <div className="model-table">
          <div className="model-row model-head">
            <span>Model</span>
            <span>Role</span>
            <span>Strength</span>
            <span>Status</span>
          </div>

          {modelComparison.map((model) => (
            <div className={`model-row ${model.selected ? "selected-model" : ""}`} key={model.name}>
              <strong>{model.name}</strong>
              <span>{model.role}</span>
              <span>{model.description}</span>
              <span className={model.selected ? "selected-pill" : "neutral-pill"}>
                {model.selected ? "SELECTED" : "BENCHMARK"}
              </span>
            </div>
          ))}
        </div>

        <div className="model-note">
          <TrendingUp size={17} />
          <div>
            <strong>Why Gradient Boosting?</strong>
            <p>
              It was chosen as the final failure-prediction model in the project
              after comparing the candidate classifiers. The dashboard keeps the
              comparison visible so judges can see that model selection was deliberate,
              rather than arbitrary.
            </p>
          </div>
        </div>
      </section>

      <section className="analysis-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><BrainCircuit size={19} /> SHAP Explainability</h2>
              <p>Feature contribution for the current prediction</p>
            </div>
            <span className="shap-badge">XAI</span>
          </div>

          {contributors.length ? (
            <div className="factor-list">
              {contributors.map((item, index) => (
                <div className="factor-item" key={item.feature}>
                  <span className="factor-rank">#{index + 1}</span>
                  <div>
                    <strong>{item.feature}</strong>
                    <small>Machine value: {item.machine_value}</small>
                  </div>
                  <b className={Number(item.shap_value) >= 0 ? "positive" : "negative"}>
                    {item.shap_value}
                  </b>
                </div>
              ))}
            </div>
          ) : (
            <EmptyMessage text="Run a prediction from the Dashboard to populate SHAP explanations." />
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><ShieldCheck size={19} /> Anomaly Layer</h2>
              <p>Isolation Forest behavioral check</p>
            </div>
          </div>

          <div className={`status-banner ${anomaly ? "danger" : "safe"}`}>
            <CircleDot size={18} />
            <div>
              <strong>{result ? (anomaly ? "ANOMALY DETECTED" : "NORMAL PATTERN") : "AWAITING ANALYSIS"}</strong>
              <p>
                {result
                  ? "Anomaly detection is evaluated independently from the failure classifier."
                  : "Submit machine sensor values to evaluate the operating pattern."}
              </p>
            </div>
          </div>

          <div className="logic-list">
            <div><span>01</span> ML estimates failure probability</div>
            <div><span>02</span> Risk logic maps probability to a risk band</div>
            <div><span>03</span> Isolation Forest checks unusual behavior</div>
            <div><span>04</span> SHAP explains model contributors</div>
          </div>
        </div>
      </section>

      <AnalyticsCharts machine={null} probability={probability} contributors={contributors} />

      <button className="primary-inline" onClick={() => navigate("dashboard")}>
        <Activity size={17} /> Return to Live Dashboard
      </button>
    </div>
  );
}

function DatasetPage({ navigate }) {
  return (
    <div className="page-stack">
      <PageHero
        icon={<Database />}
        eyebrow="DATA FOUNDATION"
        title="AI4I 2020 Dataset"
        text="The predictive maintenance agent is trained around the AI4I 2020 Predictive Maintenance Dataset."
      />

      <section className="dataset-hero-grid">
        <div className="dataset-stat"><strong>10,000</strong><span>records</span></div>
        <div className="dataset-stat"><strong>14</strong><span>columns</span></div>
        <div className="dataset-stat"><strong>0</strong><span>missing values</span></div>
        <div className="dataset-stat"><strong>1</strong><span>failure target</span></div>
      </section>

      <section className="analysis-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><Info size={19} /> About the Dataset</h2>
              <p>What the model learns from machine operating conditions</p>
            </div>
          </div>

          <div className="prose">
            <p>
              AI4I 2020 is a synthetic predictive-maintenance dataset designed
              to represent realistic industrial machine operating conditions.
              Each record describes a machine state and whether a machine failure
              occurred.
            </p>
            <p>
              The main prediction pipeline uses the machine type and five sensor
              measurements. Identifier columns are not used as predictive signals,
              and failure-mode flags are kept out of the main classifier to avoid
              target leakage.
            </p>
          </div>

          <div className="dataset-tags">
            <span>Classification</span>
            <span>Predictive Maintenance</span>
            <span>Industrial Sensors</span>
            <span>Explainable AI</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><ClipboardCheck size={19} /> Data Preparation</h2>
              <p>Input path used by the AI engine</p>
            </div>
          </div>

          <div className="data-flow-list">
            <div><span>01</span><strong>Load</strong><small>Read AI4I records</small></div>
            <div><span>02</span><strong>Clean</strong><small>Remove identifiers from features</small></div>
            <div><span>03</span><strong>Encode</strong><small>Convert machine type to model features</small></div>
            <div><span>04</span><strong>Split</strong><small>Train/test evaluation</small></div>
            <div><span>05</span><strong>Predict</strong><small>Failure probability</small></div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Gauge size={19} /> Model Input Features</h2>
            <p>Signals supplied to the failure prediction pipeline</p>
          </div>
        </div>

        <div className="feature-grid">
          {datasetFeatures.map(([name, unit, meaning]) => (
            <div className="feature-card" key={name}>
              <strong>{name}</strong>
              <span>{unit}</span>
              <p>{meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel model-selection-panel">
        <div className="panel-header">
          <div>
            <h2><BarChart3 size={19} /> Model Comparison</h2>
            <p>Development-time classifier comparison</p>
          </div>
        </div>

        <div className="model-mini-grid">
          {modelComparison.map((model) => (
            <div className={`model-mini ${model.selected ? "selected" : ""}`} key={model.name}>
              <span>{model.role}</span>
              <strong>{model.name}</strong>
              <p>{model.description}</p>
              {model.selected && <b>✓ Final failure classifier</b>}
            </div>
          ))}
        </div>
      </section>

      <div className="source-note">
        Dataset reference: AI4I 2020 Predictive Maintenance Dataset. The application uses
        the Kaggle-provided dataset specified for the hackathon.
      </div>

      <button className="primary-inline" onClick={() => navigate("dashboard")}>
        <Activity size={17} /> Open Live Prediction
      </button>
    </div>
  );
}

function AlertsPage({ result, riskLevel, probability, anomaly, navigate }) {
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [alertsError, setAlertsError] = useState("");

  useEffect(() => {
    let active = true;

    const loadAlerts = async () => {
      try {
        setLoadingAlerts(true);
        setAlertsError("");

        const response = await fetch(`${API_URL}/api/alerts`);
        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setAlerts(Array.isArray(data.alerts) ? data.alerts : []);
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setAlertsError("Unable to load alert history from the backend.");
        }
      } finally {
        if (active) {
          setLoadingAlerts(false);
        }
      }
    };

    loadAlerts();
    return () => {
      active = false;
    };
  }, []);

  const currentRiskAlert =
    Boolean(result) && probability >= 40
      ? {
          machine_id: result.machine_id ?? "DEMO-001",
          risk_level: riskLevel,
          failure_probability_percent: probability,
          anomaly_detected: anomaly,
          created_at: new Date().toISOString(),
          isCurrent: true,
        }
      : null;

  const databaseAlerts = alerts.filter((alert) => {
    // The current prediction is already shown separately above.
    return !(result?.prediction_id && alert.id === result.prediction_id);
  });

  return (
    <div className="page-stack">
      <PageHero
        icon={<AlertTriangle />}
        eyebrow="OPERATIONS"
        title="Alerts & Risk Center"
        text="Live risk signals backed by prediction history stored by the FastAPI database layer."
      />

      <section className="alert-summary-grid">
        <div className={`alert-summary ${result && probability >= 40 ? "danger" : "safe"}`}>
          <AlertTriangle />
          <div>
            <span>Current Failure Risk</span>
            <strong>{result ? `${probability.toFixed(2)}%` : "NO ANALYSIS"}</strong>
            <small>{result ? riskLevel : "Run prediction first"}</small>
          </div>
        </div>

        <div className={`alert-summary ${result && anomaly ? "danger" : "safe"}`}>
          <ShieldCheck />
          <div>
            <span>Current Anomaly</span>
            <strong>{result ? (anomaly ? "DETECTED" : "NORMAL") : "READY"}</strong>
            <small>Isolation Forest</small>
          </div>
        </div>

        <div className="alert-summary review">
          <ClipboardCheck />
          <div>
            <span>Stored Alerts</span>
            <strong>{alerts.length}</strong>
            <small>Database risk events</small>
          </div>
        </div>
      </section>

      {currentRiskAlert && (
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2><CircleDot size={19} /> Current Alert</h2>
              <p>Most recent analysis from the active dashboard session</p>
            </div>
            <span className={`alert-status ${riskLevel.toLowerCase()}`}>{riskLevel}</span>
          </div>

          <div className="alert-history-list">
            <div className="alert-history-item current">
              <div>
                <strong>{currentRiskAlert.machine_id}</strong>
                <span>
                  Failure probability: {Number(currentRiskAlert.failure_probability_percent).toFixed(2)}%
                </span>
              </div>
              <div>
                <strong>{currentRiskAlert.anomaly_detected ? "ANOMALY" : "NO ANOMALY"}</strong>
                <span>Human review required</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Database size={19} /> Alert History</h2>
            <p>High/critical predictions and anomaly events retrieved from SQLite</p>
          </div>
          <span className="machine-badge">{alerts.length} EVENTS</span>
        </div>

        {loadingAlerts ? (
          <EmptyMessage text="Loading alert history from the backend..." />
        ) : alertsError ? (
          <div className="error-box">
            <AlertTriangle size={18} />
            {alertsError}
          </div>
        ) : databaseAlerts.length > 0 ? (
          <div className="alert-history-list">
            {databaseAlerts.map((alert) => (
              <div className="alert-history-item" key={alert.id}>
                <div>
                  <strong>{alert.machine_id}</strong>
                  <span>
                    {alert.risk_level} · {Number(alert.failure_probability_percent).toFixed(2)}% failure risk
                  </span>
                </div>
                <div>
                  <strong>{alert.anomaly_detected ? "ANOMALY DETECTED" : "RISK ALERT"}</strong>
                  <span>{formatDate(alert.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyMessage text="No high-risk or anomaly events are currently stored." />
        )}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><ShieldCheck size={19} /> Decision Rules</h2>
            <p>Prototype thresholds used by the hackathon system</p>
          </div>
        </div>

        <div className="alert-rules">
          <div><b>LOW</b><span>0–39% predicted failure probability</span></div>
          <div><b>MEDIUM</b><span>40–69% predicted failure probability</span></div>
          <div><b>HIGH</b><span>70–89% predicted failure probability</span></div>
          <div><b>CRITICAL</b><span>90–100% predicted failure probability</span></div>
        </div>

        <div className="important-note">
          <Info size={17} />
          <p>
            These risk bands are prototype decision thresholds for the hackathon
            system. They are not presented as certified industrial safety limits.
          </p>
        </div>
      </section>

      <button className="primary-inline" onClick={() => navigate("maintenance")}>
        <Wrench size={17} /> Open Maintenance Center
      </button>
    </div>
  );
}

function BellIcon() {
  return <AlertTriangle size={19} />;
}

function MaintenancePage({ result, recommendation, priority, contributors, navigate }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState("");

  useEffect(() => {
    let active = true;

    const loadRecommendations = async () => {
      try {
        setLoadingRecommendations(true);
        setRecommendationsError("");

        const response = await fetch(`${API_URL}/api/recommendations`);
        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setRecommendations(
            Array.isArray(data.recommendations) ? data.recommendations : []
          );
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setRecommendationsError(
            "Unable to load maintenance recommendations from the backend."
          );
        }
      } finally {
        if (active) {
          setLoadingRecommendations(false);
        }
      }
    };

    loadRecommendations();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page-stack">
      <PageHero
        icon={<Wrench />}
        eyebrow="ACTION CENTER"
        title="Maintenance Center"
        text="Convert model signals into reviewable, grounded maintenance actions with database-backed recommendation history."
      />

      <section className="maintenance-banner">
        <div>
          <span>RECOMMENDED PRIORITY</span>
          <strong>{priority}</strong>
          <p>
            {result
              ? "Recommendation generated from the current ML, anomaly and SHAP analysis."
              : "Run an analysis to generate a machine-specific recommendation."}
          </p>
        </div>
        <div className="maintenance-icon"><Wrench size={30} /></div>
      </section>

      <section className="analysis-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><BrainCircuit size={19} /> Current AI Recommendation</h2>
              <p>Grounded Gemini maintenance response</p>
            </div>
            <span className="gemini-badge">GEMINI</span>
          </div>

          <div className="recommendation-text maintenance-text">
            {recommendation}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2><ClipboardCheck size={19} /> Review Checklist</h2>
              <p>Suggested engineer verification sequence</p>
            </div>
          </div>

          <div className="checklist">
            <label><input type="checkbox" /> Verify current machine operating conditions</label>
            <label><input type="checkbox" /> Inspect high-contribution sensor signals</label>
            <label><input type="checkbox" /> Check recent maintenance history</label>
            <label><input type="checkbox" /> Confirm physical root cause before intervention</label>
            <label><input type="checkbox" /> Approve or reject recommended action</label>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Database size={19} /> Recommendation History</h2>
            <p>Maintenance recommendations persisted by the backend database</p>
          </div>
          <span className="machine-badge">{recommendations.length} STORED</span>
        </div>

        {loadingRecommendations ? (
          <EmptyMessage text="Loading recommendation history from the backend..." />
        ) : recommendationsError ? (
          <div className="error-box">
            <AlertTriangle size={18} />
            {recommendationsError}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="recommendation-history-list">
            {recommendations.map((item) => (
              <div className="recommendation-history-item" key={item.id}>
                <div className="recommendation-history-top">
                  <div>
                    <span className="eyebrow">PREDICTION #{item.prediction_id}</span>
                    <strong>{item.priority || "PENDING REVIEW"}</strong>
                  </div>
                  <span className="review-status">{item.status || "PENDING"}</span>
                </div>
                <p>{item.recommendation}</p>
                <small>{formatDate(item.created_at)}</small>
              </div>
            ))}
          </div>
        ) : (
          <EmptyMessage text="No maintenance recommendations are stored yet. Run a prediction from the Dashboard." />
        )}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><BrainCircuit size={19} /> Current Contributing Signals</h2>
            <p>Model contributors to review — not confirmed physical causes</p>
          </div>
        </div>

        {contributors.length ? (
          <div className="factor-grid">
            {contributors.map((item, index) => (
              <div className="factor-card" key={item.feature}>
                <span>#{index + 1}</span>
                <strong>{item.feature}</strong>
                <small>Machine value: {item.machine_value}</small>
                <b>{item.shap_value}</b>
              </div>
            ))}
          </div>
        ) : (
          <EmptyMessage text="No contributing factors yet. Run the live prediction first." />
        )}
      </section>

      <div className="important-note">
        <ShieldCheck size={17} />
        <p>
          The AI recommendation supports maintenance decisions but does not replace
          a qualified engineer or physical inspection.
        </p>
      </div>

      <button className="primary-inline" onClick={() => navigate("dashboard")}>
        <Activity size={17} /> Return to Dashboard
      </button>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div className="page-stack">
      <PageHero
        icon={<Factory />}
        eyebrow="SOLUTION OVERVIEW"
        title="About the Predictive Maintenance AI Agent"
        text="An explainable, human-in-the-loop AI workflow designed to detect risk early and support proactive maintenance."
      />

      <section className="about-grid">
        <div className="about-card">
          <div className="about-icon"><TrendingUp /></div>
          <h3>Predict</h3>
          <p>
            Gradient Boosting estimates the probability of machine failure from
            operating conditions before a failure occurs.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon"><ShieldCheck /></div>
          <h3>Detect</h3>
          <p>
            Isolation Forest provides a second signal by identifying unusual
            operating patterns.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon"><BrainCircuit /></div>
          <h3>Explain</h3>
          <p>
            SHAP identifies the model features that contributed most strongly
            to an individual prediction.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon"><Wrench /></div>
          <h3>Recommend</h3>
          <p>
            Gemini converts structured ML findings into a grounded maintenance
            recommendation for engineer review.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Cpu size={19} /> Technology Stack</h2>
            <p>End-to-end prototype architecture</p>
          </div>
        </div>

        <div className="stack-grid">
          {[
            ["Data", "AI4I 2020 Predictive Maintenance Dataset"],
            ["ML", "Python + scikit-learn + Gradient Boosting"],
            ["Anomaly", "Isolation Forest"],
            ["Explainability", "SHAP"],
            ["GenAI", "Google Gemini"],
            ["Backend", "FastAPI + REST/JSON"],
            ["Frontend", "React"],
            ["Storage", "SQLite / database layer"],
          ].map(([name, value]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel architecture-showcase">
        <div className="panel-header">
          <div>
            <h2><Layers3 size={19} /> Solution Flow</h2>
            <p>Designed for early warning, explainability and controlled action</p>
          </div>
        </div>
        <Pipeline />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2><Info size={19} /> Design Principles</h2>
            <p>Important boundaries in the AI system</p>
          </div>
        </div>

        <div className="principle-list">
          <div><CheckCircle2 /> ML performs numerical failure prediction.</div>
          <div><CheckCircle2 /> GenAI does not replace the failure classifier.</div>
          <div><CheckCircle2 /> SHAP values are model contributors, not proof of causation.</div>
          <div><CheckCircle2 /> Maintenance recommendations remain human-reviewed.</div>
          <div><CheckCircle2 /> Sensor input can later be connected to industrial IoT/PLC streams.</div>
        </div>
      </section>

      <button className="primary-inline" onClick={() => navigate("dataset")}>
        <Database size={17} /> Explore Dataset & Models
      </button>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Unknown time";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const locale =
    ACTIVE_LANGUAGE === "Kannada"
      ? "kn-IN"
      : ACTIVE_LANGUAGE === "Hindi"
      ? "hi-IN"
      : "en-IN";

  return date.toLocaleString(locale);
}

function PageHero({ icon, eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="page-hero-icon">{icon}</div>
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
}

function EmptyMessage({ text }) {
  return (
    <div className="empty-state">
      <BrainCircuit size={32} />
      <strong>Awaiting analysis</strong>
      <p>{text}</p>
    </div>
  );
}

export default App;
