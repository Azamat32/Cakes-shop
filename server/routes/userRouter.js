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
router.get("/allUsers", userControllers.getAllUsers);
router.post("/login_phone", userControllers.sendVerificationCodeLogin);

router.post("/login_verification", userControllers.login);

router.post("/admin", userControllers.adminLogin);

module.exports = router;
