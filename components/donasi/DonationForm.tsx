'use client'
import { useState } from 'react'

export default function DonationForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kategori: 'persepuluhan',
    jumlah: '',
    metode: 'transfer',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Donation submitted:', formData)
    alert('Terima kasih atas persembahan Anda!')
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Form Donasi Online</h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required
                  className="w-full border rounded px-4 py-2"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full border rounded px-4 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Kategori Persembahan *</label>
                <select 
                  className="w-full border rounded px-4 py-2"
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                >
                  <option value="persepuluhan">Persepuluhan</option>
                  <option value="persembahan">Persembahan</option>
                  <option value="misi">Misi</option>
                  <option value="pembangunan">Pembangunan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Jumlah (Rp) *</label>
                <input 
                  type="number" 
                  required
                  className="w-full border rounded px-4 py-2"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Metode Pembayaran *</label>
                <select 
                  className="w-full border rounded px-4 py-2"
                  value={formData.metode}
                  onChange={(e) => setFormData({...formData, metode: e.target.value})}
                >
                  <option value="transfer">Transfer Bank</option>
                  <option value="qris">QRIS</option>
                  <option value="ewallet">E-Wallet</option>
                </select>
              </div>

              {formData.metode === 'transfer' && (
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold mb-2">Informasi Rekening:</h4>
                  <p>Bank BCA</p>
                  <p>No. Rekening: 1234567890</p>
                  <p>A.n. Gereja Contoh</p>
                </div>
              )}

              {formData.metode === 'qris' && (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="mb-2">Scan QRIS Code:</p>
                  <div className="bg-gray-300 w-48 h-48 mx-auto flex items-center justify-center">
                    QR Code
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-2">Upload Bukti Transfer</label>
                <input 
                  type="file" 
                  className="w-full border rounded px-4 py-2"
                  accept="image/*"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
              >
                Kirim Donasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
