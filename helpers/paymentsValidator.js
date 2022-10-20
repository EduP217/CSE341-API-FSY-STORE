const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const paymentSchema = Joi.object({
	clientFirstName: Joi.string().required(),
	clientLasttName: Joi.string().required(),
	cardNumber: Joi.number().default(0),
	cardExpireyDate: Joi.date().iso().raw(),
	cardSecurityCode: Joi.number().default(0),
});
module.exports = {
	paymentSchema,
};
