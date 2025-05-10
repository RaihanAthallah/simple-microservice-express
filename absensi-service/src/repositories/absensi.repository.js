const db = require("../config/db");
const uuid = require("uuid");

function AbsensiRepository(db) {
  async function getAbsensiById(id) {
    const [rows] = await db.query("SELECT * FROM data_karyawan WHERE id = ?", [id]);
    return rows[0];
  }

  async function createAbsensi(data) {
    // generate uuid
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

  return {
    getAbsensiById,
    createAbsensi,
  };
}

module.exports = AbsensiRepository;
