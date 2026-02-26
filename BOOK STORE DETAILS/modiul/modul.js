const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// MongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/", bookRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});