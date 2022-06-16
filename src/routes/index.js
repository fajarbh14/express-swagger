const { Router } = require("express");
const router = Router();
const postService = require("../services/post/routes");
const authService = require("../services/auth/routes");
const authMiddleware = require("../middlewares/AuthMiddleware");
const docs = require("./docs");

router.use("/", authService);
router.use("/post", authMiddleware, postService);
router.use("/docs", docs);

module.exports = router;
