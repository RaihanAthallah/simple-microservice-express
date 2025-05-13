const jwt = require("jsonwebtoken");

const SECRET_KEY = "your-access-token-secret"; // Ganti dengan secret key kamu

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan atau format salah" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = {
      id: decoded.id,
      nomorInduk: decoded.nomor_induk_karyawan,
      nama: decoded.nama_karyawan,
      role: decoded.role,
    };

    console.log("user", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
  }
};

module.exports = authMiddleware;
