export default function CommunityCalendar() {
  const events = [
    { date: '5 Des', community: 'Pemuda', event: 'Retreat Pemuda', time: '08:00 - 17:00' },
    { date: '7 Des', community: 'Wanita', event: 'Persekutuan Wanita', time: '14:00 - 16:00' },
    { date: '10 Des', community: 'Musik', event: 'Latihan Natal', time: '19:00 - 21:00' },
    { date: '14 Des', community: 'Pria', event: 'Men\'s Breakfast', time: '06:00 - 08:00' },
    { date: '17 Des', community: 'Anak', event: 'Natal Anak-anak', time: '14:00 - 16:00' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Kalender Kegiatan Komunitas</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-left">Komunitas</th>
                  <th className="p-4 text-left">Kegiatan</th>
                  <th className="p-4 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">{event.date}</td>
                    <td className="p-4">{event.community}</td>
                    <td className="p-4">{event.event}</td>
                    <td className="p-4 text-gray-600">{event.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
