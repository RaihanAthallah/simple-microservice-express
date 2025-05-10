const { successResponse, errorResponse } = require("../utils/response");
const CustomError = require("../utils/error");
const { loginSchema } = require("../validations/user.validation");

function AuthController(userService) {
  async function login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json(errorResponse(messages));
      }

      const { nomor_induk_karyawan, password } = req.body;

      const { accessToken, refreshToken } = await userService.login(nomor_induk_karyawan, password);
      if (!accessToken || !refreshToken) {
        return res.status(401).json(errorResponse("Username atau password salah"));
      }

      // Mocked token generation for simplicity
      return res.status(200).json(successResponse("Login berhasil", { accessToken, refreshToken }));
    } catch (error) {
      // Error handling untuk CustomError
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }

      // Jika error tidak terduga (500)
      console.error(error); // Log error untuk debugging
      return res.status(500).json(errorResponse("Terjadi kesalahan pada server"));
    }
  }
  return {
    login,
  };
}

module.exports = AuthController;
