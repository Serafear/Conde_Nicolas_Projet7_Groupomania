const express = require('express');
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');  


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,    // 10 minutes et 15 * 60 * 1000 = 15 minutes et 60 * 60 * 1000 = 1 heure
    max: 8,                       // 8 requetes par IP
    message:"Trop de tentatives, essayez dans 10 minutes ",  //message affiché au delà de 8 requetes 
                     
});

//on utilise la fonction d'express pour créer une route modulable
const router = express.Router();

const userCtrl = require("../controllers/user"); //le controller va associer les fonctions aux différentes routes
const User = require('../models/User');

//On crée les router nécessaires à user
router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login)
router.get("/me", auth)
router.get("/:userId", auth, userCtrl.getOneUser)  //to test it in insomnia, an auth :bearer token need to be set
router.put("/:userId",  auth, userCtrl.updateUser)
router.delete("/:userId", auth, userCtrl.deleteUser)


module.exports = router;
//la délcaration se fera dans app.js : userRoutes



