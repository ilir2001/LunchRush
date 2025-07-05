import React from 'react'
import type { LunchSession } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface SessionCardProps {
  session: LunchSession
  onJoin: (sessionId: string) => void
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onJoin }) => {
  return (
    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{session.restaurant}</h3>
          <p className="text-sm text-gray-600">Session: {session.id}</p>
        </div>
        <Badge variant={session.locked ? 'danger' : 'success'}>
          {session.locked ? 'Locked' : 'Open'}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Available Dishes:</p>
          <div className="flex flex-wrap gap-2">
            {session.dishes.map(dish => (
              <span key={dish} className="bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200">
                {dish}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Participants:</span>
          <Badge variant="info">
            {session.participants.length}
          </Badge>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => onJoin(session.id)}
        variant="primary"
      >
        {session.locked ? 'View Details' : 'Join the Lunch'}
      </Button>
    </div>
  )
}