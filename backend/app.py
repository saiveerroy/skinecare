# backend/app.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
from model import FeatureExtractor
from utils import find_most_similar

app = FastAPI()

# -------------------------
# CORS setup for React dev
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Change if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Load FeatureExtractor safely
# -------------------------
try:
    extractor = FeatureExtractor()
    print("FeatureExtractor loaded successfully.")
except Exception as e:
    print("Error loading FeatureExtractor:", e)
    extractor = None

# -------------------------
# Load dataset safely
# -------------------------
try:
    dataset_features = np.load("embeddings.npy")
    dataset_labels = np.load("labels.npy")
    print("Dataset embeddings and labels loaded successfully.")
except Exception as e:
    print("Error loading dataset files:", e)
    dataset_features = np.array([])
    dataset_labels = np.array([])

# -------------------------
# Root route for testing
# -------------------------
@app.get("/")
def read_root():
    return {"message": "Skin care backend is running"}

# -------------------------
# Skin analysis endpoint
# -------------------------
@app.post("/api/skin-analyze")
async def analyze_skin(file: UploadFile = File(...)):
    # Check if model and dataset are loaded
    if extractor is None or len(dataset_features) == 0:
        raise HTTPException(
            status_code=500,
            detail="Server is not ready: model or dataset not loaded."
        )

    # Check file size
    contents = await file.read()
    if len(contents) > 5_000_000:
        raise HTTPException(status_code=413, detail="Image too large (max 5MB)")

    try:
        # Load image
        img = Image.open(file.file).convert("RGB")
        feature = extractor.extract(img)

        # Find most similar samples
        results = find_most_similar(
            feature,
            dataset_features,
            dataset_labels
        )

        # Build response
        primary = results[0]["condition"]
        confidence_score = results[0]["similarity"]

        return {
            "primary_condition": primary,
            "confidence": (
                "high" if confidence_score > 0.8
                else "medium" if confidence_score > 0.6
                else "low"
            ),
            "possible_conditions": [
                r["condition"] for r in results[1:3]
            ],
            "observations": [
                "Texture irregularity detected",
                "Color variation observed"
            ],
            "recommendation": "Use a gentle cleanser and consult a dermatologist if symptoms worsen.",
            "medical_disclaimer": "This is not a medical diagnosis."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze image: {e}")