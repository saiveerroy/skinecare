import base64
import requests

with open("test.jpg", "rb") as f:
    img_base64 = base64.b64encode(f.read()).decode()

payload = {
    "image": "data:image/jpeg;base64," + img_base64
}

res = requests.post(
    "http://127.0.0.1:8000/api/skin-analyze",
    json=payload
)

print(res.json())
