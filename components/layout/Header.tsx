'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Gereja
          </Link>

          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className="hidden md:flex space-x-6">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li><Link href="/profil" className="hover:text-primary">Profil</Link></li>
            <li><Link href="/ibadah" className="hover:text-primary">Ibadah</Link></li>
            <li><Link href="/jemaat-baru" className="hover:text-primary">Jemaat Baru</Link></li>
            <li><Link href="/komunitas" className="hover:text-primary">Komunitas</Link></li>
            <li><Link href="/media" className="hover:text-primary">Media</Link></li>
            <li><Link href="/pelayanan" className="hover:text-primary">Pelayanan</Link></li>
            <li><Link href="/donasi" className="hover:text-primary bg-primary text-white px-4 py-2 rounded">Donasi</Link></li>
          </ul>
        </div>

        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            <li><Link href="/" className="block py-2">Beranda</Link></li>
            <li><Link href="/profil" className="block py-2">Profil</Link></li>
            <li><Link href="/ibadah" className="block py-2">Ibadah</Link></li>
            <li><Link href="/jemaat-baru" className="block py-2">Jemaat Baru</Link></li>
            <li><Link href="/komunitas" className="block py-2">Komunitas</Link></li>
            <li><Link href="/media" className="block py-2">Media</Link></li>
            <li><Link href="/pelayanan" className="block py-2">Pelayanan</Link></li>
            <li><Link href="/donasi" className="block py-2 bg-primary text-white px-4 rounded">Donasi</Link></li>
          </ul>
        )}
      </nav>
    </header>
  )
}
