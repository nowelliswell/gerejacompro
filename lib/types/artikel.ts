export interface Artikel {
  id: string
  judul: string
  slug: string
  konten: string
  excerpt: string
  thumbnail?: string
  kategori: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author: string
}
