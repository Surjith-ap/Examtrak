import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import {
  getUserProgress,
  getUserStats,
  updateTopicProgress,
  createStudySession,
  getProgressAnalytics,
  markTopicCompleted
} from '@/lib/progressTracker'
import type { UserProgress, UserStats } from '@/lib/supabase'

export const useProgressTracker = () => {
  const { user } = useUser()
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)

  // Load user progress and stats
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id) return

      setLoading(true)
      try {
        const [progress, stats, analyticsData] = await Promise.all([
          getUserProgress(user.id),
          getUserStats(user.id),
          getProgressAnalytics(user.id)
        ])

        setUserProgress(progress)
        setUserStats(stats)
        setAnalytics(analyticsData)
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user?.id])

  // Update topic progress
  const updateProgress = async (
    topicId: string,
    topicName: string,
    completionPercentage: number
  ) => {
    if (!user?.id) return false

    const success = await updateTopicProgress(
      user.id,
      topicId,
      topicName,
      completionPercentage
    )

    if (success) {
      // Refresh progress data
      const updatedProgress = await getUserProgress(user.id)
      setUserProgress(updatedProgress)

      // If topic completed, refresh stats too
      if (completionPercentage >= 100) {
        const updatedStats = await getUserStats(user.id)
        setUserStats(updatedStats)
      }
    }

    return success
  }

  // Complete a topic
  const completeTopicHandler = async (topicId: string, topicName: string) => {
    if (!user?.id) return false

    const success = await markTopicCompleted(user.id, topicId, topicName)

    if (success) {
      // Refresh all data
      const [updatedProgress, updatedStats, updatedAnalytics] = await Promise.all([
        getUserProgress(user.id),
        getUserStats(user.id),
        getProgressAnalytics(user.id)
      ])

      setUserProgress(updatedProgress)
      setUserStats(updatedStats)
      setAnalytics(updatedAnalytics)
    }

    return success
  }

  // Start a study session
  const startStudySession = async (
    topicId: string,
    topicName: string,
    sessionDuration: number,
    questionsAnswered: number = 0,
    correctAnswers: number = 0
  ) => {
    if (!user?.id) return false

    const success = await createStudySession(
      user.id,
      topicId,
      topicName,
      sessionDuration,
      questionsAnswered,
      correctAnswers
    )

    if (success) {
      // Refresh stats and analytics
      const [updatedStats, updatedAnalytics] = await Promise.all([
        getUserStats(user.id),
        getProgressAnalytics(user.id)
      ])

      setUserStats(updatedStats)
      setAnalytics(updatedAnalytics)
    }

    return success
  }

  // Get progress for a specific topic
  const getTopicProgress = (topicId: string): UserProgress | null => {
    return userProgress.find(p => p.topic_id === topicId) || null
  }

  // Get completion percentage for overall progress
  const getOverallProgress = (): number => {
    if (userProgress.length === 0) return 0
    
    const totalCompletion = userProgress.reduce(
      (sum, progress) => sum + progress.completion_percentage,
      0
    )
    
    return Math.round(totalCompletion / userProgress.length)
  }

  // Get completed topics count
  const getCompletedTopicsCount = (): number => {
    return userProgress.filter(p => p.completion_percentage >= 100).length
  }

  return {
    // Data
    userProgress,
    userStats,
    analytics,
    loading,

    // Actions
    updateProgress,
    completeTopicHandler,
    startStudySession,

    // Getters
    getTopicProgress,
    getOverallProgress,
    getCompletedTopicsCount,

    // State
    isUserLoggedIn: !!user?.id
  }
}
