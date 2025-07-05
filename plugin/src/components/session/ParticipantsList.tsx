import React from 'react'
import type { Participant } from '../../types'
import { Badge } from '../ui/Badge'

interface ParticipantsListProps {
  participants: Participant[]
  nominatedId?: string // Pass the nominated participant's id as a prop
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants, nominatedId }) => {
  return (
    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Order Summary ({participants.length})
      </h3>

      {participants.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🍽️</div>
          <p className="text-lg">No orders yet. Be the first to join!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {participants.map(participant => (
            <div key={participant.id} className="bg-white rounded-lg p-4 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {participant.name[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    {participant.name}
                    {nominatedId === participant.id && (
                      <Badge variant="success" className="ml-2">Nominated</Badge>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Participant</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-indigo-600">{participant.meal}</p>
                <p className="text-sm text-gray-600">Selected</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}