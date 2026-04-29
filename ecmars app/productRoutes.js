const router = require("express").Router();
const product = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", product.getAllProducts);
router.get("/my-products", isAuthenticated, product.getMyProducts);
router.post("/add", isAuthenticated, product.createProduct);

module.exports = router;