import React, { useState, useEffect } from 'react'
import type { LunchSession } from './types'
import { useLunchAPI } from './hooks/useLunchAPI'
import { AppHeader } from './components/layout/AppHeader'
import { Card, CardContent } from './components/ui/Card'
import { ProposeForm } from './components/forms/ProposeForm'
import { SessionsList } from './components/session/SessionsList'
import { SessionDetail } from './components/session/SessionDetail'

export default function App() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [session, setSession] = useState<LunchSession | null>(null)
  const [sessions, setSessions] = useState<LunchSession[]>([])
  
  const { loading, error, fetchSessions, fetchSession, createSession, updateSession } = useLunchAPI()

  useEffect(() => {
    loadSessions()
  }, [fetchSessions])

  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId)
    } else {
      setSession(null)
    }
  }, [sessionId, fetchSession])

  const loadSessions = async () => {
    const data = await fetchSessions()
    setSessions(data)
  }

  const loadSession = async (id: string) => {
    const data = await fetchSession(id)
    setSession(data)
  }

  const handleProposeSession = async (newSession: LunchSession) => {
    const success = await createSession(newSession)
    if (success) {
      loadSessions()
    }
  }

  const handleJoinSession = (id: string) => {
    setSessionId(id)
  }

  const handleJoinOrder = async (name: string, dish: string) => {
    if (!session) return
    
    const updatedSession: LunchSession = {
      ...session,
      participants: [
        ...session.participants.filter(p => p.name !== name),
        { id: Math.random().toString(36).slice(2), name, meal: dish },
      ],
    }
    
    const result = await updateSession(updatedSession)
    if (result) {
      setSession(result)
      loadSessions()
    }
  }

  const handleBack = () => {
    setSessionId(null)
    setSession(null)
    loadSessions() // Refresh the sessions list when going back
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <AppHeader />
        
        <Card>
          <CardContent>
            {!session ? (
              <>
                <ProposeForm onSubmit={handleProposeSession} loading={loading} />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Sessions</h2>
                  <SessionsList
                    sessions={sessions}
                    onJoinSession={handleJoinSession}
                    loading={loading}
                    error={error}
                  />
                </div>
              </>
            ) : (
              <SessionDetail
                session={session}
                onBack={handleBack}
                onJoin={handleJoinOrder}
                loading={loading}
                onRefresh={() => loadSession(session.id)} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}