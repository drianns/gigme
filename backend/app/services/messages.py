from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.message import Conversation, Message
from app.schemas.message import MessageCreate

def get_user_conversations(db: Session, user_id: str) -> List[Conversation]:
    """
    Get user conversations
    """
    return db.query(Conversation).filter(
        Conversation.participant_ids.any(user_id)
    ).order_by(Conversation.last_message_at.desc()).all()

def get_conversation_by_id(db: Session, conversation_id: str, user_id: str) -> Optional[Conversation]:
    """
    Get conversation by ID
    """
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
    
    # Check if user is participant
    if conversation and user_id in [str(id) for id in conversation.participant_ids]:
        return conversation
    
    return None

def create_conversation(db: Session, participant_ids: List[str], order_id: Optional[str] = None) -> Conversation:
    """
    Create new conversation
    """
    # Check if conversation already exists between participants
    existing = db.query(Conversation).filter(
        Conversation.participant_ids.contains(participant_ids)
    ).first()
    
    if existing:
        return existing
    
    # Create conversation
    conversation = Conversation(
        participant_ids=participant_ids,
        order_id=order_id
    )
    
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    return conversation

def create_message(db: Session, message_data: MessageCreate, sender_id: str) -> Message:
    """
    Create new message
    """
    # Get conversation
    conversation = get_conversation_by_id(db, message_data.conversation_id, sender_id)
    
    if not conversation:
        raise ValueError("Conversation not found or you are not a participant")
    
    # Create message
    message = Message(
        conversation_id=message_data.conversation_id,
        sender_id=sender_id,
        content=message_data.content,
        attachments=message_data.attachments
    )
    
    db.add(message)
    
    # Update conversation last_message_at
    conversation.last_message_at = datetime.utcnow()
    
    db.commit()
    db.refresh(message)
    
    return message

def get_conversation_messages(
    db: Session,
    conversation_id: str,
    user_id: str,
    skip: int = 0,
    limit: int = 50
) -> List[Message]:
    """
    Get conversation messages
    """
    conversation = get_conversation_by_id(db, conversation_id, user_id)
    
    if not conversation:
        raise ValueError("Conversation not found or you are not a participant")
    
    return db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at.desc()).offset(skip).limit(limit).all()

def mark_messages_as_read(db: Session, conversation_id: str, user_id: str) -> int:
    """
    Mark all messages in conversation as read
    """
    conversation = get_conversation_by_id(db, conversation_id, user_id)
    
    if not conversation:
        raise ValueError("Conversation not found or you are not a participant")
    
    # Update all unread messages not sent by the user
    result = db.query(Message).filter(
        Message.conversation_id == conversation_id,
        Message.sender_id != user_id,
        Message.is_read == False
    ).update({"is_read": True})
    
    db.commit()
    
    return result
