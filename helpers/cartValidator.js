const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const cartSchema = Joi.object({
  userId: Joi.string().required(),
  lastDateModified: Joi.date().iso().raw(),
  subtotal: Joi.number().default(0),
  taxes: Joi.number().default(0),
  shippingCost: Joi.number().default(0),
  total: Joi.number().default(0)
});

const cartItemSchema = Joi.object({
  cartId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  price: Joi.number().required(),
  offerDiscount: Joi.number(),
  shippingTypeId: Joi.string(),
  shippingDate: Joi.date().raw(),
  shippingCost: Joi.number().default(0),
});

module.exports = {
  cartSchema,
  cartItemSchema,
};
