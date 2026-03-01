from sqlalchemy.orm import Session
from typing import List, Optional
from slugify import slugify

from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

def get_all_categories(db: Session) -> List[Category]:
    """
    Get all categories
    """
    return db.query(Category).filter(Category.parent_id == None).order_by(Category.order).all()

def get_category_by_id(db: Session, category_id: str) -> Optional[Category]:
    """
    Get category by ID
    """
    return db.query(Category).filter(Category.id == category_id).first()

def get_category_by_slug(db: Session, slug: str) -> Optional[Category]:
    """
    Get category by slug
    """
    return db.query(Category).filter(Category.slug == slug).first()

def get_subcategories(db: Session, parent_id: str) -> List[Category]:
    """
    Get subcategories by parent ID
    """
    return db.query(Category).filter(Category.parent_id == parent_id).order_by(Category.order).all()

def create_category(db: Session, category_data: CategoryCreate) -> Category:
    """
    Create a new category
    """
    # Generate slug if not provided
    if not category_data.slug:
        category_data.slug = slugify(category_data.name)
    
    # Check if slug already exists
    existing = get_category_by_slug(db, category_data.slug)
    if existing:
        return None
    
    # Create category
    category = Category(
        name=category_data.name,
        slug=category_data.slug,
        icon=category_data.icon,
        order=category_data.order,
        parent_id=category_data.parent_id
    )
    
    db.add(category)
    db.commit()
    db.refresh(category)
    
    return category

def update_category(db: Session, category_id: str, category_data: CategoryUpdate) -> Optional[Category]:
    """
    Update a category
    """
    category = get_category_by_id(db, category_id)
    if not category:
        return None
    
    # Update slug if name is changed and slug is not provided
    if category_data.name and category_data.name != category.name and not category_data.slug:
        category_data.slug = slugify(category_data.name)
    
    # Check if new slug already exists (if changed)
    if category_data.slug and category_data.slug != category.slug:
        existing = get_category_by_slug(db, category_data.slug)
        if existing and str(existing.id) != category_id:
            return None
    
    # Update category fields
    for field, value in category_data.dict(exclude_unset=True).items():
        setattr(category, field, value)
    
    db.commit()
    db.refresh(category)
    
    return category

def delete_category(db: Session, category_id: str) -> bool:
    """
    Delete a category
    """
    # Check if category has subcategories
    subcategories = get_subcategories(db, category_id)
    if subcategories:
        return False
    
    # Check if category is used in gigs
    from app.models.gig import Gig
    gigs = db.query(Gig).filter(Gig.category_id == category_id).count()
    if gigs > 0:
        return False
    
    # Delete category
    category = get_category_by_id(db, category_id)
    if not category:
        return False
    
    db.delete(category)
    db.commit()
    
    return True
