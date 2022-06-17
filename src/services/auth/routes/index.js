const { Router } = require("express");
const AuthController = require("../../auth/controllers/AuthController");
const authMiddleware = require("../../../middlewares/AuthMiddleware");
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/create-token", authMiddleware, AuthController.updateAccessToken);
router.post("/logout", authMiddleware, AuthController.logout);

module.exports = router;
