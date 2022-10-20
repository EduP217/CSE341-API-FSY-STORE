const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/cart", require("./cart"));
router.use("/payments", require("./payments"));

module.exports = router;
