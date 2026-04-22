const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const logRequest = require("./middleware/log");
require("dotenv").config();

const app = express();

// 1. Load Swagger Config
const swaggerDocument = require(path.join(__dirname, "../swaggerConfig.json"));

// 2. Middleware Dasar
app.use(express.json());
app.use(logRequest);

// 3. Link CDN Stabil (Swagger UI 4.15.5)
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js";
const PRESET_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js";

// 4. Fix Content Security Policy (Agar Browser tidak memblokir CDN)
app.use("/api-docs", (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  );
  next();
});

// 5. Setup Swagger UI dengan Aset Eksternal
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: CSS_URL,
    customJs: [JS_URL, PRESET_URL],
    customSiteTitle: "API Sistem Bimbel PAA - Documentation",
  }),
);

// 6. Routing API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

// 7. Landing Page Sederhana
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Bimbel API is Running",
    documentation: "https://express-paa-84nz.vercel.app/api-docs/",
  });
});

const PORT = process.env.PORT || 3000;

// 8. Listen (Hanya di Lokal)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`Server jalan di http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs/`);
    console.log(`================================================`);
  });
}

// 9. Export untuk Vercel
module.exports = app;
