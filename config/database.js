require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
