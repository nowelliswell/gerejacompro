export default function Gallery() {
  const albums = [
    { title: 'Natal 2024', count: 45, thumbnail: '/images/natal.jpg' },
    { title: 'Retreat Pemuda', count: 32, thumbnail: '/images/retreat.jpg' },
    { title: 'Baptisan Oktober', count: 28, thumbnail: '/images/baptisan.jpg' },
    { title: 'Kebaktian Minggu', count: 56, thumbnail: '/images/kebaktian.jpg' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Galeri Foto & Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((album, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition cursor-pointer">
              <div className="bg-gray-300 h-48 flex items-center justify-center">
                <p className="text-gray-600">Foto</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{album.title}</h3>
                <p className="text-gray-600 text-sm">{album.count} foto</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
