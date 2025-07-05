import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-base bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  )
}