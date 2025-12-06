'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiUsers, FiUserPlus, FiDollarSign, FiHeart, 
  FiMic, FiFileText, FiImage, FiCalendar, FiMessageSquare,
  FiBell, FiSettings, FiBarChart2, FiShield, FiDatabase,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
  children?: MenuItem[];
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: FiHome,
    href: '/admin',
  },
  {
    id: 'jemaat',
    label: 'Jemaat',
    icon: FiUsers,
    href: '/admin/jemaat',
  },
  {
    id: 'pendaftar',
    label: 'Pendaftar',
    icon: FiUserPlus,
    href: '/admin/pendaftar',
    badge: 0,
  },
  {
    id: 'donasi',
    label: 'Donasi',
    icon: FiDollarSign,
    href: '/admin/donasi',
  },
  {
    id: 'pelayanan',
    label: 'Pelayanan',
    icon: FiHeart,
    href: '/admin/pelayanan',
    badge: 0,
  },
  {
    id: 'khotbah',
    label: 'Khotbah',
    icon: FiMic,
    href: '/admin/khotbah',
  },
  {
    id: 'artikel',
    label: 'Artikel',
    icon: FiFileText,
    href: '/admin/artikel',
  },
  {
    id: 'galeri',
    label: 'Galeri',
    icon: FiImage,
    href: '/admin/galeri',
  },
  {
    id: 'jadwal',
    label: 'Jadwal',
    icon: FiCalendar,
    href: '/admin/jadwal',
  },
  {
    id: 'komunitas',
    label: 'Komunitas',
    icon: FiMessageSquare,
    href: '/admin/komunitas',
  },
  {
    id: 'pengumuman',
    label: 'Pengumuman',
    icon: FiBell,
    href: '/admin/pengumuman',
  },
  {
    id: 'profil-gereja',
    label: 'Profil Gereja',
    icon: FiSettings,
    href: '/admin/profil-gereja',
  },
  {
    id: 'laporan',
    label: 'Laporan',
    icon: FiBarChart2,
    href: '/admin/laporan',
  },
  {
    id: 'admin-users',
    label: 'Admin Users',
    icon: FiShield,
    href: '/admin/admin-users',
  },
  {
    id: 'backup',
    label: 'Backup',
    icon: FiDatabase,
    href: '/admin/backup',
  },
  {
    id: 'pengaturan',
    label: 'Pengaturan',
    icon: FiSettings,
    href: '/admin/pengaturan',
  },
];

export default function AdminSidebar({ 
  isCollapsed, 
  onToggle, 
  isMobile = false,
  isMobileMenuOpen = false,
  onCloseMobileMenu 
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isMobile 
          ? `w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
          : isCollapsed 
            ? 'w-20' 
            : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {(!isCollapsed || isMobile) && (
          <Link href="/admin" className="text-xl font-bold text-blue-600" onClick={handleLinkClick}>
            Admin Panel
          </Link>
        )}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <FiChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <FiChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
                  title={isCollapsed && !isMobile ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                  {(!isCollapsed || isMobile) && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
