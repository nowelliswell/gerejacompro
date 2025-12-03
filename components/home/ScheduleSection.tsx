import { FaClock, FaCalendar } from 'react-icons/fa'

export default function ScheduleSection() {
  const schedules = [
    { day: 'Minggu', time: '08:00 - 10:00', service: 'Kebaktian Umum I' },
    { day: 'Minggu', time: '10:30 - 12:30', service: 'Kebaktian Umum II' },
    { day: 'Minggu', time: '08:00 - 10:00', service: 'Sekolah Minggu' },
    { day: 'Rabu', time: '19:00 - 21:00', service: 'Ibadah Doa' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Jadwal Ibadah</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-2 text-primary mb-2">
                <FaCalendar />
                <span className="font-semibold">{schedule.day}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <FaClock />
                <span>{schedule.time}</span>
              </div>
              <h3 className="font-bold text-lg">{schedule.service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
