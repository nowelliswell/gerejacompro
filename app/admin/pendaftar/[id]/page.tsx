'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiCheck, FiX } from 'react-icons/fi'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import StatusBadge from '@/components/admin/common/StatusBadge'
import ConfirmDialog from '@/components/admin/common/ConfirmDialog'
import Modal from '@/components/admin/common/Modal'
import { Pendaftar } from '@/lib/types/pendaftar'
import { formatDate } from '@/lib/utils/format'

export default function PendaftarDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pendaftar, setPendaftar] = useState<Pendaftar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [alasanReject, setAlasanReject] = useState('')
  const [rejectError, setRejectError] = useState('')

  useEffect(() => {
    fetchPendaftar()
  }, [params.id])

  const fetchPendaftar = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/pendaftar/${params.id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Pendaftar tidak ditemukan')
      }

      const result = await response.json()
      setPendaftar(result.pendaftar)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      setIsProcessing(true)
      const response = await fetch(`/api/pendaftar/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'approve',
          processedBy: 'admin', // In real app, get from session
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Gagal menyetujui pendaftar')
      }

      // Refresh data
      await fetchPendaftar()
      setShowApproveDialog(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    // Validate alasan reject
    if (!alasanReject.trim()) {
      setRejectError('Alasan penolakan harus diisi')
      return
    }

    try {
      setIsProcessing(true)
      setRejectError('')
      const response = await fetch(`/api/pendaftar/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reject',
          alasanReject: alasanReject.trim(),
          processedBy: 'admin', // In real app, get from session
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Gagal menolak pendaftar')
      }

      // Refresh data
      await fetchPendaftar()
      setShowRejectModal(false)
      setAlasanReject('')
    } catch (err) {
      setRejectError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsProcessing(false)
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !pendaftar) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error || 'Pendaftar tidak ditemukan'}
        </div>
        <Link
          href="/admin/pendaftar"
          className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700"
        >
          <FiArrowLeft />
          Kembali ke Daftar Pendaftar
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
            href="/admin/pendaftar"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Pendaftar</h1>
            <p className="text-gray-600 mt-1">Informasi lengkap pendaftar jemaat baru</p>
          </div>
        </div>
        {pendaftar.status === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowApproveDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiCheck size={20} />
              Setujui
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FiX size={20} />
              Tolak
            </button>
          </div>
        )}
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
              <h2 className="text-xl font-semibold text-gray-900">{pendaftar.nama}</h2>
              <p className="text-gray-600">{pendaftar.email}</p>
            </div>
          </div>
          <StatusBadge
            status={pendaftar.status}
            variant={getStatusVariant(pendaftar.status)}
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
                <p className="text-gray-900">{pendaftar.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Telepon</p>
                <p className="text-gray-900">{pendaftar.telepon}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiCalendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Tanggal Lahir</p>
                <p className="text-gray-900">{formatDate(pendaftar.tanggalLahir)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Jenis Kelamin</p>
                <p className="text-gray-900">{pendaftar.jenisKelamin}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Status Pernikahan</p>
                <p className="text-gray-900">{pendaftar.statusPernikahan}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <FiMapPin className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Alamat</p>
                <p className="text-gray-900">{pendaftar.alamat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Information */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pendaftaran</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FiCalendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Tanggal Pendaftaran</p>
                <p className="text-gray-900">{formatDate(pendaftar.createdAt)}</p>
              </div>
            </div>

            {pendaftar.processedAt && (
              <div className="flex items-start gap-3">
                <FiCalendar className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Tanggal Diproses</p>
                  <p className="text-gray-900">{formatDate(pendaftar.processedAt)}</p>
                </div>
              </div>
            )}

            {pendaftar.processedBy && (
              <div className="flex items-start gap-3">
                <FiUser className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Diproses Oleh</p>
                  <p className="text-gray-900">{pendaftar.processedBy}</p>
                </div>
              </div>
            )}

            {pendaftar.alasanReject && (
              <div className="flex items-start gap-3 md:col-span-2">
                <FiX className="text-red-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Alasan Penolakan</p>
                  <p className="text-gray-900">{pendaftar.alasanReject}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approve Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showApproveDialog}
        onClose={() => setShowApproveDialog(false)}
        onConfirm={handleApprove}
        title="Setujui Pendaftar"
        message={`Apakah Anda yakin ingin menyetujui pendaftaran "${pendaftar.nama}"? Pendaftar akan menjadi jemaat resmi.`}
        confirmText={isProcessing ? 'Memproses...' : 'Setujui'}
        variant="info"
      />

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false)
          setAlasanReject('')
          setRejectError('')
        }}
        title="Tolak Pendaftar"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowRejectModal(false)
                setAlasanReject('')
                setRejectError('')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isProcessing}
            >
              Batal
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? 'Memproses...' : 'Tolak Pendaftar'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Anda akan menolak pendaftaran <strong>{pendaftar.nama}</strong>. 
            Silakan berikan alasan penolakan.
          </p>
          <div>
            <label htmlFor="alasanReject" className="block text-sm font-medium text-gray-700 mb-2">
              Alasan Penolakan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alasanReject"
              value={alasanReject}
              onChange={(e) => {
                setAlasanReject(e.target.value)
                setRejectError('')
              }}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Masukkan alasan penolakan..."
              disabled={isProcessing}
            />
            {rejectError && (
              <p className="mt-2 text-sm text-red-600">{rejectError}</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
