const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));

module.exports = router;
