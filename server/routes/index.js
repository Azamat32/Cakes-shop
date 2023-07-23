const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");

router.use("/user", userRouter);
router.use("/products", productRouter);

module.exports = router;
