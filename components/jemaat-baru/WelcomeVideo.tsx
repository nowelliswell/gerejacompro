export default function WelcomeVideo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Sambutan dari Pastor</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-300 aspect-video rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Video sambutan akan ditampilkan di sini</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">
              Selamat datang di keluarga besar gereja kami. Kami sangat senang Anda memutuskan untuk bergabung dengan kami dalam perjalanan iman ini.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
