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

  findStudentById: (id) => {
    return db.query(
      "SELECT m.*, u.nama, u.email FROM murids m JOIN users u ON m.id_user = u.id_user WHERE m.id_murid = $1",
      [id],
    );
  },

  findTutorById: (id) =>
    db.query(
      "SELECT t.*, u.nama FROM tentors t JOIN users u ON t.id_user = u.id_user WHERE t.deleted_at IS NULL AND t.id_tentor = $1 ",
      [id],
    ),

  updateStudent: (id, sekolah) =>
    db.query(
      "UPDATE murids SET asal_sekolah=$1, updated_at=NOW() WHERE id_murid=$2 RETURNING *",
      [sekolah, id],
    ),

  updateTentor: (id, pendidikan_terakhir, jurusan) =>
    db.query(
      "UPDATE Tentors SET pendidikan_terakhir=$1, jurusan=$2, updated_at=NOW() WHERE id_tentor=$3 RETURNING *",
      [pendidikan_terakhir, jurusan, id],
    ),

  softDeleteTutor: (id) =>
    db.query(
      "UPDATE tentors SET deleted_at = NOW() WHERE id_tentor = $1 RETURNING *",
      [id],
    ),

  deleteStudent: (id) =>
    db.query("DELETE FROM murids where id_murid = $1 RETURNING *", [id]),
};
module.exports = Profil;
