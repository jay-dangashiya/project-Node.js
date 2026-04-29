const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find()
    .populate("user")
    .populate("category");

  res.render("productList", { products });
};

exports.getMyProducts = async (req, res) => {
  const products = await Product.find({ user: req.user.id })
    .populate("category");

  res.render("myProducts", { products });
};

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  await Product.create({
    name,
    price,
    category,
    user: req.user.id
  });

  res.redirect("/my-products");
};