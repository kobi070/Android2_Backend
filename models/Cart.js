const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  date: Date,
  products: [
    {
      productId:Number,
      quantity:Number
    }
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
