const routes = require('express').Router();
const {getAllOrders, getOrderById, newOrder, updateOrder, deleteOrder, updateOrderItemId, deleteOrderItemId} = require('../controller/order');
//const auth = require("../middleware/auth");


routes.get('/', getAllOrders);
routes.get('/:id', getOrderById);

routes.post('/', newOrder);
routes.put('/:id', updateOrder);
routes.delete('/:id', deleteOrder);
routes.put('/item/:itemid/shipping/:shippingid', updateOrderItemId);
routes.delete('/item/:itemid/shipping/:shippingid', deleteOrderItemId);

module.exports = routes;