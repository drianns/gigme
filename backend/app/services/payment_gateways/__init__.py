from app.services.payment_gateways.midtrans import MidtransPaymentGateway

# Factory function to get payment gateway based on provider
def get_payment_gateway(provider: str = "midtrans"):
    if provider == "midtrans":
        return MidtransPaymentGateway()
    else:
        raise ValueError(f"Unsupported payment gateway provider: {provider}")
