from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.db.session import get_db
from app.schemas.message import Conversation, Message, MessageCreate, ConversationCreate
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.messages import (
    get_user_conversations, get_conversation_messages, create_message,
    get_conversation_by_id, create_conversation, mark_messages_as_read
)

router = APIRouter()

@router.get("/conversations", response_model=List[Conversation])
async def read_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get user conversations
    """
    conversations = get_user_conversations(db, current_user.id)
    return conversations

@router.get("/conversations/{conversation_id}", response_model=Conversation)
async def read_conversation(
    conversation_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get conversation by ID
    """
    conversation = get_conversation_by_id(db, conversation_id, current_user.id)
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Conversation with id '{conversation_id}' not found or you are not a participant"
        )
    return conversation

@router.post("/conversations", response_model=Conversation, status_code=status.HTTP_201_CREATED)
async def create_new_conversation(
    conversation_data: ConversationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Create new conversation
    """
    # Make sure current user is in participants
    if current_user.id not in conversation_data.participant_ids:
        conversation_data.participant_ids.append(current_user.id)
    
    try:
        conversation = create_conversation(
            db, 
            participant_ids=conversation_data.participant_ids,
            order_id=conversation_data.order_id
        )
        return conversation
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/messages", response_model=Message)
async def send_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Send message
    """
    message = create_message(db, message_data, current_user.id)
    return message

@router.get("/conversations/{conversation_id}/messages", response_model=List[Message])
async def read_messages(
    conversation_id: str,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get conversation messages
    """
    messages = get_conversation_messages(db, conversation_id, current_user.id, skip, limit)
    return messages

@router.put("/conversations/{conversation_id}/read", status_code=status.HTTP_200_OK)
async def mark_conversation_read(
    conversation_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Mark all messages in conversation as read
    """
    try:
        count = mark_messages_as_read(db, conversation_id, current_user.id)
        return {"message": f"Marked {count} messages as read"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
