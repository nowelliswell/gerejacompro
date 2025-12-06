# Admin Layout Components

This directory contains the layout components for the admin dashboard.

## Components

### AdminLayout (`app/admin/layout.tsx`)

The main layout wrapper for all admin pages. It provides:

- **Responsive Design**: Automatically adapts to mobile, tablet, and desktop screens
- **Sidebar Management**: Handles sidebar collapse/expand on desktop and slide-in/out on mobile
- **Mobile Overlay**: Shows a dark overlay when mobile menu is open
- **State Management**: Manages sidebar state and mobile menu state

#### Features

- **Desktop (≥768px)**:
  - Collapsible sidebar (64px collapsed, 256px expanded)
  - Smooth transitions between states
  - Persistent sidebar visibility
  
- **Mobile (<768px)**:
  - Hidden sidebar by default
  - Slide-in menu from left
  - Dark overlay when menu is open
  - Tap outside to close

#### Usage

```tsx
// Automatically applied to all /admin/* routes
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layout logic
}
```

### AdminSidebar

Navigation sidebar with menu items and icons.

#### Props

```typescript
interface AdminSidebarProps {
  isCollapsed: boolean;        // Desktop: collapsed state
  onToggle: () => void;         // Toggle sidebar
  isMobile?: boolean;           // Is mobile screen
  isMobileMenuOpen?: boolean;   // Mobile menu open state
  onCloseMobileMenu?: () => void; // Close mobile menu
}
```

#### Features

- **Menu Items**: All admin sections with icons
- **Active State**: Highlights current page
- **Badges**: Shows notification counts
- **Responsive**: Full menu on mobile, collapsible on desktop
- **Smooth Transitions**: Animated state changes

#### Menu Structure

- Dashboard
- Jemaat (Members)
- Pendaftar (Registrations)
- Donasi (Donations)
- Pelayanan (Services)
- Khotbah (Sermons)
- Artikel (Articles)
- Galeri (Gallery)
- Jadwal (Schedule)
- Komunitas (Communities)
- Pengumuman (Announcements)
- Profil Gereja (Church Profile)
- Laporan (Reports)
- Admin Users
- Backup
- Pengaturan (Settings)

### AdminHeader

Top header bar with notifications and user menu.

#### Props

```typescript
interface AdminHeaderProps {
  onMenuClick?: () => void;  // Mobile menu toggle
  isMobile?: boolean;        // Is mobile screen
}
```

#### Features

- **Mobile Menu Button**: Shows hamburger menu on mobile
- **Notifications**: Bell icon with unread count badge
- **User Menu**: Profile dropdown with settings and logout
- **Responsive**: Adapts layout for mobile screens
- **Click Outside**: Closes dropdowns when clicking outside

#### Notification System

- Shows unread count badge
- Dropdown with notification list
- Mark as read on click
- Navigate to related page

#### User Menu

- User profile info
- Settings link
- Logout button

## Responsive Breakpoints

- **Mobile**: < 768px
- **Desktop**: ≥ 768px

## Styling

All components use Tailwind CSS with:
- Consistent spacing and sizing
- Smooth transitions (300ms)
- Hover states
- Focus states for accessibility
- Color scheme: Blue primary, Gray neutrals

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Semantic HTML structure

## State Management

The layout uses React hooks for state:
- `useState` for sidebar and menu states
- `useEffect` for window resize detection
- `useRef` for dropdown click-outside detection
- `usePathname` for active route detection
- `useRouter` for navigation

## Future Enhancements

- Breadcrumb navigation
- Dynamic page titles
- Real-time notification updates
- User profile customization
- Theme switching (light/dark mode)
