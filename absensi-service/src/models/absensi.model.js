class KaryawanDetail {
  constructor({ id = null, nomor_induk_karyawan = "", nama_karyawan = "", direktorat = "", jabatan = "", role = "" }) {
    this.id = id;
    this.nomor_induk_karyawan = nomor_induk_karyawan;
    this.nama_karyawan = nama_karyawan;
    this.direktorat = direktorat;
    this.jabatan = jabatan;
    this.role = role;
  }
}

module.exports = KaryawanDetail;
