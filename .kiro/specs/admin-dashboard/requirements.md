# Requirements Document - Admin Dashboard Gereja

## Introduction

Admin Dashboard adalah sistem manajemen backend untuk website gereja yang memungkinkan administrator untuk mengelola seluruh konten, data jemaat, donasi, permohonan pelayanan, dan pengaturan website. Dashboard ini dirancang untuk memberikan kontrol penuh kepada admin gereja dalam mengelola informasi dan interaksi dengan jemaat secara efisien dan terorganisir.

## Glossary

- **Admin**: Pengguna yang memiliki hak akses penuh untuk mengelola sistem
- **Dashboard**: Halaman utama admin yang menampilkan ringkasan dan statistik
- **Jemaat**: Anggota gereja yang terdaftar dalam sistem
- **Donasi**: Persembahan atau kontribusi finansial dari jemaat
- **Pelayanan**: Berbagai layanan gereja seperti baptisan, konseling, permohonan doa
- **Khotbah**: Rekaman audio/video dari ibadah yang diarsipkan
- **Komunitas**: Kelompok pelayanan atau fellowship dalam gereja
- **Pengumuman**: Informasi atau berita yang ditampilkan kepada jemaat
- **Session**: Periode waktu login admin yang aktif
- **CRUD**: Create, Read, Update, Delete operations

## Requirements

### Requirement 1: Autentikasi dan Keamanan Admin

**User Story:** Sebagai administrator gereja, saya ingin sistem login yang aman, sehingga hanya pengguna yang berwenang yang dapat mengakses dashboard admin.

#### Acceptance Criteria

1. WHEN admin memasukkan kredensial yang valid THEN sistem SHALL memberikan akses ke dashboard admin
2. WHEN admin memasukkan kredensial yang tidak valid THEN sistem SHALL menolak akses dan menampilkan pesan error
3. WHEN admin tidak melakukan aktivitas selama 30 menit THEN sistem SHALL mengakhiri session secara otomatis
4. WHEN admin logout THEN sistem SHALL menghapus session dan mengarahkan ke halaman login
5. WHEN admin mencoba mengakses halaman admin tanpa login THEN sistem SHALL mengarahkan ke halaman login

### Requirement 2: Dashboard Utama dan Statistik

**User Story:** Sebagai administrator, saya ingin melihat ringkasan statistik dan aktivitas terkini, sehingga saya dapat memantau kondisi gereja secara keseluruhan.

#### Acceptance Criteria

1. WHEN admin membuka dashboard THEN sistem SHALL menampilkan total jumlah jemaat terdaftar
2. WHEN admin membuka dashboard THEN sistem SHALL menampilkan total donasi bulan ini
3. WHEN admin membuka dashboard THEN sistem SHALL menampilkan jumlah permohonan pelayanan yang pending
4. WHEN admin membuka dashboard THEN sistem SHALL menampilkan jumlah pendaftar jemaat baru dalam 30 hari terakhir
5. WHEN admin membuka dashboard THEN sistem SHALL menampilkan grafik tren donasi 6 bulan terakhir
6. WHEN admin membuka dashboard THEN sistem SHALL menampilkan daftar aktivitas terbaru (pendaftaran, donasi, permohonan)

### Requirement 3: Manajemen Data Jemaat

**User Story:** Sebagai administrator, saya ingin mengelola data jemaat, sehingga informasi jemaat selalu akurat dan terorganisir.

#### Acceptance Criteria

1. WHEN admin mengakses halaman jemaat THEN sistem SHALL menampilkan daftar semua jemaat dengan fitur pencarian dan filter
2. WHEN admin mencari jemaat berdasarkan nama atau email THEN sistem SHALL menampilkan hasil yang sesuai
3. WHEN admin menambah data jemaat baru THEN sistem SHALL menyimpan data dan menampilkan konfirmasi
4. WHEN admin mengubah data jemaat THEN sistem SHALL memperbarui data dan mencatat waktu perubahan
5. WHEN admin menghapus data jemaat THEN sistem SHALL meminta konfirmasi sebelum menghapus
6. WHEN admin melihat detail jemaat THEN sistem SHALL menampilkan informasi lengkap termasuk riwayat aktivitas
7. WHEN admin mengekspor data jemaat THEN sistem SHALL menghasilkan file CSV atau Excel

### Requirement 4: Manajemen Pendaftaran Jemaat Baru

**User Story:** Sebagai administrator, saya ingin mengelola pendaftaran jemaat baru, sehingga saya dapat memproses dan menindaklanjuti pendaftar dengan efisien.

#### Acceptance Criteria

1. WHEN jemaat baru mendaftar melalui website THEN sistem SHALL menyimpan data dengan status "pending"
2. WHEN admin membuka daftar pendaftar THEN sistem SHALL menampilkan semua pendaftar dengan status masing-masing
3. WHEN admin menyetujui pendaftar THEN sistem SHALL mengubah status menjadi "approved" dan mengirim email notifikasi
4. WHEN admin menolak pendaftar THEN sistem SHALL mengubah status menjadi "rejected" dan mencatat alasan
5. WHEN admin melihat detail pendaftar THEN sistem SHALL menampilkan semua informasi yang diisi dalam formulir

### Requirement 5: Manajemen Donasi dan Persembahan

**User Story:** Sebagai administrator, saya ingin mengelola data donasi, sehingga saya dapat melacak dan memverifikasi semua persembahan yang masuk.

#### Acceptance Criteria

1. WHEN jemaat mengirim donasi THEN sistem SHALL menyimpan data donasi dengan status "pending"
2. WHEN admin membuka daftar donasi THEN sistem SHALL menampilkan semua transaksi dengan filter berdasarkan tanggal, kategori, dan status
3. WHEN admin memverifikasi donasi THEN sistem SHALL mengubah status menjadi "verified" dan mencatat waktu verifikasi
4. WHEN admin melihat detail donasi THEN sistem SHALL menampilkan informasi lengkap termasuk bukti transfer
5. WHEN admin mengekspor laporan donasi THEN sistem SHALL menghasilkan file dengan data donasi berdasarkan periode yang dipilih
6. WHEN admin melihat dashboard donasi THEN sistem SHALL menampilkan total per kategori dan grafik tren

### Requirement 6: Manajemen Permohonan Pelayanan

**User Story:** Sebagai administrator, saya ingin mengelola permohonan pelayanan, sehingga setiap permohonan dapat ditindaklanjuti dengan tepat.

#### Acceptance Criteria

1. WHEN jemaat mengirim permohonan pelayanan THEN sistem SHALL menyimpan data dengan status "pending"
2. WHEN admin membuka daftar permohonan THEN sistem SHALL menampilkan semua permohonan dengan filter berdasarkan jenis dan status
3. WHEN admin memproses permohonan THEN sistem SHALL mengubah status menjadi "in-progress"
4. WHEN admin menyelesaikan permohonan THEN sistem SHALL mengubah status menjadi "completed" dan mencatat catatan
5. WHEN admin menolak permohonan THEN sistem SHALL mengubah status menjadi "rejected" dan mencatat alasan
6. WHEN admin melihat detail permohonan THEN sistem SHALL menampilkan semua informasi yang diisi pemohon

### Requirement 7: Manajemen Konten Khotbah

**User Story:** Sebagai administrator, saya ingin mengelola arsip khotbah, sehingga jemaat dapat mengakses konten rohani yang terorganisir.

#### Acceptance Criteria

1. WHEN admin menambah khotbah baru THEN sistem SHALL menyimpan data khotbah dengan judul, pembicara, tanggal, dan link media
2. WHEN admin mengubah data khotbah THEN sistem SHALL memperbarui informasi dan mencatat waktu perubahan
3. WHEN admin menghapus khotbah THEN sistem SHALL meminta konfirmasi sebelum menghapus
4. WHEN admin mengakses daftar khotbah THEN sistem SHALL menampilkan semua khotbah dengan fitur pencarian dan filter
5. WHEN admin mengunggah file audio atau video THEN sistem SHALL menyimpan file dan menghasilkan URL akses

### Requirement 8: Manajemen Artikel dan Renungan

**User Story:** Sebagai administrator, saya ingin mengelola artikel rohani, sehingga konten website selalu fresh dan relevan.

#### Acceptance Criteria

1. WHEN admin membuat artikel baru THEN sistem SHALL menyimpan artikel dengan status "draft" atau "published"
2. WHEN admin mempublikasi artikel THEN sistem SHALL menampilkan artikel di website dengan timestamp publikasi
3. WHEN admin mengubah artikel THEN sistem SHALL memperbarui konten dan mencatat riwayat perubahan
4. WHEN admin menghapus artikel THEN sistem SHALL meminta konfirmasi sebelum menghapus
5. WHEN admin mengakses daftar artikel THEN sistem SHALL menampilkan semua artikel dengan filter berdasarkan status dan tanggal

### Requirement 9: Manajemen Galeri Media

**User Story:** Sebagai administrator, saya ingin mengelola galeri foto dan video, sehingga dokumentasi kegiatan gereja tertata dengan baik.

#### Acceptance Criteria

1. WHEN admin mengunggah foto atau video THEN sistem SHALL menyimpan file dengan metadata (judul, deskripsi, tanggal)
2. WHEN admin mengelompokkan media THEN sistem SHALL menyimpan media dalam album atau kategori
3. WHEN admin menghapus media THEN sistem SHALL meminta konfirmasi sebelum menghapus
4. WHEN admin mengakses galeri THEN sistem SHALL menampilkan semua media dengan thumbnail dan fitur pencarian
5. WHEN admin mengunggah multiple files THEN sistem SHALL memproses semua file secara batch

### Requirement 10: Manajemen Jadwal dan Acara

**User Story:** Sebagai administrator, saya ingin mengelola jadwal ibadah dan acara gereja, sehingga informasi selalu up-to-date untuk jemaat.

#### Acceptance Criteria

1. WHEN admin menambah jadwal ibadah THEN sistem SHALL menyimpan informasi waktu, lokasi, dan tema
2. WHEN admin menambah acara khusus THEN sistem SHALL menyimpan detail acara dengan tanggal mulai dan selesai
3. WHEN admin mengubah jadwal THEN sistem SHALL memperbarui informasi dan menampilkan notifikasi perubahan
4. WHEN admin menghapus acara THEN sistem SHALL meminta konfirmasi sebelum menghapus
5. WHEN admin melihat kalender THEN sistem SHALL menampilkan semua jadwal dan acara dalam tampilan kalender

### Requirement 11: Manajemen Komunitas dan Pelayanan

**User Story:** Sebagai administrator, saya ingin mengelola informasi komunitas, sehingga jemaat mendapat informasi yang akurat tentang setiap komunitas.

#### Acceptance Criteria

1. WHEN admin menambah komunitas baru THEN sistem SHALL menyimpan nama, deskripsi, jadwal, dan kontak person
2. WHEN admin mengubah informasi komunitas THEN sistem SHALL memperbarui data dan mencatat waktu perubahan
3. WHEN admin menghapus komunitas THEN sistem SHALL meminta konfirmasi sebelum menghapus
4. WHEN admin melihat daftar anggota komunitas THEN sistem SHALL menampilkan semua anggota yang terdaftar
5. WHEN jemaat mendaftar ke komunitas THEN sistem SHALL menyimpan data pendaftaran untuk ditinjau admin

### Requirement 12: Manajemen Pengumuman

**User Story:** Sebagai administrator, saya ingin mengelola pengumuman, sehingga informasi penting dapat disampaikan kepada jemaat dengan efektif.

#### Acceptance Criteria

1. WHEN admin membuat pengumuman THEN sistem SHALL menyimpan judul, konten, dan tanggal berlaku
2. WHEN admin mempublikasi pengumuman THEN sistem SHALL menampilkan pengumuman di halaman ibadah
3. WHEN admin mengatur prioritas pengumuman THEN sistem SHALL menampilkan pengumuman sesuai urutan prioritas
4. WHEN tanggal berlaku pengumuman habis THEN sistem SHALL menyembunyikan pengumuman secara otomatis
5. WHEN admin menghapus pengumuman THEN sistem SHALL meminta konfirmasi sebelum menghapus

### Requirement 13: Manajemen Profil Gereja

**User Story:** Sebagai administrator, saya ingin mengelola informasi profil gereja, sehingga informasi tentang gereja selalu akurat.

#### Acceptance Criteria

1. WHEN admin mengubah visi misi THEN sistem SHALL memperbarui konten di halaman profil
2. WHEN admin menambah atau mengubah data kepemimpinan THEN sistem SHALL memperbarui informasi tim kepemimpinan
3. WHEN admin mengubah sejarah gereja THEN sistem SHALL memperbarui timeline di halaman profil
4. WHEN admin mengubah doktrin THEN sistem SHALL memperbarui konten di halaman profil
5. WHEN admin menyimpan perubahan THEN sistem SHALL mencatat waktu dan user yang melakukan perubahan

### Requirement 14: Pengaturan Website

**User Story:** Sebagai administrator, saya ingin mengatur konfigurasi website, sehingga tampilan dan fungsi website dapat disesuaikan.

#### Acceptance Criteria

1. WHEN admin mengubah informasi kontak THEN sistem SHALL memperbarui informasi di footer dan halaman kontak
2. WHEN admin mengubah link social media THEN sistem SHALL memperbarui link di header dan footer
3. WHEN admin mengubah informasi rekening bank THEN sistem SHALL memperbarui informasi di halaman donasi
4. WHEN admin mengubah link live streaming THEN sistem SHALL memperbarui embed di halaman media
5. WHEN admin menyimpan pengaturan THEN sistem SHALL menerapkan perubahan secara real-time

### Requirement 15: Laporan dan Analitik

**User Story:** Sebagai administrator, saya ingin melihat laporan dan analitik, sehingga saya dapat membuat keputusan berdasarkan data.

#### Acceptance Criteria

1. WHEN admin membuka halaman laporan THEN sistem SHALL menampilkan pilihan jenis laporan
2. WHEN admin memilih periode laporan THEN sistem SHALL menghasilkan laporan sesuai periode yang dipilih
3. WHEN admin mengekspor laporan THEN sistem SHALL menghasilkan file PDF atau Excel
4. WHEN admin melihat analitik donasi THEN sistem SHALL menampilkan grafik dan statistik donasi
5. WHEN admin melihat analitik pertumbuhan jemaat THEN sistem SHALL menampilkan grafik tren pertumbuhan

### Requirement 16: Manajemen User Admin

**User Story:** Sebagai super administrator, saya ingin mengelola akun admin lain, sehingga akses ke sistem dapat dikontrol dengan baik.

#### Acceptance Criteria

1. WHEN super admin menambah admin baru THEN sistem SHALL membuat akun dengan role yang ditentukan
2. WHEN super admin mengubah role admin THEN sistem SHALL memperbarui hak akses admin tersebut
3. WHEN super admin menonaktifkan admin THEN sistem SHALL mencegah admin tersebut login
4. WHEN super admin melihat log aktivitas admin THEN sistem SHALL menampilkan riwayat aktivitas semua admin
5. WHEN admin mencoba mengakses fitur di luar role-nya THEN sistem SHALL menolak akses

### Requirement 17: Notifikasi dan Alert

**User Story:** Sebagai administrator, saya ingin menerima notifikasi untuk aktivitas penting, sehingga saya dapat merespons dengan cepat.

#### Acceptance Criteria

1. WHEN ada pendaftaran jemaat baru THEN sistem SHALL menampilkan notifikasi di dashboard
2. WHEN ada donasi baru THEN sistem SHALL menampilkan notifikasi di dashboard
3. WHEN ada permohonan pelayanan baru THEN sistem SHALL menampilkan notifikasi di dashboard
4. WHEN admin membuka notifikasi THEN sistem SHALL menandai notifikasi sebagai dibaca
5. WHEN admin mengklik notifikasi THEN sistem SHALL mengarahkan ke halaman detail terkait

### Requirement 18: Backup dan Restore Data

**User Story:** Sebagai administrator, saya ingin melakukan backup data, sehingga data gereja aman dari kehilangan.

#### Acceptance Criteria

1. WHEN admin meminta backup THEN sistem SHALL menghasilkan file backup lengkap
2. WHEN admin menjadwalkan backup otomatis THEN sistem SHALL melakukan backup sesuai jadwal
3. WHEN admin melakukan restore THEN sistem SHALL memulihkan data dari file backup
4. WHEN backup selesai THEN sistem SHALL memberikan link download file backup
5. WHEN backup gagal THEN sistem SHALL menampilkan pesan error dan mencatat log error
