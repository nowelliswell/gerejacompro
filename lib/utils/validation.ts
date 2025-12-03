import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

// Jemaat schemas
export const jemaatSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon tidak valid'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  statusPernikahan: z.enum(['Belum Menikah', 'Menikah', 'Duda/Janda']),
  tanggalBergabung: z.string().min(1, 'Tanggal bergabung wajib diisi'),
})

// Donasi schemas
export const donasiSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  kategori: z.enum(['persepuluhan', 'persembahan', 'misi', 'pembangunan']),
  jumlah: z.number().min(1000, 'Jumlah minimal Rp 1.000'),
  metode: z.enum(['transfer', 'qris', 'ewallet']),
  buktiTransfer: z.string().optional(),
})

// Pelayanan schemas
export const pelayananSchema = z.object({
  jenis: z.enum(['doa', 'konseling', 'baptisan', 'baby', 'nikah', 'kunjungan']),
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon tidak valid'),
  detail: z.record(z.string(), z.any()),
})

// Khotbah schemas
export const khotbahSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  pembicara: z.string().min(1, 'Pembicara wajib diisi'),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  tipe: z.enum(['video', 'audio']),
  url: z.string().url('URL tidak valid'),
  thumbnail: z.string().optional(),
  deskripsi: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

// Artikel schemas
export const artikelSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  konten: z.string().min(1, 'Konten wajib diisi'),
  excerpt: z.string().min(1, 'Excerpt wajib diisi'),
  thumbnail: z.string().optional(),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']),
})

// Jadwal schemas
export const jadwalSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  tipe: z.enum(['ibadah', 'acara']),
  tanggalMulai: z.string().min(1, 'Tanggal mulai wajib diisi'),
  tanggalSelesai: z.string().optional(),
  waktu: z.string().min(1, 'Waktu wajib diisi'),
  lokasi: z.string().min(1, 'Lokasi wajib diisi'),
  deskripsi: z.string().optional(),
  pengulangan: z.enum(['none', 'weekly', 'monthly']).optional(),
})

// Komunitas schemas
export const komunitasSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  jadwal: z.string().min(1, 'Jadwal wajib diisi'),
  kontakPerson: z.string().min(1, 'Kontak person wajib diisi'),
  kontakTelepon: z.string().min(10, 'Nomor telepon tidak valid'),
  icon: z.string().min(1, 'Icon wajib diisi'),
})

// Pengumuman schemas
export const pengumumanSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  konten: z.string().min(1, 'Konten wajib diisi'),
  prioritas: z.enum(['low', 'medium', 'high']),
  tanggalMulai: z.string().min(1, 'Tanggal mulai wajib diisi'),
  tanggalSelesai: z.string().min(1, 'Tanggal selesai wajib diisi'),
  isActive: z.boolean().default(true),
})
