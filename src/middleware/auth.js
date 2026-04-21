const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Akses ditolak, silakan login terlebih dahulu",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Token tidak valid atau sudah kadaluwarsa",
      });
    }

    req.user = decoded;
    next();
  });
};
