from fastapi import FastAPI
import joblib
import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

model = joblib.load(os.path.join(BASE_DIR, "email_intent_model.pkl"))
tfidf = joblib.load(os.path.join(BASE_DIR, "email_tfidf.pkl"))

def clean(t):
    t = t.lower()
    t = re.sub(r'[^a-zA-Z\s]', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()

@app.post("/predict")
def predict(data: dict):
    text = clean(data["text"])
    vec = tfidf.transform([text])

    probs = model.predict_proba(vec)[0]
    intent_index = probs.argmax()

    return {
        "intent": model.classes_[intent_index],
        "confidence": round(float(probs[intent_index]), 2)
    }



