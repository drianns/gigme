from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.order import Order, OrderCreate, OrderUpdate
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.orders import create_order, get_user_orders, get_order_by_id, update_order_status

router = APIRouter()

@router.post("/", response_model=Order)
async def create_new_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create new order
    """
    order = create_order(db, order_data, current_user.id)
    return order

@router.get("/", response_model=List[Order])
async def read_user_orders(
    status: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get user orders (as buyer)
    """
    orders = get_user_orders(db, current_user.id, role="buyer", status=status)
    return orders

@router.get("/selling", response_model=List[Order])
async def read_seller_orders(
    status: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get user orders (as seller)
    """
    if current_user.role not in ["seller", "both"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only sellers can access this endpoint"
        )
    
    orders = get_user_orders(db, current_user.id, role="seller", status=status)
    return orders

@router.get("/{order_id}", response_model=Order)
async def read_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get order by ID
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found"
        )
    
    # Check if user is buyer or seller of this order
    if order.buyer_id != current_user.id and order.seller_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this order"
        )
    
    return order

@router.put("/{order_id}/accept", response_model=Order)
async def accept_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Seller accepts order
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found"
        )
    
    # Check if user is the seller of this order
    if order.seller_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can accept this order"
        )
    
    # Check if order is in pending status
    if order.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order is already {order.status}"
        )
    
    updated_order = update_order_status(db, order_id, "in_progress")
    return updated_order

@router.post("/{order_id}/deliver", status_code=status.HTTP_200_OK)
async def deliver_order(
    order_id: str,
    message: str,
    files: List[dict] = [],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Seller delivers work
    """
    from app.services.orders import create_order_delivery
    
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found"
        )
    
    # Check if user is the seller of this order
    if order.seller_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can deliver this order"
        )
    
    # Check if order is in in_progress or revision status
    if order.status not in ["in_progress", "revision"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order must be in in_progress or revision status to deliver"
        )
    
    try:
        delivery = create_order_delivery(db, order_id, message, files)
        return {"message": "Order delivered successfully", "delivery_id": str(delivery.id)}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{order_id}/revision", status_code=status.HTTP_200_OK)
async def request_revision(
    order_id: str,
    message: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Buyer requests revision
    """
    from app.services.orders import create_order_revision
    
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found"
        )
    
    # Check if user is the buyer of this order
    if order.buyer_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the buyer can request revision for this order"
        )
    
    # Check if order is in delivered status
    if order.status != "delivered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order must be in delivered status to request revision"
        )
    
    try:
        revision = create_order_revision(db, order_id, message)
        return {"message": "Revision requested successfully", "revision_id": str(revision.id)}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/{order_id}/complete", response_model=Order)
async def complete_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Buyer marks order as complete
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found"
        )
    
    # Check if user is the buyer of this order
    if order.buyer_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the buyer can complete this order"
        )
    
    # Check if order is in delivered status
    if order.status != "delivered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order must be in delivered status to complete"
        )
    
    updated_order = update_order_status(db, order_id, "completed")
    return updated_order

@router.put("/{order_id}/cancel", response_model=Order)
async def cancel_order_endpoint(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Cancel order
    """
    from app.services.orders import cancel_order
    
    try:
        order = cancel_order(db, order_id, current_user.id)
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Order with id '{order_id}' not found or you don't have permission"
            )
        return order
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{order_id}/dispute", response_model=Order)
async def open_dispute_endpoint(
    order_id: str,
    reason: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Open dispute
    """
    from app.services.orders import open_dispute
    
    try:
        order = open_dispute(db, order_id, current_user.id, reason)
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Order with id '{order_id}' not found or you don't have permission"
            )
        return order
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
