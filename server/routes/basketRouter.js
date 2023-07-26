const Router = require("express");

const router = new Router();
const basketController = require("../controllers/basketController.js");

router.post("/addToBasket", basketController.addOne);
router.delete("/deleteFromBasket", basketController.deleteOne);

module.exports = router;
