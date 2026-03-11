# backend/app.py
from fastapi import FastAPI, UploadFile, File
from PIL import Image
import numpy as np

from model import FeatureExtractor
from utils import find_most_similar
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
extractor = FeatureExtractor()

dataset_features = np.load("embeddings.npy")
dataset_labels = np.load("labels.npy")


app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "https://skinecares-saiveerroy-saiveerroys-projects.vercel.app",
        "https://skinecares-33fiablfd-saiveerroys-projects.vercel.app",
    ],
    # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/skin-analyze")
async def scan_skin_image(image: UploadFile = File(...)):

    img = Image.open(image.file).convert("RGB")
    feature = extractor.extract(img)

    results = find_most_similar(
        feature,
        dataset_features,
        dataset_labels
    )

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

@app.post("/api/skin-analyze")
async def analyze_skin(file: UploadFile = File(...)):
    contents = await file.read()
    if len(contents) > 5_000_000:
        return {"error": "Image too large"}

