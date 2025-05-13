const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

function AbsensiRoute(absensiController) {
  const router = express.Router();

  router.post("/", authMiddleware, upload.single("photo"), absensiController.createAbsensi);
  router.get("/detail/:id", authMiddleware, absensiController.getAbsensiDetailById);
  router.get("/absensi-hari-ini", authMiddleware, absensiController.getAbsensiByIDKaryawanToday);
  router.get("/list/:id_karyawan", authMiddleware, absensiController.getAllAbsensi);
  router.put("/update-kepulangan/:id", authMiddleware, absensiController.updateKepulangan);

  return router;
}

module.exports = AbsensiRoute;

/**
 * @swagger
 * tags:
 *   name: Absensi
 *   description: API untuk manajemen data absensi
 */

/**
 * @swagger
 * /absensi/absensi-hari-ini:
 *   get:
 *     summary: Mendapatkan data absensi karyawan berdasarkan tanggal
 *     tags: [Absensi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tanggal
 *         required: true
 *         description: Tanggal absensi dalam format YYYY-MM-DD
 *         schema:
 *           type: string
 *           example: 2025-05-13
 *     responses:
 *       200:
 *         description: Absensi ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAbsensi'
 *       400:
 *         description: Tanggal wajib diisi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Absensi tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /absensi/{id}:
 *   get:
 *     summary: Mendapatkan data absensi berdasarkan ID
 *     tags: [Absensi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID absensi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Absensi ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAbsensi'
 *       400:
 *         description: ID absensi tidak valid
 *       404:
 *         description: Absensi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /absensi:
 *   post:
 *     summary: Menambahkan data absensi baru dengan foto
 *     tags: [Absensi]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tanggal_kehadiran:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-12"
 *               jam_kehadiran:
 *                 type: string
 *                 example: "08:00"
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - tanggal_kehadiran
 *               - jam_kehadiran
 *               - photo
 *     responses:
 *       201:
 *         description: Absensi berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAbsensi'
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /absensi/{id}:
 *   put:
 *     summary: Memperbarui data absensi berdasarkan ID
 *     tags: [Absensi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID absensi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AbsensiRequest'
 *     responses:
 *       200:
 *         description: Absensi berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAbsensi'
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Absensi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /absensi/{id}:
 *   delete:
 *     summary: Menghapus data absensi berdasarkan ID
 *     tags: [Absensi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID absensi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Absensi berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseMessage'
 *       404:
 *         description: Absensi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
