const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cartId: {
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
  shippingTypeId: {
    type: String,
  }, 
  shippingDate: {
    type: Date
  }, 
  shippingCost: {
    type: Number
  }
});

module.exports = mongoose.model("Cart-item", cartItemSchema);
