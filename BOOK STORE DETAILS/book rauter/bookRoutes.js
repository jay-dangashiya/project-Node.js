const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Home Page 
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

// Add Book Form
router.get("/add", (req, res) => {
  res.render("add");
});

// Create Book
router.post("/add", async (req, res) => {
  await Book.create(req.body);
  res.redirect("/");
});

// Book Details
router.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("details", { book });
});

// Edit Book 
router.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("edit", { book });
});

// Update Book
router.put("/edit/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Delete Book
router.delete("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
