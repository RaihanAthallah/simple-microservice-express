
-- `simple-microservice`.data_absensi_karyawan definition

CREATE TABLE `data_absensi_karyawan` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_karyawan` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_kehadiran` date NOT NULL,
  `jam_kehadiran` time NOT NULL,
  `url_foto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `jam_kepulangan` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_karyawan` (`id_karyawan`),
  CONSTRAINT `data_absensi_karyawan_ibfk_1` FOREIGN KEY (`id_karyawan`) REFERENCES `data_karyawan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


