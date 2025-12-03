'use client'
import { useState } from 'react'

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    tanggalLahir: '',
    jenisKelamin: '',
    statusPernikahan: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Terima kasih! Data Anda telah kami terima.')
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Formulir Pendaftaran Jemaat Baru</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
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
              <label className="block font-semibold mb-2">Nomor Telepon *</label>
              <input 
                type="tel" 
                required
                className="w-full border rounded px-4 py-2"
                value={formData.telepon}
                onChange={(e) => setFormData({...formData, telepon: e.target.value})}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Alamat</label>
              <textarea 
                className="w-full border rounded px-4 py-2"
                rows={3}
                value={formData.alamat}
                onChange={(e) => setFormData({...formData, alamat: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Tanggal Lahir</label>
                <input 
                  type="date" 
                  className="w-full border rounded px-4 py-2"
                  value={formData.tanggalLahir}
                  onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Jenis Kelamin</label>
                <select 
                  className="w-full border rounded px-4 py-2"
                  value={formData.jenisKelamin}
                  onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                >
                  <option value="">Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Status Pernikahan</label>
              <select 
                className="w-full border rounded px-4 py-2"
                value={formData.statusPernikahan}
                onChange={(e) => setFormData({...formData, statusPernikahan: e.target.value})}
              >
                <option value="">Pilih</option>
                <option value="Belum Menikah">Belum Menikah</option>
                <option value="Menikah">Menikah</option>
                <option value="Duda/Janda">Duda/Janda</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
            >
              Daftar Sekarang
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
