const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastDateModified: {
    type: Date,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
