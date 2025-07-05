import React, { useState } from 'react'
import type { LunchSession, Participant } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { JoinForm } from '../forms/JoinForm'
import { ParticipantsList } from './ParticipantsList'
import { useLunchAPI } from '../../hooks/useLunchAPI'
import { Select } from '../ui/Select'

interface SessionDetailProps {
  session: LunchSession
  onBack: () => void
  onJoin: (name: string, dish: string) => void
  loading?: boolean
  onRefresh: () => void // Add this
}

export const SessionDetail: React.FC<SessionDetailProps> = ({
  session,
  onBack,
  onJoin,
  loading,
  onRefresh,
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { nominate, lockSession } = useLunchAPI()
  const [nominee, setNominee] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNominate = async () => {
    if (!nominee) return
    setActionLoading(true)
    setError('')
    const participant: Participant | undefined = session.participants.find(p => p.name === nominee)
    if (!participant) {
      setError('Participant not found')
      setActionLoading(false)
      return
    }
    await nominate(session.id, participant)
    setActionLoading(false)
    setNominee('')
    onRefresh() // Refresh session data
  }

  const handleLock = async () => {
    setShowConfirm(false)
    setActionLoading(true)
    setError('')
    await lockSession(session.id)
    setActionLoading(false)
    onRefresh() // Refresh session data
  }

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

        {/* Nomination and Lock Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Placement</h3>
          <div className="mb-2">
            <span className="font-medium">Nominated:</span>{' '}
            {session.nominated?.name ? (
              <span className="text-green-700 font-semibold">{session.nominated.name}</span>
            ) : (
              <span className="text-gray-500">No one nominated yet</span>
            )}
          </div>
          {/* Nominate Section - only if not locked */}
          {!session.locked && (
            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mb-4">
              <Select
                value={nominee}
                onChange={e => setNominee(e.target.value)}
                className="border rounded px-2 py-1"
                disabled={actionLoading || session.participants.length === 0}
              >
                <option value="">Select participant to nominate</option>
                {session.participants.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </Select>
              <Button
                type="button"
                onClick={handleNominate}
                disabled={!nominee || actionLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded"
              >
                Nominate
              </Button>
            </div>
          )}
          {/* Lock Order Button - always visible, disabled if locked */}
          <Button
            type="button"
            onClick={() => !session.locked && setShowConfirm(true)}
            disabled={session.locked || actionLoading}
            className={`bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded ${session.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {session.locked ? 'Order Locked' : 'Lock Order'}
          </Button>
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Blurred and semi-transparent overlay */}
              <div
                className="absolute inset-0 bg-white/40 backdrop-blur-sm"
                onClick={() => setShowConfirm(false)}
                aria-label="Close"
              />
              <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10 border border-indigo-200">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to lock this session?</h2>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleLock}
                    loading={actionLoading}
                  >
                    Yes, Lock
                  </Button>
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-red-600 mt-2">{error}</div>}
          {session.locked && (
            <div className="text-red-700 font-semibold mt-2">
              Order is locked. No more changes allowed.
            </div>
          )}
        </div>
      </div>
      <JoinForm session={session} onSubmit={onJoin} loading={loading} disabled={session.locked} />
      <ParticipantsList participants={session.participants} nominatedId={session.nominated?.id} />
    </>
  )
}