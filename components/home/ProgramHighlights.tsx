import { FaUsers, FaMusic, FaChild, FaPray } from 'react-icons/fa'

export default function ProgramHighlights() {
  const programs = [
    { icon: FaUsers, title: 'Komunitas Sel', description: 'Kelompok kecil untuk persekutuan dan pertumbuhan rohani' },
    { icon: FaMusic, title: 'Pelayanan Musik', description: 'Melayani Tuhan melalui pujian dan penyembahan' },
    { icon: FaChild, title: 'Sekolah Minggu', description: 'Pendidikan iman untuk anak-anak' },
    { icon: FaPray, title: 'Ibadah Doa', description: 'Bersekutu dalam doa dan firman Tuhan' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Program Gereja</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <program.icon className="text-3xl" />
              </div>
              <h3 className="font-bold text-xl mb-2">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
