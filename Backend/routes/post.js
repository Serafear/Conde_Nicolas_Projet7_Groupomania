const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const postCtrl = require("../controllers/post");

router.post("/", postCtrl.createPost);
router.get("/",  postCtrl.getAllPosts)
router.get("/:postId",  userCtrl.getOnePost)
router.put("/:postId",  userCtrl.updatePost)
router.delete("/:postId",  userCtrl.deletePost)

module.exports = router;