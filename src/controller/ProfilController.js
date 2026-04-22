const Profil = require("../models/ProfilModel");

exports.getMurids = async (req, res) => {
  try {
    const result = await Profil.findAllStudents();
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getMuridsById = async (req, res) => {
  try {
    const result = await Profil.findStudentById(req.params.id);
    if (result.rows.length > 0) {
      res.json({ status: "success", data: result.rows });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data TIdak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateMurid = async (req, res) => {
  try {
    const result = await Profil.updateStudent(
      req.params.id,
      req.body.asal_sekolah,
    );
    if (result.rows.length > 0) {
      res.json({ status: "success", data: result.rows[0] });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data TIdak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteMurid = async (req, res) => {
  try {
    const result = await Profil.deleteStudent(req.params.id);
    if (result.rows.length > 0) {
      res.json({
        status: "success",
        message: "Data murid berhasil dihapus permanen",
      });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data TIdak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getTentors = async (req, res) => {
  try {
    const result = await Profil.findAllTutors();
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getTentorById = async (req, res) => {
  try {
    const result = await Profil.findTutorById(req.params.id);
    if (result.rows.length > 0) {
      res.json({ status: "success", data: result.rows });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data TIdak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateTentor = async (req, res) => {
  try {
    const result = await Profil.updateTentor(
      req.params.id,
      req.body.pendidikan_terakhir,
      req.body.jurusan,
    );

    if (result.rows.length > 0) {
      res.json({ status: "success", data: result.rows[0] });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteTentor = async (req, res) => {
  try {
    result = await Profil.softDeleteTutor(req.params.id);

    if (result.rows.length > 0) {
      res.json({
        status: "success",
        message: "Data tentor berhasil di-soft delete",
      });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
