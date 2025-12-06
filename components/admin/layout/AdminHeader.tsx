'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FiBell, FiLogOut, FiSettings, FiMenu } from 'react-icons/fi';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
}

interface AdminHeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export default function AdminHeader({ onMenuClick, isMobile = false }: AdminHeaderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = async () => {
    try {
      // Call logout API for server-side cleanup
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Use NextAuth signOut to clear client-side session
      await signOut({ redirect: false });
      
      // Redirect to login page
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, still sign out on client
      await signOut({ redirect: false });
      router.push('/admin/login');
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read locally
    setNotifications(prev =>
      prev.map(n => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
    
    // Mark as read on server
    try {
      await fetch(`/api/notifications/${notification.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
    
    // Navigate if link exists
    if (notification.link) {
      router.push(notification.link);
      setShowNotifications(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/mark-all-read', {
        method: 'PUT',
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  // Get user info from session
  const userName = session?.user?.name || 'Admin';
  const userEmail = session?.user?.email || 'admin@gereja.com';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      {/* Left side - Mobile menu button and title */}
      <div className="flex items-center gap-3 flex-1">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-6 h-6 text-gray-600" />
          </button>
        )}
        <h1 className="text-base md:text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right side - Notifications and User Menu */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <FiBell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                  {unreadCount > 0 && (
                    <p className="text-sm text-gray-500">{unreadCount} notifikasi baru</p>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Tandai semua dibaca
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {isLoadingNotifications ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm">Memuat notifikasi...</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FiBell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Tidak ada notifikasi</p>
                  </div>
                ) : (
                  <ul>
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.isRead ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">{userInitial}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {userName}
            </span>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="font-medium text-gray-800 truncate">{userName}</p>
                <p className="text-sm text-gray-500 truncate">{userEmail}</p>
              </div>
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      router.push('/admin/pengaturan');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiSettings className="w-4 h-4" />
                    Pengaturan
                  </button>
                </li>
                <li className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
