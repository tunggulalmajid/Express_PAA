const User = require("../models/UserModel");
const Profil = require("../models/ProfilModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nama, tanggal_lahir, email, alamat, password, role, detail_info } =
      req.body;
    const hash = await bcrypt.hash(password, 10);

    const id_user = await User.create({
      nama,
      tanggal_lahir,
      email,
      alamat,
      password: hash,
      role,
    });

    if (role === "murid") {
      await Profil.createStudent(id_user, detail_info.asal_sekolah);
    } else if (role === "tentor") {
      await Profil.createTutor(
        id_user,
        detail_info.pendidikan_terakhir,
        detail_info.jurusan,
      );
    }

    res.status(201).json({ status: "success", message: "Registrasi Berhasil" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await User.findByEmail(req.body.email);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(401)
        .json({ status: "error", message: "Email atau Password salah" });
    }

    const token = jwt.sign(
      { id_user: user.id_user, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res
      .status(200)
      .json({ status: "success", data: { token, role: user.role } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
