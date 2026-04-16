const express = require("express");
const router = express.Router();

const authController = require("./authController");

router.get("/login", authController.loginPage);
router.post("/login", authController.login);

router.get("/signup", authController.signupPage);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

module.exports = router;