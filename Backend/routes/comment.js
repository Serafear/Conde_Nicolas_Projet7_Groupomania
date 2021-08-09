const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/", multer, commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments)
router.get("/:commentId", commentCtrl.getOneComment)
router.put("/:commentId", multer, commentCtrl.updateComment)
router.delete("/:commentId", multer, commentCtrl.deleteComment)

module.exports = router;