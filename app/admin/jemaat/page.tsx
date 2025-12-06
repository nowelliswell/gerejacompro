'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiPlus, FiEdit, FiTrash2, FiDownload, FiEye } from 'react-icons/fi'
import DataTable, { Column } from '@/components/admin/common/DataTable'
import SearchBar from '@/components/admin/common/SearchBar'
import StatusBadge from '@/components/admin/common/StatusBadge'
import ConfirmDialog from '@/components/admin/common/ConfirmDialog'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import EmptyState from '@/components/admin/common/EmptyState'
import { Jemaat } from '@/lib/types/jemaat'
import { formatDate } from '@/lib/utils/format'

export default function JemaatPage() {
  const router = useRouter()
  const [jemaatList, setJemaatList] = useState<Jemaat[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const pageSize = 20

  const fetchJemaat = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(searchQuery && { search: searchQuery }),
      })

      const response = await fetch(`/api/jemaat?${params}`)
      if (!response.ok) throw new Error('Failed to fetch jemaat')

      const result = await response.json()
      setJemaatList(result.data)
      setTotalPages(result.pagination.totalPages)
      setTotal(result.pagination.total)
    } catch (error) {
      console.error('Error fetching jemaat:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJemaat()
  }, [page, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/jemaat/${deleteId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete jemaat')

      // Refresh the list
      await fetchJemaat()
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting jemaat:', error)
      alert('Gagal menghapus jemaat')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/jemaat/export')
      if (!response.ok) throw new Error('Failed to export jemaat')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `jemaat-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting jemaat:', error)
      alert('Gagal mengekspor data jemaat')
    }
  }

  const columns: Column<Jemaat>[] = [
    {
      key: 'nama',
      label: 'Nama',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'telepon',
      label: 'Telepon',
    },
    {
      key: 'jenisKelamin',
      label: 'Jenis Kelamin',
    },
    {
      key: 'tanggalBergabung',
      label: 'Tanggal Bergabung',
      sortable: true,
      render: (value) => formatDate(value as string),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <StatusBadge
          status={value as string}
          variant={value === 'active' ? 'success' : 'default'}
        />
      ),
    },
    {
      key: 'id',
      label: 'Aksi',
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/jemaat/${value}`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Lihat Detail"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => router.push(`/admin/jemaat/edit/${value}`)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => setDeleteId(value as string)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Hapus"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ]

  if (loading && jemaatList.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Jemaat</h1>
          <p className="text-gray-600 mt-1">
            Kelola data jemaat gereja ({total} jemaat terdaftar)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiDownload size={20} />
            Export CSV
          </button>
          <Link
            href="/admin/jemaat/tambah"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus size={20} />
            Tambah Jemaat
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Cari berdasarkan nama atau email..."
        onSearch={handleSearch}
        defaultValue={searchQuery}
      />

      {/* Data Table */}
      {jemaatList.length === 0 && !loading ? (
        <EmptyState
          title="Belum ada data jemaat"
          message="Mulai tambahkan data jemaat dengan klik tombol Tambah Jemaat"
          action={{
            label: 'Tambah Jemaat',
            onClick: () => router.push('/admin/jemaat/tambah'),
          }}
        />
      ) : (
        <DataTable
          data={jemaatList}
          columns={columns}
          loading={loading}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: setPage,
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Jemaat"
        message="Apakah Anda yakin ingin menghapus data jemaat ini? Tindakan ini tidak dapat dibatalkan."
        confirmText={isDeleting ? 'Menghapus...' : 'Hapus'}
        variant="danger"
      />
    </div>
  )
}
