const { Pool } = require("pg");
require("dotenv").config();

const dbPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

//
dbPool.on("connect", () => {
  console.log("Berhasil terhubung ke database PostgreSQL");
});

module.exports = {
  query: (text, params) => dbPool.query(text, params),
};
