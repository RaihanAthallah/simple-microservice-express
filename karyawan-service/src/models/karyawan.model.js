class KaryawanDetail {
  constructor({ id = null, nomor_induk_karyawan = "", nama_karyawan = "", direktorat = "", jabatan = "", created_by = "", updated_by = "" }) {
    this.id = id;
    this.nomor_induk_karyawan = nomor_induk_karyawan;
    this.nama_karyawan = nama_karyawan;
    this.direktorat = direktorat;
    this.jabatan = jabatan;
    this.created_by = created_by;
    this.updated_by = updated_by;
  }
}

module.exports = KaryawanDetail;
