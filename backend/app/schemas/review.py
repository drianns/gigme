from typing import Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field, validator
from uuid import UUID

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=10)

class ReviewCreate(ReviewBase):
    order_id: UUID
    
    @validator("rating")
    def valid_rating(cls, v):
        assert 1 <= v <= 5, "Rating must be between 1 and 5"
        return v

class ReviewResponse(BaseModel):
    response: str = Field(..., min_length=10)

class Review(ReviewBase):
    id: UUID
    order_id: UUID
    reviewer_id: UUID
    reviewee_id: UUID
    response: Optional[str] = None
    is_public: bool = True
    created_at: datetime
    reviewer: Any  # This will be a simplified User schema
    reviewee: Any  # This will be a simplified User schema
    
    class Config:
        orm_mode = True
