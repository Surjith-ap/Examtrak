import { supabase, UserProgress, StudySession, UserStats } from './supabase'

// User Progress Functions
export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_accessed', { ascending: false })

  if (error) {
    console.error('Error fetching user progress:', error)
    return []
  }

  return data || []
}

export const updateTopicProgress = async (
  userId: string,
  topicId: string,
  topicName: string,
  completionPercentage: number
): Promise<boolean> => {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      topic_id: topicId,
      topic_name: topicName,
      completion_percentage: completionPercentage,
      last_accessed: now,
      completed_at: completionPercentage >= 100 ? now : null,
      updated_at: now
    }, {
      onConflict: 'user_id,topic_id'
    })

  if (error) {
    console.error('Error updating topic progress:', error)
    return false
  }

  return true
}

export const markTopicCompleted = async (
  userId: string,
  topicId: string,
  topicName: string
): Promise<boolean> => {
  return await updateTopicProgress(userId, topicId, topicName, 100)
}

// Study Session Functions
export const createStudySession = async (
  userId: string,
  topicId: string,
  topicName: string,
  sessionDuration: number,
  questionsAnswered: number = 0,
  correctAnswers: number = 0
): Promise<boolean> => {
  const { error } = await supabase
    .from('study_sessions')
    .insert({
      user_id: userId,
      topic_id: topicId,
      topic_name: topicName,
      session_duration: sessionDuration,
      questions_answered: questionsAnswered,
      correct_answers: correctAnswers,
      session_date: new Date().toISOString().split('T')[0]
    })

  if (error) {
    console.error('Error creating study session:', error)
    return false
  }

  // Update user stats after successful session
  await updateUserStats(userId)
  return true
}

export const getStudySessions = async (
  userId: string,
  limit: number = 10
): Promise<StudySession[]> => {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching study sessions:', error)
    return []
  }

  return data || []
}

// User Stats Functions
export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No stats found, create initial stats
      return await createInitialUserStats(userId)
    }
    console.error('Error fetching user stats:', error)
    return null
  }

  return data
}

const createInitialUserStats = async (userId: string): Promise<UserStats | null> => {
  const initialStats = {
    user_id: userId,
    total_study_time: 0,
    topics_completed: 0,
    total_questions_answered: 0,
    total_correct_answers: 0,
    current_streak: 0,
    longest_streak: 0,
    last_study_date: new Date().toISOString().split('T')[0]
  }

  const { data, error } = await supabase
    .from('user_stats')
    .insert(initialStats)
    .select()
    .single()

  if (error) {
    console.error('Error creating initial user stats:', error)
    return null
  }

  return data
}

const updateUserStats = async (userId: string): Promise<void> => {
  try {
    // Get current stats
    const currentStats = await getUserStats(userId)
    if (!currentStats) return

    // Calculate new stats from sessions
    const { data: sessions } = await supabase
      .from('study_sessions')
      .select('session_duration, questions_answered, correct_answers, session_date')
      .eq('user_id', userId)

    if (!sessions) return

    // Calculate totals
    const totalStudyTime = sessions.reduce((sum, session) => sum + session.session_duration, 0)
    const totalQuestionsAnswered = sessions.reduce((sum, session) => sum + session.questions_answered, 0)
    const totalCorrectAnswers = sessions.reduce((sum, session) => sum + session.correct_answers, 0)

    // Get completed topics count
    const { data: completedTopics } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('completion_percentage', 100)

    const topicsCompleted = completedTopics?.length || 0

    // Calculate streak
    const { currentStreak, longestStreak } = calculateStreak(sessions.map(s => s.session_date))

    // Update stats
    await supabase
      .from('user_stats')
      .update({
        total_study_time: totalStudyTime,
        topics_completed: topicsCompleted,
        total_questions_answered: totalQuestionsAnswered,
        total_correct_answers: totalCorrectAnswers,
        current_streak: currentStreak,
        longest_streak: Math.max(longestStreak, currentStats.longest_streak),
        last_study_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

  } catch (error) {
    console.error('Error updating user stats:', error)
  }
}

const calculateStreak = (studyDates: string[]): { currentStreak: number; longestStreak: number } => {
  if (studyDates.length === 0) return { currentStreak: 0, longestStreak: 0 }

  // Sort dates in descending order
  const uniqueDates = Array.from(new Set(studyDates))
  const sortedDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i])
    date.setHours(0, 0, 0, 0)

    const expectedDate = new Date(today)
    expectedDate.setDate(expectedDate.getDate() - i)

    if (date.getTime() === expectedDate.getTime()) {
      tempStreak++
      if (i === 0 || currentStreak === 0) {
        currentStreak = tempStreak
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 0
      if (currentStreak === 0) {
        currentStreak = 0
      }
      break
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak)
  
  return { currentStreak, longestStreak }
}

// Analytics Functions
export const getProgressAnalytics = async (userId: string) => {
  const [userProgress, studySessions, userStats] = await Promise.all([
    getUserProgress(userId),
    getStudySessions(userId, 30), // Last 30 sessions
    getUserStats(userId)
  ])

  // Calculate completion percentage by subject
  const completionBySubject = userProgress.reduce((acc, progress) => {
    const subject = progress.topic_name.split(' - ')[0] // Extract subject from topic name
    if (!acc[subject]) {
      acc[subject] = { total: 0, completed: 0, percentage: 0 }
    }
    acc[subject].total++
    if (progress.completion_percentage >= 100) {
      acc[subject].completed++
    }
    acc[subject].percentage = (acc[subject].completed / acc[subject].total) * 100
    return acc
  }, {} as Record<string, { total: number; completed: number; percentage: number }>)

  // Calculate study activity for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  const activityData = last7Days.map(date => {
    const sessionsOnDate = studySessions.filter(session => session.session_date === date)
    const totalTime = sessionsOnDate.reduce((sum, session) => sum + session.session_duration, 0)
    return {
      date,
      studyTime: totalTime,
      sessions: sessionsOnDate.length
    }
  })

  return {
    userStats,
    completionBySubject,
    activityData,
    recentProgress: userProgress.slice(0, 5),
    recentSessions: studySessions.slice(0, 5)
  }
}
