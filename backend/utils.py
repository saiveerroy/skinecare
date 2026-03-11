# backend/utils.py
import numpy as np

def cosine_similarity(a, b):
    a = a / np.linalg.norm(a)
    b = b / np.linalg.norm(b)
    return np.dot(a, b)

def find_most_similar(
    query_feature,
    dataset_features,
    dataset_labels,
    top_k=3
):
    similarities = []

    for idx, feature in enumerate(dataset_features):
        score = cosine_similarity(query_feature, feature)
        similarities.append((dataset_labels[idx], float(score)))

    similarities.sort(key=lambda x: x[1], reverse=True)

    results = []
    for label, score in similarities[:top_k]:
        results.append({
            "condition": label,
            "similarity": round(score, 3)
        })

    return results
