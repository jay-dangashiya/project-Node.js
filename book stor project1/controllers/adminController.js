const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { title, author, image } = req.body;

    const newBook = new Book({
      title,
      author,
      image   // 👈 save image URL
    });

    await newBook.save();
    res.redirect("/admin/dashboard");

  } catch (err) {
    console.log(err);
  }
};