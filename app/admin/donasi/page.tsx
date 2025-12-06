'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/admin/common/DataTable'
import StatusBadge from '@/components/admin/common/StatusBadge'
import SearchBar from '@/components/admin/common/SearchBar'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import EmptyState from '@/components/admin/common/EmptyState'
import { Donasi } from '@/lib/types/donasi'
import { formatCurrency, formatDate } from '@/lib/utils/format'
import { FiDownload, FiFilter } from 'react-icons/fi'

export default function DonasiPage() {
  const router = useRouter()
  const [donasi, setDonasi] = useState<Donasi[]>([])
  const [filteredDonasi, setFilteredDonasi] = useState<Donasi[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchDonasi()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [donasi, searchQuery, kategoriFilter, statusFilter, startDate, endDate])

  const fetchDonasi = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/donasi')
      if (response.ok) {
        const data = await response.json()
        setDonasi(data.donasi || [])
      }
    } catch (error) {
      console.error('Error fetching donasi:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...donasi]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        d =>
          d.nama.toLowerCase().includes(query) ||
          d.email.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (kategoriFilter) {
      filtered = filtered.filter(d => d.kategori === kategoriFilter)
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(d => d.status === statusFilter)
    }

    // Date range filter
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

  const handleExport = async (format: 'csv' | 'excel' = 'csv') => {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (kategoriFilter) params.append('kategori', kategoriFilter)
      if (statusFilter) params.append('status', statusFilter)
      params.append('format', format)

      const response = await fetch(`/api/donasi/export?${params.toString()}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const extension = format === 'excel' ? 'xlsx' : 'csv'
        a.download = `donasi-export-${new Date().toISOString().split('T')[0]}.${extension}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting donasi:', error)
    }
  }

  const clearFilters = () => {
    setKategoriFilter('')
    setStatusFilter('')
    setStartDate('')
    setEndDate('')
    setSearchQuery('')
  }

  const columns = [
    {
      key: 'nama' as keyof Donasi,
      label: 'Nama',
      sortable: true,
    },
    {
      key: 'email' as keyof Donasi,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'kategori' as keyof Donasi,
      label: 'Kategori',
      sortable: true,
      render: (value: string) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      key: 'jumlah' as keyof Donasi,
      label: 'Jumlah',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'metode' as keyof Donasi,
      label: 'Metode',
      sortable: true,
      render: (value: string) => (
        <span className="uppercase text-sm">{value}</span>
      ),
    },
    {
      key: 'status' as keyof Donasi,
      label: 'Status',
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'createdAt' as keyof Donasi,
      label: 'Tanggal',
      sortable: true,
      render: (value: string) => formatDate(value),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Manajemen Donasi
        </h1>
        <p className="text-gray-600">
          Kelola dan verifikasi donasi dari jemaat
        </p>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <SearchBar
            defaultValue={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Cari nama atau email..."
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FiFilter />
            Filter
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FiDownload />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FiDownload />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={kategoriFilter}
                onChange={e => setKategoriFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Kategori</option>
                <option value="persepuluhan">Persepuluhan</option>
                <option value="persembahan">Persembahan</option>
                <option value="misi">Misi</option>
                <option value="pembangunan">Pembangunan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
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

            <div>
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
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Donasi</div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredDonasi.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Jumlah</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(
              filteredDonasi.reduce((sum, d) => sum + d.jumlah, 0)
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {filteredDonasi.filter(d => d.status === 'pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Verified</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredDonasi.filter(d => d.status === 'verified').length}
          </div>
        </div>
      </div>

      {/* Data Table */}
      {filteredDonasi.length === 0 ? (
        <EmptyState
          title="Tidak ada donasi"
          message="Belum ada data donasi yang tersedia"
        />
      ) : (
        <DataTable
          data={filteredDonasi}
          columns={columns}
          onRowClick={item => router.push(`/admin/donasi/${item.id}`)}
        />
      )}
    </div>
  )
}
