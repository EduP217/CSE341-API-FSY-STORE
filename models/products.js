const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  image: {
    type: String
  },
  thumbnail: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
