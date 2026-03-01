from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

class MessageBase(BaseModel):
    content: str
    attachments: Optional[List[Dict[str, str]]] = None  # [{url: "", type: "image"}]

class MessageCreate(MessageBase):
    conversation_id: UUID

class Message(MessageBase):
    id: UUID
    conversation_id: UUID
    sender_id: UUID
    is_read: bool = False
    created_at: datetime
    sender: Any  # This will be a simplified User schema
    
    class Config:
        orm_mode = True

class ConversationBase(BaseModel):
    order_id: Optional[UUID] = None
    participant_ids: List[UUID]

class ConversationCreate(ConversationBase):
    pass

class Conversation(ConversationBase):
    id: UUID
    last_message_at: Optional[datetime] = None
    created_at: datetime
    messages: List[Message] = []
    participants: List[Any] = []  # This will be a list of simplified User schemas
    
    class Config:
        orm_mode = True
