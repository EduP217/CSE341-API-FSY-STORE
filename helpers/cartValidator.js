const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const cartSchema = Joi.object({
  userId: Joi.string().required(),
  dateCreated: Joi.date().iso().raw(),
  lastDateModified: Joi.date().iso().raw(),
  subtotal: Joi.number().default(0),
  taxes: Joi.number().default(0),
  total: Joi.number().default(0)
});

module.exports = {
  cartSchema,
};
