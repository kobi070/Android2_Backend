const axios = require("axios");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Category = require("../models/Category");

// Fetch products from API and save them to the database
exports.fetchAndInsertData = async () => {
  try {
    console.log("Fetching Products, Users, Categories, and Carts");

    // Clear existing data from the database
    console.log("Clearing existing data from the database");
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Category.deleteMany({});
    
    // Fetch products
    const productLimit = 20;
    const productsResponse = await axios.get(
      `https://fakestoreapi.com/products?limit=${productLimit}`
    );
    const products = productsResponse.data;

    // Fetch users
    const userLimit = 20;
    const usersResponse = await axios.get(
      `https://fakestoreapi.com/users?limit=${userLimit}`
    );
    const users = usersResponse.data;

    // Fetch carts
    const cartLimit = 20;
    const cartsResponse = await axios.get(
      `https://fakestoreapi.com/carts?limit=${cartLimit}`
    );
    const carts = cartsResponse.data;

    // Fetch Categories
    const categoriesResponse = fetch(
      "https://fakestoreapi.com/products/categories"
    );

    const categories = categoriesResponse.data;

    // Inset categories into the database
    await Category.insertMany(categories);
    console.log("Categories fetched successfully");

    // Insert products into the database
    await Product.insertMany(products);
    console.log("Products fetched and inserted successfully!");

    // Insert users into the database
    await User.insertMany(users);
    console.log("Users fetched and inserted successfully!");

    // Insert carts into the database
    await Cart.insertMany(carts);
    console.log("Carts fetched and inserted successfully!");
  } catch (error) {
    console.error("Error fetching and inserting data:", error);
  }
};
