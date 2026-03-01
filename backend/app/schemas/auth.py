from typing import Optional
from pydantic import BaseModel, EmailStr, Field, validator

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=20)
    full_name: str = Field(..., min_length=2, max_length=50)
    password: str = Field(..., min_length=8)
    role: str = "buyer"
    
    @validator("username")
    def username_alphanumeric(cls, v):
        assert v.isalnum(), "Username must be alphanumeric"
        return v
    
    @validator("role")
    def valid_role(cls, v):
        assert v in ["buyer", "seller", "both"], "Role must be buyer, seller, or both"
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str
