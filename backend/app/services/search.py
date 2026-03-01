from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from sqlalchemy import or_, func

from app.models.gig import Gig, GigTag
from app.models.user import User
from app.models.category import Category

def search_gigs(
    db: Session,
    query: str,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    delivery_time: Optional[int] = None,
    rating: Optional[float] = None,
    skip: int = 0,
    limit: int = 20
) -> List[Gig]:
    """
    Search gigs
    """
    search_query = db.query(Gig).filter(Gig.status == "active")
    
    # Apply text search
    if query:
        search_query = search_query.filter(
            or_(
                Gig.title.ilike(f"%{query}%"),
                Gig.description.ilike(f"%{query}%"),
                Gig.id.in_(
                    db.query(GigTag.gig_id).filter(GigTag.tag.ilike(f"%{query}%"))
                )
            )
        )
    
    # Apply category filter
    if category:
        category_obj = db.query(Category).filter(Category.slug == category).first()
        if category_obj:
            # Include subcategories
            category_ids = [category_obj.id]
            subcategories = db.query(Category).filter(Category.parent_id == category_obj.id).all()
            category_ids.extend([sub.id for sub in subcategories])
            
            search_query = search_query.filter(Gig.category_id.in_(category_ids))
    
    # Apply price filter
    if min_price is not None or max_price is not None:
        from app.models.gig import GigPackage
        
        # Join with packages
        search_query = search_query.join(GigPackage)
        
        if min_price is not None:
            search_query = search_query.filter(GigPackage.price >= min_price)
        
        if max_price is not None:
            search_query = search_query.filter(GigPackage.price <= max_price)
    
    # Apply delivery time filter
    if delivery_time is not None:
        search_query = search_query.filter(Gig.delivery_time_days <= delivery_time)
    
    # Apply rating filter
    if rating is not None:
        from app.models.review import Review
        from sqlalchemy import func
        
        # Subquery to get average rating
        avg_ratings = db.query(
            Review.reviewee_id,
            func.avg(Review.rating).label("avg_rating")
        ).group_by(Review.reviewee_id).subquery()
        
        search_query = search_query.join(
            avg_ratings,
            Gig.seller_id == avg_ratings.c.reviewee_id
        ).filter(avg_ratings.c.avg_rating >= rating)
    
    # Apply pagination
    search_query = search_query.offset(skip).limit(limit)
    
    return search_query.all()

def search_sellers(
    db: Session,
    query: str,
    skip: int = 0,
    limit: int = 20
) -> List[User]:
    """
    Search sellers
    """
    search_query = db.query(User).filter(
        or_(
            User.role == "seller",
            User.role == "both"
        )
    )
    
    # Apply text search
    if query:
        search_query = search_query.filter(
            or_(
                User.username.ilike(f"%{query}%"),
                User.full_name.ilike(f"%{query}%"),
                User.bio.ilike(f"%{query}%")
            )
        )
    
    # Apply pagination
    search_query = search_query.offset(skip).limit(limit)
    
    return search_query.all()

def get_search_suggestions(
    db: Session,
    query: str,
    limit: int = 5
) -> Dict[str, List[Dict[str, Any]]]:
    """
    Get search suggestions for autocomplete
    """
    suggestions = {
        "gigs": [],
        "categories": [],
        "tags": []
    }
    
    if not query or len(query) < 2:
        return suggestions
    
    # Get gig suggestions
    gig_results = db.query(Gig.title, Gig.slug).filter(
        Gig.status == "active",
        Gig.title.ilike(f"%{query}%")
    ).limit(limit).all()
    
    suggestions["gigs"] = [{"title": g.title, "slug": g.slug} for g in gig_results]
    
    # Get category suggestions
    category_results = db.query(Category.name, Category.slug).filter(
        Category.name.ilike(f"%{query}%")
    ).limit(limit).all()
    
    suggestions["categories"] = [{"name": c.name, "slug": c.slug} for c in category_results]
    
    # Get tag suggestions
    tag_results = db.query(GigTag.tag).filter(
        GigTag.tag.ilike(f"%{query}%")
    ).distinct().limit(limit).all()
    
    suggestions["tags"] = [{"tag": t.tag} for t in tag_results]
    
    return suggestions
