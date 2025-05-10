// src/helpers/jwt.js
const jwt = require("jsonwebtoken");

// Secret key untuk signing JWT
const ACCESS_TOKEN_SECRET = "your-access-token-secret";
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret";

// Fungsi untuk generate Access Token
function generateAccessToken(user) {
  // Access Token biasanya memiliki waktu kedaluwarsa yang lebih pendek
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// Fungsi untuk generate Refresh Token
function generateRefreshToken(user) {
  // Refresh Token biasanya memiliki waktu kedaluwarsa yang lebih panjang
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
