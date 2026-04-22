const db = require("../config/dbconf");

const DetailKelas = {
  enroll: (id_k, id_m) =>
    db.query("INSERT INTO detail_kelas (id_kelas, id_murid) VALUES ($1, $2)", [
      id_k,
      id_m,
    ]),

  getMembers: (id_k) =>
    db.query(
      `
        SELECT u.nama, m.asal_sekolah FROM detail_kelas dk
        JOIN murids m ON dk.id_murid = m.id_murid
        JOIN users u ON m.id_user = u.id_user WHERE dk.id_kelas = $1`,
      [id_k],
    ),

  unenroll: (id_k, id_m) =>
    db.query(
      "DELETE FROM detail_kelas WHERE id_kelas = $1 AND id_murid = $2 RETURNING *",
      [id_k, id_m],
    ),
};

module.exports = DetailKelas;
