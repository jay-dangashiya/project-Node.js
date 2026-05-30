const express = require("express");
const Student = require("../models/student.model");

const router = express.Router();

// Dashboard
router.get("/", async (req, res) => {
    const total = await Student.countDocuments();
    res.render("dashboard", { total });
});

// Form Page
router.get("/form", (req, res) => {
    res.render("form");
});

// Add Student
router.post("/add", async (req, res) => {
    await Student.create(req.body);
    res.redirect("/table");
});

// Table Page
router.get("/table", async (req, res) => {
    const students = await Student.find();
    res.render("table", { students });
});

module.exports = router;