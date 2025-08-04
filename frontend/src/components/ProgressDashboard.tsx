'use client'

import { useProgressTracker } from '@/hooks/useProgressTracker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, BookOpen, Clock, TrendingUp, Award, Target } from 'lucide-react'

export default function ProgressDashboard() {
  const {
    userStats,
    analytics,
    loading,
    getOverallProgress,
    getCompletedTopicsCount,
    userProgress
  } = useProgressTracker()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-amber-200 rounded mb-2"></div>
                  <div className="h-8 bg-amber-100 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const overallProgress = getOverallProgress()
  const completedTopics = getCompletedTopicsCount()
  const totalTopics = userProgress.length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-amber-700">{overallProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Topics Completed</p>
                <p className="text-2xl font-bold text-orange-700">
                  {completedTopics}/{totalTopics}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-red-700">
                  {Math.round((userStats?.total_study_time || 0) / 60)}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {userStats?.current_streak || 0} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress by Subject */}
      {analytics?.completionBySubject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Progress by Subject</span>
            </CardTitle>
            <CardDescription>
              Track your completion progress across different subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.completionBySubject).map(([subject, data]) => {
                const subjectData = data as { completed: number; total: number; percentage: number }
                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject}</span>
                      <Badge variant="outline">
                        {subjectData.completed}/{subjectData.total} topics
                      </Badge>
                    </div>
                    <Progress 
                      value={subjectData.percentage} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-600">
                      {Math.round(subjectData.percentage)}% complete
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Progress</CardTitle>
            <CardDescription>Your latest topic completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.recentProgress?.map((progress: any) => (
                <div key={progress.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{progress.topic_name}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(progress.last_accessed).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={progress.completion_percentage >= 100 ? "default" : "secondary"}
                  >
                    {progress.completion_percentage}%
                  </Badge>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">
                  No recent progress. Start studying to see your progress here!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Study Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>Last 7 Days Activity</span>
            </CardTitle>
            <CardDescription>Your daily study patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.activityData?.map((day: any) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {day.studyTime}m
                    </Badge>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${Math.min((day.studyTime / 60) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">
                  No study activity in the last 7 days
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      {userStats && (
        <Card>
          <CardHeader>
            <CardTitle>Study Statistics</CardTitle>
            <CardDescription>Your learning journey overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">
                  {userStats.total_questions_answered}
                </p>
                <p className="text-sm text-gray-600">Questions Answered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {userStats.total_correct_answers}
                </p>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {userStats.total_questions_answered > 0 
                    ? Math.round((userStats.total_correct_answers / userStats.total_questions_answered) * 100)
                    : 0}%
                </p>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {userStats.longest_streak}
                </p>
                <p className="text-sm text-gray-600">Longest Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
