const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");
router.post(
  "/registration_phone",
  userControllers.sendVerificationCodeRegister
);
router.post(
  "/registration_verification",
  userControllers.verifyVerificationCode
);

router.post("/login_phone", userControllers.sendVerificationCodeLogin);

router.post("/login_verification", userControllers.login);

router.post("/admin", userControllers.adminLogin);

router.get("/auth");

module.exports = router;
