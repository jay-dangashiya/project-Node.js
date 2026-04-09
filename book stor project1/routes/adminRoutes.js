const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdminLoggedIn } = require("../middleware/authMiddleware");

// Register
router.get("/register", adminController.getRegister);
router.post("/register", adminController.postRegister);

// Login
router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);

// Logout
router.get("/logout", adminController.logout);

// Protected Routes
router.get("/", isAdminLoggedIn, adminController.getDashboard);
router.get("/add", isAdminLoggedIn, adminController.getAddBook);
router.post("/add", isAdminLoggedIn, adminController.createBook);
router.get("/edit/:id", isAdminLoggedIn, adminController.getEditBook);
router.put("/edit/:id", isAdminLoggedIn, adminController.updateBook);
router.delete("/delete/:id", isAdminLoggedIn, adminController.deleteBook);

module.exports = router;