import { FaUsers, FaMusic, FaChild, FaFemale, FaMale, FaLaptop } from 'react-icons/fa'

export default function CommunityList() {
  const communities = [
    {
      icon: FaUsers,
      name: 'Komunitas Sel',
      description: 'Kelompok kecil untuk persekutuan dan pertumbuhan rohani',
      schedule: 'Setiap minggu di rumah anggota',
      leader: 'Berbagai koordinator',
      color: 'bg-blue-500'
    },
    {
      icon: FaChild,
      name: 'Pelayanan Anak',
      description: 'Sekolah Minggu dan program untuk anak-anak',
      schedule: 'Minggu, 08:00 - 10:00',
      leader: 'Budi Santoso',
      color: 'bg-yellow-500'
    },
    {
      icon: FaUsers,
      name: 'Pemuda (Youth)',
      description: 'Komunitas untuk remaja dan pemuda',
      schedule: 'Jumat, 19:00 - 21:00',
      leader: 'Maria Wijaya',
      color: 'bg-green-500'
    },
    {
      icon: FaFemale,
      name: 'Pelayanan Wanita',
      description: 'Persekutuan dan pembinaan untuk wanita',
      schedule: 'Sabtu kedua, 14:00 - 16:00',
      leader: 'Sarah Lee',
      color: 'bg-pink-500'
    },
    {
      icon: FaMale,
      name: 'Pelayanan Pria',
      description: 'Persekutuan dan pembinaan untuk pria',
      schedule: 'Sabtu ketiga, 06:00 - 08:00',
      leader: 'David Chen',
      color: 'bg-indigo-500'
    },
    {
      icon: FaMusic,
      name: 'Pelayanan Musik',
      description: 'Tim pujian dan penyembahan',
      schedule: 'Kamis, 19:00 - 21:00',
      leader: 'Jane Smith',
      color: 'bg-purple-500'
    },
    {
      icon: FaLaptop,
      name: 'Multimedia',
      description: 'Tim teknis dan multimedia',
      schedule: 'Sesuai jadwal ibadah',
      leader: 'John Doe',
      color: 'bg-red-500'
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Daftar Komunitas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-xl transition">
              <div className={`${community.color} text-white p-6 rounded-t-lg`}>
                <community.icon className="text-4xl mb-3" />
                <h3 className="text-2xl font-bold">{community.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{community.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Jadwal:</span> {community.schedule}
                  </div>
                  <div>
                    <span className="font-semibold">Penanggung Jawab:</span> {community.leader}
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-blue-800">
                  Bergabung
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
