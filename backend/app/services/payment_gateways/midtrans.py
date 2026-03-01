import requests
import json
from typing import Dict, Any, Optional
from datetime import datetime, timedelta

from app.core.config import settings

class MidtransPaymentGateway:
    """
    Midtrans payment gateway integration
    """
    def __init__(self):
        """
        Initialize Midtrans payment gateway
        """
        self.server_key = settings.MIDTRANS_SERVER_KEY
        self.client_key = settings.MIDTRANS_CLIENT_KEY
        self.is_production = settings.ENVIRONMENT == "production"
        self.api_url = "https://api.midtrans.com" if self.is_production else "https://api.sandbox.midtrans.com"
        
    def create_payment(
        self,
        transaction_id: str,
        order_id: str,
        amount: int,
        payment_method: str,
        customer_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Create payment transaction
        """
        # Set expiry time to 24 hours from now
        expiry_time = datetime.utcnow() + timedelta(hours=24)
        expiry_time_str = expiry_time.strftime("%Y-%m-%d %H:%M:%S +0000")
        
        # Prepare payload based on payment method
        payload = {
            "transaction_details": {
                "order_id": f"GigMe-{order_id}",
                "gross_amount": amount
            },
            "customer_details": customer_details,
            "expiry": {
                "start_time": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S +0000"),
                "unit": "hour",
                "duration": 24
            },
            "item_details": [
                {
                    "id": f"GigMe-{order_id}",
                    "price": amount,
                    "quantity": 1,
                    "name": "GigMe Order Payment",
                    "category": "Service",
                    "merchant_name": "GigMe"
                }
            ]
        }
        
        # Add payment method specific details
        if payment_method == "gopay":
            payload["payment_type"] = "gopay"
            endpoint = f"{self.api_url}/v2/charge"
        elif payment_method == "qris":
            payload["payment_type"] = "qris"
            endpoint = f"{self.api_url}/v2/charge"
        elif payment_method == "bank_transfer":
            payload["payment_type"] = "bank_transfer"
            payload["bank_transfer"] = {
                "bank": "bca"
            }
            endpoint = f"{self.api_url}/v2/charge"
        else:
            # Default to snap for other payment methods
            endpoint = f"{self.api_url}/snap/v1/transactions"
        
        # Make API request
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Basic {self.server_key}"
        }
        
        try:
            response = requests.post(
                endpoint,
                headers=headers,
                data=json.dumps(payload)
            )
            
            response_data = response.json()
            
            # Process response based on payment method
            result = {
                "transaction_id": transaction_id,
                "status": "pending",
                "expiry_time": expiry_time_str
            }
            
            if payment_method == "gopay":
                result["payment_url"] = response_data.get("actions", [{}])[0].get("url", "")
                result["qr_code_url"] = response_data.get("actions", [{}])[1].get("url", "")
                result["deep_link"] = response_data.get("actions", [{}])[2].get("url", "")
            elif payment_method in ["qris", "bank_transfer"]:
                result["payment_url"] = ""
                result["qr_code_url"] = response_data.get("qr_code_url", "")
                result["deep_link"] = ""
            else:
                result["payment_url"] = response_data.get("redirect_url", "")
                result["qr_code_url"] = ""
                result["deep_link"] = ""
            
            return result
            
        except Exception as e:
            # Log error and return fallback response
            print(f"Midtrans payment error: {str(e)}")
            return {
                "transaction_id": transaction_id,
                "status": "error",
                "message": "Payment gateway error"
            }
    
    def verify_webhook(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Verify webhook from Midtrans
        """
        # In production, should verify signature
        # For now, just extract transaction status
        
        transaction_status = payload.get("transaction_status", "")
        order_id = payload.get("order_id", "").replace("GigMe-", "")
        
        status_mapping = {
            "capture": "success",
            "settlement": "success",
            "pending": "pending",
            "deny": "failed",
            "cancel": "failed",
            "expire": "failed",
            "refund": "refunded"
        }
        
        return {
            "order_id": order_id,
            "status": status_mapping.get(transaction_status, "pending"),
            "raw_status": transaction_status,
            "payment_type": payload.get("payment_type", ""),
            "transaction_id": payload.get("transaction_id", ""),
            "transaction_time": payload.get("transaction_time", ""),
            "amount": payload.get("gross_amount", 0)
        }
        
    def get_transaction_status(self, order_id: str) -> Dict[str, Any]:
        """
        Get transaction status from Midtrans
        """
        endpoint = f"{self.api_url}/v2/{order_id}/status"
        
        headers = {
            "Accept": "application/json",
            "Authorization": f"Basic {self.server_key}"
        }
        
        try:
            response = requests.get(
                endpoint,
                headers=headers
            )
            
            response_data = response.json()
            
            transaction_status = response_data.get("transaction_status", "")
            
            status_mapping = {
                "capture": "success",
                "settlement": "success",
                "pending": "pending",
                "deny": "failed",
                "cancel": "failed",
                "expire": "failed",
                "refund": "refunded"
            }
            
            return {
                "order_id": order_id,
                "status": status_mapping.get(transaction_status, "pending"),
                "raw_status": transaction_status,
                "payment_type": response_data.get("payment_type", ""),
                "transaction_id": response_data.get("transaction_id", ""),
                "transaction_time": response_data.get("transaction_time", ""),
                "amount": response_data.get("gross_amount", 0)
            }
            
        except Exception as e:
            # Log error and return fallback response
            print(f"Midtrans status check error: {str(e)}")
            return {
                "order_id": order_id,
                "status": "error",
                "message": "Payment gateway error"
            }
