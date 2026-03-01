from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID

class CategoryBase(BaseModel):
    name: str
    slug: str
    icon: Optional[str] = None
    order: int = 0

class CategoryCreate(CategoryBase):
    parent_id: Optional[UUID] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    parent_id: Optional[UUID] = None

class Category(CategoryBase):
    id: UUID
    parent_id: Optional[UUID] = None
    subcategories: Optional[List["Category"]] = None
    
    class Config:
        orm_mode = True

# This is needed for the self-referencing model
Category.update_forward_refs()
