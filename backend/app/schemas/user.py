from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    role: str
    is_verified: bool = False

class UserProfile(BaseModel):
    phone_number: Optional[str] = None
    location: Optional[str] = None
    languages: Optional[List[str]] = None
    timezone: Optional[str] = None
    social_links: Optional[Dict[str, str]] = None
    skills: Optional[List[str]] = None
    preferences: Optional[Dict[str, Any]] = None
    
    class Config:
        orm_mode = True

class SellerStats(BaseModel):
    level: int = 1
    total_orders: int = 0
    total_revenue: float = 0
    average_rating: float = 0
    completion_rate: float = 0
    response_time_hours: float = 0
    badges: Optional[List[str]] = None
    featured_until: Optional[datetime] = None
    
    class Config:
        orm_mode = True

class User(UserBase):
    id: UUID
    balance: float = 0
    created_at: datetime
    updated_at: Optional[datetime] = None
    profile: Optional[UserProfile] = None
    seller_stats: Optional[SellerStats] = None
    
    class Config:
        orm_mode = True

class UserPublic(BaseModel):
    id: UUID
    username: str
    full_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    role: str
    is_verified: bool
    profile: Optional[UserProfile] = None
    seller_stats: Optional[SellerStats] = None
    
    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    profile: Optional[UserProfile] = None
