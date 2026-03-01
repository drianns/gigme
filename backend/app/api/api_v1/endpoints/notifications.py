from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.notification import Notification, NotificationUpdate
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.notifications import (
    get_user_notifications, mark_notification_read, 
    mark_all_notifications_read, delete_notification
)

router = APIRouter()

@router.get("/", response_model=List[Notification])
async def read_notifications(
    skip: int = 0,
    limit: int = 20,
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get user notifications
    """
    notifications = get_user_notifications(
        db, 
        current_user.id, 
        skip=skip, 
        limit=limit, 
        unread_only=unread_only
    )
    return notifications

@router.put("/{notification_id}/read", response_model=Notification)
async def mark_as_read(
    notification_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Mark notification as read
    """
    notification = mark_notification_read(db, notification_id, current_user.id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Notification with id '{notification_id}' not found or you don't have permission"
        )
    return notification

@router.put("/read-all", status_code=status.HTTP_200_OK)
async def mark_all_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Mark all notifications as read
    """
    count = mark_all_notifications_read(db, current_user.id)
    return {"message": f"Marked {count} notifications as read"}

@router.delete("/{notification_id}", status_code=status.HTTP_200_OK)
async def delete_notification_endpoint(
    notification_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete notification
    """
    success = delete_notification(db, notification_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Notification with id '{notification_id}' not found or you don't have permission"
        )
    return {"message": "Notification deleted successfully"}
