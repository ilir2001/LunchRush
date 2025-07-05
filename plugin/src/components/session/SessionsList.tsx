import React from 'react'
import type { LunchSession } from '../../types'
import { SessionCard } from './SessionCard'

interface SessionsListProps {
  sessions: LunchSession[]
  onJoinSession: (sessionId: string) => void
  loading?: boolean
  error?: string
}

export const SessionsList: React.FC<SessionsListProps> = ({
  sessions,
  onJoinSession,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-indigo-600 font-medium">Loading sessions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="text-red-700 font-medium">{error}</div>
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-4">🍽️</div>
        <p className="text-lg">No lunch sessions yet. Be the first to propose one!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sessions.map(session => (
        <SessionCard
          key={session.id}
          session={session}
          onJoin={onJoinSession}
        />
      ))}
    </div>
  )
}