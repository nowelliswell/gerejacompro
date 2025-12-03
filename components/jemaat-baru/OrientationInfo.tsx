export default function OrientationInfo() {
  const classes = [
    { title: 'Kelas Dasar Iman', description: 'Memahami dasar-dasar iman Kristen', duration: '4 minggu' },
    { title: 'Kelas Kehidupan Kristen', description: 'Praktik hidup sebagai pengikut Kristus', duration: '4 minggu' },
    { title: 'Kelas Pelayanan', description: 'Menemukan dan mengembangkan karunia rohani', duration: '4 minggu' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Kelas Orientasi</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan kelas orientasi untuk membantu Anda bertumbuh dalam iman dan memahami kehidupan bergereja.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((cls, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
              <p className="text-gray-600 mb-3">{cls.description}</p>
              <p className="text-sm text-primary font-semibold">Durasi: {cls.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
