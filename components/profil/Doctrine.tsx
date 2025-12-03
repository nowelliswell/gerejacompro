export default function Doctrine() {
  const beliefs = [
    'Alkitab adalah Firman Allah yang diilhamkan',
    'Allah Tritunggal: Bapa, Anak, dan Roh Kudus',
    'Yesus Kristus adalah Tuhan dan Juruselamat',
    'Keselamatan hanya melalui iman kepada Yesus Kristus',
    'Gereja adalah tubuh Kristus',
    'Kedatangan Kristus yang kedua kali',
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Doktrin & Kepercayaan</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <ul className="space-y-4">
              {beliefs.map((belief, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-lg pt-1">{belief}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
