const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function connectToDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");

    const productCollection = mongoose.connection.collection("products");
    const userCollection = mongoose.connection.collection("users");
    const cartCollection = mongoose.connection.collection("carts");

    // Clear existing data (optional)
    await productCollection.deleteMany({});
    await userCollection.deleteMany({});
    await cartCollection.deleteMany({});

    const fetchAndInsertProducts = async () => {
      for (let index = 1; index < 100; index++) {
        const productsResponse = await axios.get(
          `https://dummyjson.com/products/${index}`
        );
        const productsData = productsResponse.data;
        if (productsData) {
          console.log("inserting products");
          await Product.insertMany(productsData);
        }
      }
    };

    const fetchAndInsertUsers = async () => {
      for (let index = 1; index < 100; index++) {
        const usersResponse = await axios.get(
          `https://dummyjson.com/users/${index}`
        );
        const usersData = usersResponse.data;
        if (usersData) {
          console.log("inserting users");
          await User.insertMany(usersData);
        }
      }
    };

    const fetchAndInsertCarts = async () => {
      for (let i = 1; i <= 20; i++) {
        const cartsResponse = await axios.get(
          `https://dummyjson.com/carts/${i}`
        );
        const cartsData = cartsResponse.data;
        if (cartsData) {
          console.log("inserting carts");
          await Cart.insertMany(cartsData);
        }
      }
    };

    await Promise.all([
      fetchAndInsertProducts(),
      fetchAndInsertUsers(),
      fetchAndInsertCarts(),
    ]);

    console.log("Database populated");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
    throw error;
  }
}


module.exports = connectToDB;
