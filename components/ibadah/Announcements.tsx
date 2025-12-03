export default function Announcements() {
  const announcements = [
    { title: 'Pendaftaran Baptisan Dibuka', date: '1 Des 2024', content: 'Pendaftaran baptisan untuk periode Januari 2025 telah dibuka.' },
    { title: 'Perubahan Jadwal Ibadah Doa', date: '28 Nov 2024', content: 'Ibadah doa minggu ini dipindahkan ke hari Kamis.' },
    { title: 'Retreat Keluarga 2025', date: '25 Nov 2024', content: 'Save the date untuk retreat keluarga tanggal 15-17 Februari 2025.' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Pengumuman Terbaru</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {announcements.map((announcement, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{announcement.title}</h3>
                <span className="text-sm text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
