const Router = require("express");

const router = new Router();
const basketController = require("../controllers/basketController.js");

router.post("/addToBasket");

module.exports = router;
