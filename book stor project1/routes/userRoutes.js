const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

module.exports = router;