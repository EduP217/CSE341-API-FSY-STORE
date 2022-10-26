const cartModel = require("../models/cart");
const cartItemModel = require("../models/cartItem");
const { cartSchema, cartItemSchema } = require("../helpers/cartValidator");
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
  let payload = req.body;
  payload.userId = userId;
  payload.lastDateModified = new Date().toISOString();

  console.log(payload);

  // validate
  await cartSchema
    .validateAsync(payload)
    .then(async (valid) => {
      await cartModel
        .findOne({ userId })
        .then(async (r) => {
          if (r)
            await cartModel
              .findByIdAndUpdate(r.id, payload)
              .then((up) => {
                console.log("The cart was successfully updated");
                return res
                  .status(204)
                  .send({ message: "The cart was successfully updated" });
              })
              .catch((err) => {
                throw err;
              });

          await cartModel
            .create(payload)
            .then((cr) => {
              console.log("The cart was successfully created");
              return res.status(201).send({
                message: "The cart was successfully created",
                cartId: cr.id,
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

const deleteCurrentCart = async (req, res, next) => {
  const userId = req.user.id;

  // validate
  await cartModel
    .findOne({ userId })
    .then(async (c) => {
      if (!c)
        return next(
          createError(404, "No current cart available for this session")
        );

      await cartItemModel
        .deleteMany({ cartId: c.id })
        .then(async (d) => {
          await c
            .remove()
            .then((cd) => {
              console.log("The current cart was successfully removed");
              return res.status(200).send({
                message: "The current cart was successfully removed",
              });
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

const ListCartItems = async (req, res, next) => {
  const userId = req.user.id;
  const cartId = req.params.cartId;

  return await cartItemModel
    .find({ cartId })
    .then((cartItems) => res.status(200).json(cartItems))
    .catch((err) => next(createError(500, err)));
};

const createCartItem = async (req, res, next) => {
  const userId = req.user.id;
  let cartId = req.params.cartId;
  let payload = req.body;
  payload.cartId = cartId;

  console.log(payload);

  // validate
  await cartItemSchema
    .validateAsync(payload)
    .then(async (valid) => {
      await cartItemModel
        .create(valid)
        .then(async (cr) => {
          console.log("The cart-item was successfully created");
          await calculateCartAmounts(cartId);
          return res.status(201).send({
            message: "The cart-item was successfully created",
            cartItemId: cr.id,
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

const updateCartItem = async (req, res, next) => {
  const userId = req.user.id;
  let cartId = req.params.cartId;
  let cartItemId = req.params.cartItemId;
  let payload = req.body;
  payload.cartId = cartId;

  console.log(payload);

  // validate
  await cartItemSchema
    .validateAsync(payload)
    .then(async (valid) => {
      //update
      await cartItemModel
        .findByIdAndUpdate(cartItemId, valid)
        .then(async (up) => {
          console.log("The cart-item was successfully updated");
          await calculateCartAmounts(cartId);
          return res
            .status(204)
            .send({ message: "The cart-item was successfully updated" });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

const findCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const cartId = req.params.cartId;
  const cartItemId = req.params.cartItemId;

  return await cartItemModel
    .findById(cartItemId)
    .then((item) => res.status(200).json(item))
    .catch((err) => next(createError(500, err)));
};

const deleteCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const cartId = req.params.cartId;
  const cartItemId = req.params.cartItemId;

  // validate
  await cartItemModel
    .findByIdAndRemove(cartItemId)
    .then(async (r) => {
      console.log("The cart-item was successfully removed");
      await calculateCartAmounts(cartId);
      return res.status(201).send({
        message: "The cart-item was successfully removed",
      });
    })
    .catch((err) => {
      // report exception
      next(createError(500, err));
    });
};

const calculateCartAmounts = async (cartId) => {
  await cartItemModel
    .find({ cartId })
    .then(async (items) => {
      let subtotal = 0;
      let shippingCost = 0;
      items.forEach((i) => {
        subtotal += i.price * i.quantity - i.offerDiscount;
        shippingCost += i.shippingCost;
      });

      let taxes = subtotal * 0.18;
      let total = subtotal + taxes;
      await cartModel
        .findByIdAndUpdate(cartId, { subtotal, taxes, shippingCost, total })
        .then((r) => {
          console.log("The cart amounts were updated successfully.");
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      // report exception
      throw err;
    });
};

module.exports = {
  getCurrentCart,
  saveCurrentCart,
  deleteCurrentCart,
  ListCartItems,
  createCartItem,
  updateCartItem,
  findCartItem,
  deleteCartItem
};
