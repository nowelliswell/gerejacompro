'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Pendaftar } from '@/lib/types/pendaftar'
import DataTable from '@/components/admin/common/DataTable'
import StatusBadge from '@/components/admin/common/StatusBadge'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import EmptyState from '@/components/admin/common/EmptyState'
import { formatDate } from '@/lib/utils/format'

export default function PendaftarPage() {
  const router = useRouter()
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([])
  const [filteredPendaftar, setFilteredPendaftar] = useState<Pendaftar[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchPendaftar()
  }, [])

  useEffect(() => {
    filterPendaftar()
  }, [pendaftar, statusFilter])

  const fetchPendaftar = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pendaftar')
      if (response.ok) {
        const data = await response.json()
        setPendaftar(data.pendaftar || [])
      } else {
        console.error('Failed to fetch pendaftar')
      }
    } catch (error) {
      console.error('Error fetching pendaftar:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPendaftar = () => {
    if (statusFilter === 'all') {
      setFilteredPendaftar(pendaftar)
    } else {
      setFilteredPendaftar(pendaftar.filter(p => p.status === statusFilter))
    }
  }

  const handleRowClick = (row: Pendaftar) => {
    router.push(`/admin/pendaftar/${row.id}`)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'danger'
      default:
        return 'default'
    }
  }

  const columns = [
    {
      key: 'nama' as keyof Pendaftar,
      label: 'Nama',
      sortable: true,
    },
    {
      key: 'email' as keyof Pendaftar,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'telepon' as keyof Pendaftar,
      label: 'Telepon',
    },
    {
      key: 'jenisKelamin' as keyof Pendaftar,
      label: 'Jenis Kelamin',
    },
    {
      key: 'status' as keyof Pendaftar,
      label: 'Status',
      sortable: true,
      render: (value: any) => (
        <StatusBadge 
          status={value} 
          variant={getStatusVariant(value)}
        />
      ),
    },
    {
      key: 'createdAt' as keyof Pendaftar,
      label: 'Tanggal Daftar',
      sortable: true,
      render: (value: any) => formatDate(value),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pendaftar Jemaat Baru</h1>
          <p className="text-gray-600 mt-1">Kelola pendaftaran jemaat baru</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className="text-sm text-gray-600">
            Menampilkan {filteredPendaftar.length} dari {pendaftar.length} pendaftar
          </span>
        </div>
      </div>

      {/* Table */}
      {filteredPendaftar.length === 0 ? (
        <EmptyState
          title="Tidak ada pendaftar"
          description={
            statusFilter === 'all'
              ? 'Belum ada pendaftaran jemaat baru'
              : `Tidak ada pendaftar dengan status ${statusFilter}`
          }
        />
      ) : (
        <div className="bg-white rounded-lg shadow">
          <DataTable
            data={filteredPendaftar}
            columns={columns}
            onRowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  )
}
