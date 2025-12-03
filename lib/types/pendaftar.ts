export interface Pendaftar {
  id: string
  nama: string
  email: string
  telepon: string
  alamat: string
  tanggalLahir: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Duda/Janda'
  status: 'pending' | 'approved' | 'rejected'
  alasanReject?: string
  createdAt: string
  processedAt?: string
  processedBy?: string
}
