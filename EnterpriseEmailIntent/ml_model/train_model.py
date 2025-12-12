import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load dataset
df = pd.read_csv("enterprise_email_dataset.csv")

# Text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

df["clean_text"] = df["email_text"].apply(clean_text)

X = df["clean_text"]
y = df["intent"]

# Vectorizer
tfidf = TfidfVectorizer(max_features=3000)
X_vec = tfidf.fit_transform(X)

# Correct split → 80% training / 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X_vec, y, test_size=0.2, random_state=42, stratify=y
)

# Model
model = MultinomialNB()
model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print("Accuracy:", round(acc * 100, 2), "%")

# Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save model + vectorizer
joblib.dump(model, "email_intent_model.pkl")
joblib.dump(tfidf, "email_tfidf.pkl")

print("\nModel Saved: email_intent_model.pkl")
print("Vectorizer Saved: email_tfidf.pkl")
