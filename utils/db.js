const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Category = require("../models/Category");

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
    const categoryCollection = mongoose.connection.collection("categories");

    // Clear existing data (optional)
    await productCollection.deleteMany({});
    await userCollection.deleteMany({});
    await cartCollection.deleteMany({});
    await categoryCollection.deleteMany({});

    const fetchAndInsertProducts = async () => {
      for (let index = 1; index < 100; index++) {
        try {
          const productsResponse = await axios.get(
            `https://dummyjson.com/products/${index}`
          );
          const productsData = productsResponse.data;
          // console.log(productsData);
          if (productsData) {
            console.log("inserting products");
            await Product.insertMany(productsData);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          await delay(60000); // Delay for 60 second (60000 milliseconds)
          index--; // Retry the same index
        }
      }
    };

    const fetchAndInsertUsers = async () => {
      for (let index = 1; index < 100; index++) {
        try {
          const usersResponse = await axios.get(
            `https://dummyjson.com/users/${index}`
          );
          const usersData = usersResponse.data;
          if (usersData) {
            console.log("inserting users");
            await User.insertMany(usersData);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          await delay(60000); // Delay for 1 second (1000 milliseconds)
          index--; // Retry the same index
        }
      }
    };

    const fetchAndInsertCarts = async () => {
      for (let i = 1; i <= 20; i++) {
        try {
          const cartsResponse = await axios.get(
            `https://dummyjson.com/carts/${i}`
          );
          const cartsData = cartsResponse.data;
          if (cartsData) {
            console.log("inserting carts");
            await Cart.insertMany(cartsData);
          }
        } catch (error) {
          console.error("Error fetching carts:", error);
          await delay(60000); // Delay for 1 second (1000 milliseconds)
          i--; // Retry the same index
        }
      }
    };

    const categoriesResponse = await axios.get("https://dummyjson.com/products/categories");
    const categoriesData = await categoriesResponse.data;
    console.log(categoriesData);

    await Category.insertMany(categoriesData.map(category => new Category({title: category})));


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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = connectToDB;
