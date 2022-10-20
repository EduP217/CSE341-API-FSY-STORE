const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));

module.exports = router;
