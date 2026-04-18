const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;