#backend/analyze.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load embeddings + labels
embeddings = np.load("embeddings.npy")
labels = np.load("labels.npy")

def find_similar(query_embedding, top_k=5):
    # Compute similarity
    sims = cosine_similarity([query_embedding], embeddings)[0]

    # Top matches
    top_idx = sims.argsort()[-top_k:][::-1]

    top_labels = [labels[i] for i in top_idx]
    top_scores = [sims[i] for i in top_idx]

    # Primary condition
    primary_condition = top_labels[0]
    confidence = int(top_scores[0] * 100)

    # Possible conditions (unique, excluding primary)
    possible_conditions = list(dict.fromkeys(top_labels[1:]))

    # Recommendation logic
    if primary_condition.lower() in ["melanoma", "basal_cell_carcinoma"]:
        recommendation = "Immediate dermatologist consultation recommended."
    else:
        recommendation = "Maintain proper skincare routine and monitor changes."

    return {
        "primary_condition": primary_condition,
        "confidence": f"{confidence}%",
        "possible_conditions": possible_conditions,
        "recommendation": recommendation,
        "medical_disclaimer": "AI-based analysis is for informational purposes only."
    }
