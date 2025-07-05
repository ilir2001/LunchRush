import React, { useState } from 'react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import type { LunchSession } from '../../types'

interface JoinFormProps {
  session: LunchSession
  onSubmit: (name: string, dish: string) => void
  loading?: boolean
}

export const JoinForm: React.FC<JoinFormProps> = ({ session, onSubmit, loading }) => {
  const [name, setName] = useState('')
  const [selectedDish, setSelectedDish] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name, selectedDish)
    setName('')
    setSelectedDish('')
  }

  if (session.dishes.length === 0 || session.locked) {
    return null
  }

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Join the Order</h3>
      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <Input
                label="Your Name"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-6">
              <Select
                label="Choose Your Dish"
                value={selectedDish}
                onChange={e => setSelectedDish(e.target.value)}
                required
              >
                <option value="">Select your dish...</option>
                {session.dishes.map(dish => (
                  <option key={dish} value={dish}>{dish}</option>
                ))}
              </Select>
            </div>
            <div className="md:col-span-2">
              <div className="pt-7">
                <Button type="submit" loading={loading} className="w-full">
                  Join Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
