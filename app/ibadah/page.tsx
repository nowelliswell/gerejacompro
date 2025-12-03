import ScheduleDetail from '@/components/ibadah/ScheduleDetail'
import LocationMap from '@/components/ibadah/LocationMap'
import EventCalendar from '@/components/ibadah/EventCalendar'
import Announcements from '@/components/ibadah/Announcements'

export default function IbadahPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Informasi Ibadah & Acara</h1>
          <p className="text-xl">Jadwal lengkap ibadah dan kegiatan gereja</p>
        </div>
      </section>

      <ScheduleDetail />
      <LocationMap />
      <EventCalendar />
      <Announcements />
    </div>
  )
}
