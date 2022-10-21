const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastDateModified: {
    type: Date,
  },
  subtotal: {
    type: Number,
    default: 0
  },
  taxes: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Cart", CartSchema);
