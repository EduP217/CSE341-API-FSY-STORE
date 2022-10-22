const OrderModel = require("../models/order");
const orderItemModel = require("../models/orderItem");
const {OrderSchema} = require("../helpers/orderValidator");
const shippingModel = require('../models/shipping')
const paymentModel = require('../models/payments')
const createError = require('http-errors');

const getAllOrders = async(req, res, next) =>  {
    const userId = req.user.id;
    // Get all orders from the database
    await OrderModel
    .find({userId})
    .then((data) => res.status(200).json(data))    
    .catch((err) => next(createError(500, err)));

}

const getOrderById = async(req, res, next) => {

        // Get all orders by id from the database
        await OrderModel.findById(req.params.id)
        //Return the response
        .then((data) => res.status(200).json(data))    
        .catch((err) => next(createError(500, err)));

}

const newOrder = async(req, res, next) => {
        const userId = req.user.id;
        let payload = req.body;
        payload.userId =userId;
        payload.lastDateModified = new Date().toISOString();
        await OrderSchema.validateAsync(payload)
        .then(async (valid) => {
          console.log(valid);
          let order = {
            subtotal: valid.subtotal,
            taxes: valid.taxes,
            shippingCost: valid.shippingCost,
            total: valid.total,
            userId: valid.userId,
            lastDateModified: valid.lastDateModified,
          }
          await OrderModel.create(order)
          .then(async (r) => {
             valid.orderItems.foreach (async(oi) => {
              let orderItem = {
                orderId: r.id,
                productId: oi.productId,
                quantity: oi.quantity,
                price: oi.price,
                offerDiscount: oi.offerDiscount,
                shippingCost: oi.shippingCost,
              }
              await orderItemModel.create(orderItem)
              .then(async (s) => {
                let shipping = {
                  orderItemId: s.id,
                  shippingTypeId: oi.shippingTypeId,
                  shippingDate: oi.shippingDate,
                  shippingCost: oi.shippingCost,
                }
                await shippingModel.create(shipping)
                .then((sh) => {
                  console.log("Shipping created")
                  
                })
                .catch((err) => {
                  throw err;
                });
              })
              .catch((err) => {
                throw err;
              })
            
            })
            
           
          })
          .catch((err) => {
            throw err;
          });

          let payment = {
            clientFirstName: oi.clientFirstName,
            clientLastName: oi.clientLastName,
            cardNumber: oi.cardNumber,
            cardExpireDate: oi.cardExpireDate,
            cardSecurityCode: oi.cardSecurityCode,
          }
          await paymentModel.create(payment)
          //Return the response
          res.status(200).send('The order has been created')
          .catch((err) => {
            throw err;
          });


        })

        .catch((err) => next(createError(500, err)));
} 


const deleteOrder = async(req, res, next) => {
        const id = req.params.id;
        // Delete orders from the database
        await OrderModel.findByIdAndDelete(id).then((r) => {
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