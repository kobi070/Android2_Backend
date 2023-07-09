const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  id: Number,
  email: String,
  username: String,
  password: String,
  name: {
    first: String,
    last: String,
  },
  addresses: {
    city: String,
    street: String,
    number: Number,
    geolocation: {
      lat: Number,
      long: Number,
    },
    phone: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    localField: "id",
    foreignField: "cart_id",
  },
  token: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
