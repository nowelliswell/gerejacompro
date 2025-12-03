export default function Structure() {
  const departments = [
    { name: 'Pelayanan Ibadah', leader: 'John Doe' },
    { name: 'Pelayanan Musik', leader: 'Jane Smith' },
    { name: 'Pelayanan Anak', leader: 'Budi Santoso' },
    { name: 'Pelayanan Pemuda', leader: 'Maria Wijaya' },
    { name: 'Pelayanan Wanita', leader: 'Sarah Lee' },
    { name: 'Pelayanan Pria', leader: 'David Chen' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Struktur Organisasi Pelayanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
              <h3 className="font-bold text-lg mb-2">{dept.name}</h3>
              <p className="text-gray-600">Penanggung Jawab: {dept.leader}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
