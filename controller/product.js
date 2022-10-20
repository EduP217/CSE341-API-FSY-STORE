const mongoconfig = require('../config/database');
const ObjectId = require('mongoose').ObjectId;
const createError = require('http-errors');
const productsModel = require('../models/products');

const getProductAll = async (req, res, next) => {
    const result = await productsModel
        .find();
    result.toArray().then((lists) => res.status(200).json(lists))
        .catch((err) => next(createError(500, err)));


};

const getSingleProduct = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const result = await mongoconfig

        .find({ _id: productId });
    result.toArray().then((lists) => res.status(200).json(lists[0]))
        .catch((err) => next(createError(500, err)));



};



const newProducts = async (req, res) => {
    const newProducts = {

        productName: req.body.productName,
        price: req.body.price,
        color: req.body.color,
        description: req.body.description,
        productStock: req.body.productStock,
        productImage: req.body.productImage,
        thumbnail: req.body.thumbnail,
        brand: req.body.brand,
        model: req.body.model

    };
    await ProductSchema
        .validate(newProducts)
        .then(async (valid) => {

            await productsModel

                .create(valid)
                .then((r) =>
                    res.status(201).json({
                        message: "The cart was created successfully",
                        productId: r.id,
                    })
                )
                .catch((err) =>
                    next(createError(500, err || "Some error occurred while creating the cart")));
        })
        .catch((err) => {
            // report exception
            next(createError(500, err));
        });

};



const updateProducts = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const newProducts = {

        productName: req.body.productName,
        price: req.body.price,
        color: req.body.color,
        description: req.body.description,
        productStock: req.body.productStock,
        productImage: req.body.productImage,
        thumbnail: req.body.thumbnail,
        brand: req.body.brand,
        model: req.body.model

    };


    const sendProducts = await productsModel

        .replaceOne({ _id: productId }, newProducts);
    console.log(sendProducts);
    if (sendProducts.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(sendProducts.error || 'Some error occurred while updating the newProducts.');
    }
};

const deleteProducts = async (req, res) => {
    const productId = new ObjectId(req.params.id);
    const del = await productsModel

        .deleteOne({ _id: productId }, true);
    //   console.log(del);
    if (del.deletedCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(del.error || 'Some error occurred while deleting the Products.');
    }
};


module.exports = { getProductAll, getSingleProduct, updateProducts, deleteProducts, newProducts };



































