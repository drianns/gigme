from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, users, gigs, orders, payments, messages, reviews, search, categories, notifications

api_router = APIRouter()

# Root endpoint
@api_router.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to GigMe API v1",
        "endpoints": {
            "auth": "/auth",
            "users": "/users",
            "gigs": "/gigs",
            "orders": "/orders",
            "payments": "/payments",
            "messages": "/messages",
            "reviews": "/reviews",
            "search": "/search",
            "categories": "/categories",
            "notifications": "/notifications"
        },
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(gigs.router, prefix="/gigs", tags=["Gigs"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(payments.router, prefix="/payments", tags=["Payments"])
api_router.include_router(messages.router, prefix="/messages", tags=["Messages"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
api_router.include_router(search.router, prefix="/search", tags=["Search"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
