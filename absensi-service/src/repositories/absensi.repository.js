const db = require("../config/db");
const uuid = require("uuid");

function AbsensiRepository(db) {
  async function getAllAbsensiByIdKaryawan(id_karyawan) {
    try {
      const [rows] = await db.query("SELECT id, tanggal_kehadiran, jam_kehadiran, jam_kepulangan FROM data_absensi_karyawan WHERE id_karyawan = ?", [id_karyawan]);
      return rows;
    } catch (error) {
      console.error("Error fetching absensi:", error);
      throw new Error("Database error");
    }
  }

  async function getAbsensiDetailById(id) {
    const [rows] = await db.query("SELECT * FROM data_absensi_karyawan WHERE id = ?", [id]);
    return rows[0];
  }

  async function createAbsensi(data) {
    try {
      const id = uuid.v4();
      console.log("data pada repository:", data);
      // const created_by = data.created_by || "system"; // default to 'system' if not provided
      const [result] = await db.query("INSERT INTO data_absensi_karyawan (id, id_karyawan, tanggal_kehadiran, jam_kehadiran, created_by, url_foto) VALUES (?, ?, ?, ?, ?, ?)", [
        id,
        data.id_karyawan,
        data.tanggal_kehadiran,
        data.jam_kehadiran,
        data.created_by,
        data.url_foto,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Failed to insert data");
      }
      return {
        id,
        id_karyawan: data.id_karyawan,
        tanggal_kehadiran: data.tanggal_kehadiran,
        jam_kehadiran: data.jam_kehadiran,
        created_by: data.created_by,
        url_foto: data.url_foto,
      };
    } catch (error) {
      console.error("Error inserting data:", error);
      throw new Error("Database error");
    }

    // Return the inserted data
  }

  async function updateKepulangan(id, jam_kepulangan) {
    const [result] = await db.query("UPDATE data_absensi_karyawan SET jam_kepulangan = ?, updated_by = ? WHERE id = ?", [jam_kepulangan, "system", id]);
    return result.affectedRows > 0;
  }

  async function getAbsensiByIDKaryawanToday(id_karyawan, tanggal) {
    try {
      const [rows] = await db.query("SELECT * FROM data_absensi_karyawan WHERE id_karyawan = ? AND tanggal_kehadiran = ?", [id_karyawan, tanggal]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching absensi:", error);
      throw new Error("Database error");
    }
  }

  return {
    getAllAbsensiByIdKaryawan,
    getAbsensiDetailById,
    createAbsensi,
    updateKepulangan,
    getAbsensiByIDKaryawanToday,
  };
}

module.exports = AbsensiRepository;
