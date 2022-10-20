const router = require("express").Router();
const controller = require("../controller/profile");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, controller.getProfile);
router.put("/", ensureAuth, controller.updateProfile);

module.exports = router;