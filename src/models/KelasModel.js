const db = require("../config/dbconf");

const Kelas = {
  findAll: () =>
    db.query(
      "SELECT k.*, u.nama as nama_tentor FROM kelas k JOIN tentors t ON k.id_tentor = t.id_tentor JOIN users u ON t.id_user = u.id_user",
    ),

  findById: (id) =>
    db.query(
      "SELECT k.*, u.nama as nama_tentor FROM kelas k JOIN tentors t ON k.id_tentor = t.id_tentor JOIN users u ON t.id_user = u.id_user WHERE k.id_kelas = $1 ",
      [id],
    ),

  create: (id_t, nama) =>
    db.query(
      "INSERT INTO kelas (id_tentor, nama_kelas) VALUES ($1, $2) RETURNING *",
      [id_t, nama],
    ),
  update: (id, nama, aktif) =>
    db.query(
      "UPDATE kelas SET nama_kelas=$1, is_aktif=$2, updated_at=NOW() WHERE id_kelas=$3 RETURNING *",
      [nama, aktif, id],
    ),
  delete: (id) =>
    db.query("DELETE FROM kelas WHERE id_kelas = $1 RETURNING *", [id]),
};
module.exports = Kelas;
