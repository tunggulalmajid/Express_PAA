const Profil = require("../models/ProfilModel");

// --- MANAJEMEN MURID ---
exports.getMurids = async (req, res) => {
  const result = await Profil.findAllStudents();
  res.json({ status: "success", data: result.rows });
};

exports.updateMurid = async (req, res) => {
  try {
    const result = await Profil.updateStudent(
      req.params.id,
      req.body.asal_sekolah,
    );
    res.json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.deleteMurid = async (req, res) => {
  await Profil.deleteStudent(req.params.id);
  res.json({
    status: "success",
    message: "Data murid berhasil dihapus permanen",
  });
};

// --- MANAJEMEN TENTOR ---
exports.getTentors = async (req, res) => {
  const result = await Profil.findAllTutors();
  res.json({ status: "success", data: result.rows });
};

exports.deleteTentor = async (req, res) => {
  try {
    await Profil.softDeleteTutor(req.params.id);
    res.json({
      status: "success",
      message: "Data tentor berhasil di-soft delete",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
