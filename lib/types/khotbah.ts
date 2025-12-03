export interface Khotbah {
  id: string
  judul: string
  pembicara: string
  tanggal: string
  tipe: 'video' | 'audio'
  url: string
  thumbnail?: string
  deskripsi?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}
