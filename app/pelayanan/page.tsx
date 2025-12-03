import ServiceForms from '@/components/pelayanan/ServiceForms'

export default function PelayananPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Formulir Pelayanan</h1>
          <p className="text-xl">Ajukan permohonan doa, konseling, dan pelayanan lainnya</p>
        </div>
      </section>

      <ServiceForms />
    </div>
  )
}
