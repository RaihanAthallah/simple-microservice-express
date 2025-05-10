const CustomError = require("../utils/error");

function KaryawanService(karyawanRepository) {
  async function getKaryawanById(id) {
    try {
      const karyawan = await karyawanRepository.getKaryawanById(id);
      if (!karyawan) {
        throw new CustomError(404, "Karyawan tidak ditemukan");
      }
      return karyawan;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function getAllKaryawan() {
    try {
      const karyawanList = await karyawanRepository.getAllKaryawan();
      if (!karyawanList || karyawanList.length === 0) {
        throw new CustomError(404, "Tidak ada karyawan ditemukan");
      }
      return karyawanList;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function createKaryawan(data) {
    try {
      const karyawan = await karyawanRepository.createKaryawan(data);
      if (!karyawan) {
        throw new CustomError(400, "Gagal membuat karyawan");
      }
      return karyawan;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function updateKaryawan(id, data) {
    try {
      const dataKaryawan = await karyawanRepository.getKaryawanById(id);
      if (!dataKaryawan) {
        throw new CustomError(404, "Karyawan tidak ditemukan");
      }

      const karyawan = await karyawanRepository.updateDataKaryawan(id, data);
      if (!karyawan) {
        throw new CustomError(404, "Karyawan tidak ditemukan");
      }
      return karyawan;
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
    }
  }

  async function deleteKaryawan(id) {
    try {
      const result = await karyawanRepository.deleteKaryawan(id);
      if (!result) {
        throw new CustomError(404, "Karyawan tidak ditemukan");
      }
      return { message: "Karyawan berhasil dihapus" };
    } catch (error) {
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error;
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

module.exports = KaryawanService;
