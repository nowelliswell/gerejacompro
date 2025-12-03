import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Selamat Datang di Gereja Kami</h1>
          <p className="text-xl mb-8">Rumah bagi semua orang untuk bertumbuh dalam iman dan kasih Kristus</p>
          <div className="flex gap-4">
            <Link href="/jemaat-baru" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Gabung Ibadah
            </Link>
            <Link href="/ibadah" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary">
              Jadwal Ibadah
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
