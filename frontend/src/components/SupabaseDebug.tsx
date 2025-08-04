'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'

export default function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [tableExists, setTableExists] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { user } = useUser()

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Basic connection
      console.log('🧪 Testing Supabase connection...')
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('count', { count: 'exact', head: true })

      if (error) {
        console.error('❌ Connection test failed:', error)
        setConnectionStatus('error')
        setErrorMessage(error.message)
        
        // Check if it's a table not found error
        if (error.message.includes('relation "user_progress" does not exist')) {
          setTableExists(false)
          setErrorMessage('Tables not created yet. Please run the database schema.')
        }
      } else {
        console.log('✅ Connection successful')
        setConnectionStatus('success')
        setTableExists(true)
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err)
      setConnectionStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const testInsert = async () => {
    if (!user?.id) {
      alert('Please sign in first')
      return
    }

    try {
      console.log('🧪 Testing insert operation...')
      
      const testData = {
        user_id: user.id,
        topic_id: 'test-topic',
        topic_name: 'Test Topic',
        completion_percentage: 50,
        completed_items: ['item1', 'item2'] // This tests the specific column that was missing
      }

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(testData)

      if (error) {
        console.error('❌ Insert test failed:', error)
        if (error.message.includes('completed_items')) {
          alert(`❌ COLUMN MISSING: The 'completed_items' column doesn't exist in your database. Please run the database schema in Supabase SQL Editor!`)
        } else {
          alert(`Insert failed: ${error.message}`)
        }
      } else {
        console.log('✅ Insert successful:', data)
        alert('✅ Test insert successful! The database schema is working correctly.')
      }
    } catch (err) {
      console.error('❌ Insert error:', err)
      alert(`Insert error: ${err}`)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border max-w-sm">
      <h3 className="font-bold text-sm mb-2">🔧 Supabase Debug Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <span>Connection:</span>
          {connectionStatus === 'testing' && <span className="text-yellow-600">Testing...</span>}
          {connectionStatus === 'success' && <span className="text-green-600">✅ Connected</span>}
          {connectionStatus === 'error' && <span className="text-red-600">❌ Failed</span>}
        </div>

        {tableExists !== null && (
          <div className="flex items-center space-x-2">
            <span>Tables:</span>
            {tableExists ? 
              <span className="text-green-600">✅ Exist</span> : 
              <span className="text-red-600">❌ Missing</span>
            }
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 p-2 rounded text-red-700">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <div className="flex space-x-2 mt-3">
          <button
            onClick={testConnection}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Retest
          </button>
          
          {user && connectionStatus === 'success' && (
            <button
              onClick={testInsert}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              Test Insert
            </button>
          )}
        </div>

        {!tableExists && (
          <div className="bg-yellow-50 p-2 rounded text-yellow-700 mt-2">
            <strong>Action needed:</strong> Run the SQL schema in your Supabase dashboard
          </div>
        )}
      </div>
    </div>
  )
}
