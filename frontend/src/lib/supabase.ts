import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug logging for environment variables
console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? '✅ Set' : '❌ Missing',
  key: supabaseAnonKey ? '✅ Set' : '❌ Missing',
  urlValue: supabaseUrl,
  keyPrefix: supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'Missing'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please check your .env.local file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
supabase.from('user_progress').select('count', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
    } else {
      console.log('✅ Supabase connection successful');
    }
  });

// Types for our database tables
export interface UserProgress {
  id: string
  user_id: string
  topic_id: string
  topic_name: string
  completion_percentage: number
  completed_items: string[] // Array of completed item IDs
  last_accessed: string
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface StudySession {
  id: string
  user_id: string
  topic_id: string
  topic_name: string
  session_duration: number // in minutes
  questions_answered: number
  correct_answers: number
  session_date: string
  created_at: string
}

export interface UserStats {
  id: string
  user_id: string
  total_study_time: number // in minutes
  topics_completed: number
  total_questions_answered: number
  total_correct_answers: number
  current_streak: number
  longest_streak: number
  last_study_date: string
  created_at: string
  updated_at: string
}
