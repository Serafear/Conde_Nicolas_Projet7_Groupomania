const express = require('express');



//on utilise la fonction d'express pour créer une route modulable
const router = express.Router();

const userCtrl = require("../controllers/user"); //le controller va associer les fonctions aux différentes routes

//On crée les router nécessaires à user
router.post("/signup", userCtrl.signup);



module.exports = router;
//la délcaration se fera dans app.js : userRoutes



