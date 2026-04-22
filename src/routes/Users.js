const router = require("express").Router();
const profilCtrl = require("../controller/ProfilController");
const auth = require("../middleware/auth");

router.get("/murid", auth, profilCtrl.getMurids);
router.get("/murid/:id", auth, profilCtrl.getMuridsById);
router.put("/murid/:id", auth, profilCtrl.updateMurid);
router.delete("/murid/:id", auth, profilCtrl.deleteMurid);

router.get("/tentor", auth, profilCtrl.getTentors);
router.get("/tentor/:id", auth, profilCtrl.getTentorById);
router.put("/tentor/:id", auth, profilCtrl.updateTentor);
router.delete("/tentor/:id", auth, profilCtrl.deleteTentor);

module.exports = router;
