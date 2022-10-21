const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const OrderSchema = Joi.object({
  userId: Joi.string().required(),
  dateCreated: Joi.date().iso().raw(),
  lastDateModified: Joi.date().iso().raw(),
  shippingCost: Joi.number().default(0),
  subtotal: Joi.number().default(0),
  taxes: Joi.number().default(0),
  total: Joi.number().default(0),
  orderItems: Joi.array().items(
    Joi.object({ 
      productId: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      price: Joi.number().required(),
      offerDiscount: Joi.number().default(0),
      shippingTypeId: Joi.string().required(),
      shippingDate: Joi.date().raw().required(),
      shippingCost: Joi.number().required(),
    })
  ),
  payment: {
    clientFirstName: Joi.string().required(),
    clientLastName: Joi.string().required(),
    cardNumber: Joi.string().required(),
    cardExpireDate: Joi.string().required(),
    cardSecurityCode: Joi.number().integer().required(),
  }
});

module.exports = {OrderSchema,};
