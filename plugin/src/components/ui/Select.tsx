import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({ label, className = '', children, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-base bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}