'use client'

import { useEffect, useState } from 'react'
import StatCard from '@/components/admin/dashboard/StatCard'
import ChartCard from '@/components/admin/dashboard/ChartCard'
import ActivityFeed from '@/components/admin/dashboard/ActivityFeed'
import { formatCurrency } from '@/lib/utils/format'

interface DashboardStats {
  totalJemaat: number
  totalDonasiThisMonth: number
  pendingServiceRequests: number
  recentRegistrations: number
}

interface DonationTrendData {
  data: Array<{ month: string; total: number }>
}

interface Activity {
  id: string
  type: 'registration' | 'donation' | 'service_request'
  title: string
  description: string
  timestamp: string
  link: string
}

interface ActivitiesData {
  activities: Activity[]
}

export default function DashboardClient({ userName }: { userName: string }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [trendData, setTrendData] = useState<Array<{ month: string; total: number }>>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch all data in parallel
        const [statsRes, trendRes, activitiesRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/donation-trend'),
          fetch('/api/dashboard/activities')
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          console.log('Stats data:', statsData)
          setStats(statsData)
        } else {
          console.error('Stats fetch failed:', statsRes.status, statsRes.statusText)
        }

        if (trendRes.ok) {
          const trendData: DonationTrendData = await trendRes.json()
          console.log('Trend data received:', trendData)
          console.log('Trend data array:', trendData.data)
          console.log('Trend data type:', typeof trendData.data)
          console.log('Is array?', Array.isArray(trendData.data))
          if (trendData.data && Array.isArray(trendData.data)) {
            console.log('Setting trend data with', trendData.data.length, 'items')
            setTrendData(trendData.data)
          } else {
            console.error('Invalid trend data format:', trendData)
            setTrendData([])
          }
        } else {
          console.error('Trend fetch failed:', trendRes.status, trendRes.statusText)
          const errorText = await trendRes.text()
          console.error('Error response:', errorText)
        }

        if (activitiesRes.ok) {
          const activitiesData: ActivitiesData = await activitiesRes.json()
          console.log('Activities data:', activitiesData)
          setActivities(activitiesData.activities)
        } else {
          console.error('Activities fetch failed:', activitiesRes.status, activitiesRes.statusText)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Selamat datang, <span className="font-semibold">{userName}</span>!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Jemaat"
          value={stats?.totalJemaat ?? 0}
          icon={<span className="text-2xl">👥</span>}
          loading={loading}
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Donasi Bulan Ini"
          value={stats ? formatCurrency(stats.totalDonasiThisMonth) : 'Rp 0'}
          icon={<span className="text-2xl">💰</span>}
          loading={loading}
          bgColor="bg-green-100"
        />
        <StatCard
          title="Permohonan Pending"
          value={stats?.pendingServiceRequests ?? 0}
          icon={<span className="text-2xl">📋</span>}
          loading={loading}
          bgColor="bg-yellow-100"
        />
        <StatCard
          title="Pendaftar Baru (30 Hari)"
          value={stats?.recentRegistrations ?? 0}
          icon={<span className="text-2xl">✨</span>}
          loading={loading}
          bgColor="bg-purple-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Tren Donasi 6 Bulan Terakhir"
          data={trendData}
          loading={loading}
        />
        <ActivityFeed activities={activities} loading={loading} />
      </div>
    </div>
  )
}
