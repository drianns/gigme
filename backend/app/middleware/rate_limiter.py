from fastapi import Request, HTTPException, status
from typing import Callable, Dict, Optional
import time
from datetime import datetime, timedelta

class RateLimiter:
    """
    Rate limiter middleware
    """
    def __init__(
        self,
        app,
        times: int = 5,
        seconds: int = 60,
        exempt_paths: Optional[list] = None
    ):
        """
        Initialize rate limiter
        
        Args:
            app: The ASGI application
            times: Number of requests allowed in the time window
            seconds: Time window in seconds
            exempt_paths: List of paths exempt from rate limiting
        """
        self.app = app
        self.times = times
        self.seconds = seconds
        self.exempt_paths = exempt_paths or []
        self.requests: Dict[str, list] = {}
        
    def is_exempt(self, path: str) -> bool:
        """
        Check if path is exempt from rate limiting
        """
        for exempt_path in self.exempt_paths:
            if path.startswith(exempt_path):
                return True
        return False
        
    async def __call__(self, scope, receive, send):
        """
        Rate limiter middleware
        """
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
            
        # Create request object
        request = Request(scope)
        
        # Skip rate limiting for exempt paths
        if self.is_exempt(request.url.path):
            return await self.app(scope, receive, send)
        
        # Get client IP
        client_ip = request.client.host if request.client else "unknown"
        
        # Initialize client requests if not exists
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        
        # Clean up old requests
        current_time = time.time()
        self.requests[client_ip] = [
            timestamp for timestamp in self.requests[client_ip]
            if timestamp > current_time - self.seconds
        ]
        
        # Check if rate limit exceeded
        if len(self.requests[client_ip]) >= self.times:
            retry_after = int(self.seconds - (current_time - self.requests[client_ip][0]))
            
            # Return 429 response
            from starlette.responses import JSONResponse
            response = JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"detail": f"Rate limit exceeded. Try again in {retry_after} seconds."},
                headers={"Retry-After": str(retry_after)}
            )
            await response(scope, receive, send)
            return
        
        # Add current request timestamp
        self.requests[client_ip].append(current_time)
        
        # Process request
        await self.app(scope, receive, send)
