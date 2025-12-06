'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if current page is login page
  const isLoginPage = pathname === '/admin/login';

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(false);
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleCloseMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // If it's login page, render children without sidebar and header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, render with sidebar and header
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleCloseMobileMenu}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleToggleSidebar}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={handleCloseMobileMenu}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile 
          ? 'ml-0' 
          : isSidebarCollapsed 
            ? 'ml-20' 
            : 'ml-64'
      }`}>
        <AdminHeader onMenuClick={handleToggleSidebar} isMobile={isMobile} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
