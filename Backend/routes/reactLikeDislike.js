const express = require('express');
const auth = require('../middleware/auth');


const router = express.Router();
const reactCtrl = require("../controllers/reactLikeDilsike");

router.post("/", auth, reactCtrl.createReaction);
router.get("/", auth, reactCtrl.getAllReactions)
router.get("/:reactId", auth, reactCtrl.getOneReaction)
router.delete("/:reactId", auth, reactCtrl.deleteReaction)

module.exports = router;