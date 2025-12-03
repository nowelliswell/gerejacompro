import Link from 'next/link'
import { FaUserPlus, FaMapMarkedAlt, FaVideo } from 'react-icons/fa'

export default function QuickActions() {
  const actions = [
    { icon: FaUserPlus, title: 'Daftar Jemaat Baru', href: '/jemaat-baru', color: 'bg-blue-500' },
    { icon: FaMapMarkedAlt, title: 'Lokasi & Maps', href: '/ibadah#lokasi', color: 'bg-green-500' },
    { icon: FaVideo, title: 'Live Streaming', href: '/media#live', color: 'bg-red-500' },
  ]

  return (
    <section className="py-8 -mt-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Link 
              key={index}
              href={action.href}
              className={`${action.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-4`}
            >
              <action.icon className="text-4xl" />
              <span className="font-semibold text-lg">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
