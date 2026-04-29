const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashed });
  await user.save();

  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET
  );

  res.cookie("token", token);
  res.redirect("/");
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};