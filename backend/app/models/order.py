import uuid
from sqlalchemy import Column, String, Text, Integer, Enum, ForeignKey, DateTime, DECIMAL, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.db.session import Base

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    gig_id = Column(UUID(as_uuid=True), ForeignKey("gigs.id"), nullable=False)
    package_id = Column(UUID(as_uuid=True), ForeignKey("gig_packages.id"), nullable=False)
    status = Column(
        Enum("pending", "in_progress", "delivered", "revision", "completed", "cancelled", "disputed", name="order_status"),
        default="pending"
    )
    amount = Column(Integer, nullable=False)  # Total amount in IDR
    platform_fee = Column(Integer, nullable=False)  # Platform fee in IDR
    seller_earning = Column(Integer, nullable=False)  # Seller earning in IDR
    brief = Column(Text, nullable=True)  # Buyer requirements
    delivery_date = Column(DateTime(timezone=True), nullable=True)
    revision_count_used = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    buyer = relationship("User", foreign_keys=[buyer_id], backref="buyer_orders")
    seller = relationship("User", foreign_keys=[seller_id], backref="seller_orders")
    gig = relationship("Gig")
    package = relationship("GigPackage")
    deliveries = relationship("OrderDelivery", back_populates="order", cascade="all, delete-orphan")
    revisions = relationship("OrderRevision", back_populates="order", cascade="all, delete-orphan")

class OrderDelivery(Base):
    __tablename__ = "order_deliveries"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    message = Column(Text, nullable=True)
    files = Column(JSONB, nullable=True)  # [{url: "", name: ""}]
    delivered_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    order = relationship("Order", back_populates="deliveries")

class OrderRevision(Base):
    __tablename__ = "order_revisions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    message = Column(Text, nullable=False)
    requested_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    order = relationship("Order", back_populates="revisions")
