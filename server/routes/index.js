const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const basketRouter = require("./basketRouter.js");
const orderRouter = require("./orderRouter.js");
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/basket", basketRouter);
router.use("/order", orderRouter);

module.exports = router;
