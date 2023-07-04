const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,
  user_id: {
    type: Number,
    ref: "User",
    localField: "user_id",
    foreignField: "id",
  },
  date: Date,
  products: [
    {
      product: {
        type: Number,
        ref: "Product",
        localField: "products.product",
        foreignField: "id",
      },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
