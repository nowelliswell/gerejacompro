import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Gereja</h3>
            <p className="text-gray-400">Rumah bagi semua orang untuk bertumbuh dalam iman dan kasih Kristus.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/profil" className="hover:text-white">Profil Gereja</Link></li>
              <li><Link href="/ibadah" className="hover:text-white">Jadwal Ibadah</Link></li>
              <li><Link href="/komunitas" className="hover:text-white">Komunitas</Link></li>
              <li><Link href="/media" className="hover:text-white">Media</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> Jl. Contoh No. 123
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> (021) 1234-5678
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> info@gereja.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
              <a href="#" className="hover:text-red-500"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Gereja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
