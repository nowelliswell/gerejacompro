export interface Jemaat {
  id: string
  nama: string
  email: string
  telepon: string
  alamat: string
  tanggalLahir: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Duda/Janda'
  tanggalBergabung: string
  status: 'active' | 'inactive'
  komunitasIds: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}
