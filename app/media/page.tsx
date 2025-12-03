import LiveStream from '@/components/media/LiveStream'
import SermonArchive from '@/components/media/SermonArchive'
import Gallery from '@/components/media/Gallery'
import Articles from '@/components/media/Articles'

export default function MediaPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Konten Rohani & Media</h1>
          <p className="text-xl">Khotbah, artikel, dan konten rohani lainnya</p>
        </div>
      </section>

      <LiveStream />
      <SermonArchive />
      <Gallery />
      <Articles />
    </div>
  )
}
