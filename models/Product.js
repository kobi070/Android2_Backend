const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  category:  {
    type: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: Number,
  title: String,
  description: String,
  images: [],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
