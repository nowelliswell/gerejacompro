export default function LiveStream() {
  return (
    <section id="live" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Live Streaming</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-300 aspect-video rounded-lg flex items-center justify-center mb-6">
            <p className="text-gray-600">Live streaming akan ditampilkan di sini</p>
          </div>
          <div className="text-center">
            <p className="text-lg mb-4">Ibadah live setiap Minggu pukul 08:00 & 10:30 WIB</p>
            <div className="flex gap-4 justify-center">
              <a href="#" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
                YouTube Live
              </a>
              <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Facebook Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
