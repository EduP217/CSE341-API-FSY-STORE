const Order = require("../models/order");
const orderItem = require("../models/orderItem");
const {orderSchema} = require("../helpers/orderValidator");
const createError = require('http-errors');

const getAllOrders = async(req, res, next) =>  {
    
    // Get all orders from the database
    await Order
    .find()
    .then((data) => res.status(200).json(data))    
    .catch((err) => next(createError(500, err)));

}

const getOrderById = async(req, res, next) => {

        // Get all orders by id from the database
        await Order.findById(req.params.id)
        //Return the response
        .then((data) => res.status(200).json(data))    
        .catch((err) => next(createError(500, err)));

}

const newOrder = async(req, res, next) => {
    
        //Add order to the database
        const order = new Order(req.body);
        //console.log(order);
        await order.save()
        .then((r) =>
        res.status(201).json({
          message: "The order was created successfully",
          orderId: r.id,
        })
      )
      .catch((err) => 
          next(createError(500, err || "Some error occurred while creating the order")));

} 

const updateOrder = async(req, res, next) => {

        const id = req.params.id;
        // Update orders from the database
        const order = req.body;
        console.log(order);
        await Order.findByIdAndUpdate(id, order)
        //Return the response
        res.status(204).send('The order has been updated')
        .catch((err) => 
          next(createError(500, err || "Some error occurred while updating the order")));
}

const deleteOrder = async(req, res, next) => {
        const id = req.params.id;
        // Delete orders from the database
        const order = req.body;
        console.log(order);
        await Order.findByIdAndDelete(id, order)
        //Return the response
        res.status(200).send('The order has been deleted')
        .catch ((err) => 
            next(createError(500, err || "Some error occurred while updating the order")));
  
}

const updateOrderItemId = async(req, res) => {
        const id = req.params.id;
        // Update order items from the database
        const orderItem = req.body;
        console.log(orderItem);
        const result = await Order.findByIdAndUpdate(id, orderItem)
        //Return the response
        res.status(204).send('The order item has been updated')
        .catch ((err) => 
            next(createError(500, err || "Some error occurred while updating the order")));

}

const deleteOrderItemId = async(req, res) => {
        const id = req.params.id;
        // Delete order items from the database
        const orderItem = req.body;
        console.log(order);
        const result = await Order.findByIdAndDelete(id, orderItem)
        //Return the response
        res.status(200).send('The order item has been deleted')
        .catch ((err) => 
        next(createError(500, err || "Some error occurred while updating the order")));

}

module.exports = {getAllOrders, getOrderById, newOrder, updateOrder, deleteOrder, updateOrderItemId, deleteOrderItemId};