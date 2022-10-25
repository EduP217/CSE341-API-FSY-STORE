const OrderModel = require("../models/order");
const orderItemModel = require("../models/orderItem");
const { OrderSchema } = require("../helpers/orderValidator");
const shippingModel = require("../models/shipping");
const paymentModel = require("../models/payments");
const createError = require("http-errors");

const getAllOrders = async (req, res, next) => {
  const userId = req.user.id;
  // Get all orders from the database
  await OrderModel.find({ userId })
    .then((data) => res.status(200).json(data))
    .catch((err) => next(createError(500, err)));
};

const getOrderById = async (req, res, next) => {
  const userId = req.user.id;
  // Get all orders by id from the database
  await OrderModel.findOne({ id: req.params.id, userId })
    //Return the response
    .then(async (o) => {
      if(!o) next(createError(404, `No Order with the Id: ${req.params.id} was found.`));
      let order = {
        id: o.id,
        userId: o.userId,
        lastDateModified: o.lastDateModified,
        shippingCost: o.shippingCost,
        subtotal: o.subtotal,
        taxes: o.taxes,
        total: o.total,
        dateCreated: o.dateCreated
      };
      
      await orderItemModel.find({orderId: o.id})
      .then(async (oi) => {
        let orderItems = [];
        Promise.all(oi.map(async (i) => {
          let item = {
            id: i.id,
            orderId: i.orderId,
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            offerDiscount: i.offerDiscount,
            shippingCost: i.shippingCost
          };
          item.shipping = await shippingModel.findOne({ orderItemId: i.id });
          orderItems.push(item);
          return i;
        }))
        .then((x) => {
          console.log(x);
          console.log(orderItems);
          order.orderItems = orderItems;
          console.log(order);
          res.status(200).json(order);
        });
      })
      .catch((err) => { throw err; });
    })
    .catch((err) => next(createError(500, err)));
};

const newOrder = async (req, res, next) => {
  const userId = req.user.id;
  let payload = req.body;
  payload.userId = userId;
  payload.lastDateModified = new Date().toISOString();
  await OrderSchema.validateAsync(payload)
    .then(async (valid) => {
      //console.log(valid);
      let order = {
        subtotal: valid.subtotal,
        taxes: valid.taxes,
        shippingCost: valid.shippingCost,
        total: valid.total,
        userId: valid.userId,
        lastDateModified: valid.lastDateModified,
      };

      await OrderModel.create(order)
        .then(async (r) => {
          Promise.all(
            valid.orderItems.map(async (oi) => {
              let orderItem = {
                orderId: r.id,
                productId: oi.productId,
                quantity: oi.quantity,
                price: oi.price,
                offerDiscount: oi.offerDiscount,
                shippingCost: oi.shippingCost,
              };
              await orderItemModel
                .create(orderItem)
                .then(async (s) => {
                  let shipping = {
                    orderItemId: s.id,
                    shippingTypeId: oi.shippingTypeId,
                    shippingDate: oi.shippingDate,
                    shippingCost: oi.shippingCost,
                  };
                  await shippingModel
                    .create(shipping)
                    .then((sh) => {
                      console.log("Shipping created");
                    })
                    .catch((err) => {
                      throw err;
                    });
                })
                .catch((err) => {
                  throw err;
                });
            })
          ).then(async (all) => {
            let payment = valid.payment;
            payment.userId = valid.userId;
            await paymentModel
              .create(payment)
              .then((p) => {
                console.log("payment created successfully");
                //Return the response
                res
                  .status(201)
                  .json({ message: "The order has been created successfully", orderId: r.id});
              })
              .catch((err) => {
                throw err;
              });
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => next(createError(500, err)));
};

const deleteOrder = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  // Delete orders from the database
  await OrderModel.findOneAndDelete({ id, userId })
    .then((r) => {
      if (!r)
        return next(createError(404, "The order does not exist for delete"));
      //Return the response
      res.status(200).send("The order has been deleted");
    })

    .catch((err) =>
      next(
        createError(500, err || "Some error occurred while updating the order")
      )
    );
};

module.exports = { getAllOrders, getOrderById, newOrder, deleteOrder };
