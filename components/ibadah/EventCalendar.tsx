export default function EventCalendar() {
  const events = [
    { date: '10 Des 2024', title: 'Retreat Pemuda', time: '08:00 - 17:00' },
    { date: '17 Des 2024', title: 'Natal Anak-anak', time: '14:00 - 16:00' },
    { date: '24 Des 2024', title: 'Ibadah Natal', time: '19:00 - 21:00' },
    { date: '31 Des 2024', title: 'Ibadah Tutup Tahun', time: '19:00 - 00:00' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Agenda Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
              <div className="text-primary font-bold mb-2">{event.date}</div>
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
