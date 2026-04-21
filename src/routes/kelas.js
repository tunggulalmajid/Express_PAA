const router = require("express").Router();
const kelasCtrl = require("../controller/KelasController");
const auth = require("../middleware/auth");

// Pastikan kelasCtrl.getAll (bukan getAllKelas)
router.get("/", kelasCtrl.getAll);
router.post("/", auth, kelasCtrl.store);
router.put("/:id", auth, kelasCtrl.update);

router.post("/enroll", auth, kelasCtrl.enroll);
router.delete("/unenroll", auth, kelasCtrl.unenroll);
router.get("/:id/anggota", kelasCtrl.getAnggota);

module.exports = router;
