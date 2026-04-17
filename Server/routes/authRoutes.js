const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/authController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

router.put("/update", authMiddleware, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
