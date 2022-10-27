const { makeExecutableSchema } = require("graphql-tools");
const { resolvers } = require("./resolvers");

const typeDefs = `
    type Query {
        hello: String,
        profile: MyProfile
        products: [Product],
        carts: Cart,
        orders: [Order],
        payments: [Payment]
    }

    type MyProfile {
        _id: ID
        name: String
        photoImage: String
        roleID: String
        address: String
        phoneNumber: String
        email: String
        birthday: String
        createdAt: String
        OAuthProvider: String
    }

    type Product {
        _id: ID
        name: String
        price: Float
        color: String
        description: String
        stock: Int
        image: String
        thumbnail: String
        brand: String
        model: String
    }

    type Cart {
        _id: ID
        userId: String
        dateCreated: String
        lastDateModified: String
        subtotal: Float
        taxes: Float
        shippingCost: Float
        total: Float
        cartItems: [CartItem]
    }

    type CartItem {
        _id: ID
        cartId: String
        productId: String
        quantity: Int
        price: Float
        offerDiscount: Float
        shippingTypeId: String
        shippingDate: String
        shippingCost: String
    }

    type Payment {
        _id: ID
        clientFirstName: String
        clientLastName: String
        cardNumber: String
        cardExpireDate: String
        cardSecurityCode: String
    }

    type Order {
        _id: ID
        userId: String
        dateCreated: String
        lastDateModified: String
        shippingCost: Float
        subtotal: Float
        taxes: Float
        total: Float
        orderItems: [OrderItem]
    }

    type OrderItem {
        _id: ID
        OrderId: String
        productId: String
        quantity: Int
        price: Float
        offerDiscount: Float
        shippingCost: String
    }
`;

module.exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});