# backend/extract_embeddings.py
import os
import numpy as np
from PIL import Image
from model import FeatureExtractor  # Your model.py in the same folder

DATASET_DIR = "../dataset"
OUTPUT_EMBEDDINGS = "embeddings.npy"
OUTPUT_LABELS = "labels.npy"

fe = FeatureExtractor()

embeddings = []
labels = []

for label in os.listdir(DATASET_DIR):
    class_dir = os.path.join(DATASET_DIR, label)
    if not os.path.isdir(class_dir):
        continue
    print(f"Processing folder: {class_dir}")
    for img_file in os.listdir(class_dir):
        img_path = os.path.join(class_dir, img_file)
        print(f"  Found image: {img_path}")
        try:
            img = Image.open(img_path).convert("RGB")
            emb = fe.extract(img)
            embeddings.append(emb)
            labels.append(label)
        except Exception as e:
            print("Error processing", img_path, e)

embeddings = np.array(embeddings, dtype="float32")
labels = np.array(labels)

np.save(OUTPUT_EMBEDDINGS, embeddings)
np.save(OUTPUT_LABELS, labels)

print(f"Saved {len(embeddings)} embeddings to {OUTPUT_EMBEDDINGS}")
