export default function Statistics() {
  const stats = [
    { number: '15+', label: 'Komunitas Aktif' },
    { number: '30+', label: 'Pelayanan' },
    { number: '200+', label: 'Volunteer Aktif' },
    { number: '1000+', label: 'Jemaat' },
  ]

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
