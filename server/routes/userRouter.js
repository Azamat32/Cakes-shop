const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");
router.post("/registration", userControllers.registrations);
router.post("/login", userControllers.login);
router.post("/admin", userControllers.adminLogin);

router.get("/auth");

module.exports = router;
