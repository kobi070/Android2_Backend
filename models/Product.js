const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  category: String,
  price: Number,
  title: String,
  description: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
