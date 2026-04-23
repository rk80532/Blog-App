const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/commentControllers");

const router = express.Router();

router.get("/:postId", getCommentsByPost);
router.post("/:postId", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
