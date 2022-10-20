const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const cartSchema = Joi.object({
  userId: Joi.string().required(),
  lastDateModified: Joi.date().iso().raw().default(Date.now()),
  subtotal: Joi.number().default(0),
  taxes: Joi.number().default(0),
  total: Joi.number().default(0),
  cartItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      price: Joi.number().required(),
      offerDiscount: Joi.number(),
    })
      .keys()
      .min(1)
  ),
});

module.exports = {
  cartSchema,
};
