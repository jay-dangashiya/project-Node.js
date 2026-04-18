const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// Optional middleware
const validate = require("../middleware/validate");
const rateLimit = require("express-rate-limit");

//  Rate limit (prevent brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50,
  message: "Too many requests, try later",
});

// Validation rules
const registerRules = [
  { field: "name", required: true },
  { field: "email", required: true },
  { field: "password", required: true, min: 6 },
];

const loginRules = [
  { field: "email", required: true },
  { field: "password", required: true },
];

// Routes
router.post("/register", limiter, validate(registerRules), register);
router.post("/login", limiter, validate(loginRules), login);

module.exports = router;