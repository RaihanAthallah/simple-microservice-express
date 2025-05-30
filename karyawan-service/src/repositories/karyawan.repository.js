const uuid = require("uuid");
const CustomError = require("../utils/error");

function KaryawanRepository(db) {
  async function getKaryawanById(id) {
    const [rows] = await db.query("SELECT * FROM data_karyawan WHERE id = ?", [id]);
    return rows[0];
  }

  async function createKaryawan(data) {
    const id = uuid.v4();
    const created_by = data.created_by || "system"; // default to 'system' if not provided
    const [result] = await db.query("INSERT INTO data_karyawan (id, nomor_induk_karyawan, nama_karyawan, direktorat, jabatan, created_by) VALUES (?, ?, ?, ?, ?, ?)", [
      id,
      data.nomor_induk_karyawan,
      data.nama_karyawan,
      data.direktorat,
      data.jabatan,
      created_by,
    ]);

    // Return the inserted data
    return {
      id,
      nomor_induk_karyawan: data.nomor_induk_karyawan,
      nama_karyawan: data.nama_karyawan,
      direktorat: data.direktorat,
      jabatan: data.jabatan,
      created_by,
    };
  }

  async function deleteKaryawan(id) {
    const [result] = await db.query("DELETE FROM data_karyawan WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Karyawan tidak ditemukan");
    }
    return result.affectedRows > 0;
  }

  async function getAllKaryawan() {
    const [rows] = await db.query("SELECT * FROM data_karyawan");
    return rows;
  }

  async function updateDataKaryawan(id, data) {
    const [result] = await db.query("UPDATE data_karyawan SET nomor_induk_karyawan = ?, nama_karyawan = ?, direktorat = ?, jabatan = ?, updated_by = ? WHERE id = ?", [
      data.nomor_induk_karyawan,
      data.nama_karyawan,
      data.direktorat,
      data.jabatan,
      data.updated_by,
      id,
    ]);
    return result.affectedRows > 0;
  }

  return {
    getKaryawanById,
    createKaryawan,
    deleteKaryawan,
    getAllKaryawan,
    updateDataKaryawan,
  };
}

module.exports = KaryawanRepository;
