'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/admin/common/DataTable'
import StatusBadge from '@/components/admin/common/StatusBadge'
import SearchBar from '@/components/admin/common/SearchBar'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import EmptyState from '@/components/admin/common/EmptyState'
import { PermohonanPelayanan } from '@/lib/types/pelayanan'
import { formatDate } from '@/lib/utils/format'
import { FiFilter } from 'react-icons/fi'

// Color coding for service types
const jenisColors: Record<string, string> = {
  doa: 'bg-purple-100 text-purple-800 border-purple-200',
  konseling: 'bg-blue-100 text-blue-800 border-blue-200',
  baptisan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  baby: 'bg-pink-100 text-pink-800 border-pink-200',
  nikah: 'bg-rose-100 text-rose-800 border-rose-200',
  kunjungan: 'bg-amber-100 text-amber-800 border-amber-200',
}

const jenisLabels: Record<string, string> = {
  doa: 'Permohonan Doa',
  konseling: 'Konseling',
  baptisan: 'Baptisan',
  baby: 'Pemberkatan Bayi',
  nikah: 'Pemberkatan Nikah',
  kunjungan: 'Kunjungan Pastoral',
}

export default function PelayananPage() {
  const router = useRouter()
  const [pelayanan, setPelayanan] = useState<PermohonanPelayanan[]>([])
  const [filteredPelayanan, setFilteredPelayanan] = useState<PermohonanPelayanan[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [jenisFilter, setJenisFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchPelayanan()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [pelayanan, searchQuery, jenisFilter, statusFilter])

  const fetchPelayanan = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pelayanan')
      if (response.ok) {
        const data = await response.json()
        setPelayanan(data.pelayanan || [])
      }
    } catch (error) {
      console.error('Error fetching pelayanan:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...pelayanan]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.nama.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query)
      )
    }

    // Jenis filter
    if (jenisFilter) {
      filtered = filtered.filter(p => p.jenis === jenisFilter)
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(p => p.status === statusFilter)
    }

    setFilteredPelayanan(filtered)
  }

  const clearFilters = () => {
    setJenisFilter('')
    setStatusFilter('')
    setSearchQuery('')
  }

  const columns = [
    {
      key: 'nama' as keyof PermohonanPelayanan,
      label: 'Nama',
      sortable: true,
    },
    {
      key: 'email' as keyof PermohonanPelayanan,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'telepon' as keyof PermohonanPelayanan,
      label: 'Telepon',
      sortable: true,
    },
    {
      key: 'jenis' as keyof PermohonanPelayanan,
      label: 'Jenis Pelayanan',
      sortable: true,
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${jenisColors[value] || 'bg-gray-100 text-gray-800'}`}>
          {jenisLabels[value] || value}
        </span>
      ),
    },
    {
      key: 'status' as keyof PermohonanPelayanan,
      label: 'Status',
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'createdAt' as keyof PermohonanPelayanan,
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
          Manajemen Permohonan Pelayanan
        </h1>
        <p className="text-gray-600">
          Kelola permohonan pelayanan dari jemaat
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
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Pelayanan
              </label>
              <select
                value={jenisFilter}
                onChange={e => setJenisFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Jenis</option>
                <option value="doa">Permohonan Doa</option>
                <option value="konseling">Konseling</option>
                <option value="baptisan">Baptisan</option>
                <option value="baby">Pemberkatan Bayi</option>
                <option value="nikah">Pemberkatan Nikah</option>
                <option value="kunjungan">Kunjungan Pastoral</option>
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
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
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
          <div className="text-sm text-gray-600 mb-1">Total Permohonan</div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredPelayanan.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {filteredPelayanan.filter(p => p.status === 'pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {filteredPelayanan.filter(p => p.status === 'in-progress').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredPelayanan.filter(p => p.status === 'completed').length}
          </div>
        </div>
      </div>

      {/* Data Table */}
      {filteredPelayanan.length === 0 ? (
        <EmptyState
          title="Tidak ada permohonan"
          message="Belum ada data permohonan pelayanan yang tersedia"
        />
      ) : (
        <DataTable
          data={filteredPelayanan}
          columns={columns}
          onRowClick={item => router.push(`/admin/pelayanan/${item.id}`)}
        />
      )}
    </div>
  )
}
