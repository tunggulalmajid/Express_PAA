const express = require("express");
require("dotenv").config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const logRequest = require("./middleware/log");

const swaggerDocument = require(path.join(__dirname, "../swaggerConfig.json"));

const app = express();

app.use(express.json());
app.use(logRequest);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/kelas", require("./routes/kelas"));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`Server jalan di http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`================================================`);
  });
}

module.exports = app;
