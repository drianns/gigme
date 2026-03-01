import uuid
from sqlalchemy import Column, String, Text, Integer, Boolean, Enum, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship

from app.db.session import Base

class Gig(Base):
    __tablename__ = "gigs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=True)
    status = Column(Enum("draft", "active", "paused", "deleted", name="gig_status"), default="draft")
    delivery_time_days = Column(Integer, nullable=False)
    revision_count = Column(Integer, default=1)
    view_count = Column(Integer, default=0)
    order_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    seller = relationship("User", backref="gigs")
    category = relationship("Category", backref="gigs")
    packages = relationship("GigPackage", back_populates="gig", cascade="all, delete-orphan")
    images = relationship("GigImage", back_populates="gig", cascade="all, delete-orphan")

class GigPackage(Base):
    __tablename__ = "gig_packages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    gig_id = Column(UUID(as_uuid=True), ForeignKey("gigs.id"), nullable=False)
    tier = Column(Enum("basic", "standard", "premium", name="package_tier"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Integer, nullable=False)  # Price in IDR
    delivery_time_days = Column(Integer, nullable=False)
    revision_count = Column(Integer, default=1)
    features = Column(JSONB, nullable=True)
    
    # Relationships
    gig = relationship("Gig", back_populates="packages")

class GigImage(Base):
    __tablename__ = "gig_images"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    gig_id = Column(UUID(as_uuid=True), ForeignKey("gigs.id"), nullable=False)
    url = Column(String, nullable=False)
    order = Column(Integer, default=0)
    is_cover = Column(Boolean, default=False)
    
    # Relationships
    gig = relationship("Gig", back_populates="images")

class GigTag(Base):
    __tablename__ = "gig_tags"
    
    gig_id = Column(UUID(as_uuid=True), ForeignKey("gigs.id"), primary_key=True)
    tag = Column(String, primary_key=True)
    
    # Relationships
    gig = relationship("Gig", backref="tags")
