const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  offerDiscount: {
    type: String,
  },
  shippingCost: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order-item", OrderItemSchema);
