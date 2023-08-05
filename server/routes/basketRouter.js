const Router = require("express");

const router = new Router();
const basketController = require("../controllers/basketController.js");

router.post("/addToBasket", basketController.addOne);
router.delete("/deleteFromBasket/:id", basketController.deleteOne);
router.get("/getAllBasket", basketController.getAll);

module.exports = router;
