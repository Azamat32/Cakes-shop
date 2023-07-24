const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const basketRouter = require("./basketRouter.js");

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/basket", basketRouter);

module.exports = router;
