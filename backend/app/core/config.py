import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "GigMe"
    
    # CORS
    # Parse CORS_ORIGINS from environment variable
    cors_str = os.getenv("CORS_ORIGINS", "http://localhost:3000,https://app.gigme.id")
    CORS_ORIGINS = [origin.strip() for origin in cors_str.split(",")]
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Payment
    MIDTRANS_CLIENT_KEY: str = os.getenv("MIDTRANS_CLIENT_KEY", "")
    MIDTRANS_SERVER_KEY: str = os.getenv("MIDTRANS_SERVER_KEY", "")
    
    # Email
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Platform
    PLATFORM_FEE_PERCENTAGE: float = 0.20  # 20%
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
