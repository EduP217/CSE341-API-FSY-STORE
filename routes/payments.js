const router = require("express").Router();
const controller = require("../controller/payments");
//const auth = require("../middleware/auth");

router.get("/", controller.getPayment);
router.post("/", controller.createPayment);
router.get("/:id", controller.getbyId);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
