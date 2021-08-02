/* Avant toute chose, avant de commencer le projet, faire un npm init. Et dans 
entry point qui va s'afficher, il faut mettre server.js (à côté d'index.js)
puis créer le .gitignore et écrire node_modules*/

/* on télécharge express : npm install --save express dans terminal ensuite
on déclare express
Si on veut utiliser mysql alors l'installation se fait: npm install --save express mysql

Ell peut aussi se faire séparéement comme ici où on a installé express avant:
npm install --save mysql

On aura aussi besoin de .env : npm install --save dotenv
*/
const express = require("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');


const userRoutes = require("./routes/user");

dotenv.config({ path: './config.env'});


const app = express();



app.use((req, res, next) => {
    //middleware générale applicable à toutes les routes et requêtes envoyées au serveur
    res.setHeader("Access-Control-Allow-Origin", "*"); //permet l'accès à notre API depuis n'importe quelle origine ( '*' )/tout le monde peut accéder ;
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ); //autorisation d'utiliser certains headers spécifiés dans le set.header
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); //permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use("/api/user", userRoutes);

/* On crée la fonction qui permettra d'exporter app dans les autres modules */
module.exports = app;