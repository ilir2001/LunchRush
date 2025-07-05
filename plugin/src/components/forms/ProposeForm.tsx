import React, { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { LunchSession } from '../../types'

interface ProposeFormProps {
    onSubmit: (session: LunchSession) => void
    loading?: boolean
}

export const ProposeForm: React.FC<ProposeFormProps> = ({ onSubmit, loading }) => {
    const [restaurant, setRestaurant] = useState('')
    const [dishes, setDishes] = useState<string[]>([''])

    const handleDishChange = (index: number, value: string) => {
        const newDishes = [...dishes]
        newDishes[index] = value
        setDishes(newDishes)
    }

    const handleAddDish = () => {
        setDishes([...dishes, ''])
    }

    const handleRemoveDish = (index: number) => {
        setDishes(dishes.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newSession: LunchSession = {
            id: (restaurant + '-' + Date.now()).toLowerCase().replace(/\s+/g, '-'),
            participants: [],
            restaurant,
            dishes: dishes.map(d => d.trim()).filter(Boolean),
            locked: false,
        }
        onSubmit(newSession)
        setRestaurant('')
        setDishes([''])
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Propose New Lunch</h2>
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4">
                            <Input
                                label="Restaurant"
                                placeholder="Enter restaurant name"
                                value={restaurant}
                                onChange={e => setRestaurant(e.target.value)}
                                required
                            />
                        </div>
                        <div className="md:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dishes</label>
                            {dishes.map((dish, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <Input
                                        placeholder={`Dish #${idx + 1}`}
                                        value={dish}
                                        onChange={e => handleDishChange(idx, e.target.value)}
                                        required
                                    />
                                    {dishes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDish(idx)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                            aria-label="Remove dish"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={handleAddDish}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-4 text-sm transition-colors duration-150"
                                variant="secondary"
                            >
                                + Add Dish
                            </Button>
                        </div>
                        <div className="md:col-span-2">
                            <div className="pt-7">
                                <Button type="submit" loading={loading} className="w-full">
                                    Propose
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}