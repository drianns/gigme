from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.review import Review, ReviewCreate, ReviewResponse
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.reviews import create_review, get_review_by_id, add_review_response, get_review_by_order_id

router = APIRouter()

@router.post("/", response_model=Review)
async def create_new_review(
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create review for completed order
    """
    review = create_review(db, review_data, current_user.id)
    return review

@router.get("/{review_id}", response_model=Review)
async def read_review(
    review_id: str,
    db: Session = Depends(get_db)
):
    """
    Get review by ID
    """
    review = get_review_by_id(db, review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id '{review_id}' not found"
        )
    return review

@router.put("/{review_id}/response", response_model=Review)
async def respond_to_review(
    review_id: str,
    response_data: ReviewResponse,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Seller responds to review
    """
    review = add_review_response(db, review_id, response_data.response, current_user.id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id '{review_id}' not found or you don't have permission"
        )
    return review

@router.get("/order/{order_id}", response_model=Review)
async def get_review_by_order(
    order_id: str,
    db: Session = Depends(get_db)
):
    """
    Get review by order ID
    """
    review = get_review_by_order_id(db, order_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No review found for order with id '{order_id}'"
        )
    return review
