const Admin = require("../models/Admin");

exports.loginPage = (req, res) => {
    res.render("admin/login");
};

exports.signupPage = (req, res) => {
    res.render("admin/signup");
};

exports.signup = async (req, res) => {

    const { email, password } = req.body;

    await Admin.create({
        email,
        password
    });

    res.redirect("/login");

};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });

    if (admin) {

        res.cookie("admin", admin._id);

        return res.redirect("/admin/dashboard");

    } else {

        return res.send("Invalid Login");

    }

};

exports.logout = (req, res) => {

    res.clearCookie("admin");
    res.redirect("/login");

};