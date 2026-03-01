from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from datetime import datetime

from app.models.notification import Notification
from app.schemas.notification import NotificationCreate

def create_notification(
    db: Session,
    user_id: str,
    notification_type: str,
    title: str,
    message: str,
    link: Optional[str] = None
) -> Notification:
    """
    Create notification for user
    """
    notification = Notification(
        user_id=user_id,
        type=notification_type,
        title=title,
        message=message,
        link=link
    )
    
    db.add(notification)
    db.commit()
    db.refresh(notification)
    
    # TODO: Send real-time notification via WebSocket or push notification
    
    return notification

def get_user_notifications(
    db: Session,
    user_id: str,
    skip: int = 0,
    limit: int = 20,
    unread_only: bool = False
) -> List[Notification]:
    """
    Get user notifications
    """
    query = db.query(Notification).filter(Notification.user_id == user_id)
    
    if unread_only:
        query = query.filter(Notification.is_read == False)
    
    return query.order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()

def mark_notification_read(db: Session, notification_id: str, user_id: str) -> Optional[Notification]:
    """
    Mark notification as read
    """
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id
    ).first()
    
    if not notification:
        return None
    
    notification.is_read = True
    db.commit()
    db.refresh(notification)
    
    return notification

def mark_all_notifications_read(db: Session, user_id: str) -> int:
    """
    Mark all notifications as read
    """
    result = db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).update({"is_read": True})
    
    db.commit()
    
    return result

def delete_notification(db: Session, notification_id: str, user_id: str) -> bool:
    """
    Delete notification
    """
    result = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id
    ).delete()
    
    db.commit()
    
    return result > 0

def create_order_notification(db: Session, order_id: str, seller_id: str) -> Notification:
    """
    Create notification for new order
    """
    from app.models.order import Order
    
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise ValueError("Order not found")
    
    return create_notification(
        db=db,
        user_id=seller_id,
        notification_type="new_order",
        title="New Order Received",
        message=f"You have received a new order for your gig.",
        link=f"/orders/{order_id}"
    )

def create_order_status_notification(
    db: Session,
    order_id: str,
    status: str,
    recipient_id: str
) -> Notification:
    """
    Create notification for order status change
    """
    from app.models.order import Order
    
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise ValueError("Order not found")
    
    title_mapping = {
        "in_progress": "Order Started",
        "delivered": "Order Delivered",
        "revision": "Revision Requested",
        "completed": "Order Completed",
        "cancelled": "Order Cancelled",
        "disputed": "Order Disputed"
    }
    
    message_mapping = {
        "in_progress": "Your order has been accepted and is now in progress.",
        "delivered": "Your order has been delivered. Please review and accept or request revisions.",
        "revision": "A revision has been requested for your order.",
        "completed": "Your order has been completed successfully.",
        "cancelled": "Your order has been cancelled.",
        "disputed": "A dispute has been opened for your order."
    }
    
    return create_notification(
        db=db,
        user_id=recipient_id,
        notification_type=f"order_{status}",
        title=title_mapping.get(status, f"Order Status: {status}"),
        message=message_mapping.get(status, f"Your order status has changed to {status}."),
        link=f"/orders/{order_id}"
    )

def create_message_notification(
    db: Session,
    conversation_id: str,
    sender_id: str,
    recipient_id: str,
    message_preview: str
) -> Notification:
    """
    Create notification for new message
    """
    sender = db.query("User").filter_by(id=sender_id).first()
    sender_name = sender.full_name if sender else "Someone"
    
    return create_notification(
        db=db,
        user_id=recipient_id,
        notification_type="new_message",
        title=f"New Message from {sender_name}",
        message=message_preview[:100] + ("..." if len(message_preview) > 100 else ""),
        link=f"/messages/{conversation_id}"
    )
