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
    phone: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: {
    _id: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    product:{
      type: [],
    }
  },
  token: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
