from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional
from slugify import slugify
import uuid

from app.models.gig import Gig, GigPackage, GigImage, GigTag
from app.schemas.gig import GigCreate, GigUpdate

def create_gig(db: Session, gig_data: GigCreate, seller_id: str) -> Gig:
    """
    Create new gig
    """
    # Generate slug
    base_slug = slugify(gig_data.title)
    slug = f"{base_slug}-{str(uuid.uuid4())[:8]}"
    
    # Create gig
    gig = Gig(
        seller_id=seller_id,
        title=gig_data.title,
        slug=slug,
        category_id=gig_data.category_id,
        description=gig_data.description,
        requirements=gig_data.requirements,
        delivery_time_days=gig_data.delivery_time_days,
        revision_count=gig_data.revision_count,
        status="draft"
    )
    
    db.add(gig)
    db.flush()
    
    # Create packages
    for package_data in gig_data.packages:
        package = GigPackage(
            gig_id=gig.id,
            tier=package_data.tier,
            name=package_data.name,
            description=package_data.description,
            price=package_data.price,
            delivery_time_days=package_data.delivery_time_days,
            revision_count=package_data.revision_count,
            features=package_data.features
        )
        db.add(package)
    
    # Create tags
    if gig_data.tags:
        for tag in gig_data.tags:
            gig_tag = GigTag(gig_id=gig.id, tag=tag.lower())
            db.add(gig_tag)
    
    db.commit()
    db.refresh(gig)
    
    return gig

def get_gig_by_id(db: Session, gig_id: str) -> Optional[Gig]:
    """
    Get gig by ID
    """
    return db.query(Gig).filter(Gig.id == gig_id).first()

def get_gig_by_slug(db: Session, slug: str) -> Optional[Gig]:
    """
    Get gig by slug
    """
    return db.query(Gig).filter(Gig.slug == slug).first()

def update_gig(db: Session, gig_id: str, gig_data: GigUpdate, seller_id: str) -> Optional[Gig]:
    """
    Update gig
    """
    gig = get_gig_by_id(db, gig_id)
    
    # Check if gig exists and belongs to seller
    if not gig or str(gig.seller_id) != seller_id:
        return None
    
    # Update gig fields
    for field, value in gig_data.dict(exclude_unset=True).items():
        if field != "tags":
            setattr(gig, field, value)
    
    # Update tags if provided
    if gig_data.tags is not None:
        # Delete existing tags
        db.query(GigTag).filter(GigTag.gig_id == gig_id).delete()
        
        # Create new tags
        for tag in gig_data.tags:
            gig_tag = GigTag(gig_id=gig_id, tag=tag.lower())
            db.add(gig_tag)
    
    db.commit()
    db.refresh(gig)
    
    return gig

def delete_gig(db: Session, gig_id: str, seller_id: str) -> bool:
    """
    Delete gig
    """
    gig = get_gig_by_id(db, gig_id)
    
    # Check if gig exists and belongs to seller
    if not gig or str(gig.seller_id) != seller_id:
        return False
    
    # Set status to deleted (soft delete)
    gig.status = "deleted"
    db.commit()
    
    return True

def list_gigs(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    delivery_time: Optional[int] = None,
    sort_by: Optional[str] = "created_at",
    sort_order: Optional[str] = "desc"
) -> List[Gig]:
    """
    List gigs with filters
    """
    query = db.query(Gig).filter(Gig.status == "active")
    
    # Apply filters
    if category_id:
        query = query.filter(Gig.category_id == category_id)
    
    if min_price or max_price:
        # This requires joining with packages table
        query = query.join(GigPackage)
        
        if min_price:
            query = query.filter(GigPackage.price >= min_price)
        
        if max_price:
            query = query.filter(GigPackage.price <= max_price)
    
    if delivery_time:
        query = query.filter(Gig.delivery_time_days <= delivery_time)
    
    # Apply sorting
    if sort_by == "price":
        # This requires joining with packages table
        if sort_order == "asc":
            query = query.order_by(GigPackage.price.asc())
        else:
            query = query.order_by(GigPackage.price.desc())
    else:
        # Default sorting by created_at
        if sort_order == "asc":
            query = query.order_by(Gig.created_at.asc())
        else:
            query = query.order_by(Gig.created_at.desc())
    
    # Apply pagination
    query = query.offset(skip).limit(limit)
    
    return query.all()

def add_gig_package(db: Session, gig_id: str, package_data, seller_id: str):
    """
    Add package to gig
    """
    gig = get_gig_by_id(db, gig_id)
    
    # Check if gig exists and belongs to seller
    if not gig or str(gig.seller_id) != seller_id:
        return None
    
    # Create package
    package = GigPackage(
        gig_id=gig_id,
        tier=package_data.tier,
        name=package_data.name,
        description=package_data.description,
        price=package_data.price,
        delivery_time_days=package_data.delivery_time_days,
        revision_count=package_data.revision_count,
        features=package_data.features
    )
    
    db.add(package)
    db.commit()
    db.refresh(package)
    
    return package

def like_gig(db: Session, gig_id: str, user_id: str) -> bool:
    """
    Like gig
    """
    from app.models.social import Like
    
    # Check if gig exists
    gig = get_gig_by_id(db, gig_id)
    if not gig:
        return False
    
    # Check if already liked
    existing_like = db.query(Like).filter(
        Like.user_id == user_id,
        Like.gig_id == gig_id
    ).first()
    
    if existing_like:
        return True  # Already liked
    
    # Create like
    like = Like(user_id=user_id, gig_id=gig_id)
    db.add(like)
    db.commit()
    
    return True

def unlike_gig(db: Session, gig_id: str, user_id: str) -> bool:
    """
    Unlike gig
    """
    from app.models.social import Like
    
    # Check if gig exists
    gig = get_gig_by_id(db, gig_id)
    if not gig:
        return False
    
    # Delete like if exists
    result = db.query(Like).filter(
        Like.user_id == user_id,
        Like.gig_id == gig_id
    ).delete()
    
    db.commit()
    
    return result > 0  # Return True if a row was deleted
