import HeroSection from '@/components/home/HeroSection'
import ScheduleSection from '@/components/home/ScheduleSection'
import QuickActions from '@/components/home/QuickActions'
import ProgramHighlights from '@/components/home/ProgramHighlights'
import Testimonials from '@/components/home/Testimonials'
import Statistics from '@/components/home/Statistics'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <QuickActions />
      <ScheduleSection />
      <ProgramHighlights />
      <Statistics />
      <Testimonials />
    </div>
  )
}
