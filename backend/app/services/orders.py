from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.order import Order, OrderDelivery, OrderRevision
from app.models.gig import Gig, GigPackage
from app.schemas.order import OrderCreate
from app.core.config import settings

def create_order(db: Session, order_data: OrderCreate, buyer_id: str) -> Order:
    """
    Create new order
    """
    # Get gig and package
    gig = db.query(Gig).filter(Gig.id == order_data.gig_id).first()
    package = db.query(GigPackage).filter(GigPackage.id == order_data.package_id).first()
    
    if not gig or not package:
        raise ValueError("Gig or package not found")
    
    # Calculate fees
    amount = package.price
    platform_fee = int(amount * settings.PLATFORM_FEE_PERCENTAGE)
    seller_earning = amount - platform_fee
    
    # Create order
    order = Order(
        buyer_id=buyer_id,
        seller_id=gig.seller_id,
        gig_id=gig.id,
        package_id=package.id,
        amount=amount,
        platform_fee=platform_fee,
        seller_earning=seller_earning,
        brief=order_data.brief,
        status="pending"
    )
    
    db.add(order)
    db.commit()
    db.refresh(order)
    
    return order

def get_order_by_id(db: Session, order_id: str) -> Optional[Order]:
    """
    Get order by ID
    """
    return db.query(Order).filter(Order.id == order_id).first()

def get_user_orders(db: Session, user_id: str, role: str = "buyer", status: str = None) -> List[Order]:
    """
    Get user orders as buyer or seller
    """
    query = db.query(Order)
    
    if role == "buyer":
        query = query.filter(Order.buyer_id == user_id)
    else:
        query = query.filter(Order.seller_id == user_id)
    
    if status:
        query = query.filter(Order.status == status)
    
    return query.order_by(Order.created_at.desc()).all()

def update_order_status(db: Session, order_id: str, status: str) -> Order:
    """
    Update order status
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise ValueError("Order not found")
    
    order.status = status
    
    # If status is completed, set completed_at
    if status == "completed":
        order.completed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(order)
    
    return order

def create_order_delivery(db: Session, order_id: str, message: str, files: List[dict]) -> OrderDelivery:
    """
    Create order delivery
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise ValueError("Order not found")
    
    delivery = OrderDelivery(
        order_id=order_id,
        message=message,
        files=files
    )
    
    db.add(delivery)
    
    # Update order status to delivered
    order.status = "delivered"
    
    db.commit()
    db.refresh(delivery)
    
    return delivery

def create_order_revision(db: Session, order_id: str, message: str) -> OrderRevision:
    """
    Create order revision
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        raise ValueError("Order not found")
    
    # Check if revision count is exceeded
    package = db.query(GigPackage).filter(GigPackage.id == order.package_id).first()
    
    if order.revision_count_used >= package.revision_count:
        raise ValueError("Revision limit exceeded")
    
    revision = OrderRevision(
        order_id=order_id,
        message=message
    )
    
    db.add(revision)
    
    # Update order status to revision and increment revision count
    order.status = "revision"
    order.revision_count_used += 1
    
    db.commit()
    db.refresh(revision)
    
    return revision

def cancel_order(db: Session, order_id: str, user_id: str) -> Optional[Order]:
    """
    Cancel order
    """
    order = get_order_by_id(db, order_id)
    
    if not order:
        return None
    
    # Check if user is buyer or seller
    if str(order.buyer_id) != user_id and str(order.seller_id) != user_id:
        return None
    
    # Only allow cancellation for pending or in_progress orders
    if order.status not in ["pending", "in_progress"]:
        raise ValueError(f"Order in {order.status} status cannot be cancelled")
    
    # Update order status
    order.status = "cancelled"
    db.commit()
    db.refresh(order)
    
    # TODO: Handle refund if payment was made
    
    return order

def open_dispute(db: Session, order_id: str, user_id: str, reason: str) -> Optional[Order]:
    """
    Open dispute for order
    """
    from app.models.order import Dispute
    
    order = get_order_by_id(db, order_id)
    
    if not order:
        return None
    
    # Check if user is buyer or seller
    if str(order.buyer_id) != user_id and str(order.seller_id) != user_id:
        return None
    
    # Only allow disputes for active orders
    if order.status in ["completed", "cancelled", "disputed"]:
        raise ValueError(f"Cannot open dispute for order in {order.status} status")
    
    # Create dispute
    dispute = Dispute(
        order_id=order_id,
        raised_by=user_id,
        reason=reason,
        status="open"
    )
    
    db.add(dispute)
    
    # Update order status
    order.status = "disputed"
    
    db.commit()
    db.refresh(order)
    
    return order
