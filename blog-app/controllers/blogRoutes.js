const express = require("express")
const router = express.Router()

const blogController = require("./blogController")
const auth = require("../middleware/auth")

router.get("/", blogController.home)
router.get("/blog/:id", blogController.singleBlog)

router.get("/admin/dashboard", auth, blogController.dashboard)

router.get("/admin/add-blog", auth, blogController.addBlogPage)

router.post("/admin/add-blog",
    auth,
    blogController.upload.single("image"),
    blogController.addBlog
)

router.get("/admin/blogs", auth, blogController.viewBlogs)

router.get("/delete-blog/:id", auth, blogController.deleteBlog)

router.get("/edit-blog/:id", auth, blogController.editBlogPage)

router.post("/update-blog/:id", auth, blogController.updateBlog)

module.exports = router