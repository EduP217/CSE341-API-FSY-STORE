const paymentsModel = require("../models/payments");
const { paymentSchema } = require("../helpers/paymentsValidator");
const createError = require("http-errors");

//GET
const getPayment = async (req, res, next) => {
	await paymentsModel
		.find()
		.then((data) => res.status(200).json(data))
		.catch((err) => next(createError(500, err)));
};

//POST
const createPayment = async (req, res, next) => {
	const payment = req.body;
	res.setHeader("content-type", "application/json");

	await paymentSchema
		.validateAsync(payment)
		.then(async (valid) => {
			console.log(valid);

			await paymentsModel
				.create(valid)
				.then((r) =>
					res.status(201).json({
						message: "The payment was created successfully",
					})
				)
				.catch((err) =>
					next(
						createError(
							500,
							err || "Some error occurred while creating the cart"
						)
					)
				);
		})
		.catch((err) => {
			next(createError(500, err));
		});
};

//GET by id
const getbyId = async (req, res, next) => {
	const { id } = req.params;

	await paymentsModel
		.findById(id)
		.then((data) => {
			if (!data)
				return next(
					createError(404, `The payment with ID: ${id} was not found`)
				);
			return res.status(200).json(data);
		})
		.catch((err) => next(createError(500, err)));
};

//PUT by id
const update = async (req, res, next) => {
	const { id } = req.params;
	const payment = req.body;
	res.setHeader("content-type", "application/json");

	await paymentSchema.validateAsync(payment).then(async (valid) => {
		console.log(valid);

		await model
			.findByIdAndUpdate(id, valid)
			.then((r) => {
				if (!r)
					return next(
						createError(
							404,
							`Cannot update the payment information with ID: ${id}, maybe it was not found`
						)
					);
				return res.status(204).send({
					message: "The payment information was updated successfully",
				});
			})
			.catch((err) => next(createError(500, err)));
	});
};

//DELETE by id
const remove = async (req, res, next) => {
	const { id } = req.params;

	res.setHeader("content-type", "application/json");
	await paymentsModel
		.findByIdAndDelete(id)
		.then((r) => {
			if (!r)
				return next(
					createError(
						404,
						`Couldn't delete the payment information with ID: ${id}, maybe it was not found`
					)
				);
			return res.status(200).json({
				message: "The payment information was deleted successfully",
			});
		})
		.catch((err) => next(createError(500, err)));
};

module.exports = {
	getPayment,
	createPayment,
	getbyId,
	update,
	remove,
};
