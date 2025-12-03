import Timeline from '@/components/profil/Timeline'
import VisiMisi from '@/components/profil/VisiMisi'
import Leadership from '@/components/profil/Leadership'
import Doctrine from '@/components/profil/Doctrine'
import Structure from '@/components/profil/Structure'

export default function ProfilPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Profil Gereja</h1>
          <p className="text-xl">Mengenal lebih dekat tentang gereja kami</p>
        </div>
      </section>

      <Timeline />
      <VisiMisi />
      <Leadership />
      <Doctrine />
      <Structure />
    </div>
  )
}
