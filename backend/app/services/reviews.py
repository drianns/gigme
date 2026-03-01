from sqlalchemy.orm import Session
from typing import Optional

from app.models.review import Review
from app.models.order import Order
from app.schemas.review import ReviewCreate

def create_review(db: Session, review_data: ReviewCreate, reviewer_id: str) -> Review:
    """
    Create review for completed order
    """
    # Get order
    order = db.query(Order).filter(Order.id == review_data.order_id).first()
    
    if not order:
        raise ValueError("Order not found")
    
    # Check if order is completed
    if order.status != "completed":
        raise ValueError("Order must be completed to leave a review")
    
    # Check if user is the buyer
    if str(order.buyer_id) != reviewer_id:
        raise ValueError("Only the buyer can leave a review")
    
    # Check if review already exists
    existing_review = db.query(Review).filter(Review.order_id == review_data.order_id).first()
    if existing_review:
        raise ValueError("Review already exists for this order")
    
    # Create review
    review = Review(
        order_id=review_data.order_id,
        reviewer_id=reviewer_id,
        reviewee_id=order.seller_id,
        rating=review_data.rating,
        comment=review_data.comment
    )
    
    db.add(review)
    db.commit()
    db.refresh(review)
    
    # Update seller stats
    update_seller_stats(db, str(order.seller_id))
    
    return review

def get_review_by_id(db: Session, review_id: str) -> Optional[Review]:
    """
    Get review by ID
    """
    return db.query(Review).filter(Review.id == review_id).first()

def get_review_by_order_id(db: Session, order_id: str) -> Optional[Review]:
    """
    Get review by order ID
    """
    return db.query(Review).filter(Review.order_id == order_id).first()

def add_review_response(db: Session, review_id: str, response: str, user_id: str) -> Optional[Review]:
    """
    Add seller response to review
    """
    review = get_review_by_id(db, review_id)
    
    if not review:
        return None
    
    # Check if user is the reviewee (seller)
    if str(review.reviewee_id) != user_id:
        return None
    
    # Add response
    review.response = response
    
    db.commit()
    db.refresh(review)
    
    return review

def update_seller_stats(db: Session, seller_id: str) -> None:
    """
    Update seller stats based on reviews
    """
    from app.models.user import User
    from app.models.social import SellerStats
    from sqlalchemy import func
    
    # Get all reviews for seller
    reviews = db.query(Review).filter(Review.reviewee_id == seller_id).all()
    
    if not reviews:
        return
    
    # Calculate average rating
    average_rating = sum(review.rating for review in reviews) / len(reviews)
    
    # Get seller stats or create if not exists
    seller_stats = db.query(SellerStats).filter(SellerStats.user_id == seller_id).first()
    
    if not seller_stats:
        seller_stats = SellerStats(user_id=seller_id)
        db.add(seller_stats)
    
    # Get total orders and revenue
    from app.models.order import Order
    total_orders = db.query(func.count(Order.id)).filter(
        Order.seller_id == seller_id,
        Order.status == "completed"
    ).scalar()
    
    total_revenue = db.query(func.sum(Order.seller_earning)).filter(
        Order.seller_id == seller_id,
        Order.status == "completed"
    ).scalar() or 0
    
    # Calculate completion rate
    all_orders = db.query(func.count(Order.id)).filter(
        Order.seller_id == seller_id,
        Order.status.in_(["completed", "cancelled"])
    ).scalar()
    
    completion_rate = (total_orders / all_orders * 100) if all_orders > 0 else 100
    
    # Update seller stats
    seller_stats.total_orders = total_orders
    seller_stats.total_revenue = total_revenue
    seller_stats.average_rating = round(average_rating, 2)
    seller_stats.completion_rate = round(completion_rate, 2)
    
    # Update level based on orders and rating
    if total_orders >= 100 and average_rating >= 4.5:
        seller_stats.level = 3  # Top Rated
    elif total_orders >= 50 and average_rating >= 4.0:
        seller_stats.level = 2  # Level 2
    else:
        seller_stats.level = 1  # Level 1
    
    db.commit()
