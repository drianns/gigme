from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from typing import Optional, List

from app.core.config import settings

class AuthValidator(HTTPBearer):
    """
    Auth validator middleware
    """
    def __init__(
        self,
        auto_error: bool = True,
        exempt_paths: Optional[List[str]] = None
    ):
        """
        Initialize auth validator
        
        Args:
            auto_error: Whether to auto-error on missing token
            exempt_paths: List of paths exempt from authentication
        """
        super().__init__(auto_error=auto_error)
        self.exempt_paths = exempt_paths or []
        
    def is_exempt(self, path: str) -> bool:
        """
        Check if path is exempt from authentication
        """
        for exempt_path in self.exempt_paths:
            if path.startswith(exempt_path):
                return True
        return False
        
    async def __call__(self, request: Request):
        """
        Auth validator middleware
        """
        # Skip authentication for exempt paths
        if self.is_exempt(request.url.path):
            return None
            
        # Get credentials
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        
        if not credentials:
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"}
                )
            return None
            
        # Validate token
        try:
            payload = jwt.decode(
                credentials.credentials,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
            
            # Add payload to request state
            request.state.user = payload
            
            return credentials.credentials
            
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
