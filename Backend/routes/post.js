const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const postCtrl = require("../controllers/post");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts)
router.get("/:postId",  postCtrl.getOnePost)
router.put("/:postId", multer, postCtrl.updatePost)
router.delete("/:postId", multer, postCtrl.deletePost)

module.exports = router;