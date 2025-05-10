const { successResponse, errorResponse } = require("../utils/response");
const CustomError = require("../utils/error");
const KaryawanDetail = require("../models/karyawan.model");
const { createKaryawanSchema } = require("../validations/karyawan.validation");

function KaryawanController(karyawanService) {
  async function getKaryawanById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json(errorResponse("ID karyawan wajib diisi"));
      }

      const karyawan = await karyawanService.getKaryawanById(id);
      if (!karyawan) {
        return res.status(404).json(errorResponse("Karyawan tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Karyawan ditemukan", karyawan));
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

  async function getAllKaryawan(req, res) {
    try {
      console.log("Fetching all karyawan");
      const karyawanList = await karyawanService.getAllKaryawan();
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

  async function createKaryawan(req, res) {
    try {
      const { error } = createKaryawanSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json(errorResponse(messages));
      }

      const { nomor_induk_karyawan, nama_karyawan, jabatan, direktorat } = req.body;

      const karyawanDetail = new KaryawanDetail({
        nomor_induk_karyawan,
        nama_karyawan,
        jabatan,
        direktorat,
      });

      const newKaryawan = await karyawanService.createKaryawan(karyawanDetail);
      return res.status(201).json(successResponse("Karyawan berhasil ditambahkan", newKaryawan));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function updateKaryawan(req, res) {
    try {
      const { id } = req.params;

      const { error } = createKaryawanSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json(errorResponse(messages));
      }

      const { nomor_induk_karyawan, nama_karyawan, jabatan, direktorat } = req.body;

      const karyawanDetail = new KaryawanDetail({
        nomor_induk_karyawan,
        nama_karyawan,
        jabatan,
        direktorat,
      });

      const updatedKaryawan = await karyawanService.updateKaryawan(id, karyawanDetail);
      if (!updatedKaryawan) {
        return res.status(404).json(errorResponse("Karyawan tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Karyawan berhasil diperbarui", updatedKaryawan));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function deleteKaryawan(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json(errorResponse("ID karyawan wajib diisi"));
      }

      const deletedKaryawan = await karyawanService.deleteKaryawan(id);
      if (!deletedKaryawan) {
        return res.status(404).json(errorResponse("Karyawan tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Karyawan berhasil dihapus"));
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

  return {
    getKaryawanById,
    getAllKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan,
  };
}

module.exports = KaryawanController;
