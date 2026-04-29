const router = require("express").Router();
const auth = require("../controllers/authController");

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/login", auth.login);
router.post("/register", auth.register);
router.get("/logout", auth.logout);

module.exports = router;