const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
	clientFirstName: {
		type: String,
		required: true,
	},
	clientLastName: {
		type: String,
		required: true,
	},
	cardNumber: {
		type: String,
		required: true,
	},
	cardExpireDate: {
		type: String,
		required: true,
	},
	cardSecurityCode: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("Payments", PaymentSchema);
