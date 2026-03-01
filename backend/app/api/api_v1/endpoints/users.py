from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from app.db.session import get_db
from app.schemas.user import User, UserUpdate, UserPublic
from app.core.security import get_current_user, get_current_active_user
from app.services.users import (
    get_user_by_username, update_user, get_user_gigs, 
    get_user_reviews_as_seller, get_user_reviews_as_buyer, update_user_avatar
)
from app.schemas.gig import Gig
from app.schemas.review import Review

router = APIRouter()

@router.get("/me", response_model=User)
async def read_users_me(current_user = Depends(get_current_user)):
    """
    Get current user
    """
    return current_user

@router.put("/me", response_model=User)
async def update_user_me(
    user_update: UserUpdate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update current user
    """
    updated_user = update_user(db, current_user.id, user_update)
    return updated_user

@router.get("/{username}", response_model=UserPublic)
async def read_user(username: str, db: Session = Depends(get_db)):
    """
    Get user by username
    """
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {username} not found"
        )
    return user

@router.get("/{username}/gigs", response_model=List[Gig])
async def read_user_gigs(
    username: str, 
    active_only: bool = False,
    db: Session = Depends(get_db)
):
    """
    Get user gigs
    """
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {username} not found"
        )
    
    return get_user_gigs(db, user.id, active_only)

@router.get("/{username}/reviews", response_model=List[Review])
async def read_user_reviews(
    username: str, 
    as_seller: bool = True,
    db: Session = Depends(get_db)
):
    """
    Get user reviews
    """
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {username} not found"
        )
    
    if as_seller:
        return get_user_reviews_as_seller(db, user.id)
    else:
        return get_user_reviews_as_buyer(db, user.id)

@router.put("/me/avatar")
async def update_user_avatar_endpoint(
    file: UploadFile = File(...),
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update user avatar
    """
    # TODO: Implement file upload to Supabase storage
    # For now, we'll just use a placeholder URL
    avatar_url = f"/avatars/{uuid.uuid4()}.jpg"
    
    user = update_user_avatar(db, current_user.id, avatar_url)
    
    return {"avatar_url": user.avatar_url}
