import CommunityList from '@/components/komunitas/CommunityList'
import CommunityCalendar from '@/components/komunitas/CommunityCalendar'

export default function KomunitasPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Komunitas & Pelayanan</h1>
          <p className="text-xl">Temukan komunitas yang sesuai dengan Anda</p>
        </div>
      </section>

      <CommunityList />
      <CommunityCalendar />
    </div>
  )
}
