module.exports = (req, res, next) => {

    if (req.cookies.admin) {
        next();
    } else {
        res.redirect("/login");
    }

}