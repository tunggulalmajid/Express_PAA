const db = require("../config/dbconf");

const Profil = {
  createStudent: (id, sekolah) =>
    db.query("INSERT INTO murids (id_user, asal_sekolah) VALUES ($1, $2)", [
      id,
      sekolah,
    ]),
  createTutor: (id, p, j) =>
    db.query(
      "INSERT INTO tentors (id_user, pendidikan_terakhir, jurusan) VALUES ($1, $2, $3)",
      [id, p, j],
    ),
  findAllStudents: () =>
    db.query(
      "SELECT m.*, u.nama, u.email FROM murids m JOIN users u ON m.id_user = u.id_user",
    ),
  findAllTutors: () =>
    db.query(
      "SELECT t.*, u.nama FROM tentors t JOIN users u ON t.id_user = u.id_user WHERE t.deleted_at IS NULL",
    ),
  updateStudent: (id, sekolah) =>
    db.query(
      "UPDATE murids SET asal_sekolah=$1, updated_at=NOW() WHERE id_murid=$2 RETURNING *",
      [sekolah, id],
    ),
  softDeleteTutor: (id) =>
    db.query("UPDATE tentors SET deleted_at = NOW() WHERE id_tentor = $1"),
};
module.exports = Profil;
