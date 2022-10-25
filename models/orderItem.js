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
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerDiscount: {
    type: Number,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order-item", OrderItemSchema);
