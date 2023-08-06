const Router = require("express");

const router = new Router();
const basketController = require("../controllers/basketController.js");

router.post("/addToBasket", basketController.addOne);
router.delete("/deleteFromBasket/:id", basketController.deleteOne);
router.get("/getAllBasket", basketController.getAll);
router.put("/increaseQuantity/:id", basketController.increaseQuantity);
router.put("/decreaseQuantity/:id", basketController.decreaseQuantity);
router.get("/getQuantity/:id", basketController.getOne);

module.exports = router;
