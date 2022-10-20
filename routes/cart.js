const router = require("express").Router();
const controller = require("../controller/cart");
const auth = require("../middleware/auth");

router.use("/", controller.getCurrentCart);

module.exports = router;