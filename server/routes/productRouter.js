const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");

router.get("/catalog", productController.getAll);
router.get("/categories", productController.getAllCategories);
router.post("/categories", productController.addCategory);
router.delete("/categories/:id", productController.deleteCategory);

router.delete("/catalog/:id", productController.delete);

router.post("/catalog", productController.postOne);

module.exports = router;
