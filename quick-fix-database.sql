-- Quick Fix: Create missing tables for Rebelz AI
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blacklist_signups table
CREATE TABLE IF NOT EXISTS blacklist_signups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
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
    
    -- Add constraint for email format
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

-- Enable real-time for blacklist_signups (for live counter updates)
ALTER PUBLICATION supabase_realtime ADD TABLE blacklist_signups;

-- Success message
SELECT 'Rebelz AI tables created successfully! 🚀' as message;