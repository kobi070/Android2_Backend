const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      default: function() {
        return this.title;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", categorySchema);
