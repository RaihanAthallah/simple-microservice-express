const CustomError = require("../utils/error");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

function UserService(userRepository) {
  async function login(nomor_induk_karyawan, password) {
    try {
      const user = await userRepository.getUserByNomorIndukKaryawan(nomor_induk_karyawan);
      if (!user) {
        throw new CustomError(404, "User tidak ditemukan");
      }

      console.log("User found:", user);

      if (user.password !== password) {
        throw new CustomError(401, "Username atau password salah");
      }

      tokenCredentials = {
        id: user.id,
        nomor_induk_karyawan: user.nomor_induk_karyawan,
        nama_karyawan: user.nama_karyawan,
        role: user.role,
      };

      const accessToken = generateAccessToken(tokenCredentials);
      const refreshToken = generateRefreshToken(tokenCredentials);

      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
      // Error lainnya (misalnya database error) bisa melemparkan 500
      if (!error.statusCode) {
        throw new CustomError(500, "Terjadi kesalahan pada server");
      }
      throw error; // Melempar error yang sudah ada
    }
  }

  return {
    login,
  };
}

module.exports = UserService;
