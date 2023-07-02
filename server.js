require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT;

const api = require("./utils/api");
const connectToDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const Product = require("./models/Product");

const app = express();

connectToDB().then((connection) => {
  console.log("Connecting to MongoDB");
}).catch((error) => console.log(`Error: ${error}`));

// MongoDB Atlas connection URI
// const { MONGO_URI } = process.env;
// // Connect to MongoDB Atlas
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//     // Load data into the database only once
//     api.fetchAndInsertData();
//     // db.populateDatabase();
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB Atlas", err);
//   });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/categories", categoriesRoutes);

// Start the server
app.listen(3001 || port, () => {
  console.log(`Server is running on port ${port}`);
});
