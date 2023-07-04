require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const connectToDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const app = express();

connectToDB().then((connection) => {
  console.log("Connecting to MongoDB");
}).catch((error) => console.log(`Error: ${error}`));

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
