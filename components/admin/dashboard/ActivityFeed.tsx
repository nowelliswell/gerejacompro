'use client'

import Link from 'next/link'
import { formatRelativeTime } from '@/lib/utils/format'

interface Activity {
  id: string
  type: 'registration' | 'donation' | 'service_request'
  title: string
  description: string
  timestamp: string
  link: string
}

interface ActivityFeedProps {
  activities: Activity[]
  loading?: boolean
}

const activityIcons = {
  registration: '✨',
  donation: '💰',
  service_request: '📋'
}

const activityColors = {
  registration: 'bg-purple-100 text-purple-600',
  donation: 'bg-green-100 text-green-600',
  service_request: 'bg-yellow-100 text-yellow-600'
}

export default function ActivityFeed({ activities, loading = false }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada aktivitas</p>
        ) : (
          <div className="space-y-4">
            {activities.map(activity => (
              <Link
                key={activity.id}
                href={activity.link}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-10 h-10 ${activityColors[activity.type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xl">{activityIcons[activity.type]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
