'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiEdit, FiTrash2, FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import StatusBadge from '@/components/admin/common/StatusBadge'
import ConfirmDialog from '@/components/admin/common/ConfirmDialog'
import { Jemaat } from '@/lib/types/jemaat'
import { formatDate } from '@/lib/utils/format'

export default function JemaatDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [jemaat, setJemaat] = useState<Jemaat | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchJemaat = async () => {
      try {
        const response = await fetch(`/api/jemaat/${params.id}`)
        if (!response.ok) throw new Error('Jemaat tidak ditemukan')

        const result = await response.json()
        setJemaat(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }

    fetchJemaat()
  }, [params.id])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/jemaat/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Gagal menghapus jemaat')

      router.push('/admin/jemaat')
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !jemaat) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error || 'Jemaat tidak ditemukan'}
        </div>
        <Link
          href="/admin/jemaat"
          className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700"
        >
          <FiArrowLeft />
          Kembali ke Daftar Jemaat
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/jemaat"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Jemaat</h1>
            <p className="text-gray-600 mt-1">Informasi lengkap jemaat</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/jemaat/edit/${params.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEdit size={20} />
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiTrash2 size={20} />
            Hapus
          </button>
        </div>
      </div>

      {/* Main Information Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{jemaat.nama}</h2>
              <p className="text-gray-600">{jemaat.email}</p>
            </div>
          </div>
          <StatusBadge
            status={jemaat.status}
            variant={jemaat.status === 'active' ? 'success' : 'default'}
          />
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FiMail className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{jemaat.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Telepon</p>
                <p className="text-gray-900">{jemaat.telepon}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiCalendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Tanggal Lahir</p>
                <p className="text-gray-900">{formatDate(jemaat.tanggalLahir)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Jenis Kelamin</p>
                <p className="text-gray-900">{jemaat.jenisKelamin}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Status Pernikahan</p>
                <p className="text-gray-900">{jemaat.statusPernikahan}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <FiMapPin className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Alamat</p>
                <p className="text-gray-900">{jemaat.alamat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Church Information */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Gereja</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FiCalendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Tanggal Bergabung</p>
                <p className="text-gray-900">{formatDate(jemaat.tanggalBergabung)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Dibuat Oleh</p>
                <p className="text-gray-900">{jemaat.createdBy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Dibuat Pada</p>
              <p className="text-gray-900">{formatDate(jemaat.createdAt)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Terakhir Diperbarui</p>
              <p className="text-gray-900">{formatDate(jemaat.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Aktivitas</h3>
        <div className="text-gray-600 text-center py-8">
          <p>Belum ada riwayat aktivitas untuk jemaat ini</p>
          <p className="text-sm mt-2">Aktivitas seperti donasi, permohonan pelayanan, dan partisipasi komunitas akan muncul di sini</p>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Jemaat"
        message={`Apakah Anda yakin ingin menghapus data jemaat "${jemaat.nama}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText={isDeleting ? 'Menghapus...' : 'Hapus'}
        variant="danger"
      />
    </div>
  )
}
