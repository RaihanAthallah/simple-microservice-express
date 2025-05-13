class AbsensiDetail {
  constructor({ id_karyawan, tanggal_kehadiran, jam_kehadiran, jam_kepulangan, created_by, url_foto }) {
    this.id_karyawan = id_karyawan;
    this.tanggal_kehadiran = tanggal_kehadiran;
    this.jam_kehadiran = jam_kehadiran;
    this.jam_kepulangan = jam_kepulangan;
    this.created_by = created_by;
    this.url_foto = url_foto;
  }
}

module.exports = AbsensiDetail;
