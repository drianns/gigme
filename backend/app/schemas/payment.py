from typing import Optional, Dict, Any
from pydantic import BaseModel
from uuid import UUID

class PaymentCreate(BaseModel):
    order_id: UUID
    payment_method: str
    
    class Config:
        schema_extra = {
            "example": {
                "order_id": "123e4567-e89b-12d3-a456-426614174000",
                "payment_method": "gopay"
            }
        }

class PaymentResponse(BaseModel):
    transaction_id: UUID
    order_id: UUID
    amount: int
    status: str
    payment_url: Optional[str] = None
    qr_code_url: Optional[str] = None
    deep_link: Optional[str] = None
    expiry_time: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
                "order_id": "123e4567-e89b-12d3-a456-426614174000",
                "amount": 50000,
                "status": "pending",
                "payment_url": "https://payment-gateway.com/pay/123456",
                "qr_code_url": "https://payment-gateway.com/qr/123456",
                "deep_link": "gopay://payment?id=123456",
                "expiry_time": "2025-12-03T08:30:00Z"
            }
        }
