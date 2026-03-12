# test_extract.py
from model import FeatureExtractor
from PIL import Image

# Use a small test image here
TEST_IMAGE_PATH = "test.jpg"

try:
    fe = FeatureExtractor()
    print("FeatureExtractor loaded successfully.")
except Exception as e:
    print("Error loading FeatureExtractor:", e)
    exit(1)

try:
    img = Image.open(TEST_IMAGE_PATH).convert("RGB")
    feature = fe.extract(img)
    print("Feature shape:", feature.shape)
    print("Feature extraction successful!")
except Exception as e:
    print("Error extracting features:", e)
    