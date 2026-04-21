# 📚 Sistem Manajemen Bimbingan Belajar (Bimbel) - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

Proyek ini adalah **Backend API** untuk sistem manajemen bimbingan belajar yang mencakup manajemen user (Murid & Tentor), pengelolaan kelas, dan sistem pendaftaran (Enrollment). Dikembangkan untuk memenuhi tugas **LKM 1 Pemrograman Aplikasi Antarmuka (PAA)**.

## 📂 Struktur Proyek

~~~text
├── src/
│   ├── config/      # Pengaturan koneksi database PostgreSQL (pg library)
│   ├── controller/  # Logika bisnis utama (Auth, Kelas, Profil)
│   ├── middleware/  # Filter keamanan (JWT) & Logger aktivitas
│   ├── models/      # Layer abstraksi data (Query SQL mentah)
│   ├── routes/      # Definisi endpoint API
│   └── index.js     # Entry point utama aplikasi
├── swaggerConfig.json # Konfigurasi dokumentasi API Swagger UI
├── db.sql             # Skema tabel dan data dummy
└── .env               # File konfigurasi environment (tidak di-upload)
~~~

## 🛠️ Persiapan & Instalasi

### 1. Clone Repository
~~~bash
git clone https://github.com/username-kamu/Express_PAA.git
cd Express_PAA
~~~

### 2. Install Dependensi
~~~bash
npm install
~~~

### 3. Setup Database (PostgreSQL)
1. Buat database baru di PostgreSQL (misal: `bimbel_db`).
2. Jalankan seluruh query yang terdapat pada file `db.sql` untuk membuat struktur tabel dan memasukkan 14 data dummy.

### 4. Konfigurasi Environment (.env)
Buat file `.env` di root folder proyek dan sesuaikan dengan konfigurasi lokal Anda:
~~~env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=isi_password_database_anda
DB_NAME=bimbel_db
DB_PORT=5432
JWT_SECRET=rahasia_bimbel_123
~~~

## 🚀 Menjalankan Aplikasi
Gunakan perintah berikut untuk menjalankan server dengan mode *auto-restart* (Nodemon):
~~~bash
npm start
~~~
Server akan berjalan secara default pada: `http://localhost:3000`

## 📖 Dokumentasi API (Swagger UI)
Seluruh endpoint telah terdokumentasi dan dapat diuji langsung melalui browser:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🔐 Daftar Endpoint API

### Autentikasi (/api/auth)
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registrasi akun baru (Murid/Tentor) | Public |
| `POST` | `/api/auth/login` | Login user untuk mendapatkan Token JWT | Public |

### Manajemen Profil (/api/users)
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/murid` | Mengambil semua daftar murid | Private (JWT) |
| `PUT` | `/api/users/murid/{id}` | Memperbarui data asal sekolah murid | Private (JWT) |
| `DELETE` | `/api/users/murid/{id}` | Menghapus data murid secara permanen | Private (JWT) |
| `GET` | `/api/users/tentor` | Mengambil daftar tentor yang aktif | Private (JWT) |
| `PUT` | `/api/users/tentor/{id}` | Memperbarui pendidikan/jurusan tentor | Private (JWT) |
| `DELETE` | `/api/users/tentor/{id}` | Menonaktifkan tentor (Soft Delete) | Private (JWT) |

### Manajemen Kelas & Enrollment (/api/kelas)
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/kelas` | Menampilkan seluruh daftar kelas | Public |
| `POST` | `/api/kelas` | Membuat kelas bimbingan baru | Private (JWT) |
| `PUT` | `/api/kelas/{id}` | Memperbarui informasi atau status kelas | Private (JWT) |
| `POST` | `/api/kelas/enroll` | Pendaftaran murid ke dalam kelas | Private (JWT) |
| `DELETE` | `/api/kelas/unenroll` | Keluarkan murid dari daftar kelas | Private (JWT) |
| `GET` | `/api/kelas/{id}/anggota` | Melihat daftar murid di suatu kelas | Public |

---

## 🛡️ Fitur Utama
- **JWT Authorization**: Melindungi endpoint privat dari akses tidak sah.
- **Bcrypt Password Hashing**: Mengamankan password user dengan enkripsi satu arah.
- **Request Logger**: Middleware kustom untuk memantau trafik request di console secara real-time.
- **Soft Delete**: Mekanisme penonaktifan tentor tanpa menghapus record dari database.
- **Many-to-Many Relationship**: Implementasi tabel penghubung untuk relasi antara Murid dan Kelas.

## 👤 Identitas Pengembang
- **Nama**: Tunggul Abdul Majid
- **NIM**: 24241010xxxx
- **Program Studi**: Teknologi Informasi
- **Instansi**: Universitas Jember
- **Tugas**: LKM 1 Pemrograman Aplikasi Antarmuka (PAA)
