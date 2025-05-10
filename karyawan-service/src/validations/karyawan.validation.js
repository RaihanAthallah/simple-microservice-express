const Joi = require("joi");

const createKaryawanSchema = Joi.object({
  nomor_induk_karyawan: Joi.string().required().messages({
    "string.empty": "Nomor Induk Karyawan wajib diisi",
  }),
  nama_karyawan: Joi.string().required().messages({
    "string.empty": "Nama Karyawan wajib diisi",
  }),
  jabatan: Joi.string().required().messages({
    "string.empty": "Jabatan wajib diisi",
  }),
  direktorat: Joi.string().allow(null, "").optional(), // direktorat opsional
});

module.exports = {
  createKaryawanSchema,
};
