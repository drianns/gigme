import logging
from sqlalchemy.orm import Session

from app.db.session import Base, engine
from app.models import user, gig, order, category, review, message, transaction
from app.core.config import settings

# Get logger
logger = logging.getLogger(__name__)

def init_db() -> None:
    """
    Initialize database with tables and seed data
    """
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Seed initial data if needed
    db = Session(engine)
    try:
        seed_data(db)
        db.commit()
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

def seed_data(db: Session) -> None:
    """
    Seed initial data
    """
    # Seed categories
    seed_categories(db)
    
def seed_categories(db: Session) -> None:
    """
    Seed categories
    """
    from app.models.category import Category
    
    # Check if categories already exist
    if db.query(Category).count() > 0:
        return
    
    categories = [
        {"name": "Design", "slug": "design", "icon": "design-icon.svg", "order": 1},
        {"name": "Video & Animation", "slug": "video-animation", "icon": "video-icon.svg", "order": 2},
        {"name": "Programming", "slug": "programming", "icon": "code-icon.svg", "order": 3},
        {"name": "Writing", "slug": "writing", "icon": "writing-icon.svg", "order": 4},
        {"name": "Social Media", "slug": "social-media", "icon": "social-icon.svg", "order": 5},
        {"name": "Music & Audio", "slug": "music-audio", "icon": "music-icon.svg", "order": 6},
    ]
    
    # Create subcategories
    subcategories = {
        "design": [
            {"name": "Logo Design", "slug": "logo-design", "icon": "logo-icon.svg", "order": 1},
            {"name": "Social Media Design", "slug": "social-media-design", "icon": "social-design-icon.svg", "order": 2},
            {"name": "UI/UX Design", "slug": "ui-ux-design", "icon": "ui-icon.svg", "order": 3},
        ],
        "video-animation": [
            {"name": "Video Editing", "slug": "video-editing", "icon": "video-edit-icon.svg", "order": 1},
            {"name": "TikTok Videos", "slug": "tiktok-videos", "icon": "tiktok-icon.svg", "order": 2},
            {"name": "Animation", "slug": "animation", "icon": "animation-icon.svg", "order": 3},
        ],
        "programming": [
            {"name": "Website Development", "slug": "website-development", "icon": "web-icon.svg", "order": 1},
            {"name": "Mobile Apps", "slug": "mobile-apps", "icon": "mobile-icon.svg", "order": 2},
            {"name": "Automation", "slug": "automation", "icon": "automation-icon.svg", "order": 3},
        ],
        "writing": [
            {"name": "Content Writing", "slug": "content-writing", "icon": "content-icon.svg", "order": 1},
            {"name": "Translation", "slug": "translation", "icon": "translation-icon.svg", "order": 2},
            {"name": "Copywriting", "slug": "copywriting", "icon": "copy-icon.svg", "order": 3},
        ],
        "social-media": [
            {"name": "Social Media Management", "slug": "social-media-management", "icon": "social-mgmt-icon.svg", "order": 1},
            {"name": "Instagram Growth", "slug": "instagram-growth", "icon": "instagram-icon.svg", "order": 2},
            {"name": "TikTok Growth", "slug": "tiktok-growth", "icon": "tiktok-growth-icon.svg", "order": 3},
        ],
        "music-audio": [
            {"name": "Voice Over", "slug": "voice-over", "icon": "voice-icon.svg", "order": 1},
            {"name": "Music Production", "slug": "music-production", "icon": "music-prod-icon.svg", "order": 2},
            {"name": "Audio Editing", "slug": "audio-editing", "icon": "audio-edit-icon.svg", "order": 3},
        ],
    }
    
    # Add main categories
    category_objects = {}
    for cat in categories:
        category = Category(**cat)
        db.add(category)
        db.flush()
        category_objects[cat["slug"]] = category
    
    # Add subcategories
    for parent_slug, subs in subcategories.items():
        parent = category_objects.get(parent_slug)
        if parent:
            for sub in subs:
                subcategory = Category(**sub, parent_id=parent.id)
                db.add(subcategory)
    
    db.commit()
