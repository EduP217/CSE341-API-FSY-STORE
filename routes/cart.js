const router = require("express").Router();
const controller = require("../controller/cart");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, controller.getCurrentCart);
router.post("/", ensureAuth, controller.saveCurrentCart);
router.delete("/", ensureAuth, controller.deleteCurrentCart);
router.get("/:cartId/item/", ensureAuth, controller.ListCartItems);
router.get("/:cartId/item/:cartItemId", ensureAuth, controller.findCartItem);
router.post("/:cartId/item/", ensureAuth, controller.createCartItem);
router.put("/:cartId/item/:cartItemId", ensureAuth, controller.updateCartItem);
router.delete("/:cartId/item/:cartItemId", ensureAuth, controller.deleteCartItem);

module.exports = router;