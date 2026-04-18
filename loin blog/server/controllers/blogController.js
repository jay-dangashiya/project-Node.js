const Blog = require("../models/Blog");

//  Get All Blogs (with pagination)
exports.getBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      blogs,
    });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

//  Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title & description required" });
    }

    const blog = await Blog.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      msg: "Blog created",
      blog,
    });

  } catch (err) {
    res.status(500).json({ msg: "Create failed", error: err.message });
  }
};

//  Update Blog (safe update)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Only update specific fields
    if (req.body.title) blog.title = req.body.title;
    if (req.body.description) blog.description = req.body.description;

    const updatedBlog = await blog.save();

    res.json({
      msg: "Blog updated",
      blog: updatedBlog,
    });

  } catch (err) {
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};

//  Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await blog.deleteOne();

    res.json({ msg: "Blog deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Delete failed", error: err.message });
  }
};