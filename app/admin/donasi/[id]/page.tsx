'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import StatusBadge from '@/components/admin/common/StatusBadge'
import ConfirmDialog from '@/components/admin/common/ConfirmDialog'
import Modal from '@/components/admin/common/Modal'
import { Donasi } from '@/lib/types/donasi'
import { formatCurrency, formatDate } from '@/lib/utils/format'
import { FiArrowLeft, FiCheck, FiX, FiImage } from 'react-icons/fi'

export default function DonasiDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [donasi, setDonasi] = useState<Donasi | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    fetchDonasi()
  }, [id])

  const fetchDonasi = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/donasi/${id}`)
      if (response.ok) {
        const data = await response.json()
        setDonasi(data.donasi)
      } else {
        router.push('/admin/donasi')
      }
    } catch (error) {
      console.error('Error fetching donasi:', error)
      router.push('/admin/donasi')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    try {
      setProcessing(true)
      const response = await fetch(`/api/donasi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify' }),
      })

      if (response.ok) {
        await fetchDonasi()
        setShowVerifyDialog(false)
      }
    } catch (error) {
      console.error('Error verifying donasi:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Mohon masukkan alasan penolakan')
      return
    }

    try {
      setProcessing(true)
      const response = await fetch(`/api/donasi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          catatan: rejectReason,
        }),
      })

      if (response.ok) {
        await fetchDonasi()
        setShowRejectDialog(false)
        setRejectReason('')
      }
    } catch (error) {
      console.error('Error rejecting donasi:', error)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!donasi) {
    return null
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/donasi')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft />
          Kembali ke Daftar Donasi
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Detail Donasi
            </h1>
            <p className="text-gray-600">ID: {donasi.id}</p>
          </div>
          <StatusBadge status={donasi.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Donor Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Donatur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nama</label>
                <p className="font-medium text-gray-900">{donasi.nama}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium text-gray-900">{donasi.email}</p>
              </div>
            </div>
          </div>

          {/* Donation Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detail Donasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Kategori</label>
                <p className="font-medium text-gray-900 capitalize">
                  {donasi.kategori}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Jumlah</label>
                <p className="font-semibold text-green-600 text-xl">
                  {formatCurrency(donasi.jumlah)}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Metode Pembayaran</label>
                <p className="font-medium text-gray-900 uppercase">
                  {donasi.metode}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Donasi</label>
                <p className="font-medium text-gray-900">
                  {formatDate(donasi.createdAt)}
                </p>
              </div>
            </div>

            {donasi.catatan && (
              <div className="mt-4">
                <label className="text-sm text-gray-600">Catatan</label>
                <p className="font-medium text-gray-900 mt-1">{donasi.catatan}</p>
              </div>
            )}
          </div>

          {/* Bukti Transfer */}
          {donasi.buktiTransfer && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Bukti Transfer
              </h2>
              <div className="relative">
                <img
                  src={donasi.buktiTransfer}
                  alt="Bukti Transfer"
                  className="w-full max-w-md rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                />
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                >
                  <FiImage className="text-gray-600" />
                </button>
              </div>
            </div>
          )}

          {/* Verification Info */}
          {(donasi.status === 'verified' || donasi.status === 'rejected') && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informasi Verifikasi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">
                    {donasi.status === 'verified' ? 'Diverifikasi Oleh' : 'Ditolak Oleh'}
                  </label>
                  <p className="font-medium text-gray-900">
                    {donasi.verifiedBy || '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    {donasi.status === 'verified' ? 'Tanggal Verifikasi' : 'Tanggal Penolakan'}
                  </label>
                  <p className="font-medium text-gray-900">
                    {donasi.verifiedAt ? formatDate(donasi.verifiedAt) : '-'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Aksi
            </h2>

            {donasi.status === 'pending' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowVerifyDialog(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiCheck />
                  Verifikasi Donasi
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiX />
                  Tolak Donasi
                </button>
              </div>
            )}

            {donasi.status === 'verified' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                  <FiCheck className="text-green-600 text-2xl" />
                </div>
                <p className="text-gray-600">Donasi telah diverifikasi</p>
              </div>
            )}

            {donasi.status === 'rejected' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
                  <FiX className="text-red-600 text-2xl" />
                </div>
                <p className="text-gray-600">Donasi telah ditolak</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verify Dialog */}
      <ConfirmDialog
        isOpen={showVerifyDialog}
        onClose={() => setShowVerifyDialog(false)}
        onConfirm={handleVerify}
        title="Verifikasi Donasi"
        message="Apakah Anda yakin ingin memverifikasi donasi ini?"
        confirmText="Verifikasi"
        variant="info"
      />

      {/* Reject Dialog */}
      <Modal
        isOpen={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false)
          setRejectReason('')
        }}
        title="Tolak Donasi"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Mohon berikan alasan penolakan donasi ini:
          </p>
          <textarea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            placeholder="Masukkan alasan penolakan..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowRejectDialog(false)
                setRejectReason('')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={processing}
            >
              Batal
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              disabled={processing || !rejectReason.trim()}
            >
              {processing ? 'Memproses...' : 'Tolak Donasi'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      {donasi.buktiTransfer && (
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title="Bukti Transfer"
          size="lg"
        >
          <img
            src={donasi.buktiTransfer}
            alt="Bukti Transfer"
            className="w-full rounded-lg"
          />
        </Modal>
      )}
    </div>
  )
}
