const Kelas = require("../models/KelasModel");
const Detail = require("../models/DetailKelasModel");

exports.getAll = async (req, res) => {
  try {
    const result = await Kelas.findAll();
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Kelas.findById(req.params.id);
    if (result.rows.length > 0) {
      res.status(200).json({ status: "success", data: result.rows });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.store = async (req, res) => {
  try {
    const result = await Kelas.create(req.body.id_tentor, req.body.nama_kelas);
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Kelas.update(
      req.params.id,
      req.body.nama_kelas,
      req.body.is_aktif,
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

exports.delete = async (req, res) => {
  try {
    const result = await Kelas.delete(req.params.id);
    if (result.rows.length > 0) {
      res.json({ status: "success", message: "Data Kelas Berhasil Terhapus" });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.enroll = async (req, res) => {
  try {
    await Detail.enroll(req.body.id_kelas, req.body.id_murid);
    res.status(201).json({ status: "success", message: "Murid terdaftar" });
  } catch (err) {
    res.status(400).json({ status: "error", message: "Gagal daftar" });
  }
};

exports.unenroll = async (req, res) => {
  try {
    const result = await Detail.unenroll(req.body.id_kelas, req.body.id_murid);
    if (result.rows.length > 0) {
      res.json({ status: "success", message: "Murid keluar kelas" });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAnggota = async (req, res) => {
  try {
    const result = await Detail.getMembers(req.params.id);
    if (result.rows.length > 0) {
      res.json({ status: "success", data: result.rows });
    } else {
      res
        .status(404)
        .json({ status: "Not Found", message: "Data Tidak Ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
