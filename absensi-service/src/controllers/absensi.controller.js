const { successResponse, errorResponse } = require("../utils/response");
const CustomError = require("../utils/error");
const AbsensiDetail = require("../models/karyawan.model");
const { createAbsensiSchema } = require("../validations/karyawan.validation");

function AbsensiController(karyawanService) {
  async function getAbsensiById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json(errorResponse("ID karyawan wajib diisi"));
      }

      const karyawan = await karyawanService.getAbsensiById(id);
      if (!karyawan) {
        return res.status(404).json(errorResponse("Absensi tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Absensi ditemukan", karyawan));
    } catch (error) {
      // Error handling untuk CustomError
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }

      // Jika error tidak terduga (500)
      console.error(error); // Log error untuk debugging
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function getAllAbsensi(req, res) {
    try {
      console.log("Fetching all karyawan");
      const karyawanList = await karyawanService.getAllAbsensi();
      return res.status(200).json(successResponse("Daftar karyawan", karyawanList));
    } catch (error) {
      // Error handling untuk CustomError
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }

      // Jika error tidak terduga (500)
      console.error(error); // Log error untuk debugging
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function createAbsensi(req, res) {
    try {
      const { error } = createAbsensiSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json(errorResponse(messages));
      }

      const { nomor_induk_karyawan, nama_karyawan, jabatan, direktorat } = req.body;

      const karyawanDetail = new AbsensiDetail({
        nomor_induk_karyawan,
        nama_karyawan,
        jabatan,
        direktorat,
      });

      const newAbsensi = await karyawanService.createAbsensi(karyawanDetail);
      return res.status(201).json(successResponse("Absensi berhasil ditambahkan", newAbsensi));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  return {
    getAbsensiById,
    getAllAbsensi,
    createAbsensi,
  };
}

module.exports = AbsensiController;
