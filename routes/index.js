const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/products", require("./products"))
module.exports = router;
