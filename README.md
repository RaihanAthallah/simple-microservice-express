# Absensi Karyawan Microservices

Sistem manajemen dan absensi karyawan berbasis microservices yang dibangun menggunakan Node.js, Express, Docker, dan MySQL. Proyek ini menerapkan prinsip **Clean Architecture** dan **Separation of Concerns** dalam tiga layanan microservice yang terpisah.

## Gambaran Arsitektur

Proyek ini menggunakan arsitektur **microservices**, di mana setiap layanan dapat di-deploy secara independen dan menangani domain bisnis tertentu:

1. **Login Service**: Mengelola autentikasi pengguna, penerbitan token JWT, dan kredensial pengguna.
2. **Karyawan Service**: Mengelola data karyawan (CRUD).
3. **Absensi Service**: Mengelola data kehadiran karyawan.

Setiap layanan menerima permintaan langsung dari klien tanpa menggunakan API Gateway dan berkomunikasi antar layanan jika diperlukan.

## Struktur Proyek

```
simple-microservice-express/
├── login-service/
│   ├── docs/             # Dokumentasi API menggunakan Swagger
│   ├── dockerfile        # Konfigurasi Docker untuk layanan ini
│   └── src/
│       ├── config/           # Konfigurasi database dan environment
│       ├── server.js         # Titik masuk aplikasi
│       ├── app.js            # Setup aplikasi Express
│       ├── controllers/  # Penanganan permintaan (request handler)
│       ├── services/     # Logika bisnis
│       ├── repositories/ # Akses data
│       ├── routes/       # Definisi endpoint API
│       └── utils/        # Fungsi pembantu
├── karyawan-service/
│   └── ...               # Struktur serupa dengan login-service
├── absensi-service/
│   ├── uploads/          # Penyimpanan file absensi
│   └── ...               # Struktur serupa
├── migrations            # File migrasi database
├── package.json          # Konfigurasi npm utama
├── docker-compose.yml    # Konfigurasi Docker Compose
└── README.md             # Dokumentasi ini
```

## Clean Architecture

Proyek ini menerapkan prinsip **Clean Architecture**, dengan membagi layanan ke dalam beberapa lapisan yang memiliki tanggung jawab yang jelas:

### Prinsip Inti yang Diterapkan

1. **Independen terhadap Framework**: Logika bisnis terpisah dari framework atau delivery mechanism.
2. **Mudah Diuji**: Aturan bisnis dapat diuji tanpa melibatkan UI atau database.
3. **Independen dari Agen Eksternal**: Logika bisnis tidak bergantung pada interface eksternal.

### Keuntungan

- **Mudah Dirawat**: Perubahan pada satu lapisan tidak memengaruhi yang lain.
- **Skalabilitas Tinggi**: Setiap layanan dapat dikembangkan atau diganti secara independen.
- **Mudah Diuji**: Logika bisnis dapat diuji secara mandiri.

## Pemisahan Tanggung Jawab (Separation of Concerns)

Setiap komponen sistem memiliki satu tanggung jawab spesifik.

### Di Setiap Layanan

1. **Controllers**: Menangani HTTP request dan response, serta validasi input.
2. **Services**: Menampung logika bisnis dan use case.
3. **Repositories**: Mengelola akses dan penyimpanan data.
4. **Routes**: Mendefinisikan endpoint dan menghubungkan ke controller.
5. **Utils**: Fungsi pembantu yang dapat digunakan ulang.

### Antar Layanan

1. **Login Service**: Bertanggung jawab penuh atas autentikasi pengguna.
2. **Karyawan Service**: Hanya menangani data karyawan.
3. **Absensi Service**: Khusus menangani pencatatan kehadiran.

Keuntungan:

- Setiap komponen hanya berubah untuk satu alasan
- Perubahan tidak berdampak ke bagian tak terkait
- Dapat dikembangkan dan diuji secara independen
- Tim dapat bekerja paralel dengan konflik minimal

## Teknologi yang Digunakan

- **Backend**: Node.js, Express
- **Autentikasi**: JWT (JSON Web Token)
- **Kontainerisasi**: Docker, Docker Compose
- **Database**: MySql

## Prasyarat

- Docker & Docker Compose
- Node.js versi 14 ke atas
- npm atau yarn
- (Instalasi database sesuai kebutuhan)

## Instalasi dan Menjalankan

### Menggunakan Docker

Cara paling direkomendasikan untuk menjalankan aplikasi.

1. **Clone repositori**:

   ```bash
   git clone https://github.com/RaihanAthallah/simple-microservice-express.git
   cd simple-microservice-express
   ```

2. **Siapkan file environment**:
   Buat file `.env` di setiap direktori layanan sesuai contoh `.env.example`.

3. **Build dan jalankan semua layanan**:

   ```bash
   docker-compose up --build
   ```

4. **Akses layanan**:

   - Login Service: [http://localhost:3002](http://localhost:3002/docs)
   - Karyawan Service: [http://localhost:3001](http://localhost:3001/docs)
   - Absensi Service: [http://localhost:3003](http://localhost:3003/docs)

5. **Hentikan layanan**:

   ```bash
   docker-compose down
   ```

### Menjalankan Layanan Individu:

```bash
docker-compose up login-service
docker-compose up karyawan-service
docker-compose up absensi-service
```

### Melihat Log Layanan:

```bash
docker-compose logs -f login-service
```

### Menjalankan Tanpa Docker

Untuk keperluan pengembangan lokal:

1. **Install dependencies setiap layanan**:

   ```bash
   cd login-service && npm install
   cd ../karyawan-service && npm install
   cd ../absensi-service && npm install
   ```

2. **Jalankan setiap layanan**:

   ```bash
   cd login-service && npm start
   cd ../karyawan-service && npm start
   cd ../absensi-service && npm start
   ```

## Alur Autentikasi

Karena tidak menggunakan API Gateway, maka alur autentikasi adalah sebagai berikut:

1. **Autentikasi**:

   - Pengguna login melalui Login Service
   - Token JWT diberikan berisi data pengguna (id, nama, role)

2. **Autentikasi antar layanan**:

   - Layanan akan memverifikasi token JWT pada setiap request
   - Data pengguna diambil dari token dan digunakan untuk otorisasi

3. **Validasi Token**:

   - Semua layanan menggunakan **secret key** yang sama
   - Token JWT digunakan untuk mengakses endpoint yang dilindungi

---

Dikembangkan dengan ❤️ oleh Raihan Athallah

---

Jika Anda ingin, saya juga bisa bantu menambahkan versi Bahasa Indonesia dan Inggris secara berdampingan di README-nya.
