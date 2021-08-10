const express = require('express');
const auth = require('../middleware/auth');


const router = express.Router();
const reactCtrl = require("../controllers/reactLikeDilsike");

router.post("/", reactCtrl.createReaction);
router.get("/", reactCtrl.getAllReactions)
router.get("/:reactId", reactCtrl.getOneReaction)
router.put("/:reactId", reactCtrl.updateReaction)
router.delete("/:reactId", reactCtrl.deleteReaction)

module.exports = router;