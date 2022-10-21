const Order = require("../models/order");
const orderItem = require("../models/orderItem");
const {orderSchema} = require("../helpers/orderValidator");
const createError = require('http-errors');

const getAllOrders = async(req, res, next) =>  {
    const userId = req.user.id;
    // Get all orders from the database
    await Order
    .find({userId})
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
        const userId = req.user.id;
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


const deleteOrder = async(req, res, next) => {
        const id = req.params.id;
        // Delete orders from the database
        await Order.findByIdAndDelete(id).then((r) => {
        if (!r)
        return next(
          createError(404, "The order does not exist for delete")
        );
        //Return the response
        res.status(200).send('The order has been deleted')
        })
        
        .catch ((err) => 
            next(createError(500, err || "Some error occurred while updating the order")));
  
}



module.exports = {getAllOrders, getOrderById, newOrder, deleteOrder};