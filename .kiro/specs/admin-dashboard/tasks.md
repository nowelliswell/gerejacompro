# Implementation Plan - Admin Dashboard Gereja

- [x] 1. Setup project dependencies dan struktur folder




  - Install dependencies yang diperlukan (NextAuth.js, Zod, React Hook Form, Recharts, date-fns, fast-check)
  - Buat struktur folder untuk admin (app/admin, components/admin, lib)
  - Setup TypeScript types untuk semua data models
  - Buat file JSON untuk data storage (data/jemaat.json, data/donasi.json, dll)
  - _Requirements: All_

- [x] 2. Implementasi authentication system





  - [x] 2.1 Buat auth configuration dengan NextAuth.js


    - Setup JWT strategy
    - Konfigurasi session management
    - Buat credential provider
    - _Requirements: 1.1, 1.2_


  
  - [ ] 2.2 Implementasi login API dan halaman
    - Buat API route /api/auth/login
    - Buat halaman login UI (app/admin/login/page.tsx)
    - Implementasi form validation dengan Zod
    - _Requirements: 1.1, 1.2_
  
  - [ ]* 2.3 Write property test for authentication
    - **Property 1: Valid credentials grant access**


    - **Property 2: Invalid credentials are rejected**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ] 2.4 Implementasi logout functionality
    - Buat API route /api/auth/logout
    - Implementasi session cleanup
    - _Requirements: 1.4_


  
  - [ ]* 2.5 Write property test for logout
    - **Property 3: Logout invalidates session**
    - **Validates: Requirements 1.4**
  
  - [ ] 2.6 Buat auth middleware untuk protected routes
    - Implementasi middleware untuk cek session
    - Redirect ke login jika tidak authenticated
    - _Requirements: 1.5_
  
  - [ ]* 2.7 Write property test for protected routes
    - **Property 4: Protected routes require authentication**
    - **Validates: Requirements 1.5**

- [ ] 3. Buat admin layout dan navigation
  - [ ] 3.1 Implementasi AdminLayout component
    - Buat layout dengan sidebar dan header
    - Implementasi responsive design
    - _Requirements: All_
  
  - [ ] 3.2 Buat AdminSidebar component
    - Implementasi menu navigation
    - Tambahkan icons untuk setiap menu
    - Implementasi collapse/expand functionality
    - Badge untuk notifikasi
    - _Requirements: All_
  
  - [ ] 3.3 Buat AdminHeader component
    - User profile dropdown
    - Logout button
    - Notification bell
    - _Requirements: All_
  
  - [ ] 3.4 Buat reusable components
    - DataTable component dengan sorting dan pagination
    - Modal component
    - ConfirmDialog component
    - SearchBar component
    - StatusBadge component
    - LoadingSpinner component
    - EmptyState component
    - _Requirements: All_

- [ ] 4. Implementasi Dashboard Utama
  - [ ] 4.1 Buat halaman dashboard (app/admin/page.tsx)
    - Layout dengan grid untuk stat cards
    - Section untuk charts
    - Section untuk activity feed
    - _Requirements: 2.1-2.6_
  
  - [ ] 4.2 Implementasi StatCard component
    - Display statistik dengan icon
    - Animasi loading state
    - _Requirements: 2.1-2.4_
  
  - [ ] 4.3 Buat API untuk dashboard statistics
    - API route /api/dashboard/stats
    - Hitung total jemaat
    - Hitung total donasi bulan ini
    - Hitung pending service requests
    - Hitung registrations dalam 30 hari
    - _Requirements: 2.1-2.4_
  
  - [ ]* 4.4 Write property tests for dashboard statistics
    - **Property 5: Jemaat count accuracy**
    - **Property 6: Monthly donation sum accuracy**
    - **Property 7: Pending service requests count**
    - **Property 8: Recent registrations count**
    - **Validates: Requirements 2.1-2.4**
  
  - [ ] 4.5 Implementasi donation trend chart
    - Buat ChartCard component dengan Recharts
    - API route /api/dashboard/donation-trend
    - Agregasi data 6 bulan terakhir
    - _Requirements: 2.5_
  
  - [ ]* 4.6 Write property test for donation trend
    - **Property 9: Donation trend data structure**
    - **Validates: Requirements 2.5**
  
  - [ ] 4.7 Implementasi ActivityFeed component
    - Display recent activities
    - Format timestamp dengan date-fns
    - Link ke detail pages
    - _Requirements: 2.6_
  
  - [ ]* 4.8 Write property test for activity feed
    - **Property 10: Activity feed ordering**
    - **Validates: Requirements 2.6**

- [ ] 5. Checkpoint - Pastikan authentication dan dashboard berfungsi
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implementasi Manajemen Jemaat
  - [ ] 6.1 Buat halaman list jemaat (app/admin/jemaat/page.tsx)
    - Implementasi DataTable untuk display jemaat
    - Search bar dan filter
    - Pagination
    - Tombol tambah jemaat
    - _Requirements: 3.1, 3.2_
  
  - [ ] 6.2 Buat API untuk jemaat operations
    - API route /api/jemaat (GET all, POST new)
    - API route /api/jemaat/[id] (GET, PUT, DELETE by id)
    - Implementasi search functionality
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ]* 6.3 Write property tests for jemaat operations
    - **Property 11: Jemaat search accuracy**
    - **Property 12: Jemaat creation persistence**
    - **Property 13: Jemaat update with timestamp**
    - **Validates: Requirements 3.2, 3.3, 3.4**
  
  - [ ] 6.4 Buat halaman detail jemaat (app/admin/jemaat/[id]/page.tsx)
    - Display semua informasi jemaat
    - Riwayat aktivitas jemaat
    - Tombol edit dan delete
    - _Requirements: 3.6_
  
  - [ ]* 6.5 Write property test for jemaat detail
    - **Property 14: Jemaat detail completeness**
    - **Validates: Requirements 3.6**
  
  - [ ] 6.6 Buat form tambah/edit jemaat
    - Halaman tambah (app/admin/jemaat/tambah/page.tsx)
    - Halaman edit (app/admin/jemaat/edit/[id]/page.tsx)
    - Form validation dengan React Hook Form + Zod
    - _Requirements: 3.3, 3.4_
  
  - [ ] 6.7 Implementasi export jemaat ke CSV
    - API route /api/jemaat/export
    - Generate CSV file
    - Download functionality
    - _Requirements: 3.7_
  
  - [ ]* 6.8 Write property test for jemaat export
    - **Property 15: Jemaat export data integrity**
    - **Validates: Requirements 3.7**

- [ ] 7. Implementasi Manajemen Pendaftar Jemaat Baru
  - [ ] 7.1 Buat halaman list pendaftar (app/admin/pendaftar/page.tsx)
    - DataTable dengan status badges
    - Filter berdasarkan status
    - _Requirements: 4.2_
  
  - [ ] 7.2 Buat API untuk pendaftar operations
    - API route /api/pendaftar (GET all)
    - API route /api/pendaftar/[id] (GET, PUT)
    - Endpoint untuk approve/reject
    - _Requirements: 4.1, 4.3, 4.4_
  
  - [ ]* 7.3 Write property tests for pendaftar operations
    - **Property 16: New registration initial status**
    - **Property 17: Registration approval state transition**
    - **Property 18: Registration rejection with reason**
    - **Validates: Requirements 4.1, 4.3, 4.4**
  
  - [ ] 7.4 Buat halaman detail pendaftar (app/admin/pendaftar/[id]/page.tsx)
    - Display semua informasi pendaftar
    - Tombol approve dan reject
    - Form untuk alasan reject
    - _Requirements: 4.5_
  
  - [ ]* 7.5 Write property test for pendaftar detail
    - **Property 19: Registration detail completeness**
    - **Validates: Requirements 4.5**

- [ ] 8. Implementasi Manajemen Donasi
  - [ ] 8.1 Buat halaman list donasi (app/admin/donasi/page.tsx)
    - DataTable dengan status badges
    - Filter berdasarkan tanggal, kategori, status
    - Display jumlah dengan format currency
    - _Requirements: 5.2_
  
  - [ ] 8.2 Buat API untuk donasi operations
    - API route /api/donasi (GET all, POST new)
    - API route /api/donasi/[id] (GET, PUT)
    - Endpoint untuk verify donasi
    - Implementasi filtering logic
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ]* 8.3 Write property tests for donasi operations
    - **Property 20: New donation initial status**
    - **Property 21: Donation filtering accuracy**
    - **Property 22: Donation verification with timestamp**
    - **Validates: Requirements 5.1, 5.2, 5.3**
  
  - [ ] 8.4 Buat halaman detail donasi (app/admin/donasi/[id]/page.tsx)
    - Display semua informasi donasi
    - Preview bukti transfer
    - Tombol verify dan reject
    - _Requirements: 5.4_
  
  - [ ]* 8.5 Write property test for donasi detail
    - **Property 23: Donation detail completeness**
    - **Validates: Requirements 5.4**
  
  - [ ] 8.6 Implementasi laporan donasi
    - Halaman laporan (app/admin/donasi/laporan/page.tsx)
    - Filter berdasarkan periode
    - Chart per kategori dengan Recharts
    - Export ke CSV/Excel
    - _Requirements: 5.5, 5.6_
  
  - [ ]* 8.7 Write property tests for donasi reporting
    - **Property 24: Donation export with period filter**
    - **Property 25: Donation category aggregation**
    - **Validates: Requirements 5.5, 5.6**

- [ ] 9. Checkpoint - Pastikan manajemen data utama berfungsi
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implementasi Manajemen Permohonan Pelayanan
  - [ ] 10.1 Buat halaman list permohonan (app/admin/pelayanan/page.tsx)
    - DataTable dengan jenis dan status
    - Filter berdasarkan jenis dan status
    - Color coding untuk jenis pelayanan
    - _Requirements: 6.2_
  
  - [ ] 10.2 Buat API untuk permohonan operations
    - API route /api/pelayanan (GET all)
    - API route /api/pelayanan/[id] (GET, PUT)
    - Endpoint untuk process, complete, reject
    - _Requirements: 6.1, 6.3, 6.4, 6.5_
  
  - [ ]* 10.3 Write property tests for permohonan operations
    - **Property 26: New service request initial status**
    - **Property 27: Service request filtering accuracy**
    - **Property 28: Service request processing state transition**
    - **Property 29: Service request completion with notes**
    - **Property 30: Service request rejection with reason**
    - **Validates: Requirements 6.1-6.5**
  
  - [ ] 10.4 Buat halaman detail permohonan (app/admin/pelayanan/[id]/page.tsx)
    - Display informasi berdasarkan jenis
    - Form untuk catatan/alasan
    - Tombol untuk change status
    - _Requirements: 6.6_
  
  - [ ]* 10.5 Write property test for permohonan detail
    - **Property 31: Service request detail completeness**
    - **Validates: Requirements 6.6**

- [ ] 11. Implementasi Manajemen Khotbah
  - [ ] 11.1 Buat halaman list khotbah (app/admin/khotbah/page.tsx)
    - DataTable dengan thumbnail
    - Search dan filter
    - Tombol tambah khotbah
    - _Requirements: 7.4_
  
  - [ ] 11.2 Buat API untuk khotbah operations
    - API route /api/khotbah (GET all, POST new)
    - API route /api/khotbah/[id] (GET, PUT, DELETE)
    - File upload handling
    - _Requirements: 7.1, 7.2, 7.5_
  
  - [ ]* 11.3 Write property tests for khotbah operations
    - **Property 32: Sermon creation with required fields**
    - **Property 33: Sermon update with timestamp**
    - **Property 34: Sermon file upload URL generation**
    - **Validates: Requirements 7.1, 7.2, 7.5**
  
  - [ ] 11.4 Buat form tambah/edit khotbah
    - Halaman tambah (app/admin/khotbah/tambah/page.tsx)
    - Halaman edit (app/admin/khotbah/edit/[id]/page.tsx)
    - File upload untuk audio/video
    - Form validation
    - _Requirements: 7.1, 7.2_

- [ ] 12. Implementasi Manajemen Artikel
  - [ ] 12.1 Buat halaman list artikel (app/admin/artikel/page.tsx)
    - DataTable dengan status
    - Filter berdasarkan status dan tanggal
    - Tombol tambah artikel
    - _Requirements: 8.5_
  
  - [ ] 12.2 Buat API untuk artikel operations
    - API route /api/artikel (GET all, POST new)
    - API route /api/artikel/[id] (GET, PUT, DELETE)
    - Auto-generate slug dari judul
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ]* 12.3 Write property tests for artikel operations
    - **Property 35: Article creation with status**
    - **Property 36: Article publication timestamp**
    - **Property 37: Article update with history**
    - **Property 38: Article filtering by status**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.5**
  
  - [ ] 12.4 Buat form tambah/edit artikel
    - Halaman tambah (app/admin/artikel/tambah/page.tsx)
    - Halaman edit (app/admin/artikel/edit/[id]/page.tsx)
    - Rich text editor untuk konten
    - Image upload untuk thumbnail
    - Draft/Publish toggle
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 13. Implementasi Manajemen Galeri Media
  - [ ] 13.1 Buat halaman galeri (app/admin/galeri/page.tsx)
    - Grid layout untuk media
    - Filter berdasarkan tipe dan album
    - Search functionality
    - _Requirements: 9.4_
  
  - [ ] 13.2 Buat API untuk media operations
    - API route /api/media (GET all, POST new)
    - API route /api/media/[id] (GET, PUT, DELETE)
    - Multiple file upload handling
    - Thumbnail generation
    - _Requirements: 9.1, 9.2, 9.5_
  
  - [ ]* 13.3 Write property tests for media operations
    - **Property 39: Media upload with metadata**
    - **Property 40: Media album association**
    - **Property 41: Batch media upload completeness**
    - **Validates: Requirements 9.1, 9.2, 9.5**
  
  - [ ] 13.4 Buat halaman upload media (app/admin/galeri/upload/page.tsx)
    - Drag and drop file upload
    - Multiple file selection
    - Preview sebelum upload
    - Form untuk metadata
    - _Requirements: 9.1, 9.5_

- [ ] 14. Checkpoint - Pastikan manajemen konten berfungsi
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implementasi Manajemen Jadwal dan Acara
  - [ ] 15.1 Buat halaman kalender (app/admin/jadwal/page.tsx)
    - Calendar view dengan events
    - List view sebagai alternatif
    - Filter berdasarkan tipe
    - _Requirements: 10.5_
  
  - [ ] 15.2 Buat API untuk jadwal operations
    - API route /api/jadwal (GET all, POST new)
    - API route /api/jadwal/[id] (GET, PUT, DELETE)
    - Handle recurring events
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [ ]* 15.3 Write property tests for jadwal operations
    - **Property 42: Schedule creation with required fields**
    - **Property 43: Event creation with date range**
    - **Property 44: Schedule update with timestamp**
    - **Validates: Requirements 10.1, 10.2, 10.3**
  
  - [ ] 15.4 Buat form tambah/edit jadwal (app/admin/jadwal/tambah/page.tsx)
    - Form untuk ibadah dan acara
    - Date picker untuk tanggal
    - Recurring options
    - _Requirements: 10.1, 10.2_

- [ ] 16. Implementasi Manajemen Komunitas
  - [ ] 16.1 Buat halaman list komunitas (app/admin/komunitas/page.tsx)
    - Card layout untuk komunitas
    - Display jumlah anggota
    - Tombol tambah komunitas
    - _Requirements: 11.1_
  
  - [ ] 16.2 Buat API untuk komunitas operations
    - API route /api/komunitas (GET all, POST new)
    - API route /api/komunitas/[id] (GET, PUT, DELETE)
    - API route /api/komunitas/[id]/members (GET members)
    - _Requirements: 11.1, 11.2, 11.4, 11.5_
  
  - [ ]* 16.3 Write property tests for komunitas operations
    - **Property 45: Community creation with required fields**
    - **Property 46: Community update with timestamp**
    - **Property 47: Community member list accuracy**
    - **Property 48: Community registration persistence**
    - **Validates: Requirements 11.1, 11.2, 11.4, 11.5**
  
  - [ ] 16.4 Buat halaman detail komunitas (app/admin/komunitas/[id]/page.tsx)
    - Display info komunitas
    - List anggota
    - Tombol edit dan delete
    - _Requirements: 11.4_

- [ ] 17. Implementasi Manajemen Pengumuman
  - [ ] 17.1 Buat halaman list pengumuman (app/admin/pengumuman/page.tsx)
    - DataTable dengan prioritas
    - Display tanggal berlaku
    - Status active/expired
    - _Requirements: 12.1_
  
  - [ ] 17.2 Buat API untuk pengumuman operations
    - API route /api/pengumuman (GET all, POST new)
    - API route /api/pengumuman/[id] (GET, PUT, DELETE)
    - Auto-hide expired announcements
    - Priority sorting
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  
  - [ ]* 17.3 Write property tests for pengumuman operations
    - **Property 49: Announcement creation with required fields**
    - **Property 50: Published announcement visibility**
    - **Property 51: Announcement priority ordering**
    - **Property 52: Expired announcement exclusion**
    - **Validates: Requirements 12.1-12.4**
  
  - [ ] 17.4 Buat form tambah/edit pengumuman (app/admin/pengumuman/tambah/page.tsx)
    - Form dengan rich text editor
    - Date range picker
    - Priority selector
    - Active toggle
    - _Requirements: 12.1_

- [ ] 18. Implementasi Manajemen Profil Gereja
  - [ ] 18.1 Buat halaman edit profil gereja (app/admin/profil-gereja/page.tsx)
    - Tabs untuk visi/misi, sejarah, kepemimpinan, doktrin
    - Rich text editor untuk konten
    - Form untuk leadership data
    - Timeline editor untuk sejarah
    - _Requirements: 13.1-13.4_
  
  - [ ] 18.2 Buat API untuk profil operations
    - API route /api/profil (GET, PUT)
    - Update individual sections
    - Audit trail untuk perubahan
    - _Requirements: 13.1-13.5_
  
  - [ ]* 18.3 Write property tests for profil operations
    - **Property 53: Vision mission update persistence**
    - **Property 54: Leadership data update persistence**
    - **Property 55: History update persistence**
    - **Property 56: Doctrine update persistence**
    - **Property 57: Settings update audit trail**
    - **Validates: Requirements 13.1-13.5**

- [ ] 19. Implementasi Pengaturan Website
  - [ ] 19.1 Buat halaman pengaturan (app/admin/pengaturan/page.tsx)
    - Tabs untuk berbagai kategori settings
    - Form untuk contact info
    - Form untuk social media links
    - Form untuk bank accounts
    - Form untuk live streaming links
    - Form untuk maps configuration
    - _Requirements: 14.1-14.4_
  
  - [ ] 19.2 Buat API untuk settings operations
    - API route /api/settings (GET, PUT)
    - Validate settings data
    - Immediate effect tanpa restart
    - _Requirements: 14.1-14.5_
  
  - [ ]* 19.3 Write property tests for settings operations
    - **Property 58: Contact info update persistence**
    - **Property 59: Social media links update persistence**
    - **Property 60: Bank account info update persistence**
    - **Property 61: Live streaming links update persistence**
    - **Property 62: Settings immediate effect**
    - **Validates: Requirements 14.1-14.5**

- [ ] 20. Checkpoint - Pastikan semua manajemen konten dan settings berfungsi
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 21. Implementasi Laporan dan Analitik
  - [ ] 21.1 Buat halaman laporan (app/admin/laporan/page.tsx)
    - Tabs untuk berbagai jenis laporan
    - Date range picker
    - Export buttons
    - Charts untuk visualisasi
    - _Requirements: 15.1_
  
  - [ ] 21.2 Buat API untuk laporan
    - API route /api/laporan/donasi
    - API route /api/laporan/jemaat
    - API route /api/laporan/pelayanan
    - Period filtering
    - _Requirements: 15.2_
  
  - [ ]* 21.3 Write property test for laporan filtering
    - **Property 63: Report period filtering accuracy**
    - **Validates: Requirements 15.2**
  
  - [ ] 21.4 Implementasi export functionality
    - Export to PDF
    - Export to Excel
    - Format validation
    - _Requirements: 15.3_
  
  - [ ]* 21.5 Write property test for export
    - **Property 64: Report export format validity**
    - **Validates: Requirements 15.3**
  
  - [ ] 21.6 Implementasi analytics charts
    - Donation analytics dengan Recharts
    - Growth analytics
    - Calculation accuracy
    - _Requirements: 15.4, 15.5_
  
  - [ ]* 21.7 Write property tests for analytics
    - **Property 65: Donation analytics calculation accuracy**
    - **Property 66: Growth analytics calculation accuracy**
    - **Validates: Requirements 15.4, 15.5**

- [ ] 22. Implementasi Manajemen User Admin
  - [ ] 22.1 Buat halaman list admin users (app/admin/admin-users/page.tsx)
    - DataTable dengan role badges
    - Status active/inactive
    - Tombol tambah admin
    - _Requirements: 16.1_
  
  - [ ] 22.2 Buat API untuk admin user operations
    - API route /api/admin-users (GET all, POST new)
    - API route /api/admin-users/[id] (GET, PUT, DELETE)
    - Role management
    - Activity logging
    - _Requirements: 16.1-16.5_
  
  - [ ]* 22.3 Write property tests for admin user operations
    - **Property 67: Admin creation with role**
    - **Property 68: Admin role update affects permissions**
    - **Property 69: Inactive admin login prevention**
    - **Property 70: Activity log completeness**
    - **Property 71: Role-based access control enforcement**
    - **Validates: Requirements 16.1-16.5**
  
  - [ ] 22.4 Buat form tambah/edit admin (app/admin/admin-users/tambah/page.tsx)
    - Form dengan role selector
    - Password generation
    - Active toggle
    - _Requirements: 16.1, 16.2_
  
  - [ ] 22.5 Implementasi role-based access control
    - Middleware untuk check permissions
    - UI conditional rendering based on role
    - _Requirements: 16.5_

- [ ] 23. Implementasi Sistem Notifikasi
  - [ ] 23.1 Buat notification system
    - Notification data model
    - API route /api/notifications (GET, PUT)
    - Real-time notification creation
    - _Requirements: 17.1-17.3_
  
  - [ ]* 23.2 Write property tests for notifications
    - **Property 72: Registration notification creation**
    - **Property 73: Donation notification creation**
    - **Property 74: Service request notification creation**
    - **Property 75: Notification read status update**
    - **Validates: Requirements 17.1-17.4**
  
  - [ ] 23.3 Implementasi notification UI
    - Notification bell di header
    - Notification dropdown
    - Mark as read functionality
    - Link to related pages
    - _Requirements: 17.4, 17.5_

- [ ] 24. Implementasi Backup dan Restore
  - [ ] 24.1 Buat halaman backup (app/admin/backup/page.tsx)
    - Button untuk manual backup
    - List backup history
    - Download links
    - Restore functionality
    - _Requirements: 18.1, 18.4_
  
  - [ ] 24.2 Buat API untuk backup operations
    - API route /api/backup (POST create backup)
    - API route /api/backup/restore (POST restore)
    - Generate complete backup file
    - Error handling dan logging
    - _Requirements: 18.1, 18.3, 18.5_
  
  - [ ]* 24.3 Write property tests for backup operations
    - **Property 76: Backup completeness**
    - **Property 77: Backup-restore round trip**
    - **Property 78: Backup download link validity**
    - **Property 79: Backup error logging**
    - **Validates: Requirements 18.1, 18.3, 18.4, 18.5**

- [ ] 25. Final Checkpoint - Pastikan semua fitur terintegrasi dengan baik
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 26. Polish dan Optimization
  - [ ] 26.1 Implementasi loading states
    - Skeleton loaders untuk tables
    - Loading spinners untuk actions
    - Optimistic UI updates
    - _Requirements: All_
  
  - [ ] 26.2 Implementasi error handling
    - Error boundaries
    - Toast notifications untuk errors
    - User-friendly error messages
    - _Requirements: All_
  
  - [ ] 26.3 Responsive design improvements
    - Mobile-friendly sidebar
    - Responsive tables
    - Touch-friendly buttons
    - _Requirements: All_
  
  - [ ] 26.4 Performance optimization
    - Image optimization
    - Code splitting
    - Memoization
    - Pagination optimization
    - _Requirements: All_
  
  - [ ] 26.5 Accessibility improvements
    - Keyboard navigation
    - ARIA labels
    - Focus management
    - Screen reader support
    - _Requirements: All_

- [ ] 27. Documentation dan Testing Final
  - [ ]* 27.1 Write integration tests
    - Test complete workflows
    - Test API integrations
    - Test file uploads
    - _Requirements: All_
  
  - [ ] 27.2 Buat dokumentasi
    - README untuk admin dashboard
    - API documentation
    - User guide untuk admin
    - _Requirements: All_
  
  - [ ] 27.3 Final testing dan bug fixes
    - Manual testing semua fitur
    - Fix bugs yang ditemukan
    - Cross-browser testing
    - _Requirements: All_
