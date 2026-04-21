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

exports.store = async (req, res) => {
  try {
    const result = await Kelas.create(req.body.id_tentor, req.body.nama_kelas);
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Kelas.update(
      req.params.id,
      req.body.nama_kelas,
      req.body.is_aktif,
    );
    res.json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
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
    await Detail.unenroll(req.body.id_kelas, req.body.id_murid);
    res.json({ status: "success", message: "Murid keluar kelas" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAnggota = async (req, res) => {
  try {
    const result = await Detail.getMembers(req.params.id);
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
