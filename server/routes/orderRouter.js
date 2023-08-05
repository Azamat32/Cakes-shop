const Router = require("express");

const router = new Router();

router.post("/addToOrder");
router.delete("/deleteFromOrder");
router.get("/getAllOrders");

module.exports = router;
