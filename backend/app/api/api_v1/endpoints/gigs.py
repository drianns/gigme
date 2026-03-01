from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.gig import Gig, GigCreate, GigUpdate, GigPackage, GigPackageCreate
from app.schemas.user import User
from app.core.security import get_current_user, get_current_active_user
from app.services.gigs import (
    create_gig, get_gig_by_id, get_gig_by_slug, update_gig, delete_gig, list_gigs,
    add_gig_package, like_gig, unlike_gig
)

router = APIRouter()

@router.get("/", response_model=List[Gig])
async def read_gigs(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    delivery_time: Optional[int] = None,
    sort_by: Optional[str] = "created_at",
    sort_order: Optional[str] = "desc"
):
    """
    Get all gigs with filters
    """
    gigs = list_gigs(
        db, 
        skip=skip, 
        limit=limit,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        delivery_time=delivery_time,
        sort_by=sort_by,
        sort_order=sort_order
    )
    return gigs

@router.post("/", response_model=Gig)
async def create_new_gig(
    gig_data: GigCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create new gig (seller only)
    """
    if current_user.role not in ["seller", "both"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only sellers can create gigs"
        )
    
    gig = create_gig(db, gig_data, current_user.id)
    return gig

@router.get("/{slug}", response_model=Gig)
async def read_gig(slug: str, db: Session = Depends(get_db)):
    """
    Get gig by slug
    """
    gig = get_gig_by_slug(db, slug)
    if not gig:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with slug '{slug}' not found"
        )
    return gig

@router.put("/{gig_id}", response_model=Gig)
async def update_gig_by_id(
    gig_id: str,
    gig_data: GigUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update gig
    """
    gig = update_gig(db, gig_id, gig_data, current_user.id)
    if not gig:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with id '{gig_id}' not found or you don't have permission"
        )
    return gig

@router.delete("/{gig_id}")
async def delete_gig_by_id(
    gig_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete gig
    """
    success = delete_gig(db, gig_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with id '{gig_id}' not found or you don't have permission"
        )
    return {"message": "Gig deleted successfully"}

@router.post("/{gig_id}/packages", response_model=GigPackage)
async def add_gig_package_endpoint(
    gig_id: str,
    package_data: GigPackageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Add package to gig
    """
    from app.services.gigs import add_gig_package
    
    if current_user.role not in ["seller", "both"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only sellers can add packages to gigs"
        )
    
    package = add_gig_package(db, gig_id, package_data, current_user.id)
    if not package:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with id '{gig_id}' not found or you don't have permission"
        )
    
    return package

@router.post("/{gig_id}/like", status_code=status.HTTP_200_OK)
async def like_gig_endpoint(
    gig_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Like gig
    """
    from app.services.gigs import like_gig
    
    success = like_gig(db, gig_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with id '{gig_id}' not found"
        )
    
    return {"message": "Gig liked successfully"}

@router.delete("/{gig_id}/like", status_code=status.HTTP_200_OK)
async def unlike_gig_endpoint(
    gig_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Unlike gig
    """
    from app.services.gigs import unlike_gig
    
    success = unlike_gig(db, gig_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Gig with id '{gig_id}' not found or not liked"
        )
    
    return {"message": "Gig unliked successfully"}
