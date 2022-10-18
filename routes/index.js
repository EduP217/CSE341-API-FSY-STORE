const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/cart", require("./cart"));

module.exports = router;
