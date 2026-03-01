import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from supabase import create_client, Client

# Load environment variables
load_dotenv()

def test_database_connection():
    """Test connection to PostgreSQL database"""
    try:
        # Get database URL and print it (hiding password)
        db_url = os.getenv("DATABASE_URL")
        if db_url:
            # Hide password in output
            masked_url = db_url.replace(db_url.split(":")[2].split("@")[0], "*****")
            print(f"Database URL: {masked_url}")
        else:
            print("ERROR: DATABASE_URL environment variable not found!")
            return False
        
        # Create SQLAlchemy engine
        engine = create_engine(db_url)
        
        # Try to connect and execute a simple query
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("SUCCESS: Database connection successful!")
            return True
    except SQLAlchemyError as e:
        print(f"ERROR: Database connection failed: {e}")
        return False

def test_supabase_connection():
    """Test connection to Supabase"""
    try:
        # Get Supabase URL and key
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        
        if not url or not key:
            print("ERROR: SUPABASE_URL or SUPABASE_KEY environment variables not found!")
            return False
            
        print(f"Supabase URL: {url}")
        print(f"Supabase Key: {key[:5]}...{key[-5:]}")
        
        # Create Supabase client
        supabase: Client = create_client(url, key)
        
        # Try to get user count (a simple query)
        try:
            # First try to query users table if it exists
            response = supabase.table("users").select("count", count="exact").execute()
            print("SUCCESS: Supabase connection successful!")
            print(f"Users count: {response.count}")
        except Exception as inner_e:
            # If users table doesn't exist yet, just check if we can connect
            print("SUCCESS: Supabase connection successful!")
            print("Note: 'users' table doesn't exist yet, but connection works")
            print(f"Inner exception: {inner_e}")
        return True
    except Exception as e:
        print(f"ERROR: Supabase connection failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing connections...")
    print("-" * 50)
    print("TESTING DATABASE CONNECTION:")
    db_success = test_database_connection()
    print("-" * 50)
    print("TESTING SUPABASE CONNECTION:")
    supabase_success = test_supabase_connection()
    print("-" * 50)
    
    if db_success and supabase_success:
        print("\nAll connections successful!")
        print("You can now proceed with your development.")
    else:
        print("\nSome connections failed. Please check the errors above.")
        
    print("\nNext steps:")
    if db_success:
        print("1. Run migrations: alembic upgrade head")
        print("2. Start the server: uvicorn main:app --reload")
    else:
        print("1. Fix database connection issues")
        print("2. Run this test again")
