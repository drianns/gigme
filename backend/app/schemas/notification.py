from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class NotificationBase(BaseModel):
    type: str
    title: str
    message: str
    link: Optional[str] = None

class NotificationCreate(NotificationBase):
    user_id: UUID

class Notification(NotificationBase):
    id: UUID
    user_id: UUID
    is_read: bool = False
    created_at: datetime
    
    class Config:
        orm_mode = True

class NotificationUpdate(BaseModel):
    is_read: bool = True
