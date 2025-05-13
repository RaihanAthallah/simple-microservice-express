const Joi = require("joi");

const createAbsensiSchema = Joi.object({
  id_karyawan: Joi.string().required().messages({
    "string.empty": "ID Karyawan wajib diisi",
  }),
  tanggal_absen: Joi.string().required().messages({
    "string.empty": "Tanggal Absen wajib diisi",
  }),
  jam_absen: Joi.string().required().messages({
    "string.empty": "Jam Absen wajib diisi",
  }),
  url_foto: Joi.string().required().messages({
    "string.empty": "URL Foto wajib diisi",
  }),
});

module.exports = {
  createAbsensiSchema,
};
