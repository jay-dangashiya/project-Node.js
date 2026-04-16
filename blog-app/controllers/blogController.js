const Blog = require("../models/Blog");
const multer = require("multer");

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });
exports.upload = upload;


// Dashboard
exports.dashboard = async (req, res) => {

    const totalBlogs = await Blog.countDocuments();

    res.render("admin/dashboard", { totalBlogs });

};


// Add Blog Page
exports.addBlogPage = (req, res) => {
    res.render("admin/addBlog");
};


// Add Blog
exports.addBlog = async (req, res) => {

    const { title, description } = req.body;

    await Blog.create({
        title,
        description,
        image: req.file.filename
    });

    res.redirect("/admin/blogs");
};


// View Blogs
exports.viewBlogs = async (req, res) => {

    const blogs = await Blog.find();

    res.render("admin/viewBlogs", { blogs });

};
// Delete Blog
exports.deleteBlog = async (req, res) => {

    await Blog.findByIdAndDelete(req.params.id);

    res.redirect("/admin/blogs");
};


// Edit Blog Page
exports.editBlogPage = async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    res.render("admin/editBlog", { blog });

};


// Update Blog
exports.updateBlog = async (req, res) => {

    const { title, description } = req.body;

    await Blog.findByIdAndUpdate(req.params.id, {
        title,
        description
    });

    res.redirect("/admin/blogs");
};


// Frontend Home
exports.home = async (req, res) => {

    const blogs = await Blog.find().sort({ _id: -1 });

    res.render("frontend/home", { blogs });

};


// Single Blog
exports.singleBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    res.render("frontend/singleBlog", { blog });

};