const express = require("express");
require("dotenv").config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const logRequest = require("./middleware/log");

const app = express();

const swaggerCssPath = path.join(
  __dirname,
  "../node_modules/swagger-ui-dist/swagger-ui.css",
);
let swaggerCss = "";

try {
  swaggerCss = fs.readFileSync(swaggerCssPath, "utf8");
} catch (error) {
  console.log("Gagal memuat CSS lokal, Swagger mungkin tanpa styling");
}

const swaggerDocument = require(path.join(__dirname, "../swaggerConfig.json"));

app.use(express.json());
app.use(logRequest);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: swaggerCss,
    customSiteTitle: "API Sistem Bimbel PAA",
  }),
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
