from pydantic import BaseModel, EmailStr, field_validator
import re

# ─── Request Schemas ─────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character")
        return v

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ─── Response Schemas ────────────────────────────────────────────────

class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    message: str
    user: UserResponse
    token: str

class MessageResponse(BaseModel):
    message: str