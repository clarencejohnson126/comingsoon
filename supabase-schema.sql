-- REBELZ AI Coming Soon Page - Supabase Schema
-- Run this SQL in your Supabase dashboard SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blacklist_signups table
CREATE TABLE IF NOT EXISTS blacklist_signups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    product_preference VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- Email workflow tracking
    confirmation_email_sent BOOLEAN DEFAULT FALSE,
    confirmation_email_sent_at TIMESTAMP WITH TIME ZONE,
    admin_notification_sent BOOLEAN DEFAULT FALSE,
    admin_notification_sent_at TIMESTAMP WITH TIME ZONE,
    email_workflow_status VARCHAR(50) DEFAULT 'pending',
    
    -- Add indexes for performance
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create analytics_events table for tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    session_id VARCHAR(255),
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blacklist_signups_created_at ON blacklist_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blacklist_signups_email ON blacklist_signups(email);
CREATE INDEX IF NOT EXISTS idx_blacklist_signups_product_preference ON blacklist_signups(product_preference);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blacklist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for blacklist_signups
-- Allow anonymous users to insert (for signups)
CREATE POLICY "Allow anonymous signup" ON blacklist_signups
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Allow reading count (for displaying signup numbers)
CREATE POLICY "Allow reading signup data" ON blacklist_signups
    FOR SELECT 
    TO anon 
    USING (true);

-- Create policies for analytics_events
-- Allow anonymous users to insert events
CREATE POLICY "Allow anonymous event tracking" ON analytics_events
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Allow reading analytics (optional, for admin dashboard)
CREATE POLICY "Allow reading analytics" ON analytics_events
    FOR SELECT 
    TO anon 
    USING (true);

-- Create a function to get signup count (optional, for better performance)
CREATE OR REPLACE FUNCTION get_blacklist_count()
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
AS $$
    SELECT COUNT(*)::INTEGER FROM blacklist_signups;
$$;

-- Create a function to check if email exists (prevents duplicates)
CREATE OR REPLACE FUNCTION email_exists(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
    SELECT EXISTS(SELECT 1 FROM blacklist_signups WHERE email = check_email);
$$;

-- Insert some sample data (optional - remove if you don't want sample data)
-- INSERT INTO blacklist_signups (email) VALUES 
--     ('test1@example.com'),
--     ('test2@example.com'),
--     ('test3@example.com');

-- Create a view for public signup stats (optional)
CREATE OR REPLACE VIEW public_stats AS
SELECT 
    COUNT(*) as total_signups,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as signups_today,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as signups_this_week
FROM blacklist_signups;

-- Grant access to the view
GRANT SELECT ON public_stats TO anon;

-- Enable real-time for blacklist_signups (for live counter updates)
ALTER PUBLICATION supabase_realtime ADD TABLE blacklist_signups;

-- Comment with usage instructions
COMMENT ON TABLE blacklist_signups IS 'Stores email signups for REBELZ AI coming soon page blacklist';
COMMENT ON TABLE analytics_events IS 'Tracks user interactions and events for analytics';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'REBELZ AI Supabase schema setup complete! 🚀';
    RAISE NOTICE 'Tables created: blacklist_signups, analytics_events';
    RAISE NOTICE 'Real-time enabled for live counter updates';
    RAISE NOTICE 'RLS policies configured for security';
END $$;