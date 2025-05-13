const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

function KaryawanRoute(karyawanController) {
  const router = express.Router();

  router.get("/", authMiddleware, karyawanController.getAllKaryawan);
  router.get("/:id", authMiddleware, karyawanController.getKaryawanById);
  router.post("/", authMiddleware, karyawanController.createKaryawan);
  router.put("/:id", authMiddleware, karyawanController.updateKaryawan);
  router.delete("/:id", authMiddleware, karyawanController.deleteKaryawan);

  return router;
}

module.exports = KaryawanRoute;

/**
 * @swagger
 * tags:
 *   name: Karyawan
 *   description: API untuk manajemen data karyawan
 */

/**
 * @swagger
 * /karyawan:
 *   get:
 *     summary: Mendapatkan daftar semua karyawan
 *     tags: [Karyawan]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar karyawan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseKaryawanList'
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /karyawan/{id}:
 *   get:
 *     summary: Mendapatkan data karyawan berdasarkan ID
 *     tags: [Karyawan]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID karyawan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Karyawan ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseKaryawan'
 *       400:
 *         description: ID karyawan tidak valid
 *       404:
 *         description: Karyawan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /karyawan:
 *   post:
 *     summary: Menambahkan data karyawan baru
 *     tags: [Karyawan]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KaryawanRequest'
 *     responses:
 *       201:
 *         description: Karyawan berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseKaryawan'
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
 * /karyawan/{id}:
 *   put:
 *     summary: Memperbarui data karyawan berdasarkan ID
 *     tags: [Karyawan]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID karyawan
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KaryawanRequest'
 *     responses:
 *       200:
 *         description: Karyawan berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseKaryawan'
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Karyawan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /karyawan/{id}:
 *   delete:
 *     summary: Menghapus data karyawan berdasarkan ID
 *     tags: [Karyawan]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID karyawan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Karyawan berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseMessage'
 *       404:
 *         description: Karyawan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
