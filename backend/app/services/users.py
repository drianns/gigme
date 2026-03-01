from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional, List

from app.models.user import User, UserProfile
from app.models.gig import Gig
from app.models.review import Review
from app.schemas.user import UserUpdate

def get_user_by_id(db: Session, user_id: str) -> Optional[User]:
    """
    Get user by ID
    """
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """
    Get user by username
    """
    return db.query(User).filter(User.username == username).first()

def update_user(db: Session, user_id: str, user_data: UserUpdate) -> User:
    """
    Update user
    """
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user fields
    for field, value in user_data.dict(exclude_unset=True, exclude={"profile"}).items():
        setattr(user, field, value)
    
    # Update profile if provided
    if user_data.profile:
        profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        if not profile:
            profile = UserProfile(user_id=user_id)
            db.add(profile)
        
        for field, value in user_data.profile.dict(exclude_unset=True).items():
            setattr(profile, field, value)
    
    db.commit()
    db.refresh(user)
    
    return user

def get_user_gigs(db: Session, user_id: str, active_only: bool = False) -> List[Gig]:
    """
    Get gigs created by a user
    """
    query = db.query(Gig).filter(Gig.seller_id == user_id)
    
    if active_only:
        query = query.filter(Gig.status == "active")
    
    return query.order_by(Gig.created_at.desc()).all()

def get_user_reviews_as_seller(db: Session, user_id: str) -> List[Review]:
    """
    Get reviews received by a user as a seller
    """
    return db.query(Review).filter(Review.reviewee_id == user_id).order_by(Review.created_at.desc()).all()

def get_user_reviews_as_buyer(db: Session, user_id: str) -> List[Review]:
    """
    Get reviews given by a user as a buyer
    """
    return db.query(Review).filter(Review.reviewer_id == user_id).order_by(Review.created_at.desc()).all()

def update_user_avatar(db: Session, user_id: str, avatar_url: str) -> User:
    """
    Update user avatar
    """
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.avatar_url = avatar_url
    db.commit()
    db.refresh(user)
    
    return user

def get_user_gigs(db: Session, user_id: str, active_only: bool = False) -> List[Gig]:
    """
    Get gigs created by a user
    """
    query = db.query(Gig).filter(Gig.seller_id == user_id)
    
    if active_only:
        query = query.filter(Gig.status == "active")
    
    return query.order_by(Gig.created_at.desc()).all()

def get_user_reviews_as_seller(db: Session, user_id: str) -> List[Review]:
    """
    Get reviews received by a user as a seller
    """
    return db.query(Review).filter(Review.reviewee_id == user_id).order_by(Review.created_at.desc()).all()

def get_user_reviews_as_buyer(db: Session, user_id: str) -> List[Review]:
    """
    Get reviews given by a user as a buyer
    """
    return db.query(Review).filter(Review.reviewer_id == user_id).order_by(Review.created_at.desc()).all()

def update_user_avatar(db: Session, user_id: str, avatar_url: str) -> User:
    """
    Update user avatar
    """
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.avatar_url = avatar_url
    db.commit()
    db.refresh(user)
    
    return user
