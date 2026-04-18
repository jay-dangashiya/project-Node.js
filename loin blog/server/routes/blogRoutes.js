const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Validation rules
const blogRules = [
  { field: "title", required: true, min: 3 },
  { field: "description", required: true, min: 10 },
];

//  Get all blogs (public)
router.get("/", getBlogs);

//  Get my blogs (logged-in user)
router.get("/my", auth, async (req, res) => {
  try {
    const Blog = require("../models/Blog");
    const blogs = await Blog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user blogs" });
  }
});

//  Create blog
router.post("/", auth, validate(blogRules), createBlog);

//  Update blog
router.put("/:id", auth, validate(blogRules), updateBlog);

// Delete blog
router.delete("/:id", auth, deleteBlog);

//  Get single blog
router.get("/:id", async (req, res) => {
  try {
    const Blog = require("../models/Blog");
    const blog = await Blog.findById(req.params.id).populate("user", "name");

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching blog" });
  }
});

module.exports = router;