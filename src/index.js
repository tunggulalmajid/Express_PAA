const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const logRequest = require("./middleware/log");
require("dotenv").config();

const app = express();

const swaggerDocument = require(path.join(__dirname, "../swaggerConfig.json"));

app.use(express.json());
app.use(logRequest);

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js";
const PRESET_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js";

app.use("/api-docs", (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  );
  next();
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: CSS_URL,
    customJs: [JS_URL, PRESET_URL],
    customSiteTitle: "API Sistem Bimbel PAA - Documentation",
  }),
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Bimbel API is Running",
    documentation: "https://express-paa-84nz.vercel.app/api-docs/",
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`Server jalan di http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs/`);
    console.log(`================================================`);
  });
}

module.exports = app;
