const express = require("express");
const rateLimit = require("express-rate-limit");
const auth = require("../middleware/auth");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 8,
  message: "Trop de tentatives, essayez dans 10 minutes ",
});

const router = express.Router();

const userCtrl = require("../controllers/user");
const User = require("../models/User");

router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.get("/me", auth, userCtrl.getMe);
router.get("/:userId", auth, userCtrl.getOneUser);
router.put("/:userId", auth, userCtrl.updateUser);
router.delete("/:userId", auth, userCtrl.deleteUser);

module.exports = router;
