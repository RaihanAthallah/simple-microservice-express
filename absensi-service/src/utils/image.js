// src/utils/image.js

const generateImageUrl = (req, imagePath) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const relativePath = imagePath.replace(/\\/g, "/").split("uploads/absensi/")[1];
  return `${baseUrl}/absensi-service/${relativePath}`;
};

module.exports = {
  generateImageUrl,
};
