const jwt = require("jsonwebtoken");
const SECRET = "secretkey";

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.redirect("/login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send("Access denied");
  }
  next();
};