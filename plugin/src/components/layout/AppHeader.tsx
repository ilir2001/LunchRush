import React from 'react'

export const AppHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-2 flex items-center justify-center gap-3">
        <span className="text-4xl">🍱</span>
        LunchRush
      </h1>
      <p className="text-lg text-gray-600">
        Propose lunch spots, join orders, and coordinate team meals
      </p>
    </div>
  )
}