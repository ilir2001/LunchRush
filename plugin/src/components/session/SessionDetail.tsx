import React from 'react'
import type { LunchSession } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { JoinForm } from '../forms/JoinForm'
import { ParticipantsList } from './ParticipantsList'

interface SessionDetailProps {
  session: LunchSession
  onBack: () => void
  onJoin: (name: string, dish: string) => void
  loading?: boolean
}

export const SessionDetail: React.FC<SessionDetailProps> = ({
  session,
  onBack,
  onJoin,
  loading
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Sessions
        </Button>
        <Badge variant={session.locked ? 'danger' : 'success'}>
          {session.locked ? 'Locked' : 'Open'}
        </Badge>
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{session.restaurant}</h2>
        <p className="text-sm text-gray-600 mb-4">Session: {session.id}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Dishes:</h3>
            <div className="flex flex-wrap gap-2">
              {session.dishes.map(dish => (
                <span key={dish} className="bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200">
                  {dish}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Participants:</h3>
            <Badge variant="info">
              {session.participants.length} joined
            </Badge>
          </div>
        </div>
      </div>

      <JoinForm session={session} onSubmit={onJoin} loading={loading} />
      <ParticipantsList participants={session.participants} />
    </>
  )
}