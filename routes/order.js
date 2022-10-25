const routes = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  newOrder,
  deleteOrder,
} = require("../controller/order");
const { ensureAuth } = require("../middleware/auth");

routes.get("/", ensureAuth, getAllOrders);
routes.get("/:id", ensureAuth, getOrderById);

routes.post("/", ensureAuth, newOrder);
routes.delete("/:id", ensureAuth, deleteOrder);

module.exports = routes;
