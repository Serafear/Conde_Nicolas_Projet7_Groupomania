/* Avant toute chose, avant de commencer le projet, faire un npm init. Et dans 
entry point qui va s'afficher, il faut mettre server.js (à côté d'index.js)
puis créer le .gitignore et écrire node_modules*/

/* on télécharge express : npm install --save express dans terminal ensuite
on déclare express */
const express = require("express");


const app = express();

app.use(express.static('../Frontend/public'));  /* Cette partie donne la capacité au serveur
d'afficher la page html dans le dossier public
public car, tout ce qui est dans ce fichier est destiné à la visibilité 
des personnes qui visiterons le site 
*/

/* On crée la fonction qui permettra d'exporter app dans les autres modules */
module.exports = app;