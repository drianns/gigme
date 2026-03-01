from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.gig import Gig
from app.schemas.user import UserPublic
from app.services.search import search_gigs, search_sellers, get_search_suggestions

router = APIRouter()

@router.get("/gigs", response_model=List[Gig])
async def search_gigs_endpoint(
    q: str,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    delivery_time: Optional[int] = None,
    rating: Optional[float] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Search gigs
    """
    results = search_gigs(
        db, 
        query=q,
        category=category,
        min_price=min_price,
        max_price=max_price,
        delivery_time=delivery_time,
        rating=rating,
        skip=skip,
        limit=limit
    )
    return results

@router.get("/sellers", response_model=List[UserPublic])
async def search_sellers_endpoint(
    q: str,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Search sellers
    """
    results = search_sellers(db, query=q, skip=skip, limit=limit)
    return results

@router.get("/suggestions")
async def search_suggestions_endpoint(
    q: str,
    limit: int = 5,
    db: Session = Depends(get_db)
):
    """
    Get search suggestions for autocomplete
    """
    suggestions = get_search_suggestions(db, query=q, limit=limit)
    return suggestions
