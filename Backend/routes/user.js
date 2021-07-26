const express = require('express');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,    // 10 minutes et 15 * 60 * 1000 = 15 minutes et 60 * 60 * 1000 = 1 heure
    max: 8,                       // 8 requetes par IP
    message:"Trop de tentatives, essayez dans 10 minutes ",  //message affiché au delà de 8 requetes 
                     
});

//on utilise la fonction d'express pour créer une route modulable
const router = express.Router();

const userCtrl = require("../controllers/user"); //le controller va associer les fonctions aux différentes routes

//On crée les router nécessaires à user
router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login)



module.exports = router;
//la délcaration se fera dans app.js : userRoutes



