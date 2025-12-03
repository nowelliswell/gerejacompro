export interface Donasi {
  id: string
  nama: string
  email: string
  kategori: 'persepuluhan' | 'persembahan' | 'misi' | 'pembangunan'
  jumlah: number
  metode: 'transfer' | 'qris' | 'ewallet'
  buktiTransfer?: string
  status: 'pending' | 'verified' | 'rejected'
  catatan?: string
  createdAt: string
  verifiedAt?: string
  verifiedBy?: string
}
