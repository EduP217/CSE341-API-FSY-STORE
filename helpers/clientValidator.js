const Joi = require("@hapi/joi");
const utils = require("../config/utilities");

const clientSchema = Joi.object({
  address: Joi.string(),
  phoneNumber: Joi.string().alphanum(),
  email: Joi.string().email({ tlds: { allow: false } }),
  birthday: Joi.date().raw()
});

module.exports = {
    clientSchema,
};
