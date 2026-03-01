from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, validator
from uuid import UUID

class OrderDeliveryBase(BaseModel):
    message: Optional[str] = None
    files: Optional[List[Dict[str, str]]] = None  # [{url: "", name: ""}]

class OrderDelivery(OrderDeliveryBase):
    id: UUID
    order_id: UUID
    delivered_at: datetime
    
    class Config:
        orm_mode = True

class OrderRevisionBase(BaseModel):
    message: str

class OrderRevision(OrderRevisionBase):
    id: UUID
    order_id: UUID
    requested_at: datetime
    
    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    gig_id: UUID
    package_id: UUID
    brief: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    
    @validator("status")
    def valid_status(cls, v):
        valid_statuses = ["pending", "in_progress", "delivered", "revision", "completed", "cancelled", "disputed"]
        if v is not None and v not in valid_statuses:
            raise ValueError(f"Status must be one of: {', '.join(valid_statuses)}")
        return v

class Order(OrderBase):
    id: UUID
    buyer_id: UUID
    seller_id: UUID
    status: str
    amount: int
    platform_fee: int
    seller_earning: int
    delivery_date: Optional[datetime] = None
    revision_count_used: int = 0
    created_at: datetime
    completed_at: Optional[datetime] = None
    deliveries: List[OrderDelivery] = []
    revisions: List[OrderRevision] = []
    gig: Any  # This will be a simplified Gig schema
    buyer: Any  # This will be a simplified User schema
    seller: Any  # This will be a simplified User schema
    
    class Config:
        orm_mode = True
