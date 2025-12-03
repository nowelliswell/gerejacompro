'use client'
import { useState } from 'react'
import { FaPray, FaHeart, FaBaby, FaRing, FaHospital, FaHandsHelping } from 'react-icons/fa'

export default function ServiceForms() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

  const forms = [
    { id: 'doa', icon: FaPray, title: 'Permohonan Doa', color: 'bg-blue-500' },
    { id: 'konseling', icon: FaHeart, title: 'Konseling Pastoral', color: 'bg-green-500' },
    { id: 'baptisan', icon: FaHandsHelping, title: 'Pendaftaran Baptisan', color: 'bg-purple-500' },
    { id: 'baby', icon: FaBaby, title: 'Baby Dedication', color: 'bg-yellow-500' },
    { id: 'nikah', icon: FaRing, title: 'Pendaftaran Nikah', color: 'bg-pink-500' },
    { id: 'kunjungan', icon: FaHospital, title: 'Kunjungan Doa', color: 'bg-red-500' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Pilih Jenis Pelayanan</h2>
        
        {!selectedForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <button
                key={form.id}
                onClick={() => setSelectedForm(form.id)}
                className={`${form.color} text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition text-left`}
              >
                <form.icon className="text-4xl mb-4" />
                <h3 className="text-2xl font-bold">{form.title}</h3>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={() => setSelectedForm(null)}
              className="mb-6 text-primary hover:underline"
            >
              ← Kembali
            </button>
            
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-6">
                {forms.find(f => f.id === selectedForm)?.title}
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Nama Lengkap *</label>
                  <input type="text" required className="w-full border rounded px-4 py-2" />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Email *</label>
                  <input type="email" required className="w-full border rounded px-4 py-2" />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Nomor Telepon *</label>
                  <input type="tel" required className="w-full border rounded px-4 py-2" />
                </div>

                {selectedForm === 'doa' && (
                  <div>
                    <label className="block font-semibold mb-2">Pokok Doa *</label>
                    <textarea required className="w-full border rounded px-4 py-2" rows={4} />
                  </div>
                )}

                {selectedForm === 'konseling' && (
                  <>
                    <div>
                      <label className="block font-semibold mb-2">Topik Konseling</label>
                      <select className="w-full border rounded px-4 py-2">
                        <option>Pernikahan</option>
                        <option>Keluarga</option>
                        <option>Karir</option>
                        <option>Rohani</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Keterangan</label>
                      <textarea className="w-full border rounded px-4 py-2" rows={4} />
                    </div>
                  </>
                )}

                {selectedForm === 'baptisan' && (
                  <>
                    <div>
                      <label className="block font-semibold mb-2">Tanggal Lahir</label>
                      <input type="date" className="w-full border rounded px-4 py-2" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Sudah mengikuti kelas baptisan?</label>
                      <select className="w-full border rounded px-4 py-2">
                        <option>Belum</option>
                        <option>Sudah</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedForm === 'nikah' && (
                  <>
                    <div>
                      <label className="block font-semibold mb-2">Nama Pasangan</label>
                      <input type="text" className="w-full border rounded px-4 py-2" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Tanggal Rencana Pernikahan</label>
                      <input type="date" className="w-full border rounded px-4 py-2" />
                    </div>
                  </>
                )}

                {selectedForm === 'kunjungan' && (
                  <>
                    <div>
                      <label className="block font-semibold mb-2">Alamat Kunjungan</label>
                      <textarea className="w-full border rounded px-4 py-2" rows={3} />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Keperluan</label>
                      <select className="w-full border rounded px-4 py-2">
                        <option>Sakit</option>
                        <option>Duka</option>
                        <option>Syukuran</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                  </>
                )}

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
                >
                  Kirim Permohonan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
