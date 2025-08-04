import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface UserProgress {
  id: string
  user_id: string
  topic_id: string
  topic_name: string
  completion_percentage: number
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
