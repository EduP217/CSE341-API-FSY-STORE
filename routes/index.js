const router = require("express").Router();

router.use("/", require("./swagger"));

module.exports = router;
