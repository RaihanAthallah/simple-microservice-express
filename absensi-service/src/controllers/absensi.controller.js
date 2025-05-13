const { successResponse, errorResponse } = require("../utils/response");
const CustomError = require("../utils/error");
const AbsensiDetail = require("../models/absensi.model");

function AbsensiController(absensiService) {
  async function getAllAbsensi(req, res) {
    try {
      const { id_karyawan } = req.params;
      const absensiList = await absensiService.getAllAbsensiByIdKaryawan(id_karyawan);
      return res.status(200).json(successResponse("Daftar absensi", absensiList));
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

  async function getAbsensiDetailById(req, res) {
    try {
      const { id } = req.params;
      const absensiDetail = await absensiService.getAbsensiDetailById(req, id);
      if (!absensiDetail) {
        return res.status(200).json(errorResponse("Absensi tidak ditemukan"));
      }
      return res.status(200).json(successResponse("Detail absensi ditemukan", absensiDetail));
    } catch (error) {
      // Error handling untuk CustomError
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error); // Log error untuk debugging
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function createAbsensi(req, res) {
    try {
      const { tanggal_kehadiran, jam_kehadiran } = req.body;
      // Validasi sederhana
      if (!tanggal_kehadiran || !jam_kehadiran) {
        return res.status(400).json(errorResponse("Tanggal dan waktu wajib diisi"));
      }

      // Pastikan ada file
      if (!req.file) {
        return res.status(400).json(errorResponse("Photo absensi wajib diupload"));
      }

      // Ambil info user dari token
      const created_by = req.user.nama;
      const id_karyawan = req.user.id;

      const absensiDetail = new AbsensiDetail({
        id_karyawan,
        tanggal_kehadiran,
        jam_kehadiran,
        created_by,
        url_foto: req.file.path,
      });

      // Simpan data absensi (termasuk path foto)
      const newAbsensi = await absensiService.createAbsensi(absensiDetail);

      return res.status(200).json(successResponse("Absensi berhasil ditambahkan", newAbsensi));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function updateKepulangan(req, res) {
    try {
      const { id } = req.params;
      const { jam_kepulangan } = req.body;

      if (!jam_kepulangan) {
        return res.status(400).json(errorResponse("Jam kepulangan wajib diisi"));
      }

      const updatedAbsensi = await absensiService.updateKepulangan(id, jam_kepulangan);
      if (!updatedAbsensi) {
        return res.status(404).json(errorResponse("Absensi tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Jam kepulangan berhasil diperbarui", updatedAbsensi));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  async function getAbsensiByIDKaryawanToday(req, res) {
    try {
      const { tanggal } = req.query;
      // console.log("Tanggal:", tanggal);
      const id_karyawan = req.user.id;
      // console.log("ID Karyawan:", id_karyawan);

      if (!tanggal) {
        return res.status(400).json(errorResponse("tanggal wajib diisi"));
      }

      const absensi = await absensiService.getAbsensiByIDKaryawanToday(req, id_karyawan, tanggal);

      if (!absensi) {
        return res.status(200).json(errorResponse("Absensi tidak ditemukan"));
      }

      return res.status(200).json(successResponse("Absensi ditemukan", absensi));
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error(error);
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }

  return {
    getAllAbsensi,
    getAbsensiDetailById,
    createAbsensi,
    updateKepulangan,
    getAbsensiByIDKaryawanToday,
  };
}

module.exports = AbsensiController;
