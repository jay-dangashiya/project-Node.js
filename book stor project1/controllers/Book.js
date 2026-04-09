const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String   // 👈 add this
});

module.exports = mongoose.model("Book", bookSchema);