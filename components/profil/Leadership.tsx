export default function Leadership() {
  const leaders = [
    { name: 'Pdt. John Doe', role: 'Gembala Sidang', photo: '/images/pastor.jpg' },
    { name: 'Pdt. Jane Smith', role: 'Wakil Gembala', photo: '/images/pastor2.jpg' },
    { name: 'Budi Santoso', role: 'Ketua Majelis', photo: '/images/elder1.jpg' },
    { name: 'Maria Wijaya', role: 'Sekretaris', photo: '/images/elder2.jpg' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Tim Kepemimpinan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="text-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold text-xl">{leader.name}</h3>
              <p className="text-gray-600">{leader.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
