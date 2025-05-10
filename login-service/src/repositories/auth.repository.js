function authRepository(db) {
  async function getUserByNomorIndukKaryawan(nomor_induk_karyawan) {
    const [rows] = await db.query("SELECT * FROM users WHERE nomor_induk_karyawan = ?", [nomor_induk_karyawan]);
    return rows[0];
  }

  async function createUser(nomor_induk_karyawan, password, role) {
    const [result] = await db.query("INSERT INTO users (nomor_induk_karyawan, password, role) VALUES (?, ?)", [nomor_induk_karyawan, password, role]);
    return result.insertId;
  }

  async function updateUserPassword(nomor_induk_karyawan, newPassword) {
    const [result] = await db.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, nomor_induk_karyawan]);
    return result.affectedRows > 0;
  }

  async function deleteUser(nomor_induk_karyawan) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [nomor_induk_karyawan]);
    return result.affectedRows > 0;
  }

  return {
    getUserByNomorIndukKaryawan,
    createUser,
    updateUserPassword,
    deleteUser,
  };
}

module.exports = authRepository;
