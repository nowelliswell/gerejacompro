export default function ScheduleDetail() {
  const schedules = [
    {
      category: 'Kebaktian Minggu',
      items: [
        { time: '08:00 - 10:00', name: 'Kebaktian Umum I', location: 'Gedung Utama' },
        { time: '10:30 - 12:30', name: 'Kebaktian Umum II', location: 'Gedung Utama' },
      ]
    },
    {
      category: 'Sekolah Minggu',
      items: [
        { time: '08:00 - 10:00', name: 'Sekolah Minggu Anak', location: 'Ruang Anak' },
        { time: '10:30 - 12:30', name: 'Sekolah Minggu Remaja', location: 'Ruang Pemuda' },
      ]
    },
    {
      category: 'Ibadah Tengah Minggu',
      items: [
        { time: 'Rabu, 19:00 - 21:00', name: 'Ibadah Doa', location: 'Gedung Utama' },
        { time: 'Jumat, 19:00 - 21:00', name: 'Ibadah Pemuda', location: 'Ruang Pemuda' },
      ]
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Jadwal Ibadah Lengkap</h2>
        <div className="space-y-8">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">{schedule.category}</h3>
              <div className="space-y-3">
                {schedule.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.location}</div>
                    </div>
                    <div className="text-primary font-semibold">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
