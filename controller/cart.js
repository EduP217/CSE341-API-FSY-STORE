const cartModel = require("../models/cart");
const cartItemModel = require("../models/cart_item");
const { cartSchema } = require("../helpers/cartValidator");
const createError = require('http-errors');

const getCurrentCart = async (req, res, next) => {
  // check the auth id --> session
  // find the cart from model by the user id
  // find the cart items from model by cart id
  await cartModel
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(createError(500, err)));
  // catch -> next(createError(500, err))
};

const saveCurrentCart = async (req, res, next) => {
  // payload = req.body;
  // validate
  await cartSchema
    .validate(payload)
    .then(async (valid) => {
      //save to the model
      // 200 -  success
      // 201 -  created
      // 204 -  updated
      //res.status(201).send("");
      // 400 -> request errors/ Timeout errors
      //next(createError(404, "The information was not found"));
      await cartModel
        .create(valid)
        .then((r) =>
          res.status(201).json({
            message: "The cart was created successfully",
            cartId: r.id,
          })
        )
        .catch((err) => 
            next(createError(500, err || "Some error occurred while creating the cart")));
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

module.exports = {
  getCurrentCart,
  saveCurrentCart
};
