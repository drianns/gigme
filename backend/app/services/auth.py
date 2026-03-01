from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional

from app.models.user import User, UserProfile
from app.schemas.auth import UserCreate
from app.core.security import verify_password, get_password_hash

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """
    Get user by email
    """
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """
    Get user by username
    """
    return db.query(User).filter(User.username == username).first()

def register_user(db: Session, user_data: UserCreate) -> Optional[User]:
    """
    Register a new user
    """
    # Check if user with email or username already exists
    if get_user_by_email(db, user_data.email) or get_user_by_username(db, user_data.username):
        return None
    
    # Create user
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=hashed_password,
        role=user_data.role
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create user profile
    profile = UserProfile(user_id=user.id)
    db.add(profile)
    db.commit()
    
    return user

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """
    Authenticate user
    """
    user = get_user_by_email(db, email)
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user
