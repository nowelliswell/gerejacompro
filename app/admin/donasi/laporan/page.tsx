'use client'

import { useState, useEffect } from 'react'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import { Donasi } from '@/lib/types/donasi'
import { formatCurrency } from '@/lib/utils/format'
import { FiDownload, FiPieChart } from 'react-icons/fi'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']

const KATEGORI_LABELS: Record<string, string> = {
  persepuluhan: 'Persepuluhan',
  persembahan: 'Persembahan',
  misi: 'Misi',
  pembangunan: 'Pembangunan',
}

export default function LaporanDonasiPage() {
  const [donasi, setDonasi] = useState<Donasi[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [filteredDonasi, setFilteredDonasi] = useState<Donasi[]>([])

  useEffect(() => {
    fetchDonasi()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [donasi, startDate, endDate])

  const fetchDonasi = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/donasi')
      if (response.ok) {
        const data = await response.json()
        // Only include verified donations in reports
        const verifiedDonasi = (data.donasi || []).filter(
          (d: Donasi) => d.status === 'verified'
        )
        setDonasi(verifiedDonasi)
      }
    } catch (error) {
      console.error('Error fetching donasi:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...donasi]

    if (startDate) {
      filtered = filtered.filter(
        d => new Date(d.createdAt) >= new Date(startDate)
      )
    }

    if (endDate) {
      filtered = filtered.filter(
        d => new Date(d.createdAt) <= new Date(endDate)
      )
    }

    setFilteredDonasi(filtered)
  }

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      params.append('status', 'verified')
      params.append('format', format)

      const response = await fetch(`/api/donasi/export?${params.toString()}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const extension = format === 'excel' ? 'xlsx' : 'csv'
        a.download = `laporan-donasi-${new Date().toISOString().split('T')[0]}.${extension}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting laporan:', error)
    }
  }

  // Calculate statistics
  const totalDonasi = filteredDonasi.reduce((sum, d) => sum + d.jumlah, 0)
  const totalTransaksi = filteredDonasi.length
  const averageDonasi = totalTransaksi > 0 ? totalDonasi / totalTransaksi : 0

  // Group by category
  const byKategori = filteredDonasi.reduce((acc, d) => {
    if (!acc[d.kategori]) {
      acc[d.kategori] = { total: 0, count: 0 }
    }
    acc[d.kategori].total += d.jumlah
    acc[d.kategori].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  // Prepare data for pie chart
  const pieData = Object.entries(byKategori).map(([kategori, data]) => ({
    name: KATEGORI_LABELS[kategori] || kategori,
    value: data.total,
    count: data.count,
  }))

  // Group by month for bar chart
  const byMonth = filteredDonasi.reduce((acc, d) => {
    const date = new Date(d.createdAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!acc[monthKey]) {
      acc[monthKey] = 0
    }
    acc[monthKey] += d.jumlah
    return acc
  }, {} as Record<string, number>)

  // Prepare data for bar chart
  const barData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => {
      const [year, monthNum] = month.split('-')
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des',
      ]
      return {
        month: `${monthNames[parseInt(monthNum) - 1]} ${year}`,
        total,
      }
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Laporan Donasi
        </h1>
        <p className="text-gray-600">
          Analisis dan statistik donasi yang telah diverifikasi
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 whitespace-nowrap"
            >
              <FiDownload />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
            >
              <FiDownload />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Donasi</div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiPieChart className="text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(totalDonasi)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Dari {totalTransaksi} transaksi
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Rata-rata Donasi</div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiPieChart className="text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(averageDonasi)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Per transaksi</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Transaksi</div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiPieChart className="text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {totalTransaksi}
          </div>
          <div className="text-sm text-gray-500 mt-1">Donasi terverifikasi</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - By Category */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Donasi per Kategori
          </h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={entry => `${entry.name}: ${formatCurrency(entry.value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Tidak ada data untuk ditampilkan
            </div>
          )}
        </div>

        {/* Bar Chart - By Month */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tren Donasi Bulanan
          </h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="total" fill="#10b981" name="Total Donasi" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Tidak ada data untuk ditampilkan
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Rincian per Kategori
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Kategori
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Jumlah Transaksi
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Total Donasi
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Rata-rata
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Persentase
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(byKategori).map(([kategori, data], index) => {
                const percentage =
                  totalDonasi > 0 ? (data.total / totalDonasi) * 100 : 0
                const average = data.count > 0 ? data.total / data.count : 0

                return (
                  <tr key={kategori} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium text-gray-900">
                          {KATEGORI_LABELS[kategori] || kategori}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {data.count}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">
                      {formatCurrency(data.total)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {formatCurrency(average)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {percentage.toFixed(1)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td className="py-3 px-4 text-gray-900">Total</td>
                <td className="py-3 px-4 text-right text-gray-900">
                  {totalTransaksi}
                </td>
                <td className="py-3 px-4 text-right text-green-600">
                  {formatCurrency(totalDonasi)}
                </td>
                <td className="py-3 px-4 text-right text-gray-900">
                  {formatCurrency(averageDonasi)}
                </td>
                <td className="py-3 px-4 text-right text-gray-900">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
