# 🏛️ Website Gereja - Church Management System

Website gereja modern dengan fitur lengkap menggunakan Next.js 15, React, TypeScript, dan Tailwind CSS. Dilengkapi dengan Admin Dashboard untuk manajemen konten dan data gereja.

## 📊 Status Pengembangan

### ✅ Fitur yang Sudah Ready (Production Ready)

#### Frontend Website
- ✅ Halaman Utama (Homepage)
- ✅ Profil Gereja
- ✅ Informasi Ibadah & Acara
- ✅ Halaman Jemaat Baru
- ✅ Komunitas & Pelayanan
- ✅ Konten Rohani & Media
- ✅ Formulir Pelayanan
- ✅ Donasi & Persepuluhan Online

#### Admin Dashboard
- ✅ **Authentication System** - Login, logout, session management dengan NextAuth.js
- ✅ **Dashboard Utama** - Statistik, grafik donasi, activity feed
- ✅ **Manajemen Jemaat** - CRUD operations, search, filter, export to CSV/Excel
- ✅ **Manajemen Pendaftar** - Approval workflow untuk jemaat baru
- ✅ **Manajemen Donasi** - Verifikasi donasi, laporan, export, grafik per kategori
- ✅ **Manajemen Permohonan Pelayanan** - Process, complete, reject service requests
- ✅ **Notification System** - Real-time notifications untuk aktivitas penting
- ✅ **Reusable Components** - DataTable, Modal, ConfirmDialog, SearchBar, dll

### 🚧 Fitur dalam Tahap Development

- 🚧 **Manajemen Khotbah** - Upload dan kelola arsip khotbah
- 🚧 **Manajemen Artikel** - Buat dan kelola artikel rohani
- 🚧 **Manajemen Galeri Media** - Upload dan kelola foto/video
- 🚧 **Manajemen Jadwal & Acara** - Kelola jadwal ibadah dan acara
- 🚧 **Manajemen Komunitas** - Kelola informasi komunitas dan anggota
- 🚧 **Manajemen Pengumuman** - Buat dan kelola pengumuman
- 🚧 **Manajemen Profil Gereja** - Edit visi/misi, sejarah, kepemimpinan
- 🚧 **Pengaturan Website** - Konfigurasi kontak, social media, rekening bank
- 🚧 **Laporan & Analitik** - Laporan lengkap dan analitik pertumbuhan
- 🚧 **Manajemen User Admin** - Role-based access control
- 🚧 **Backup & Restore** - Backup otomatis dan restore data

## Fitur Utama

### 1. Halaman Utama (Homepage)
- Hero banner dengan call-to-action
- Jadwal ibadah singkat
- Tombol cepat akses (Daftar jemaat, Lokasi, Live streaming)
- Highlight program gereja
- Testimoni jemaat
- Statistik gereja

### 2. Profil Gereja
- Sejarah gereja dengan timeline interaktif
- Visi & Misi
- Tim kepemimpinan (Pastor & Majelis)
- Doktrin & Kepercayaan
- Struktur organisasi pelayanan

### 3. Informasi Ibadah & Acara
- Jadwal ibadah lengkap
- Peta lokasi (Google Maps)
- Kalender kegiatan
- Pengumuman terbaru

### 4. Halaman Jemaat Baru
- Formulir pendaftaran jemaat baru
- Video sambutan dari pastor
- Informasi kelas orientasi
- Penjelasan komunitas sel
- FAQ untuk jemaat baru

### 5. Komunitas & Pelayanan
- Daftar komunitas (Komsel, Youth, Wanita, Pria, Musik, Multimedia, Anak)
- Detail setiap komunitas
- Kalender kegiatan komunitas
- Form bergabung komunitas

### 6. Konten Rohani & Media
- Live streaming (YouTube & Facebook)
- Arsip khotbah (audio & video)
- Galeri foto & video
- Artikel renungan

### 7. Formulir Pelayanan
- Permohonan doa
- Konseling pastoral
- Pendaftaran baptisan
- Baby dedication
- Pendaftaran nikah gereja
- Kunjungan doa

### 8. Donasi & Persepuluhan Online
- Form donasi dengan kategori
- Metode pembayaran (Transfer, QRIS, E-wallet)
- Upload bukti transfer
- Informasi rekening

## 🛠️ Teknologi

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** React Icons

### Admin Dashboard
- **Authentication:** NextAuth.js (JWT-based)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Export:** XLSX (Excel/CSV export)
- **Testing:** Vitest + fast-check (Property-Based Testing)
- **Data Storage:** JSON files (dapat di-upgrade ke database)

## 🚀 Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd web-gereja
```

2. Install dependencies:
```bash
npm install
```

3. Copy file environment:
```bash
copy .env.example .env.local
```

4. Sesuaikan konfigurasi di file `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

5. Seed admin user (opsional):
```bash
npm run seed-admin
```
Default credentials: `admin@gereja.com` / `admin123`

6. Jalankan development server:
```bash
npm run dev
```

7. Buka browser:
- Website: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin`

## 🧪 Testing

Jalankan unit tests:
```bash
npm test
```

Jalankan tests dengan coverage:
```bash
npm run test:coverage
```

## 📁 Struktur Folder

```
├── app/                    # App Router pages
│   ├── page.tsx           # Homepage
│   ├── profil/            # Profil gereja
│   ├── ibadah/            # Informasi ibadah
│   ├── jemaat-baru/       # Halaman jemaat baru
│   ├── komunitas/         # Komunitas & pelayanan
│   ├── media/             # Konten rohani
│   ├── pelayanan/         # Formulir pelayanan
│   ├── donasi/            # Donasi online
│   ├── admin/             # Admin dashboard pages
│   │   ├── login/         # Login page
│   │   ├── jemaat/        # Manajemen jemaat
│   │   ├── pendaftar/     # Manajemen pendaftar
│   │   ├── donasi/        # Manajemen donasi
│   │   └── pelayanan/     # Manajemen pelayanan
│   └── api/               # API routes
│       ├── auth/          # Authentication APIs
│       ├── jemaat/        # Jemaat APIs
│       ├── pendaftar/     # Pendaftar APIs
│       ├── donasi/        # Donasi APIs
│       ├── pelayanan/     # Pelayanan APIs
│       ├── dashboard/     # Dashboard APIs
│       └── notifications/ # Notification APIs
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── admin/            # Admin components
│   │   ├── layout/       # Admin layout (sidebar, header)
│   │   ├── common/       # Reusable components
│   │   └── dashboard/    # Dashboard components
│   └── ...               # Other feature components
├── lib/                  # Utilities & services
│   ├── auth/            # Authentication logic
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── services/        # Business logic services
├── data/                # JSON data storage
│   ├── jemaat.json
│   ├── donasi.json
│   ├── pelayanan.json
│   └── ...
└── public/              # Static assets
```

## Kustomisasi

### Warna
Edit file `tailwind.config.js` untuk mengubah warna tema:
```js
colors: {
  primary: '#1e40af',  // Warna utama
  secondary: '#7c3aed', // Warna sekunder
}
```

### Konten
Sesuaikan konten di setiap component sesuai dengan informasi gereja Anda.

### Google Maps
Tambahkan API key Google Maps di file `.env`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy ke Vercel dengan menghubungkan repository GitHub Anda.

### Server Lain
```bash
npm run build
npm start
```

## 🔐 Admin Dashboard

### Akses Admin
URL: `http://localhost:3000/admin`

Default credentials (setelah seed):
- Email: `admin@gereja.com`
- Password: `admin123`

### Fitur Admin yang Tersedia
1. **Dashboard** - Overview statistik dan aktivitas terbaru
2. **Manajemen Jemaat** - CRUD, search, filter, export
3. **Manajemen Pendaftar** - Approve/reject pendaftaran jemaat baru
4. **Manajemen Donasi** - Verifikasi donasi, laporan, export
5. **Manajemen Pelayanan** - Process service requests
6. **Notifikasi** - Real-time notifications

## 📝 Catatan Pengembangan

### Sudah Terintegrasi
- ✅ Authentication dengan NextAuth.js
- ✅ API routes untuk CRUD operations
- ✅ Data persistence dengan JSON files
- ✅ Export ke CSV/Excel
- ✅ Unit testing dengan Vitest
- ✅ Form validation dengan Zod

### Perlu Konfigurasi Tambahan
- ⚠️ Live streaming - Memerlukan embed code dari YouTube/Facebook
- ⚠️ Google Maps - Memerlukan API key yang valid
- ⚠️ Payment gateway - Integrasi Midtrans untuk pembayaran online
- ⚠️ Email notification - Konfigurasi SMTP untuk email otomatis
- ⚠️ Database - Upgrade dari JSON files ke PostgreSQL/MySQL (opsional)

### Roadmap
- [ ] Implementasi fitur admin yang tersisa (khotbah, artikel, galeri, dll)
- [ ] Property-based testing untuk semua modul
- [ ] Integration testing
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Database migration
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Backup & restore automation

## 🤝 Kontribusi

Contributions are welcome! Please feel free to submit a Pull Request.
