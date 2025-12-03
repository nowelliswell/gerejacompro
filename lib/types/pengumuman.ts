export interface Pengumuman {
  id: string
  judul: string
  konten: string
  prioritas: 'low' | 'medium' | 'high'
  tanggalMulai: string
  tanggalSelesai: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
}
