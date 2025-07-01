const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth", authMiddleware, userController.getUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.post("/logout", authMiddleware, userController.logout);

module.exports = router;
