const Book = require("../models/Book");

// Home Page
exports.getHome = async (req, res) => {
    const search = req.query.search;
    let books;

    if (search) {
        books = await Book.find({
            title: { $regex: search, $options: "i" }
        });
    } else {
        books = await Book.find();
    }

    res.render("index", { books });
};

// Book Details
exports.getBookDetails = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("bookDetails", { book });
};