export default function Testimonials() {
  const testimonials = [
    { name: 'Budi Santoso', text: 'Gereja ini telah menjadi rumah rohani bagi keluarga kami. Pelayanan yang luar biasa!', role: 'Jemaat' },
    { name: 'Maria Wijaya', text: 'Komunitas yang hangat dan mengasihi. Saya merasa diterima sejak hari pertama.', role: 'Jemaat' },
    { name: 'John Doe', text: 'Program pemuridan yang sangat membantu pertumbuhan iman saya.', role: 'Jemaat' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Testimoni Jemaat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <div className="font-bold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
