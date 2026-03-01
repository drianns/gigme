from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, validator
from uuid import UUID

class GigPackageBase(BaseModel):
    tier: str
    name: str
    description: str
    price: int
    delivery_time_days: int
    revision_count: int = 1
    features: Optional[List[str]] = None

class GigPackageCreate(GigPackageBase):
    @validator("tier")
    def valid_tier(cls, v):
        assert v in ["basic", "standard", "premium"], "Tier must be basic, standard, or premium"
        return v
    
    @validator("price")
    def valid_price(cls, v):
        assert v >= 10000, "Price must be at least 10,000 IDR"
        return v
    
    @validator("delivery_time_days")
    def valid_delivery_time(cls, v):
        assert 1 <= v <= 30, "Delivery time must be between 1 and 30 days"
        return v
    
    @validator("revision_count")
    def valid_revision_count(cls, v):
        assert 0 <= v <= 10, "Revision count must be between 0 and 10"
        return v

class GigPackage(GigPackageBase):
    id: UUID
    gig_id: UUID
    
    class Config:
        orm_mode = True

class GigImageBase(BaseModel):
    url: str
    order: int = 0
    is_cover: bool = False

class GigImage(GigImageBase):
    id: UUID
    gig_id: UUID
    
    class Config:
        orm_mode = True

class GigBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=80)
    description: str = Field(..., min_length=50)
    requirements: Optional[str] = None
    category_id: UUID
    delivery_time_days: int
    revision_count: int = 1
    tags: Optional[List[str]] = None

class GigCreate(GigBase):
    packages: List[GigPackageCreate]
    
    @validator("delivery_time_days")
    def valid_delivery_time(cls, v):
        assert 1 <= v <= 30, "Delivery time must be between 1 and 30 days"
        return v
    
    @validator("revision_count")
    def valid_revision_count(cls, v):
        assert 0 <= v <= 10, "Revision count must be between 0 and 10"
        return v
    
    @validator("packages")
    def validate_packages(cls, v):
        tiers = [pkg.tier for pkg in v]
        required_tiers = ["basic", "standard", "premium"]
        
        # Check for duplicate tiers
        if len(tiers) != len(set(tiers)):
            raise ValueError("Duplicate package tiers are not allowed")
        
        # Check that at least basic tier is present
        if "basic" not in tiers:
            raise ValueError("At least the basic package tier is required")
            
        return v

class GigUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    category_id: Optional[UUID] = None
    delivery_time_days: Optional[int] = None
    revision_count: Optional[int] = None
    status: Optional[str] = None
    tags: Optional[List[str]] = None
    
    @validator("status")
    def valid_status(cls, v):
        if v is not None:
            assert v in ["draft", "active", "paused", "deleted"], "Status must be draft, active, paused, or deleted"
        return v

class Gig(GigBase):
    id: UUID
    seller_id: UUID
    slug: str
    status: str
    view_count: int = 0
    order_count: int = 0
    is_featured: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None
    packages: List[GigPackage]
    images: List[GigImage]
    seller: Any  # This will be a UserPublic schema
    
    class Config:
        orm_mode = True
