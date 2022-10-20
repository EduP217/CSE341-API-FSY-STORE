const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/cart", require("./cart"));
router.use("/product", require("./product") )

module.exports = router;
