import DonationForm from '@/components/donasi/DonationForm'
import DonationInfo from '@/components/donasi/DonationInfo'

export default function DonasiPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Donasi & Persepuluhan</h1>
          <p className="text-xl">Berikan persembahan Anda untuk kemajuan pelayanan</p>
        </div>
      </section>

      <DonationInfo />
      <DonationForm />
    </div>
  )
}
