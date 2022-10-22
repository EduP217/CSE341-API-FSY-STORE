// const { string } = require('@hapi/joi')
const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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
    type: number,
  },
  image: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
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
