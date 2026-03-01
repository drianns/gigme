import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Integer, func
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship

from app.db.session import Base

class Follow(Base):
    __tablename__ = "follows"
    
    follower_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    following_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    follower = relationship("User", foreign_keys=[follower_id], backref="following")
    following = relationship("User", foreign_keys=[following_id], backref="followers")

class Like(Base):
    __tablename__ = "likes"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    gig_id = Column(UUID(as_uuid=True), ForeignKey("gigs.id"), primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="likes")
    gig = relationship("Gig", backref="likes")

class PortfolioPost(Base):
    __tablename__ = "portfolio_posts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    images = Column(JSONB, nullable=True)
    video_url = Column(String, nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="portfolio_posts")
