const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swaggerConfig.json"); // Mengambil dari file JSON
const logRequest = require("./middleware/log");

const app = express();

// Middleware
app.use(express.json());
app.use(logRequest); // Global logging (hanya muncul 1x)

// Dokumentasi Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routing
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`Server jalan di http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`================================================`);
});
