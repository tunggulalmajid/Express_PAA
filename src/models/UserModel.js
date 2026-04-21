const db = require("../config/dbconf");

const User = {
  findByEmail: (email) =>
    db.query("SELECT * FROM users WHERE email = $1", [email]),
  create: async (u) => {
    const res = await db.query(
      `INSERT INTO users (nama, tanggal_lahir, email, alamat, password, role) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_user`,
      [u.nama, u.tanggal_lahir, u.email, u.alamat, u.password, u.role],
    );
    return res.rows[0].id_user;
  },
};
module.exports = User;
