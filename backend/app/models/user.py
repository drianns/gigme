import uuid
from sqlalchemy import Column, String, Boolean, Enum, DECIMAL, DateTime, func, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY

from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    role = Column(Enum("buyer", "seller", "both", name="user_role"), default="buyer")
    balance = Column(DECIMAL(10, 2), default=0)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True)
    phone_number = Column(String, nullable=True)
    location = Column(String, nullable=True)
    languages = Column(ARRAY(String), nullable=True)
    timezone = Column(String, nullable=True)
    social_links = Column(JSONB, nullable=True)
    skills = Column(ARRAY(String), nullable=True)
    preferences = Column(JSONB, nullable=True)

class SellerStats(Base):
    __tablename__ = "seller_stats"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True)
    level = Column(Integer, default=1)
    total_orders = Column(Integer, default=0)
    total_revenue = Column(DECIMAL(10, 2), default=0)
    average_rating = Column(DECIMAL(3, 2), default=0)
    completion_rate = Column(DECIMAL(5, 2), default=0)
    response_time_hours = Column(DECIMAL(5, 2), default=0)
    badges = Column(ARRAY(String), nullable=True)
    featured_until = Column(DateTime(timezone=True), nullable=True)
