import { useState, useCallback } from 'react'
import type { LunchSession, Participant } from '../types'

const API_URL = 'http://localhost:8080/api/lunchsession'

export const useLunchAPI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchSessions = useCallback(async (): Promise<LunchSession[]> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_URL)
      if (res.ok) {
        const data = await res.json()
        return Array.isArray(data) ? data : []
      } else {
        return []
      }
    } catch {
      setError('Could not connect to backend')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSession = useCallback(async (id: string): Promise<LunchSession | null> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/${id}`)
      if (res.ok) {
        return await res.json()
      } else {
        return null
      }
    } catch {
      setError('Could not connect to backend')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createSession = useCallback(async (session: LunchSession): Promise<boolean> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      })
      if (res.ok) {
        return true
      } else {
        setError('Failed to propose session')
        return false
      }
    } catch {
      setError('Could not connect to backend')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSession = useCallback(async (session: LunchSession): Promise<LunchSession | null> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      })
      if (res.ok) {
        return await res.json()
      } else {
        setError('Failed to join session')
        return null
      }
    } catch {
      setError('Could not connect to backend')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const nominate = useCallback(async (id: string, nominee: Participant): Promise<LunchSession | null> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/${id}/nominate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nominee),
      })
      if (res.ok) {
        return await res.json()
      } else {
        setError('Failed to nominate')
        return null
      }
    } catch {
      setError('Could not connect to backend')
      return null
    } finally {
      setLoading(false)
    }
  }, [])
  
  const lockSession = useCallback(async (id: string): Promise<LunchSession | null> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/${id}/lock`, {
        method: 'POST',
      })
      if (res.ok) {
        return await res.json()
      } else {
        setError('Failed to lock session')
        return null
      }
    } catch {
      setError('Could not connect to backend')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    fetchSessions,
    fetchSession,
    createSession,
    updateSession,
    nominate,
    lockSession,
  }
}