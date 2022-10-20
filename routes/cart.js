const router = require("express").Router();
const controller = require("../controller/cart");
const { ensureAuth } = require("../middleware/auth");

router.use("/", ensureAuth, controller.getCurrentCart);

module.exports = router;