
// const ObjectId = require('mongoose').ObjectId;
const createError = require('http-errors');
const productsModel = require('../models/products');

const getProductAll = async (req, res, next) => {
    await productsModel
        .find()
        .then((lists) => res.status(200).json(lists))
        .catch((err) => next(createError(500, err)));


};

const getSingleProduct = async (req, res, next) => {
    const productId = req.params.id;
    await productsModel

        .findById(productId)
        .then((b) => res.status(200).json(b))
        .catch((err) => next(createError(500, err)));



};



const newProducts = async (req, res, next) => {
    // const productId = req.params.id;
    const applyNewProducts = {

        name: req.body.name,
        price: req.body.price,
        color: req.body.color,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image,
        thumbnail: req.body.thumbnail,
        brand: req.body.brand,
        model: req.body.model

    };


    await productsModel

        .create(applyNewProducts)
   
        .then((s) => res.status(200).json(s))
        .catch((err) => next(createError(500, err)));
};





const updateProducts = async (req, res, next) => {
    const productId = req.params.id;
    const NewProducts = {

        name: req.body.name,
        price: req.body.price,
        color: req.body.color,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image,
        thumbnail: req.body.thumbnail,
        brand: req.body.brand,
        model: req.body.model

    };


    await productsModel

        .replaceOne({ _id: productId }, NewProducts)
   
        .then((s) => res.status(200).json(s))
        .catch((err) => next(createError(500, err)));
};

const deleteProducts = async (req, res, next) => {
    const productId = req.params.id;



    await productsModel

        .deleteOne({ _id: productId })
    // console.log(del)
        .then((d) => res.status(200).json(d))
        .catch((err) => next(createError(500, err)));

}



module.exports = { getProductAll, getSingleProduct, updateProducts, deleteProducts, newProducts };



































