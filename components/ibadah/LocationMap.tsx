export default function LocationMap() {
  return (
    <section id="lokasi" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Lokasi Gereja</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Google Maps akan ditampilkan di sini</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Alamat</h3>
            <p className="text-lg">Jl. Contoh No. 123<br />Jakarta Selatan, DKI Jakarta 12345</p>
            
            <h3 className="text-xl font-bold mt-6">Kontak</h3>
            <p>Telepon: (021) 1234-5678</p>
            <p>Email: info@gereja.com</p>
            
            <h3 className="text-xl font-bold mt-6">Transportasi</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>5 menit dari Stasiun MRT</li>
              <li>Tersedia parkir luas</li>
              <li>Akses mudah dari Tol</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
