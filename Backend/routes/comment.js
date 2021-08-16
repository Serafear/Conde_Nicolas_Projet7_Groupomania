const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/", auth, multer, commentCtrl.createComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:commentId", auth, commentCtrl.getOneComment);
router.put("/:commentId", auth, multer, commentCtrl.updateComment);
router.delete("/:commentId", auth, multer, commentCtrl.deleteComment);

module.exports = router;
