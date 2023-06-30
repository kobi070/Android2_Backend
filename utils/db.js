const fetch = require("node-fetch");
const mongoose = require("mongoose");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Connect to MongoDB Atlas
// mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database-name>', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//     populateDatabase();
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   });

// Populate the database with dummy data
exports.populateDatabase = async () => {
  try {
    // Create users
    await createUsers();

    // Create carts
    await createCarts();

    // Create products
    await createProducts();

    console.log("Database population completed");
    process.exit(0);
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
};
// async function populateDatabase() {}

// Create users
async function createUsers() {
  for (let i = 0; i < 100; i += 30) {
    const url = `https://dummyjson.com/users?limit=30&page=${Math.ceil(
      i / 30
    )}`;
    const response = await fetch(url, {
      headers: {
        "app-id": "<your-dummyapi-app-id>",
      },
    });
    const { data: users } = await response.json();

    const userDocuments = users.map((user) => {
      return new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Additional user properties
      });
    });

    await User.insertMany(userDocuments);
  }
}

// Create carts
async function createCarts() {
  for (let i = 1; i <= 100; i += 30) {
    const url = `https://dummyapi.io/data/api/cart?limit=30&page=${Math.ceil(
      i / 30
    )}`;
    const response = await fetch(url, {
      headers: {
        "app-id": "<your-dummyapi-app-id>",
      },
    });
    const { data: carts } = await response.json();

    const cartDocuments = carts.map((cart) => {
      return new Cart({
        userId: cart.userId,
        products: cart.products,
        // Additional cart properties
      });
    });

    await Cart.insertMany(cartDocuments);
  }
}

// Create products
async function createProducts() {
  for (let i = 1; i <= 100; i += 30) {
    const url = `https://dummyapi.io/data/api/product?limit=30&page=${Math.ceil(
      i / 30
    )}`;
    const response = await fetch(url, {
      headers: {
        "app-id": "<your-dummyapi-app-id>",
      },
    });
    const { data: products } = await response.json();

    const productDocuments = products.map((product) => {
      return new Product({
        name: product.name,
        price: product.price,
        // Additional product properties
      });
    });

    await Product.insertMany(productDocuments);
  }
}
