from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
import uuid

from app.models.transaction import Transaction
from app.models.order import Order
from app.models.user import User
from app.schemas.payment import PaymentCreate, PaymentResponse
from app.services.payment_gateways import get_payment_gateway

def create_payment(db: Session, payment_data: PaymentCreate, user_id: str) -> PaymentResponse:
    """
    Create payment for order
    """
    # Get order
    order = db.query(Order).filter(Order.id == payment_data.order_id).first()
    
    if not order:
        raise ValueError("Order not found")
    
    # Check if user is the buyer
    if str(order.buyer_id) != user_id:
        raise ValueError("You are not authorized to pay for this order")
    
    # Check if order is already paid
    if order.status != "pending":
        raise ValueError("Order is already paid or cancelled")
    
    # Create transaction
    transaction = Transaction(
        user_id=user_id,
        order_id=order.id,
        type="order_payment",
        amount=order.amount,
        status="pending",
        payment_method=payment_data.payment_method
    )
    
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    
    # Get user details for payment gateway
    user = db.query(User).filter(User.id == user_id).first()
    
    # Get payment gateway
    payment_gateway = get_payment_gateway()
    
    # Create payment in payment gateway
    customer_details = {
        "first_name": user.full_name.split(' ')[0],
        "last_name": ' '.join(user.full_name.split(' ')[1:]) if len(user.full_name.split(' ')) > 1 else "",
        "email": user.email,
        "phone": ""
    }
    
    payment_result = payment_gateway.create_payment(
        transaction_id=str(transaction.id),
        order_id=str(order.id),
        amount=order.amount,
        payment_method=payment_data.payment_method,
        customer_details=customer_details
    )
    
    # Update transaction with payment gateway response
    transaction.gateway_transaction_id = payment_result.get("transaction_id", "")
    transaction.transaction_metadata = payment_result
    db.commit()
    
    # Return payment response
    return PaymentResponse(
        transaction_id=transaction.id,
        order_id=order.id,
        amount=order.amount,
        status=payment_result.get("status", "pending"),
        payment_url=payment_result.get("payment_url", ""),
        qr_code_url=payment_result.get("qr_code_url", ""),
        deep_link=payment_result.get("deep_link", ""),
        expiry_time=payment_result.get("expiry_time", "")
    )

def process_webhook(db: Session, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Process payment webhook
    """
    # Get payment gateway
    payment_gateway = get_payment_gateway()
    
    # Verify webhook
    webhook_data = payment_gateway.verify_webhook(payload)
    
    # Get order ID
    order_id = webhook_data.get("order_id")
    status = webhook_data.get("status")
    
    if not order_id or not status:
        return {
            "status": "error",
            "message": "Invalid webhook data"
        }
    
    # Update transaction status
    transaction = db.query(Transaction).filter(
        Transaction.order_id == order_id,
        Transaction.type == "order_payment"
    ).first()
    
    if not transaction:
        return {
            "status": "error",
            "message": "Transaction not found"
        }
    
    # Update transaction status
    transaction.status = status
    transaction.transaction_metadata = {
        **(transaction.transaction_metadata or {}),
        "webhook_data": webhook_data
    }
    
    # If payment is successful, update order status
    if status == "success":
        order = db.query(Order).filter(Order.id == order_id).first()
        if order:
            order.status = "in_progress"
    
    db.commit()
    
    return {
        "status": "success",
        "message": "Webhook processed"
    }

def check_payment_status(db: Session, transaction_id: str) -> Dict[str, Any]:
    """
    Check payment status from payment gateway
    """
    # Get transaction
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    
    if not transaction:
        raise ValueError("Transaction not found")
    
    # Get order
    order = db.query(Order).filter(Order.id == transaction.order_id).first()
    
    if not order:
        raise ValueError("Order not found")
    
    # Get payment gateway
    payment_gateway = get_payment_gateway()
    
    # Check payment status
    status_result = payment_gateway.get_transaction_status(f"GigMe-{order.id}")
    
    # Update transaction status
    if status_result.get("status") != transaction.status:
        transaction.status = status_result.get("status")
        transaction.transaction_metadata = {
            **(transaction.transaction_metadata or {}),
            "status_check": status_result
        }
        
        # If payment is successful, update order status
        if status_result.get("status") == "success" and order.status == "pending":
            order.status = "in_progress"
            
        db.commit()
    
    return {
        "transaction_id": transaction.id,
        "order_id": order.id,
        "amount": transaction.amount,
        "status": transaction.status,
        "payment_method": transaction.payment_method,
        "created_at": transaction.created_at
    }
