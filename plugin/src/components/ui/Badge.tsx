import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'danger' | 'info' | 'default'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-indigo-100 text-indigo-700',
    default: 'bg-gray-100 text-gray-700',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
