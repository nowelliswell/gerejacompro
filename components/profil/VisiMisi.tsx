export default function VisiMisi() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-4 text-primary">Visi</h2>
            <p className="text-lg text-gray-700">
              Menjadi gereja yang mengasihi Tuhan dan sesama, membawa transformasi rohani bagi setiap orang untuk memuliakan nama Tuhan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-4 text-primary">Misi</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Memberitakan Injil kepada semua orang</li>
              <li>• Memuridkan jemaat untuk bertumbuh dalam iman</li>
              <li>• Melayani masyarakat dengan kasih Kristus</li>
              <li>• Membangun komunitas yang saling mengasihi</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
