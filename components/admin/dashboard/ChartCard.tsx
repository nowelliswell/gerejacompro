'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils/format'

interface ChartCardProps {
  title: string
  data: Array<{ month: string; total: number }>
  loading?: boolean
}

export default function ChartCard({ title, data, loading = false }: ChartCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return <ChartCardContent title={title} data={data} loading={loading} />
}

function ChartCardContent({ title, data, loading }: ChartCardProps) {
  // Dynamic import of Recharts to avoid SSR issues
  const [RechartsComponents, setRechartsComponents] = useState<any>(null)

  useEffect(() => {
    import('recharts').then((recharts) => {
      setRechartsComponents(recharts)
    })
  }, [])

  if (!RechartsComponents) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = RechartsComponents

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        ) : !data || data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="mb-2">Belum ada data donasi</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value: number) => {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}jt`
                  }
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}rb`
                  }
                  return value.toString()
                }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
