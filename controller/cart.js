const cartModel = require("../models/cart");
const cartItemModel = require("../models/cart_item");
const { cartSchema } = require("../helpers/cartValidator");
const createError = require("http-errors");

const getCurrentCart = async (req, res, next) => {
  const userId = req.user.id;
  await cartModel
    .findOne({ userId })
    .then(async (cart) => {
      if (!cart)
        return next(
          createError(404, `The user: ${userId} has not a cart in session.`)
        );
      // find the cart items from model by cart id
      await cartItemModel
        .find({ cartId: cart.id })
        .then((cartItems) => {
          cart.cartItems = [];
          if (cartItems.length > 0) cart.cartItems = cartItems;
        })
        .catch((err) => next(createError(500, err)));
      return res.status(200).json(cart);
    })
    .catch((err) => next(createError(500, err)));
};

const saveCurrentCart = async (req, res, next) => {
  const userId = req.user.id;
  const payload = req.body;

  // validate
  await cartSchema
    .validate(payload)
    .then(async (valid) => {
      const cart = ({ subtotal, taxes, total } = valid);
      const items = ({ cartItems } = valid);

      await cartModel
        .findOneAndUpdate({ userId }, cart)
        .then(async (r) => {
          console.log("The cart was successfully saved");
          await cartItemModel
            .updateMany({ cartId: r.id }, items)
            .then((rs) => {
              console.log("The cart items were successfully saved");
              res.status(201).json({
                message: "The cart was successfully saved",
                cartId: r.id,
              });
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) =>
          next(
            createError(500, err || "Some error occurred while saving the cart")
          )
        );
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

module.exports = {
  getCurrentCart,
  saveCurrentCart,
};
