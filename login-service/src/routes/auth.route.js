const express = require("express");

function AuthRoute(authController) {
  const router = express.Router();

  router.post("/login", authController.login);

  return router;
}

module.exports = AuthRoute;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomor_induk_karyawan
 *               - password
 *             properties:
 *               nomor_induk_karyawan:
 *                 type: string
 *                 description: Nomor Induk Karyawan (Employee ID)
 *               password:
 *                 type: string
 *                 description: Password for the employee
 *     responses:
 *       200:
 *         description: Login berhasil (Login successful)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "dGhpcyBpcyBhIHJlZnJlc2h0IHRva2Vu..."
 *       400:
 *         description: Invalid request body or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ["Nomor Induk Karyawan wajib diisi", "Password wajib diisi"]
 *       401:
 *         description: Invalid credentials (username or password incorrect)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Username atau password salah
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan pada server
 */
