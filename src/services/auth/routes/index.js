const { Router } = require("express");
const AuthController = require("../../auth/controllers/AuthController");
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/create-token", AuthController.updateAccessToken);
router.post("/logout", AuthController.logout);
// router.get("/refresh-token/", AuthController.getPostById);

module.exports = router;
