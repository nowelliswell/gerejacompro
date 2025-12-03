export interface Media {
  id: string
  judul: string
  deskripsi?: string
  tipe: 'image' | 'video'
  url: string
  thumbnail?: string
  albumId?: string
  tanggal: string
  createdAt: string
  createdBy: string
}
