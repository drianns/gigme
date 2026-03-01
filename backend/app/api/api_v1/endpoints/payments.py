from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.db.session import get_db
from app.schemas.payment import PaymentCreate, PaymentResponse
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.payments import create_payment, process_webhook, check_payment_status

router = APIRouter()

@router.post("/create", response_model=PaymentResponse)
async def create_payment_intent(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Create payment for order
    """
    try:
        payment_response = create_payment(db, payment_data, current_user.id)
        return payment_response
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/webhook")
async def payment_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Handle payment gateway webhook
    """
    try:
        payload = await request.json()
        result = process_webhook(db, payload)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error processing webhook: {str(e)}"
        )

@router.get("/methods")
async def get_payment_methods():
    """
    Get available payment methods
    """
    return {
        "methods": [
            {"id": "gopay", "name": "GoPay", "icon": "gopay-icon.png"},
            {"id": "ovo", "name": "OVO", "icon": "ovo-icon.png"},
            {"id": "dana", "name": "DANA", "icon": "dana-icon.png"},
            {"id": "bank_transfer", "name": "Bank Transfer", "icon": "bank-icon.png"},
            {"id": "qris", "name": "QRIS", "icon": "qris-icon.png"}
        ]
    }

@router.get("/status/{transaction_id}")
async def get_payment_status(
    transaction_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Check payment status
    """
    try:
        result = check_payment_status(db, transaction_id)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
