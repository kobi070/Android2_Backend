const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  id: Number,
  email: String,
  username: String, 
  password: String,
  name:{
    first: String,
    last: String
  },
  addresses:{
    city: String,
    street: String,
    number: Number,
    geolocation:{
      lat: Number,
      long: Number
    },
    phone: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
