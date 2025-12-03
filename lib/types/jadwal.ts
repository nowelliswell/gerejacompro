export interface Jadwal {
  id: string
  judul: string
  tipe: 'ibadah' | 'acara'
  tanggalMulai: string
  tanggalSelesai?: string
  waktu: string
  lokasi: string
  deskripsi?: string
  pengulangan?: 'none' | 'weekly' | 'monthly'
  createdAt: string
  updatedAt: string
}
