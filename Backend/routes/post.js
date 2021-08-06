const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts)
router.get("/:postId", auth, postCtrl.getOnePost)
router.put("/:postId", auth, multer, postCtrl.updatePost)
router.delete("/:postId", auth, multer, postCtrl.deletePost)

module.exports = router;