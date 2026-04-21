# 🔐 Auth App (Full Stack Monorepo)

A full-stack authentication system built with **FastAPI (backend)** and **React + Vite (frontend)**, using **PostgreSQL** for persistent storage.
Deployed on cloud platforms with a scalable monorepo architecture.

---

## 🌐 Live Demo

* **Frontend (Vercel):** https://auth-app-six-taupe.vercel.app
* **Backend API:** https://authapp-0vev.onrender.com
* **API Docs:** https://authapp-0vev.onrender.com/docs

---

## 🚀 Features

### 🔧 Backend (FastAPI)

* User Registration & Login
* JWT Authentication
* Protected Routes (`/me`)
* Password Hashing (Argon2)
* PostgreSQL Integration (Render)
* REST API with Swagger Docs

### 🎨 Frontend (React + Vite)

* Signup & Login UI
* API Integration with backend
* Fast development using Vite
* Responsive UI

---

## 🛠️ Tech Stack

### Backend

* FastAPI
* PostgreSQL
* SQLAlchemy
* python-jose (JWT)
* Passlib (argon2)
* Uvicorn

### Frontend

* React
* Vite
* Fetch API / Axios
* CSS / Tailwind

---

## 📁 Monorepo Structure

```id="8b9d2k"
authapp/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── utils/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│
└── README.md
```

---

## ⚙️ Local Setup

---

### 🔹 Backend Setup

```bash id="c3k7zm"
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env`:

```env id="y7p4nt"
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run backend:

```bash id="w9x2jq"
uvicorn app.main:app --reload
```

---

### 🔹 Frontend Setup

```bash id="k6z1pw"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```id="m2n8vx"
http://localhost:5173
```

---

## 🔗 Frontend ↔ Backend Connection

Update API base URL in frontend:

```js id="v1r8qp"
const BASE_URL = "https://authapp-0vev.onrender.com";
```

---

## 🌐 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/auth/register | Register new user      |
| POST   | /api/auth/login    | Login user             |
| GET    | /api/auth/me       | Get current user (JWT) |

---

## 🔐 Protected Route: `/me`

Returns authenticated user details. Requires a valid JWT token.

---

### 📌 Endpoint

```http id="v0s8qa"
GET /api/auth/me
```

---

### 🔑 Authentication

```http id="h2c5yk"
Authorization: Bearer <your_access_token>
```

---

### ✅ Success Response

```json id="z8x3kn"
{
  "id": 1,
  "email": "test@gmail.com"
}
```

---

### ❌ Error Responses

```json id="d4p6yb"
{
  "detail": "Invalid or expired token"
}
```

---

### 🔄 Flow

1. User logs in via `/api/auth/login`
2. Receives JWT token
3. Sends token in Authorization header
4. `/me` verifies token
5. Returns user details

---

## 🧪 API Documentation

* Swagger UI: https://authapp-0vev.onrender.com/docs

---

## 🗄️ Database

* PostgreSQL (hosted on Render)
* Connected using `DATABASE_URL`
* Tables auto-created via SQLAlchemy

---

## 🔐 Authentication Flow

1. User registers via frontend
2. Password hashed using Argon2
3. User logs in → JWT token generated
4. Frontend stores token
5. Token used for protected routes (`/me`)

---

## 🚀 Deployment

### Backend (Render)

* Connected to GitHub repo
* PostgreSQL database attached
* Environment variables configured

### Frontend (Vercel)

* Deployed separately
* Connected to backend API

---

## ⚠️ Common Issues

* CORS errors → allow frontend origin or use `*`
* DB not persisting → ensure PostgreSQL is used
* Swagger not loading → check CORS settings
* Missing dependencies → update `requirements.txt`

---

## 🔮 Future Improvements

* Refresh Tokens
* Email Verification
* Password Reset
* Role-Based Access Control
* Docker Support
* CI/CD Pipeline

---

## 👨‍💻 Author

Vedant Sahai

---

## 📜 License

MIT License
