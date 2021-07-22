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
const mysql = require('mysql');
const dotenv = require('dotenv');

const userRoutes = require("./routes/user");

dotenv.config({ path: './config.env'});

const app = express();

const dbTest = mysql.createConnection({  //on va créer la connexion avec mysql mais pour 
    //éviter que le pass et touute info sensible soit vue, on va utiliser 
    //config.env
    host: process.env.DATABASE1_HOST,
    user: process.env.DATABASE1_USER,
    password : process.env.DATABASE1_PASSWORD,
    database : process.env.DATABASE1
});

dbTest.connect((error) => {  //ici nous allons vérifier la connexion. 
    //SI bien, alors message MYSQL Connected
    if(error){
        console.log(error)
    } else {
        console.log("MYSQL Connected")
    }
});



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

app.use(express.static('../Frontend/public'));  /* Cette partie donne la capacité au serveur
d'afficher la page html dans le dossier public
public car, tout ce qui est dans ce fichier est destiné à la visibilité 
des personnes qui visiterons le site 
*/

app.use("/api", userRoutes);

/* On crée la fonction qui permettra d'exporter app dans les autres modules */
module.exports = app;