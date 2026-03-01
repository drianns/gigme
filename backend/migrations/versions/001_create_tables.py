"""create tables

Revision ID: 001
Revises: 
Create Date: 2025-12-03 09:53:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create extension for UUID if it doesn't exist
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    
    # Create enum types
    try:
        op.execute("CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'both')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE gig_status AS ENUM ('draft', 'active', 'paused', 'deleted')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE package_tier AS ENUM ('basic', 'standard', 'premium')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE order_status AS ENUM ('pending', 'in_progress', 'delivered', 'revision', 'completed', 'cancelled', 'disputed')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE transaction_type AS ENUM ('order_payment', 'withdrawal', 'refund', 'platform_fee')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE transaction_status AS ENUM ('pending', 'success', 'failed')")
    except Exception:
        pass  # Type might already exist
        
    try:
        op.execute("CREATE TYPE withdrawal_status AS ENUM ('pending', 'processing', 'completed', 'rejected')")
    except Exception:
        pass  # Type might already exist
    
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('email', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('username', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('full_name', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.Column('role', sa.Enum('buyer', 'seller', 'both', name='user_role'), nullable=False, default='buyer'),
        sa.Column('balance', sa.DECIMAL(10, 2), nullable=False, default=0),
        sa.Column('is_verified', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True, onupdate=sa.text('now()'))
    )
    
    # Create user_profiles table
    op.create_table(
        'user_profiles',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('phone_number', sa.String(), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('languages', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('timezone', sa.String(), nullable=True),
        sa.Column('social_links', postgresql.JSONB(), nullable=True),
        sa.Column('skills', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('preferences', postgresql.JSONB(), nullable=True)
    )
    
    # Create seller_stats table
    op.create_table(
        'seller_stats',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('level', sa.Integer(), nullable=False, default=1),
        sa.Column('total_orders', sa.Integer(), nullable=False, default=0),
        sa.Column('total_revenue', sa.DECIMAL(10, 2), nullable=False, default=0),
        sa.Column('average_rating', sa.DECIMAL(3, 2), nullable=False, default=0),
        sa.Column('completion_rate', sa.DECIMAL(5, 2), nullable=False, default=0),
        sa.Column('response_time_hours', sa.DECIMAL(5, 2), nullable=False, default=0),
        sa.Column('badges', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('featured_until', sa.DateTime(timezone=True), nullable=True)
    )
    
    # Create categories table
    op.create_table(
        'categories',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('slug', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('icon', sa.String(), nullable=True),
        sa.Column('parent_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('categories.id'), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False, default=0)
    )
    
    # Create gigs table
    op.create_table(
        'gigs',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('seller_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('slug', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('category_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('categories.id'), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('requirements', sa.Text(), nullable=True),
        sa.Column('status', sa.Enum('draft', 'active', 'paused', 'deleted', name='gig_status'), nullable=False, default='draft'),
        sa.Column('delivery_time_days', sa.Integer(), nullable=False),
        sa.Column('revision_count', sa.Integer(), nullable=False, default=1),
        sa.Column('view_count', sa.Integer(), nullable=False, default=0),
        sa.Column('order_count', sa.Integer(), nullable=False, default=0),
        sa.Column('is_featured', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True, onupdate=sa.text('now()'))
    )
    
    # Create gig_packages table
    op.create_table(
        'gig_packages',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('gig_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gigs.id', ondelete='CASCADE'), nullable=False),
        sa.Column('tier', sa.Enum('basic', 'standard', 'premium', name='package_tier'), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('price', sa.Integer(), nullable=False),
        sa.Column('delivery_time_days', sa.Integer(), nullable=False),
        sa.Column('revision_count', sa.Integer(), nullable=False, default=1),
        sa.Column('features', postgresql.JSONB(), nullable=True)
    )
    
    # Create gig_images table
    op.create_table(
        'gig_images',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('gig_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gigs.id', ondelete='CASCADE'), nullable=False),
        sa.Column('url', sa.String(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False, default=0),
        sa.Column('is_cover', sa.Boolean(), nullable=False, default=False)
    )
    
    # Create gig_tags table
    op.create_table(
        'gig_tags',
        sa.Column('gig_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gigs.id', ondelete='CASCADE'), primary_key=True),
        sa.Column('tag', sa.String(), primary_key=True)
    )
    
    # Create orders table
    op.create_table(
        'orders',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('buyer_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('seller_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('gig_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gigs.id'), nullable=False),
        sa.Column('package_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gig_packages.id'), nullable=False),
        sa.Column('status', sa.Enum('pending', 'in_progress', 'delivered', 'revision', 'completed', 'cancelled', 'disputed', name='order_status'), nullable=False, default='pending'),
        sa.Column('amount', sa.Integer(), nullable=False),
        sa.Column('platform_fee', sa.Integer(), nullable=False),
        sa.Column('seller_earning', sa.Integer(), nullable=False),
        sa.Column('brief', sa.Text(), nullable=True),
        sa.Column('delivery_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('revision_count_used', sa.Integer(), nullable=False, default=0),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True)
    )
    
    # Create order_deliveries table
    op.create_table(
        'order_deliveries',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id', ondelete='CASCADE'), nullable=False),
        sa.Column('message', sa.Text(), nullable=True),
        sa.Column('files', postgresql.JSONB(), nullable=True),
        sa.Column('delivered_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create order_revisions table
    op.create_table(
        'order_revisions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id', ondelete='CASCADE'), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('requested_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create transactions table
    op.create_table(
        'transactions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=True),
        sa.Column('type', sa.Enum('order_payment', 'withdrawal', 'refund', 'platform_fee', name='transaction_type'), nullable=False),
        sa.Column('amount', sa.Integer(), nullable=False),
        sa.Column('status', sa.Enum('pending', 'success', 'failed', name='transaction_status'), nullable=False, default='pending'),
        sa.Column('payment_method', sa.String(), nullable=True),
        sa.Column('payment_gateway', sa.String(), nullable=True),
        sa.Column('gateway_transaction_id', sa.String(), nullable=True),
        sa.Column('transaction_metadata', postgresql.JSONB(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create reviews table
    op.create_table(
        'reviews',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=False, unique=True),
        sa.Column('reviewer_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('reviewee_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('comment', sa.Text(), nullable=False),
        sa.Column('response', sa.Text(), nullable=True),
        sa.Column('is_public', sa.Boolean(), nullable=False, default=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create conversations table
    op.create_table(
        'conversations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=True),
        sa.Column('participant_ids', postgresql.ARRAY(postgresql.UUID(as_uuid=True)), nullable=False),
        sa.Column('last_message_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create messages table
    op.create_table(
        'messages',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('conversation_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('conversations.id', ondelete='CASCADE'), nullable=False),
        sa.Column('sender_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('attachments', postgresql.JSONB(), nullable=True),
        sa.Column('is_read', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create follows table
    op.create_table(
        'follows',
        sa.Column('follower_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('following_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create likes table
    op.create_table(
        'likes',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('gig_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('gigs.id'), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create portfolio_posts table
    op.create_table(
        'portfolio_posts',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('images', postgresql.JSONB(), nullable=True),
        sa.Column('video_url', sa.String(), nullable=True),
        sa.Column('tags', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('likes_count', sa.Integer(), nullable=False, default=0),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create notifications table
    op.create_table(
        'notifications',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('link', sa.String(), nullable=True),
        sa.Column('is_read', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )
    
    # Create disputes table
    op.create_table(
        'disputes',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('orders.id'), nullable=False),
        sa.Column('raised_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('reason', sa.Text(), nullable=False),
        sa.Column('status', sa.String(), nullable=False, default='open'),
        sa.Column('resolution', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True)
    )
    
    # Create withdrawals table
    op.create_table(
        'withdrawals',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('uuid_generate_v4()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('amount', sa.Integer(), nullable=False),
        sa.Column('method', sa.String(), nullable=False),
        sa.Column('account_details', postgresql.JSONB(), nullable=False),
        sa.Column('status', sa.Enum('pending', 'processing', 'completed', 'rejected', name='withdrawal_status'), nullable=False, default='pending'),
        sa.Column('processed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()'))
    )


def downgrade():
    # Drop tables
    op.drop_table('withdrawals')
    op.drop_table('disputes')
    op.drop_table('notifications')
    op.drop_table('portfolio_posts')
    op.drop_table('likes')
    op.drop_table('follows')
    op.drop_table('messages')
    op.drop_table('conversations')
    op.drop_table('reviews')
    op.drop_table('transactions')
    op.drop_table('order_revisions')
    op.drop_table('order_deliveries')
    op.drop_table('orders')
    op.drop_table('gig_tags')
    op.drop_table('gig_images')
    op.drop_table('gig_packages')
    op.drop_table('gigs')
    op.drop_table('categories')
    op.drop_table('seller_stats')
    op.drop_table('user_profiles')
    op.drop_table('users')
    
    # Drop enum types
    op.execute("DROP TYPE IF EXISTS withdrawal_status")
    op.execute("DROP TYPE IF EXISTS transaction_status")
    op.execute("DROP TYPE IF EXISTS transaction_type")
    op.execute("DROP TYPE IF EXISTS order_status")
    op.execute("DROP TYPE IF EXISTS package_tier")
    op.execute("DROP TYPE IF EXISTS gig_status")
    op.execute("DROP TYPE IF EXISTS user_role")
