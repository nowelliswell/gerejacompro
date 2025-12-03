import RegistrationForm from '@/components/jemaat-baru/RegistrationForm'
import WelcomeVideo from '@/components/jemaat-baru/WelcomeVideo'
import OrientationInfo from '@/components/jemaat-baru/OrientationInfo'
import CommunityInfo from '@/components/jemaat-baru/CommunityInfo'
import FAQ from '@/components/jemaat-baru/FAQ'

export default function JemaatBaruPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang Jemaat Baru</h1>
          <p className="text-xl">Kami senang Anda bergabung dengan keluarga besar kami</p>
        </div>
      </section>

      <WelcomeVideo />
      <RegistrationForm />
      <OrientationInfo />
      <CommunityInfo />
      <FAQ />
    </div>
  )
}
