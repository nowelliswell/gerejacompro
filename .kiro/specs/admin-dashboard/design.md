# Design Document - Admin Dashboard Gereja

## Overview

Admin Dashboard adalah aplikasi web berbasis Next.js yang menyediakan interface manajemen lengkap untuk website gereja. Dashboard ini dibangun dengan arsitektur modern menggunakan Next.js 15 App Router, React Server Components, dan TypeScript untuk type safety. Sistem ini dirancang dengan prinsip separation of concerns, reusable components, dan user experience yang intuitif.

Dashboard akan menggunakan layout sidebar dengan navigasi yang terorganisir berdasarkan kategori fitur. Setiap modul akan memiliki halaman list, detail, dan form yang konsisten dalam design pattern-nya.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js App (React Components)                │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │   Pages    │  │ Components │  │   Hooks    │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Route Handlers)                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /api/auth  │  /api/jemaat  │  /api/donasi  │ ...   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthService  │  JemaatService  │  DonasiService    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Database (JSON files / Future: Database)      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Authentication**: NextAuth.js (JWT-based)
- **Data Storage**: JSON files (Phase 1), dapat di-upgrade ke database
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: date-fns
- **File Upload**: Next.js built-in file handling
- **State Management**: React Context API + hooks

### Folder Structure

```
app/
├── admin/
│   ├── layout.tsx                 # Admin layout dengan sidebar
│   ├── page.tsx                   # Dashboard utama
│   ├── jemaat/
│   │   ├── page.tsx              # List jemaat
│   │   ├── [id]/page.tsx         # Detail jemaat
│   │   ├── tambah/page.tsx       # Form tambah jemaat
│   │   └── edit/[id]/page.tsx    # Form edit jemaat
│   ├── pendaftar/
│   │   ├── page.tsx              # List pendaftar
│   │   └── [id]/page.tsx         # Detail pendaftar
│   ├── donasi/
│   │   ├── page.tsx              # List donasi
│   │   ├── [id]/page.tsx         # Detail donasi
│   │   └── laporan/page.tsx      # Laporan donasi
│   ├── pelayanan/
│   │   ├── page.tsx              # List permohonan
│   │   └── [id]/page.tsx         # Detail permohonan
│   ├── khotbah/
│   │   ├── page.tsx              # List khotbah
│   │   ├── tambah/page.tsx       # Form tambah khotbah
│   │   └── edit/[id]/page.tsx    # Form edit khotbah
│   ├── artikel/
│   │   ├── page.tsx              # List artikel
│   │   ├── tambah/page.tsx       # Form tambah artikel
│   │   └── edit/[id]/page.tsx    # Form edit artikel
│   ├── galeri/
│   │   ├── page.tsx              # Galeri media
│   │   └── upload/page.tsx       # Upload media
│   ├── jadwal/
│   │   ├── page.tsx              # Kalender jadwal
│   │   └── tambah/page.tsx       # Form tambah jadwal
│   ├── komunitas/
│   │   ├── page.tsx              # List komunitas
│   │   └── [id]/page.tsx         # Detail komunitas
│   ├── pengumuman/
│   │   ├── page.tsx              # List pengumuman
│   │   └── tambah/page.tsx       # Form tambah pengumuman
│   ├── profil-gereja/
│   │   └── page.tsx              # Edit profil gereja
│   ├── pengaturan/
│   │   └── page.tsx              # Pengaturan website
│   ├── laporan/
│   │   └── page.tsx              # Laporan dan analitik
│   ├── admin-users/
│   │   ├── page.tsx              # List admin users
│   │   └── tambah/page.tsx       # Form tambah admin
│   └── backup/
│       └── page.tsx              # Backup dan restore
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── session/route.ts
│   ├── jemaat/
│   │   ├── route.ts              # GET all, POST new
│   │   └── [id]/route.ts         # GET, PUT, DELETE by id
│   ├── donasi/
│   │   ├── route.ts
│   │   ├── [id]/route.ts
│   │   └── stats/route.ts
│   ├── pelayanan/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── ... (similar structure for other modules)
│
components/
├── admin/
│   ├── layout/
│   │   ├── AdminSidebar.tsx      # Sidebar navigation
│   │   ├── AdminHeader.tsx       # Top header dengan user menu
│   │   └── AdminBreadcrumb.tsx   # Breadcrumb navigation
│   ├── dashboard/
│   │   ├── StatCard.tsx          # Card untuk statistik
│   │   ├── ChartCard.tsx         # Card untuk chart
│   │   ├── ActivityFeed.tsx      # Feed aktivitas terbaru
│   │   └── QuickActions.tsx      # Tombol aksi cepat
│   ├── jemaat/
│   │   ├── JemaatTable.tsx       # Tabel list jemaat
│   │   ├── JemaatForm.tsx        # Form jemaat
│   │   ├── JemaatDetail.tsx      # Detail view jemaat
│   │   └── JemaatFilter.tsx      # Filter dan search
│   ├── donasi/
│   │   ├── DonasiTable.tsx
│   │   ├── DonasiDetail.tsx
│   │   ├── DonasiChart.tsx
│   │   └── DonasiFilter.tsx
│   ├── common/
│   │   ├── DataTable.tsx         # Reusable table component
│   │   ├── Modal.tsx             # Modal dialog
│   │   ├── ConfirmDialog.tsx     # Confirmation dialog
│   │   ├── SearchBar.tsx         # Search input
│   │   ├── Pagination.tsx        # Pagination component
│   │   ├── StatusBadge.tsx       # Status badge
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   └── EmptyState.tsx        # Empty state placeholder
│   └── forms/
│       ├── FormInput.tsx         # Input field wrapper
│       ├── FormSelect.tsx        # Select field wrapper
│       ├── FormTextarea.tsx      # Textarea wrapper
│       ├── FormDatePicker.tsx    # Date picker
│       └── FormFileUpload.tsx    # File upload
│
lib/
├── auth/
│   ├── auth.ts                   # Auth configuration
│   ├── middleware.ts             # Auth middleware
│   └── session.ts                # Session management
├── services/
│   ├── jemaat.service.ts
│   ├── donasi.service.ts
│   ├── pelayanan.service.ts
│   └── ... (services for each module)
├── utils/
│   ├── db.ts                     # Database helper (JSON file operations)
│   ├── validation.ts             # Validation schemas
│   ├── format.ts                 # Formatting utilities
│   └── export.ts                 # Export utilities (CSV, Excel)
└── types/
    ├── jemaat.ts
    ├── donasi.ts
    ├── pelayanan.ts
    └── ... (type definitions)

data/
├── jemaat.json
├── donasi.json
├── pelayanan.json
├── khotbah.json
├── artikel.json
├── jadwal.json
├── komunitas.json
├── pengumuman.json
├── settings.json
└── users.json
```

## Components and Interfaces

### Core Components

#### 1. AdminLayout
Layout wrapper untuk semua halaman admin dengan sidebar dan header.

```typescript
interface AdminLayoutProps {
  children: React.ReactNode
}
```

#### 2. AdminSidebar
Sidebar navigation dengan menu yang dapat di-collapse.

```typescript
interface MenuItem {
  id: string
  label: string
  icon: IconType
  href: string
  badge?: number
  children?: MenuItem[]
}

interface AdminSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}
```

#### 3. DataTable
Reusable table component dengan sorting, filtering, dan pagination.

```typescript
interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (row: T) => void
  loading?: boolean
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
}
```

#### 4. Modal
Reusable modal dialog component.

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  footer?: React.ReactNode
}
```

#### 5. ConfirmDialog
Confirmation dialog untuk aksi destructive.

```typescript
interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}
```

## Data Models

### User (Admin)
```typescript
interface User {
  id: string
  username: string
  email: string
  password: string // hashed
  role: 'super_admin' | 'admin' | 'editor'
  nama: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
}
```

### Jemaat
```typescript
interface Jemaat {
  id: string
  nama: string
  email: string
  telepon: string
  alamat: string
  tanggalLahir: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Duda/Janda'
  tanggalBergabung: string
  status: 'active' | 'inactive'
  komunitasIds: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}
```

### Pendaftar
```typescript
interface Pendaftar {
  id: string
  nama: string
  email: string
  telepon: string
  alamat: string
  tanggalLahir: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Duda/Janda'
  status: 'pending' | 'approved' | 'rejected'
  alasanReject?: string
  createdAt: string
  processedAt?: string
  processedBy?: string
}
```

### Donasi
```typescript
interface Donasi {
  id: string
  nama: string
  email: string
  kategori: 'persepuluhan' | 'persembahan' | 'misi' | 'pembangunan'
  jumlah: number
  metode: 'transfer' | 'qris' | 'ewallet'
  buktiTransfer?: string
  status: 'pending' | 'verified' | 'rejected'
  catatan?: string
  createdAt: string
  verifiedAt?: string
  verifiedBy?: string
}
```

### Permohonan Pelayanan
```typescript
interface PermohonanPelayanan {
  id: string
  jenis: 'doa' | 'konseling' | 'baptisan' | 'baby' | 'nikah' | 'kunjungan'
  nama: string
  email: string
  telepon: string
  detail: Record<string, any> // Specific fields based on jenis
  status: 'pending' | 'in-progress' | 'completed' | 'rejected'
  catatan?: string
  createdAt: string
  processedAt?: string
  processedBy?: string
}
```

### Khotbah
```typescript
interface Khotbah {
  id: string
  judul: string
  pembicara: string
  tanggal: string
  tipe: 'video' | 'audio'
  url: string
  thumbnail?: string
  deskripsi?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}
```

### Artikel
```typescript
interface Artikel {
  id: string
  judul: string
  slug: string
  konten: string
  excerpt: string
  thumbnail?: string
  kategori: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author: string
}
```

### Media
```typescript
interface Media {
  id: string
  judul: string
  deskripsi?: string
  tipe: 'image' | 'video'
  url: string
  thumbnail?: string
  albumId?: string
  tanggal: string
  createdAt: string
  createdBy: string
}
```

### Jadwal
```typescript
interface Jadwal {
  id: string
  judul: string
  tipe: 'ibadah' | 'acara'
  tanggalMulai: string
  tanggalSelesai?: string
  waktu: string
  lokasi: string
  deskripsi?: string
  pengulangan?: 'none' | 'weekly' | 'monthly'
  createdAt: string
  updatedAt: string
}
```

### Komunitas
```typescript
interface Komunitas {
  id: string
  nama: string
  deskripsi: string
  jadwal: string
  kontakPerson: string
  kontakTelepon: string
  icon: string
  anggotaIds: string[]
  createdAt: string
  updatedAt: string
}
```

### Pengumuman
```typescript
interface Pengumuman {
  id: string
  judul: string
  konten: string
  prioritas: 'low' | 'medium' | 'high'
  tanggalMulai: string
  tanggalSelesai: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
}
```

### Settings
```typescript
interface Settings {
  gereja: {
    nama: string
    alamat: string
    telepon: string
    email: string
    website: string
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    youtube?: string
    twitter?: string
  }
  rekening: {
    bank: string
    nomorRekening: string
    atasNama: string
  }[]
  liveStreaming: {
    youtube?: string
    facebook?: string
  }
  maps: {
    embedUrl: string
    latitude: number
    longitude: number
  }
  updatedAt: string
  updatedBy: string
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Authentication Properties

Property 1: Valid credentials grant access
*For any* valid admin credentials, when attempting to login, the system should return a valid session token and grant access to the dashboard.
**Validates: Requirements 1.1**

Property 2: Invalid credentials are rejected
*For any* invalid credential combination (wrong username, wrong password, or non-existent user), the system should reject the login attempt and return an error message.
**Validates: Requirements 1.2**

Property 3: Logout invalidates session
*For any* active admin session, after logout, the session token should become invalid and subsequent requests using that token should be rejected.
**Validates: Requirements 1.4**

Property 4: Protected routes require authentication
*For any* admin route, when accessed without a valid session token, the system should redirect to the login page.
**Validates: Requirements 1.5**

### Dashboard Statistics Properties

Property 5: Jemaat count accuracy
*For any* set of jemaat records, the dashboard should display a count that exactly matches the number of active jemaat in the database.
**Validates: Requirements 2.1**

Property 6: Monthly donation sum accuracy
*For any* set of donation records, the dashboard should display a sum that exactly matches the total of verified donations in the current month.
**Validates: Requirements 2.2**

Property 7: Pending service requests count
*For any* set of service request records, the dashboard should display a count that exactly matches the number of requests with "pending" status.
**Validates: Requirements 2.3**

Property 8: Recent registrations count
*For any* set of registration records, the dashboard should display a count that exactly matches the number of registrations created in the last 30 days.
**Validates: Requirements 2.4**

Property 9: Donation trend data structure
*For any* set of donation records, the donation trend data should contain exactly 6 months of aggregated data, each with month identifier and total amount.
**Validates: Requirements 2.5**

Property 10: Activity feed ordering
*For any* set of activity records, the activity feed should display activities sorted by creation date in descending order (newest first).
**Validates: Requirements 2.6**

### Jemaat Management Properties

Property 11: Jemaat search accuracy
*For any* search query and set of jemaat records, the search results should only include jemaat whose name or email contains the search query (case-insensitive).
**Validates: Requirements 3.2**

Property 12: Jemaat creation persistence
*For any* valid jemaat data, after creating a new jemaat record, retrieving all jemaat should include the newly created record with all its fields intact.
**Validates: Requirements 3.3**

Property 13: Jemaat update with timestamp
*For any* existing jemaat record and valid update data, after updating the record, the updatedAt timestamp should be more recent than the previous timestamp.
**Validates: Requirements 3.4**

Property 14: Jemaat detail completeness
*For any* jemaat ID, the detail view should return all required fields (id, nama, email, telepon, alamat, tanggalLahir, jenisKelamin, statusPernikahan, status, createdAt, updatedAt).
**Validates: Requirements 3.6**

Property 15: Jemaat export data integrity
*For any* set of jemaat records, after exporting to CSV and parsing the file, the parsed data should match the original records in count and content.
**Validates: Requirements 3.7**

### Registration Management Properties

Property 16: New registration initial status
*For any* new registration submitted through the website, the record should be created with status "pending".
**Validates: Requirements 4.1**

Property 17: Registration approval state transition
*For any* pending registration, after approval, the status should change to "approved" and processedAt timestamp should be set.
**Validates: Requirements 4.3**

Property 18: Registration rejection with reason
*For any* pending registration, after rejection with a reason, the status should change to "rejected" and the alasanReject field should contain the provided reason.
**Validates: Requirements 4.4**

Property 19: Registration detail completeness
*For any* registration ID, the detail view should return all fields that were submitted in the registration form.
**Validates: Requirements 4.5**

### Donation Management Properties

Property 20: New donation initial status
*For any* new donation submitted through the website, the record should be created with status "pending".
**Validates: Requirements 5.1**

Property 21: Donation filtering accuracy
*For any* filter criteria (date range, category, status) and set of donation records, the filtered results should only include donations that match all specified criteria.
**Validates: Requirements 5.2**

Property 22: Donation verification with timestamp
*For any* pending donation, after verification, the status should change to "verified" and verifiedAt timestamp should be set.
**Validates: Requirements 5.3**

Property 23: Donation detail completeness
*For any* donation ID, the detail view should return all required fields including buktiTransfer URL if provided.
**Validates: Requirements 5.4**

Property 24: Donation export with period filter
*For any* date range and set of donation records, the exported report should only include donations within the specified period.
**Validates: Requirements 5.5**

Property 25: Donation category aggregation
*For any* set of donation records, the total per category should equal the sum of all donations in that category.
**Validates: Requirements 5.6**

### Service Request Management Properties

Property 26: New service request initial status
*For any* new service request submitted through the website, the record should be created with status "pending".
**Validates: Requirements 6.1**

Property 27: Service request filtering accuracy
*For any* filter criteria (jenis, status) and set of service request records, the filtered results should only include requests that match all specified criteria.
**Validates: Requirements 6.2**

Property 28: Service request processing state transition
*For any* pending service request, after processing, the status should change to "in-progress".
**Validates: Requirements 6.3**

Property 29: Service request completion with notes
*For any* in-progress service request, after completion with notes, the status should change to "completed" and catatan field should contain the provided notes.
**Validates: Requirements 6.4**

Property 30: Service request rejection with reason
*For any* pending service request, after rejection with a reason, the status should change to "rejected" and catatan field should contain the reason.
**Validates: Requirements 6.5**

Property 31: Service request detail completeness
*For any* service request ID, the detail view should return all fields including the jenis-specific detail fields.
**Validates: Requirements 6.6**

### Sermon Management Properties

Property 32: Sermon creation with required fields
*For any* valid sermon data with all required fields (judul, pembicara, tanggal, tipe, url), after creation, retrieving the sermon should return all fields intact.
**Validates: Requirements 7.1**

Property 33: Sermon update with timestamp
*For any* existing sermon record and valid update data, after updating, the updatedAt timestamp should be more recent than the previous timestamp.
**Validates: Requirements 7.2**

Property 34: Sermon file upload URL generation
*For any* uploaded audio or video file, the system should return a valid URL that can be used to access the file.
**Validates: Requirements 7.5**

### Article Management Properties

Property 35: Article creation with status
*For any* new article, the status should be either "draft" or "published" as specified during creation.
**Validates: Requirements 8.1**

Property 36: Article publication timestamp
*For any* article with status "draft", when status changes to "published", the publishedAt field should be set to the current timestamp.
**Validates: Requirements 8.2**

Property 37: Article update with history
*For any* existing article and valid update data, after updating, the updatedAt timestamp should be more recent than the previous timestamp.
**Validates: Requirements 8.3**

Property 38: Article filtering by status
*For any* status filter and set of article records, the filtered results should only include articles with the specified status.
**Validates: Requirements 8.5**

### Media Gallery Properties

Property 39: Media upload with metadata
*For any* uploaded media file with metadata (judul, deskripsi, tanggal), after upload, retrieving the media should return all metadata fields intact.
**Validates: Requirements 9.1**

Property 40: Media album association
*For any* media file and album ID, after associating the media with the album, the media's albumId field should match the specified album ID.
**Validates: Requirements 9.2**

Property 41: Batch media upload completeness
*For any* set of multiple media files uploaded together, all files should be processed and saved, with the count of saved media matching the count of uploaded files.
**Validates: Requirements 9.5**

### Schedule Management Properties

Property 42: Schedule creation with required fields
*For any* valid schedule data with required fields (judul, tipe, tanggalMulai, waktu, lokasi), after creation, retrieving the schedule should return all fields intact.
**Validates: Requirements 10.1**

Property 43: Event creation with date range
*For any* valid event data with tanggalMulai and tanggalSelesai, after creation, the event should have both dates stored correctly.
**Validates: Requirements 10.2**

Property 44: Schedule update with timestamp
*For any* existing schedule and valid update data, after updating, the updatedAt timestamp should be more recent than the previous timestamp.
**Validates: Requirements 10.3**

### Community Management Properties

Property 45: Community creation with required fields
*For any* valid community data with required fields (nama, deskripsi, jadwal, kontakPerson), after creation, retrieving the community should return all fields intact.
**Validates: Requirements 11.1**

Property 46: Community update with timestamp
*For any* existing community and valid update data, after updating, the updatedAt timestamp should be more recent than the previous timestamp.
**Validates: Requirements 11.2**

Property 47: Community member list accuracy
*For any* community ID, the member list should include all jemaat whose IDs are in the community's anggotaIds array.
**Validates: Requirements 11.4**

Property 48: Community registration persistence
*For any* valid community registration data, after submission, the registration should be saved and retrievable.
**Validates: Requirements 11.5**

### Announcement Management Properties

Property 49: Announcement creation with required fields
*For any* valid announcement data with required fields (judul, konten, tanggalMulai, tanggalSelesai), after creation, retrieving the announcement should return all fields intact.
**Validates: Requirements 12.1**

Property 50: Published announcement visibility
*For any* announcement with isActive true and current date within tanggalMulai and tanggalSelesai, the announcement should be included in the public announcement list.
**Validates: Requirements 12.2**

Property 51: Announcement priority ordering
*For any* set of active announcements, the list should be ordered by priority (high, medium, low) then by creation date descending.
**Validates: Requirements 12.3**

Property 52: Expired announcement exclusion
*For any* announcement where current date is after tanggalSelesai, the announcement should not be included in the active announcement list.
**Validates: Requirements 12.4**

### Church Profile Management Properties

Property 53: Vision mission update persistence
*For any* updated vision mission content, after saving, retrieving the settings should return the updated content.
**Validates: Requirements 13.1**

Property 54: Leadership data update persistence
*For any* updated leadership data, after saving, retrieving the settings should return the updated leadership information.
**Validates: Requirements 13.2**

Property 55: History update persistence
*For any* updated church history content, after saving, retrieving the settings should return the updated history.
**Validates: Requirements 13.3**

Property 56: Doctrine update persistence
*For any* updated doctrine content, after saving, retrieving the settings should return the updated doctrine.
**Validates: Requirements 13.4**

Property 57: Settings update audit trail
*For any* settings update, the updatedAt timestamp and updatedBy user ID should be recorded.
**Validates: Requirements 13.5**

### Website Settings Properties

Property 58: Contact info update persistence
*For any* updated contact information, after saving, retrieving the settings should return the updated contact info.
**Validates: Requirements 14.1**

Property 59: Social media links update persistence
*For any* updated social media links, after saving, retrieving the settings should return the updated links.
**Validates: Requirements 14.2**

Property 60: Bank account info update persistence
*For any* updated bank account information, after saving, retrieving the settings should return the updated account info.
**Validates: Requirements 14.3**

Property 61: Live streaming links update persistence
*For any* updated live streaming links, after saving, retrieving the settings should return the updated links.
**Validates: Requirements 14.4**

Property 62: Settings immediate effect
*For any* settings update, subsequent requests should immediately reflect the new settings without requiring system restart.
**Validates: Requirements 14.5**

### Reports and Analytics Properties

Property 63: Report period filtering accuracy
*For any* date range filter and set of records, the report should only include records within the specified period.
**Validates: Requirements 15.2**

Property 64: Report export format validity
*For any* report export request, the generated file should be in the requested format (PDF or Excel) and be parseable by standard tools.
**Validates: Requirements 15.3**

Property 65: Donation analytics calculation accuracy
*For any* set of donation records, the statistics (total, average, count) should match manual calculations of the same data.
**Validates: Requirements 15.4**

Property 66: Growth analytics calculation accuracy
*For any* set of jemaat records over time, the growth trend should accurately reflect the change in jemaat count per period.
**Validates: Requirements 15.5**

### Admin User Management Properties

Property 67: Admin creation with role
*For any* valid admin data with specified role, after creation, the admin account should have the specified role assigned.
**Validates: Requirements 16.1**

Property 68: Admin role update affects permissions
*For any* existing admin, after changing their role, their access permissions should reflect the new role's capabilities.
**Validates: Requirements 16.2**

Property 69: Inactive admin login prevention
*For any* admin account with isActive false, login attempts should be rejected.
**Validates: Requirements 16.3**

Property 70: Activity log completeness
*For any* admin action, an activity log entry should be created with timestamp, user ID, action type, and relevant details.
**Validates: Requirements 16.4**

Property 71: Role-based access control enforcement
*For any* admin attempting to access a feature outside their role's permissions, the system should deny access.
**Validates: Requirements 16.5**

### Notification Properties

Property 72: Registration notification creation
*For any* new jemaat registration, a notification should be created for admin users.
**Validates: Requirements 17.1**

Property 73: Donation notification creation
*For any* new donation submission, a notification should be created for admin users.
**Validates: Requirements 17.2**

Property 74: Service request notification creation
*For any* new service request submission, a notification should be created for admin users.
**Validates: Requirements 17.3**

Property 75: Notification read status update
*For any* unread notification, after being opened by an admin, the notification's isRead status should change to true.
**Validates: Requirements 17.4**

### Backup and Restore Properties

Property 76: Backup completeness
*For any* backup operation, the generated backup file should contain all data from all collections (jemaat, donasi, pelayanan, etc.).
**Validates: Requirements 18.1**

Property 77: Backup-restore round trip
*For any* system state, after creating a backup and then restoring from that backup, the restored data should be identical to the original data.
**Validates: Requirements 18.3**

Property 78: Backup download link validity
*For any* completed backup operation, the system should provide a valid download URL that allows retrieving the backup file.
**Validates: Requirements 18.4**

Property 79: Backup error logging
*For any* failed backup operation, an error log entry should be created with timestamp, error message, and stack trace.
**Validates: Requirements 18.5**

## Error Handling

### Error Categories

1. **Validation Errors** (400 Bad Request)
   - Invalid input data
   - Missing required fields
   - Invalid data format
   - Business rule violations

2. **Authentication Errors** (401 Unauthorized)
   - Invalid credentials
   - Expired session
   - Missing authentication token

3. **Authorization Errors** (403 Forbidden)
   - Insufficient permissions
   - Role-based access denial

4. **Not Found Errors** (404 Not Found)
   - Resource does not exist
   - Invalid ID

5. **Conflict Errors** (409 Conflict)
   - Duplicate entry
   - Concurrent modification

6. **Server Errors** (500 Internal Server Error)
   - Database errors
   - File system errors
   - Unexpected exceptions

### Error Response Format

All API errors should follow a consistent format:

```typescript
interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: any
    timestamp: string
  }
}
```

### Error Handling Strategy

1. **Input Validation**: Use Zod schemas to validate all inputs before processing
2. **Try-Catch Blocks**: Wrap all async operations in try-catch blocks
3. **Error Logging**: Log all errors with context for debugging
4. **User-Friendly Messages**: Return clear, actionable error messages to users
5. **Graceful Degradation**: Handle errors without crashing the application

## Testing Strategy

### Unit Testing

Unit tests will focus on:
- Service layer functions (business logic)
- Utility functions (formatting, validation, calculations)
- Data transformation functions
- Individual React components

Testing framework: **Vitest** (fast, modern, compatible with Next.js)

Example unit tests:
- Test that `calculateMonthlyDonationTotal()` correctly sums donations
- Test that `filterJemaatBySearch()` returns correct results
- Test that `formatCurrency()` formats numbers correctly
- Test that form validation schemas reject invalid inputs

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **fast-check** library.

Configuration:
- Minimum 100 iterations per property test
- Each test tagged with format: `**Feature: admin-dashboard, Property {number}: {property_text}**`
- One property-based test per correctness property

Example property-based tests:
- Property 11: Generate random jemaat data and search queries, verify search results always match criteria
- Property 15: Generate random jemaat data, export to CSV, parse back, verify data integrity
- Property 77: Generate random system state, backup, restore, verify data is identical

### Integration Testing

Integration tests will verify:
- API routes with database operations
- Authentication flow
- File upload and storage
- Multi-step workflows (e.g., registration approval process)

### End-to-End Testing

E2E tests will verify:
- Complete user workflows through the UI
- Navigation between pages
- Form submissions
- Data persistence across page reloads

Testing framework: **Playwright** (recommended for Next.js)

## Security Considerations

### Authentication
- Passwords hashed using bcrypt with salt rounds >= 10
- JWT tokens with expiration (30 minutes for access, 7 days for refresh)
- HTTP-only cookies for token storage
- CSRF protection for state-changing operations

### Authorization
- Role-based access control (RBAC)
- Middleware to check permissions on every protected route
- Principle of least privilege

### Data Protection
- Input sanitization to prevent XSS
- Parameterized queries to prevent injection (when using database)
- File upload validation (type, size, content)
- Sensitive data encryption at rest

### API Security
- Rate limiting to prevent abuse
- CORS configuration for allowed origins
- Request size limits
- Timeout configuration

## Performance Considerations

### Frontend Optimization
- React Server Components for initial page load
- Client Components only when interactivity needed
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Memoization for expensive calculations

### Data Loading
- Pagination for large lists (default 20 items per page)
- Debounced search inputs
- Optimistic UI updates
- Loading states and skeletons

### Caching Strategy
- Static page generation where possible
- API response caching with appropriate TTL
- Browser caching for static assets
- Revalidation strategies for dynamic data

### File Handling
- Streaming for large file uploads
- Compression for images
- CDN for media files (future enhancement)
- Lazy loading for images in galleries

## Deployment Considerations

### Environment Variables
```
# Authentication
JWT_SECRET=<random-secret>
JWT_EXPIRES_IN=30m
REFRESH_TOKEN_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR=./public/uploads

# Database (future)
DATABASE_URL=<connection-string>

# Email (future)
SMTP_HOST=<smtp-server>
SMTP_PORT=587
SMTP_USER=<username>
SMTP_PASS=<password>
```

### Build Process
1. Type checking with TypeScript
2. Linting with ESLint
3. Unit and integration tests
4. Build optimization
5. Asset optimization

### Monitoring
- Error tracking (future: Sentry integration)
- Performance monitoring
- User activity logging
- System health checks

## Future Enhancements

### Phase 2 Features
- Real database integration (PostgreSQL or MongoDB)
- Email notifications
- SMS notifications
- Advanced analytics dashboard
- Export to multiple formats (PDF, Excel, CSV)
- Bulk operations
- Advanced search with filters
- Data import functionality

### Phase 3 Features
- Mobile app integration
- Push notifications
- Real-time updates with WebSockets
- Multi-language support
- Advanced reporting with custom queries
- Integration with payment gateways
- Calendar sync (Google Calendar, Outlook)
- Automated backups to cloud storage
