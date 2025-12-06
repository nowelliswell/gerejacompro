'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import StatusBadge from '@/components/admin/common/StatusBadge'
import ConfirmDialog from '@/components/admin/common/ConfirmDialog'
import Modal from '@/components/admin/common/Modal'
import { PermohonanPelayanan } from '@/lib/types/pelayanan'
import { formatDate } from '@/lib/utils/format'
import { FiArrowLeft, FiPlay, FiCheck, FiX } from 'react-icons/fi'

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

export default function PelayananDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [pelayanan, setPelayanan] = useState<PermohonanPelayanan | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchPelayanan()
  }, [id])

  const fetchPelayanan = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/pelayanan/${id}`)
      if (response.ok) {
        const data = await response.json()
        setPelayanan(data.pelayanan)
      } else {
        router.push('/admin/pelayanan')
      }
    } catch (error) {
      console.error('Error fetching pelayanan:', error)
      router.push('/admin/pelayanan')
    } finally {
      setLoading(false)
    }
  }

  const handleProcess = async () => {
    try {
      setProcessing(true)
      const response = await fetch(`/api/pelayanan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process' }),
      })

      if (response.ok) {
        await fetchPelayanan()
        setShowProcessDialog(false)
      }
    } catch (error) {
      console.error('Error processing pelayanan:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleComplete = async () => {
    if (!notes.trim()) {
      alert('Mohon masukkan catatan penyelesaian')
      return
    }

    try {
      setProcessing(true)
      const response = await fetch(`/api/pelayanan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          catatan: notes,
        }),
      })

      if (response.ok) {
        await fetchPelayanan()
        setShowCompleteDialog(false)
        setNotes('')
      }
    } catch (error) {
      console.error('Error completing pelayanan:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!notes.trim()) {
      alert('Mohon masukkan alasan penolakan')
      return
    }

    try {
      setProcessing(true)
      const response = await fetch(`/api/pelayanan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          catatan: notes,
        }),
      })

      if (response.ok) {
        await fetchPelayanan()
        setShowRejectDialog(false)
        setNotes('')
      }
    } catch (error) {
      console.error('Error rejecting pelayanan:', error)
    } finally {
      setProcessing(false)
    }
  }

  const renderDetailFields = () => {
    if (!pelayanan) return null

    const { detail, jenis } = pelayanan

    switch (jenis) {
      case 'doa':
        return (
          <div>
            <label className="text-sm text-gray-600">Pokok Doa</label>
            <p className="font-medium text-gray-900">{detail.pokok_doa || '-'}</p>
          </div>
        )
      
      case 'konseling':
        return (
          <div>
            <label className="text-sm text-gray-600">Topik Konseling</label>
            <p className="font-medium text-gray-900">{detail.topik || '-'}</p>
          </div>
        )
      
      case 'baptisan':
        return (
          <>
            <div>
              <label className="text-sm text-gray-600">Nama Calon Baptis</label>
              <p className="font-medium text-gray-900">{detail.nama_calon || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Lahir</label>
              <p className="font-medium text-gray-900">{detail.tanggal_lahir ? formatDate(detail.tanggal_lahir) : '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Baptis yang Diinginkan</label>
              <p className="font-medium text-gray-900">{detail.tanggal_baptis ? formatDate(detail.tanggal_baptis) : '-'}</p>
            </div>
          </>
        )
      
      case 'baby':
        return (
          <>
            <div>
              <label className="text-sm text-gray-600">Nama Bayi</label>
              <p className="font-medium text-gray-900">{detail.nama_bayi || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Lahir Bayi</label>
              <p className="font-medium text-gray-900">{detail.tanggal_lahir ? formatDate(detail.tanggal_lahir) : '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Nama Orang Tua</label>
              <p className="font-medium text-gray-900">{detail.nama_orangtua || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Pemberkatan yang Diinginkan</label>
              <p className="font-medium text-gray-900">{detail.tanggal_pemberkatan ? formatDate(detail.tanggal_pemberkatan) : '-'}</p>
            </div>
          </>
        )
      
      case 'nikah':
        return (
          <>
            <div>
              <label className="text-sm text-gray-600">Nama Calon Suami</label>
              <p className="font-medium text-gray-900">{detail.nama_suami || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Nama Calon Istri</label>
              <p className="font-medium text-gray-900">{detail.nama_istri || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Pernikahan yang Diinginkan</label>
              <p className="font-medium text-gray-900">{detail.tanggal_nikah ? formatDate(detail.tanggal_nikah) : '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Lokasi</label>
              <p className="font-medium text-gray-900">{detail.lokasi || '-'}</p>
            </div>
          </>
        )
      
      case 'kunjungan':
        return (
          <>
            <div>
              <label className="text-sm text-gray-600">Alamat Kunjungan</label>
              <p className="font-medium text-gray-900">{detail.alamat || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal Kunjungan yang Diinginkan</label>
              <p className="font-medium text-gray-900">{detail.tanggal_kunjungan ? formatDate(detail.tanggal_kunjungan) : '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Keperluan</label>
              <p className="font-medium text-gray-900">{detail.keperluan || '-'}</p>
            </div>
          </>
        )
      
      default:
        return (
          <div>
            <label className="text-sm text-gray-600">Detail</label>
            <pre className="font-medium text-gray-900 whitespace-pre-wrap">
              {JSON.stringify(detail, null, 2)}
            </pre>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!pelayanan) {
    return null
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/pelayanan')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft />
          Kembali ke Daftar Permohonan
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Detail Permohonan Pelayanan
            </h1>
            <p className="text-gray-600">ID: {pelayanan.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${jenisColors[pelayanan.jenis] || 'bg-gray-100 text-gray-800'}`}>
              {jenisLabels[pelayanan.jenis] || pelayanan.jenis}
            </span>
            <StatusBadge status={pelayanan.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Requester Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Pemohon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nama</label>
                <p className="font-medium text-gray-900">{pelayanan.nama}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium text-gray-900">{pelayanan.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Telepon</label>
                <p className="font-medium text-gray-900">{pelayanan.telepon}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Permohonan</label>
                <p className="font-medium text-gray-900">
                  {formatDate(pelayanan.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detail Permohonan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderDetailFields()}
            </div>
          </div>

          {/* Processing Info */}
          {(pelayanan.status === 'in-progress' || 
            pelayanan.status === 'completed' || 
            pelayanan.status === 'rejected') && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informasi Pemrosesan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Diproses Oleh</label>
                  <p className="font-medium text-gray-900">
                    {pelayanan.processedBy || '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tanggal Pemrosesan</label>
                  <p className="font-medium text-gray-900">
                    {pelayanan.processedAt ? formatDate(pelayanan.processedAt) : '-'}
                  </p>
                </div>
              </div>
              {pelayanan.catatan && (
                <div className="mt-4">
                  <label className="text-sm text-gray-600">Catatan</label>
                  <p className="font-medium text-gray-900 mt-1 whitespace-pre-wrap">
                    {pelayanan.catatan}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Aksi
            </h2>

            {pelayanan.status === 'pending' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowProcessDialog(true)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiPlay />
                  Proses Permohonan
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiX />
                  Tolak Permohonan
                </button>
              </div>
            )}

            {pelayanan.status === 'in-progress' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowCompleteDialog(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiCheck />
                  Selesaikan Permohonan
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium"
                >
                  <FiX />
                  Tolak Permohonan
                </button>
              </div>
            )}

            {pelayanan.status === 'completed' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                  <FiCheck className="text-green-600 text-2xl" />
                </div>
                <p className="text-gray-600">Permohonan telah diselesaikan</p>
              </div>
            )}

            {pelayanan.status === 'rejected' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
                  <FiX className="text-red-600 text-2xl" />
                </div>
                <p className="text-gray-600">Permohonan telah ditolak</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Dialog */}
      <ConfirmDialog
        isOpen={showProcessDialog}
        onClose={() => setShowProcessDialog(false)}
        onConfirm={handleProcess}
        title="Proses Permohonan"
        message="Apakah Anda yakin ingin memproses permohonan ini?"
        confirmText="Proses"
        variant="info"
      />

      {/* Complete Dialog */}
      <Modal
        isOpen={showCompleteDialog}
        onClose={() => {
          setShowCompleteDialog(false)
          setNotes('')
        }}
        title="Selesaikan Permohonan"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Mohon berikan catatan penyelesaian permohonan ini:
          </p>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Masukkan catatan penyelesaian..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowCompleteDialog(false)
                setNotes('')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={processing}
            >
              Batal
            </button>
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              disabled={processing || !notes.trim()}
            >
              {processing ? 'Memproses...' : 'Selesaikan'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Dialog */}
      <Modal
        isOpen={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false)
          setNotes('')
        }}
        title="Tolak Permohonan"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Mohon berikan alasan penolakan permohonan ini:
          </p>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Masukkan alasan penolakan..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowRejectDialog(false)
                setNotes('')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={processing}
            >
              Batal
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              disabled={processing || !notes.trim()}
            >
              {processing ? 'Memproses...' : 'Tolak Permohonan'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
