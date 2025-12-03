# 🏛️ Website Gereja - Church Management

Website gereja modern dengan fitur lengkap menggunakan Next.js 14, React, TypeScript, dan Tailwind CSS.

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

## Teknologi

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** React Icons

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Copy file environment:
```bash
copy .env.example .env
```

3. Sesuaikan konfigurasi di file `.env`

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di `http://localhost:3000`

## Struktur Folder

```
├── app/                    # App Router pages
│   ├── page.tsx           # Homepage
│   ├── profil/            # Profil gereja
│   ├── ibadah/            # Informasi ibadah
│   ├── jemaat-baru/       # Halaman jemaat baru
│   ├── komunitas/         # Komunitas & pelayanan
│   ├── media/             # Konten rohani
│   ├── pelayanan/         # Formulir pelayanan
│   └── donasi/            # Donasi online
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── profil/           # Profil components
│   ├── ibadah/           # Ibadah components
│   ├── jemaat-baru/      # Jemaat baru components
│   ├── komunitas/        # Komunitas components
│   ├── media/            # Media components
│   ├── pelayanan/        # Pelayanan components
│   └── donasi/           # Donasi components
└── public/               # Static assets
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

## Catatan Pengembangan

- Semua formulir saat ini hanya menampilkan alert. Integrasikan dengan backend/API untuk menyimpan data.
- Live streaming dan video memerlukan embed code dari YouTube/Facebook.
- Google Maps memerlukan API key yang valid.
- Payment gateway (Midtrans) memerlukan konfigurasi tambahan.
- Email notification memerlukan konfigurasi SMTP.

## Lisensi

MIT License
