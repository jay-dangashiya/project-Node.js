const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const studentRoutes = require("./routes/student.routes");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", studentRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/admin_panel")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});