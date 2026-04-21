from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # ✅ IMPORTANT
from app.database import engine, Base
from app.routes import auth

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Auth API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS — allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def root():
    return {"message": "Auth API is running"}