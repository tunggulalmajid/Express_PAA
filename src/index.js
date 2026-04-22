const express = require("express");
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const logRequest = require("./middleware/log");
require("dotenv").config();

// 1. Inisialisasi Express
const app = express();

// 2. Load Swagger Config (Path Absolut)
const swaggerDocument = require(path.join(__dirname, "../swaggerConfig.json"));

// 3. Ambil CSS Swagger secara Lokal (Untuk Fix Tampilan Putih di Vercel)
let swaggerCss = "";
try {
  const swaggerCssPath = path.join(
    __dirname,
    "../node_modules/swagger-ui-dist/swagger-ui.css",
  );
  swaggerCss = fs.readFileSync(swaggerCssPath, "utf8");
} catch (error) {
  console.log("INFO: Menggunakan CSS default (Lokal CSS tidak terbaca)");
}

// 4. Middleware Dasar
app.use(express.json());
app.use(logRequest);

// 5. Setup Dokumentasi Swagger (Fix Vercel Version)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: swaggerCss, // Menyuntikkan CSS langsung ke HTML
    customSiteTitle: "API Sistem Bimbel PAA - Documentation",
  }),
);

// 6. Routing API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

// 7. Route Default (Opsional - Biar Landing Page tidak 404)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bimbel API",
    documentation: "/api-docs",
  });
});

// 8. Konfigurasi Port & Listen
const PORT = process.env.PORT || 3000;

// Listen hanya dijalankan di Lokal, di Vercel otomatis ditangani
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`Server jalan di http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`================================================`);
  });
}

// 9. Export App (Wajib untuk Vercel)
module.exports = app;
