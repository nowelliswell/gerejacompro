export interface PermohonanPelayanan {
  id: string
  jenis: 'doa' | 'konseling' | 'baptisan' | 'baby' | 'nikah' | 'kunjungan'
  nama: string
  email: string
  telepon: string
  detail: Record<string, any> // Specific fields based on jenis
  status: 'pending' | 'in-progress' | 'completed' | 'rejected'
  catatan?: string
  createdAt: string
  processedAt?: string
  processedBy?: string
}
