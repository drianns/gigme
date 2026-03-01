from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.category import Category, CategoryCreate, CategoryUpdate
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.categories import (
    get_all_categories, get_category_by_slug, get_category_by_id, 
    get_subcategories, create_category, update_category, delete_category
)

router = APIRouter()

@router.get("/", response_model=List[Category])
async def read_categories(db: Session = Depends(get_db)):
    """
    Get all categories
    """
    categories = get_all_categories(db)
    return categories

@router.get("/{slug}", response_model=Category)
async def read_category(slug: str, db: Session = Depends(get_db)):
    """
    Get category by slug
    """
    category = get_category_by_slug(db, slug)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with slug '{slug}' not found"
        )
    return category

@router.get("/{category_id}/subcategories", response_model=List[Category])
async def read_subcategories(category_id: str, db: Session = Depends(get_db)):
    """
    Get subcategories by parent ID
    """
    category = get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id '{category_id}' not found"
        )
    
    subcategories = get_subcategories(db, category_id)
    return subcategories

@router.post("/", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_new_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Create a new category (admin only)
    """
    # TODO: Add admin role check
    # For now, we'll allow any authenticated user to create categories
    
    category = create_category(db, category_data)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with slug '{category_data.slug}' already exists"
        )
    
    return category

@router.put("/{category_id}", response_model=Category)
async def update_category_endpoint(
    category_id: str,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Update a category (admin only)
    """
    # TODO: Add admin role check
    # For now, we'll allow any authenticated user to update categories
    
    category = update_category(db, category_id, category_data)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id '{category_id}' not found or slug already exists"
        )
    
    return category

@router.delete("/{category_id}", status_code=status.HTTP_200_OK)
async def delete_category_endpoint(
    category_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Delete a category (admin only)
    """
    # TODO: Add admin role check
    # For now, we'll allow any authenticated user to delete categories
    
    success = delete_category(db, category_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with id '{category_id}' not found, has subcategories, or is used in gigs"
        )
    
    return {"message": "Category deleted successfully"}
