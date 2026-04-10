const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController.js");

const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware.js");

router.put("/update", authMiddleware, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;