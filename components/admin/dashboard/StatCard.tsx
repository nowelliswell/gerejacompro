'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  loading?: boolean
  bgColor?: string
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  loading = false,
  bgColor = 'bg-blue-100'
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          {loading ? (
            <div className="mt-1 h-8 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
