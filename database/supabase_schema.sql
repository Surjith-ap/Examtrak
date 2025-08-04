-- Enable RLS (Row Level Security)
-- This ensures users can only access their own data

-- Drop existing tables if they exist (to ensure clean setup)
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS study_sessions CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;

-- Create user_progress table
CREATE TABLE user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    topic_name TEXT NOT NULL,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    completed_items JSONB DEFAULT '[]'::jsonb, -- Store individual checkbox states
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, topic_id)
);

-- Create study_sessions table
CREATE TABLE study_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    topic_name TEXT NOT NULL,
    session_duration INTEGER DEFAULT 0, -- in minutes
    questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    session_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_stats table
CREATE TABLE user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    total_study_time INTEGER DEFAULT 0, -- in minutes
    topics_completed INTEGER DEFAULT 0,
    total_questions_answered INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_study_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable Row Level Security for Clerk integration
-- Clerk handles authentication and user isolation at the application level
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats DISABLE ROW LEVEL SECURITY;

-- For Clerk authentication, we'll temporarily disable RLS and handle security in the app
-- Alternatively, you can set up custom RLS policies with Clerk JWT tokens

-- Disable RLS for now since we're using Clerk (not Supabase Auth)
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats DISABLE ROW LEVEL SECURITY;

-- Note: In production, you should implement proper RLS with Clerk JWT validation
-- For now, the application will handle user isolation through Clerk user IDs

-- Create policies for user_progress (commented out for Clerk integration)
/*
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own progress" ON user_progress
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create policies for study_sessions
CREATE POLICY "Users can view their own study sessions" ON study_sessions
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own study sessions" ON study_sessions
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own study sessions" ON study_sessions
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own study sessions" ON study_sessions
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create policies for user_stats
CREATE POLICY "Users can view their own stats" ON user_stats
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own stats" ON user_stats
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own stats" ON user_stats
    FOR DELETE USING (auth.uid()::text = user_id);
*/

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_topic_id ON user_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completion ON user_progress(completion_percentage);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_accessed ON user_progress(last_accessed);

CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_topic_id ON study_sessions(topic_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON study_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_study_sessions_created_at ON study_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional - for testing)
-- You can remove this section when deploying to production

-- Note: Replace 'sample_user_id' with actual Clerk user IDs when testing
/*
INSERT INTO user_progress (user_id, topic_id, topic_name, completion_percentage) VALUES
('sample_user_id', 'math_basics', 'Mathematics - Basic Arithmetic', 100),
('sample_user_id', 'math_algebra', 'Mathematics - Algebra', 75),
('sample_user_id', 'science_physics', 'Science - Physics Fundamentals', 50),
('sample_user_id', 'english_grammar', 'English - Grammar Basics', 90);

INSERT INTO study_sessions (user_id, topic_id, topic_name, session_duration, questions_answered, correct_answers) VALUES
('sample_user_id', 'math_basics', 'Mathematics - Basic Arithmetic', 45, 20, 18),
('sample_user_id', 'math_algebra', 'Mathematics - Algebra', 60, 15, 12),
('sample_user_id', 'science_physics', 'Science - Physics Fundamentals', 30, 10, 7);

INSERT INTO user_stats (user_id, total_study_time, topics_completed, total_questions_answered, total_correct_answers, current_streak, longest_streak) VALUES
('sample_user_id', 135, 1, 45, 37, 3, 5);
*/
