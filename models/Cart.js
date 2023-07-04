const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    localField: "user_id", // Specify the local field to reference in the current schema
    foreignField: "id", // Specify the foreign field in the referenced schema
  },
  date: Date,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        localField: "productId", // Specify the local field to reference in the current schema
        foreignField: "id", // Specify the foreign field in the referenced schema
      },
      quantity: Number,
    }
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
