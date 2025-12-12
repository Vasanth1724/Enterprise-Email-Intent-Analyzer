# 📧 Email Intent & Priority Classification System
### AI-powered email classification with FastAPI, Spring Boot, React, and MySQL
## 🚀 Overview

This project is an end-to-end AI system that automatically classifies email text into predefined intent categories such as:

- Complaint

- Inquiry

- Request

- Appreciation

- Job Application

- Spam

It also stores predictions for analytics and displays results on a beautiful React dashboard.

This system is built using a microservice architecture, where:

- FastAPI (Python) → ML Model Service

- Spring Boot (Java) → Backend API + Database Layer

- React.js → Frontend (Classifier + Dashboard UI)

- MySQL → Data Storage for Predictions

## 🧠 Features
### 🔍 1. Machine Learning Email Intent Classification

- Trained on 800 synthetic email samples

- Uses TF–IDF + Multinomial Naive Bayes

- Returns:

   - intent

   - confidence score

### ⚙️ 2. FastAPI ML Microservice

- Loads model (email_intent_model.pkl)

- Loads vectorizer (email_tfidf.pkl)

- Provides prediction API:

#### POST /predict
```bash
{
  "text": "I want to return my order. It arrived damaged."
}
```

### 🏗️ 3. Spring Boot Backend

Handles:

- Calling FastAPI ML service

- Storing predictions in MySQL

- Serving analytics data to frontend

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/analyze` | Predict intent of email text |
| GET    | `/api/stats`   | Get analytics (counts + recent predictions) |

### 🗄️ 4. MySQL Database Integration

Table: ```bash email_prediction```

Fields:

- ```bash id```

- ```bash email_text```

- ```bash intent```

- ```bash confidence```

- ```bash created_at```

### 🖥️ 5. React Frontend + Dashboard

Two main pages:

### ✔ Email Classifier Page

Allows users to:

- Enter email

- Perform ML-based prediction

- See result + confidence score

### ✔ Analytics Dashboard

Includes:

- Pie chart (intent distribution)

- Table of recent predictions

- Sidebar navigation

### 🧩 Architecture Diagram
```bash
 ┌──────────────┐        ┌────────────┐       ┌──────────────┐
 │   React UI    │ <----> │ Spring Boot│ <----> │   MySQL DB   │
 └──────────────┘        └────────────┘       └──────────────┘
         │                       │
         │                       │
         └──────────────→────────┘
              HTTP POST /predict
      (FastAPI ML Microservice)
```

### 📦 Tech Stack
#### Machine Learning

- Python

- Scikit-learn

- Pandas

- FastAPI

- Uvicorn

- Joblib

#### Backend

- Java

- Spring Boot

- RestTemplate

- Spring Data JPA

#### Frontend

- React.js

- Material UI

- Chart.js

#### Database

- MySQL 8+

### 🛠️ Installation & Setup
#### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/EmailIntentAI.git
cd EmailIntentAI
```

#### 2️⃣ Setup ML Service (FastAPI)
```bash
cd ml-model
pip install -r requirements.txt
uvicorn ml_service:app --reload --port 8001
```

#### 3️⃣ Setup Spring Boot Backend

Update ```bash application.properties:```
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/email_intent_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```bash

Run backend:
```bash
mvn spring-boot:run
```

#### 4️⃣ Run React Frontend
```bash
cd frontend-react
npm install
npm start
```

App will run at:
👉 http://localhost:3000

### 📊 Screenshots
<img width="1915" height="867" alt="Screenshot 2025-12-12 185316" src="https://github.com/user-attachments/assets/b1b3e0c4-0b50-4e2b-be78-e88ee81b88f9" />

<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/9204d43b-a695-458a-9e10-b31188ff6182" />


### 📝 Future Enhancements

- Priority classification (High/Medium/Low)

- Multi-label classification

- JWT-based authentication

- Role-based dashboard

- Email routing automation

### 👨‍💻 Author

Vasanth Kumar
AI | Java | Full-Stack Developer
Feel free to connect on LinkedIn!
