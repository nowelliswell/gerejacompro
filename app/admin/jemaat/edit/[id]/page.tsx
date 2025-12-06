'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FiSave, FiX } from 'react-icons/fi'
import LoadingSpinner from '@/components/admin/common/LoadingSpinner'
import { Jemaat } from '@/lib/types/jemaat'

const jemaatSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  statusPernikahan: z.enum(['Belum Menikah', 'Menikah', 'Duda/Janda']),
  tanggalBergabung: z.string().min(1, 'Tanggal bergabung wajib diisi'),
  status: z.enum(['active', 'inactive']),
})

type JemaatFormData = z.infer<typeof jemaatSchema>

export default function EditJemaatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JemaatFormData>({
    resolver: zodResolver(jemaatSchema),
  })

  useEffect(() => {
    const fetchJemaat = async () => {
      try {
        const response = await fetch(`/api/jemaat/${params.id}`)
        if (!response.ok) throw new Error('Jemaat tidak ditemukan')

        const result = await response.json()
        const jemaat: Jemaat = result.data

        // Reset form with fetched data
        reset({
          nama: jemaat.nama,
          email: jemaat.email,
          telepon: jemaat.telepon,
          alamat: jemaat.alamat,
          tanggalLahir: jemaat.tanggalLahir,
          jenisKelamin: jemaat.jenisKelamin,
          statusPernikahan: jemaat.statusPernikahan,
          tanggalBergabung: jemaat.tanggalBergabung,
          status: jemaat.status,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJemaat()
  }, [params.id, reset])

  const onSubmit = async (data: JemaatFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch(`/api/jemaat/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Gagal memperbarui jemaat')
      }

      router.push('/admin/jemaat')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Jemaat</h1>
        <p className="text-gray-600 mt-1">
          Perbarui informasi jemaat
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('nama')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
              {errors.nama && (
                <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('telepon')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="081234567890"
              />
              {errors.telepon && (
                <p className="text-red-500 text-sm mt-1">{errors.telepon.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('tanggalLahir')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.tanggalLahir && (
                <p className="text-red-500 text-sm mt-1">{errors.tanggalLahir.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                {...register('jenisKelamin')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.jenisKelamin && (
                <p className="text-red-500 text-sm mt-1">{errors.jenisKelamin.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Pernikahan <span className="text-red-500">*</span>
              </label>
              <select
                {...register('statusPernikahan')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih status pernikahan</option>
                <option value="Belum Menikah">Belum Menikah</option>
                <option value="Menikah">Menikah</option>
                <option value="Duda/Janda">Duda/Janda</option>
              </select>
              {errors.statusPernikahan && (
                <p className="text-red-500 text-sm mt-1">{errors.statusPernikahan.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('alamat')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan alamat lengkap"
              />
              {errors.alamat && (
                <p className="text-red-500 text-sm mt-1">{errors.alamat.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Church Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Gereja</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Bergabung <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('tanggalBergabung')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.tanggalBergabung && (
                <p className="text-red-500 text-sm mt-1">{errors.tanggalBergabung.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            <FiX size={20} />
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Menyimpan...
              </>
            ) : (
              <>
                <FiSave size={20} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
