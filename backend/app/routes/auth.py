from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import RegisterRequest, LoginRequest, AuthResponse, UserResponse, MessageResponse
from app.utils.hashing import hash_password, verify_password
from app.utils.token import create_token

router = APIRouter()

# ─── Register ────────────────────────────────────────────────────────
@router.post("/register", response_model=AuthResponse, status_code=201)
def register(body: RegisterRequest, db: Session = Depends(get_db)):

    # Check if email already exists
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # Hash password and create user
    user = User(
        email    = body.email,
        password = hash_password(body.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)


    return AuthResponse(
        message = "Account created successfully",
        user    = UserResponse(id=user.id, email=user.email),
    )

# ─── Login ───────────────────────────────────────────────────────────
@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):

    # Find user by email
    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(body.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate token
    token = create_token({"sub": str(user.id), "email": user.email})

    return AuthResponse(
        message = "Login successful",
        user    = UserResponse(id=user.id, email=user.email),
        token   = token
    )

# ─── Health Check ─────────────────────────────────────────────────────
@router.get("/health", response_model=MessageResponse)
def health():
    return MessageResponse(message="Auth service is healthy")