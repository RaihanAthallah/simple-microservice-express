-- `simple-microservice`.users definition

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_induk_karyawan` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','karyawan') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomor_induk_karyawan` (`nomor_induk_karyawan`),
  CONSTRAINT `fk_users_karyawan` FOREIGN KEY (`nomor_induk_karyawan`) REFERENCES `data_karyawan` (`nomor_induk_karyawan`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`nomor_induk_karyawan`) REFERENCES `data_karyawan` (`nomor_induk_karyawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




INSERT INTO `microservices`.users (id,nomor_induk_karyawan,password,`role`,created_at,updated_at) VALUES
	 ('a1b2c3d4-e5f6-7890-abcd-1234567890ab','1234567890','hashed_password_rai','admin','2025-05-09 11:24:57','2025-05-09 11:24:57'),
	 ('c3d4e5f6-g7h8-9012-abcdef-345678901a','3456789012','hashed_password_andi','karyawan','2025-05-09 11:24:57','2025-05-09 11:24:57');
