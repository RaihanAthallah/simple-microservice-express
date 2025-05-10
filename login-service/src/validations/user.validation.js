const Joi = require("joi");

const loginSchema = Joi.object({
  nomor_induk_karyawan: Joi.string().required().messages({
    "string.empty": "Nomor Induk Karyawan wajib diisi",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Nama Karyawan wajib diisi",
  }),
});

module.exports = {
  loginSchema,
};
