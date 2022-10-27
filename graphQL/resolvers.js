const Client = require("../models/clients");
const Product = require("../models/products");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Payment = require("../models/payments");

module.exports.resolvers = {
  Query: {
    hello: () => {
      return "Hello World with GraphQL";
    },
    async profile(_, args, { user }) {
        const client = await Client.findOne({userId: user.id});
        return {
            _id : user._id,
            name : user.name,
            photoImage : user.photoImage,
            roleID : user.roleID,
            address: client.address,
            phoneNumber: client.phoneNumber,
            email: client.email,
            birthday: client.birthday,
            createdAt : user.createdAt,
            OAuthProvider : user.provider
        }
    },
    async products() {
      return await Product.find();
    },
    async carts(_, args, { user }) {
      console.log(user);
      return await Cart.findOne({ userId: user.id }).then(async (r) => {
        r.cartItems = await CartItem.find({ cartId: r.id });
        return r;
      });
    },
    async orders(_, args, { user }) {
        let orders = await Order.find({userId: user.id});
        orders.map(async (o) => {
            return o.orderItems = await OrderItem.find({ orderId: o.id });
        })
        return orders;
    },
    async payments(_, args, { user }) {
        return await Payment.find({userId: user.id});
    },
  },
};
