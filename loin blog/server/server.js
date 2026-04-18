require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

//  Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logs requests

// Test Route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

//  Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);