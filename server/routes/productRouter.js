const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");

router.get("/catalog", productController.getAll);
router.post("/catalog", productController.postOne);

module.exports = router;
