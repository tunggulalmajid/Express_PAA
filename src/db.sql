CREATE TABLE users (
    id_user serial PRIMARY KEY, 
    nama varchar(100) NOT NULL,
    tanggal_lahir date NOT NULL,
    email varchar(100) NOT NULL UNIQUE, 
    alamat text NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(10) NOT NULL CHECK (role IN ('murid', 'tentor')), 
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW()
);

CREATE TABLE murids (
    id_murid serial PRIMARY KEY, 
    id_user int NOT NULL UNIQUE, 
    asal_sekolah varchar(100) NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    CONSTRAINT fk_user_murid FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
);


CREATE TABLE tentors (
    id_tentor serial PRIMARY KEY,
    id_user int NOT NULL UNIQUE, 
    pendidikan_terakhir varchar(50) NOT NULL,
    jurusan varchar(100) NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    deleted_at timestamp DEFAULT NULL,
    CONSTRAINT fk_user_tentor FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE kelas (
    id_kelas serial PRIMARY KEY,
    id_tentor int NOT NULL,
    nama_kelas varchar(255) NOT NULL,
    is_aktif boolean DEFAULT true,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    CONSTRAINT fk_tentor_kelas FOREIGN KEY(id_tentor) REFERENCES tentors(id_tentor) ON DELETE CASCADE
);

CREATE TABLE detail_kelas (
    id_kelas int NOT NULL,
    id_murid int NOT NULL,
    PRIMARY KEY (id_kelas, id_murid), 
    CONSTRAINT fk_murid_detail FOREIGN KEY(id_murid) REFERENCES murids(id_murid) ON DELETE CASCADE,
    CONSTRAINT fk_kelas_detail FOREIGN KEY(id_kelas) REFERENCES kelas(id_kelas) ON DELETE CASCADE
);

INSERT INTO users (nama, tanggal_lahir, email, alamat, password, role) VALUES

('Tunggul Abdul Majid', '2006-04-01', 'tunggul@gmail.com', 'Banyuwangi', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),
('Ahmad Fauzi', '1995-08-15', 'fauzi@gmail.com', 'Jember Kota', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),
('Siti Aminah', '1998-02-20', 'siti@gmail.com', 'Bondowoso', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),
('Rizky Pratama', '1994-03-12', 'rizky.tutor@gmail.com', 'Surabaya', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),
('Indah Permata', '1997-11-05', 'indah@gmail.com', 'Jember', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),
('Dedi Kusnandar', '1990-07-22', 'dedi@gmail.com', 'Malang', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tentor'),

('Budi Santoso', '2008-11-10', 'budi@gmail.com', 'Jember', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Lestari Putri', '2009-05-25', 'lestari@gmail.com', 'Banyuwangi', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Fajri Ramadhan', '2008-01-12', 'fajri@gmail.com', 'Lumajang', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Dewi Sartika', '2009-09-30', 'dewi@gmail.com', 'Jember', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Andi Wijaya', '2008-04-14', 'andi@gmail.com', 'Situbondo', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Siska Amelia', '2009-12-12', 'siska@gmail.com', 'Probolinggo', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Gibran Rakabuming', '2008-10-10', 'gibran@gmail.com', 'Solo', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid'),
('Tiara Andini', '2009-02-02', 'tiara@gmail.com', 'Jember', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'murid');

INSERT INTO tentors (id_user, pendidikan_terakhir, jurusan) VALUES
(1, 'S1', 'Teknologi Informasi'),
(2, 'S2', 'Matematika'),
(3, 'S1', 'Pendidikan Bahasa Inggris'),
(4, 'S1', 'Informatika'),
(5, 'S1', 'Biologi'),
(6, 'S2', 'Fisika');

INSERT INTO murids (id_user, asal_sekolah) VALUES
(7, 'SMAN 1 Jember'),
(8, 'SMAN 1 Banyuwangi'),
(9, 'SMKN 2 Lumajang'),
(10, 'SMA Muhammadiyah Jember'),
(11, 'SMAN 2 Situbondo'),
(12, 'SMAN 1 Probolinggo'),
(13, 'SMA Al-Azhar'),
(14, 'SMAN 3 Jember');

INSERT INTO kelas (id_tentor, nama_kelas, is_aktif) VALUES
(1, 'Web Development Dasar', true),
(2, 'Matematika Kalkulus', true),
(3, 'English Speaking Club', true),
(4, 'Struktur Data & Algoritma', true),
(5, 'Biologi Dasar', true),
(6, 'Fisika Mekanika', false);

INSERT INTO detail_kelas (id_kelas, id_murid) VALUES

(1, 1), (1, 2), (1, 3), (1, 4),

(2, 1), (2, 5), (2, 6),

(3, 3), (3, 4), (3, 7), (3, 8),

(4, 1), (4, 2), (4, 5);