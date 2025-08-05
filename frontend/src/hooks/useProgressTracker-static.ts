import { useState } from 'react'
import type { UserProgress, UserStats } from '@/lib/supabase'

export const useProgressTracker = () => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState<any>(null)

  // Mock data for static build - temporarily disabled
  const toggleTopicCompletion = async (sectionId: string, topicId: string) => {
    // Mock implementation for static build
    console.log('Toggle topic completion:', sectionId, topicId)
    return true
  }

  const markCompleted = async (sectionId: string, topicId: string) => {
    // Mock implementation for static build
    console.log('Mark completed:', sectionId, topicId)
    return true
  }

  const getTotalProgress = () => {
    return { completed: 0, total: 100, percentage: 0 }
  }

  const getSectionProgress = (sectionId: string) => {
    return { completed: 0, total: 10, percentage: 0 }
  }

  const isTopicCompleted = (sectionId: string, topicId: string) => {
    return false
  }

  const getTopicProgress = (sectionId: string, topicId: string) => {
    return 0
  }

  const updateTopicProgressLocal = async (sectionId: string, topicId: string, progress: number) => {
    // Mock implementation for static build
    console.log('Update topic progress:', sectionId, topicId, progress)
    return true
  }

  const recordStudySession = async (sectionId: string, topicId: string, duration: number) => {
    // Mock implementation for static build
    console.log('Record study session:', sectionId, topicId, duration)
    return true
  }

  return {
    userProgress,
    userStats,
    loading,
    analytics,
    toggleTopicCompletion,
    markCompleted,
    getTotalProgress,
    getSectionProgress,
    isTopicCompleted,
    getTopicProgress,
    updateTopicProgress: updateTopicProgressLocal,
    recordStudySession
  }
}
