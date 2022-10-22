const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const paymentSchema = Joi.object({
	clientFirstName: Joi.string().required(),
	clientLastName: Joi.string().required(),
	cardNumber: Joi.string().min(12).required(),
	cardExpireDate: Joi.string().regex(/^\d{2}\/\d{4}$/),
	cardSecurityCode: Joi.number().integer().min(100).max(999).required(),
	userId: Joi.string().required(),
});
module.exports = {
	paymentSchema,
};
