const router = require("express").Router();
const kelasCtrl = require("../controller/KelasController");
const auth = require("../middleware/auth");

// Pastikan kelasCtrl.getAll (bukan getAllKelas)
router.get("/", kelasCtrl.getAll);
router.get("/:id", auth, kelasCtrl.getById);
router.post("/", auth, kelasCtrl.store);
router.put("/:id", auth, kelasCtrl.update);
router.delete("/:id", auth, kelasCtrl.delete);

router.get("/:id/anggota", kelasCtrl.getAnggota);
router.post("/enroll", auth, kelasCtrl.enroll);
router.delete("/unenroll", auth, kelasCtrl.unenroll);

module.exports = router;
