import uuid
from sqlalchemy import Column, String, Integer, Enum, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.db.session import Base

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=True)
    type = Column(
        Enum("order_payment", "withdrawal", "refund", "platform_fee", name="transaction_type"),
        nullable=False
    )
    amount = Column(Integer, nullable=False)  # Amount in IDR
    status = Column(
        Enum("pending", "success", "failed", name="transaction_status"),
        default="pending"
    )
    payment_method = Column(String, nullable=True)  # "gopay", "ovo", "bank_transfer"
    payment_gateway = Column(String, nullable=True)  # "midtrans", "xendit"
    gateway_transaction_id = Column(String, nullable=True)
    transaction_metadata = Column(JSONB, nullable=True)  # Renamed from metadata to avoid conflict with SQLAlchemy reserved name
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="transactions")
    order = relationship("Order", backref="transactions")

class Withdrawal(Base):
    __tablename__ = "withdrawals"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)  # Amount in IDR
    method = Column(String, nullable=False)  # "gopay", "ovo", "bank_transfer"
    account_details = Column(JSONB, nullable=False)
    status = Column(
        Enum("pending", "processing", "completed", "rejected", name="withdrawal_status"),
        default="pending"
    )
    processed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="withdrawals")
