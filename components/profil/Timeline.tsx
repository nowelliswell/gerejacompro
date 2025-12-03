export default function Timeline() {
  const history = [
    { year: '1990', event: 'Gereja didirikan dengan 20 jemaat' },
    { year: '2000', event: 'Pembangunan gedung gereja baru' },
    { year: '2010', event: 'Peluncuran program komunitas sel' },
    { year: '2020', event: 'Ekspansi pelayanan digital dan online' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Sejarah Gereja</h2>
        <div className="max-w-3xl mx-auto">
          {history.map((item, index) => (
            <div key={index} className="flex gap-4 mb-8">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {item.year}
              </div>
              <div className="flex-1 bg-gray-50 p-6 rounded-lg">
                <p className="text-lg">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
