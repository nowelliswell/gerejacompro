export default function SermonArchive() {
  const sermons = [
    { title: 'Kasih yang Sejati', date: '1 Des 2024', speaker: 'Pdt. John Doe', type: 'Video' },
    { title: 'Hidup dalam Iman', date: '24 Nov 2024', speaker: 'Pdt. Jane Smith', type: 'Audio' },
    { title: 'Pengharapan yang Teguh', date: '17 Nov 2024', speaker: 'Pdt. John Doe', type: 'Video' },
    { title: 'Berjalan dengan Tuhan', date: '10 Nov 2024', speaker: 'Pdt. Jane Smith', type: 'Audio' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Arsip Khotbah</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sermons.map((sermon, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                  <p className="text-gray-600">{sermon.speaker}</p>
                  <p className="text-sm text-gray-500">{sermon.date}</p>
                </div>
                <span className="bg-primary text-white px-3 py-1 rounded text-sm">
                  {sermon.type}
                </span>
              </div>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-blue-800">
                Dengarkan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
