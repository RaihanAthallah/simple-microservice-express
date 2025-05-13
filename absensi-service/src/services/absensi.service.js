const CustomError = require("../utils/error");
const generateImageUrl = require("../utils/image").generateImageUrl;

function AbsensiService(absensiRepository) {
  async function createAbsensi(data) {
    try {
      const existingAbsensi = await absensiRepository.getAbsensiByIDKaryawanToday(data.id_karyawan, data.tanggal_kehadiran);
      if (existingAbsensi) {
        throw new CustomError(400, "Absensi sudah ada untuk tanggal ini");
      }

      console.log("Data yang diterima untuk absensi:", data);
      const absensi = await absensiRepository.createAbsensi(data);
      if (!absensi) {
        throw new CustomError(400, "Gagal membuat absensi");
      }
      return absensi;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function getAllAbsensiByIdKaryawan(id_karyawan) {
    try {
      const absensiList = await absensiRepository.getAllAbsensiByIdKaryawan(id_karyawan);
      return absensiList;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function getAbsensiDetailById(req, id) {
    try {
      const absensi = await absensiRepository.getAbsensiDetailById(id);
      if (!absensi) {
        throw new CustomError(404, "Absensi tidak ditemukan");
      }

      const imageUrl = generateImageUrl(req, absensi.url_foto);
      absensi.url_foto = imageUrl;

      return absensi;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function updateKepulangan(id, data) {
    try {
      const absensi = await absensiRepository.getAbsensiDetailById(id);
      if (!absensi) {
        throw new CustomError(404, "Absensi tidak ditemukan");
      }

      const updatedAbsensi = await absensiRepository.updateKepulangan(id, data);
      if (!updatedAbsensi) {
        throw new CustomError(404, "Absensi tidak ditemukan");
      }
      return updatedAbsensi;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function getAbsensiByIDKaryawanToday(req, id_karyawan, tanggal) {
    try {
      const absensi = await absensiRepository.getAbsensiByIDKaryawanToday(id_karyawan, tanggal);
      if (!absensi) {
        return null; // Absensi tidak ditemukan
      }

      const imageUrl = generateImageUrl(req, absensi.url_foto);
      absensi.url_foto = imageUrl;

      return absensi;
    } catch (error) {
      if (!error.statusCode) {
        console.error("Error pada getAbsensiByIDKaryawanToday:", error);
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  return {
    createAbsensi,
    getAllAbsensiByIdKaryawan,
    getAbsensiDetailById,
    updateKepulangan,
    getAbsensiByIDKaryawanToday,
  };
}

module.exports = AbsensiService;
