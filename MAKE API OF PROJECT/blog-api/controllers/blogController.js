const Blog = require("../models/Blog");

// Create
exports.createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(blog);
};

// Read All
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("user", "name");
  res.json(blogs);
};

// Read Single
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog)
    return res.status(404).json({ message: "Not found" });

  res.json(blog);
};

// Update
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(blog);
};

// Delete
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};