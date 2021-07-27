/* une fois les routes crées on mettra en place les controllers
 pour la sécurité. On commencera par installer bcrypt pour le hashage du password
 npm install -- save bcrypt
 */
const bcrypt = require("bcrypt");

/*  on importe jwt */
const jwt = require("jsonwebtoken");




const mysql = require("mysql");

const dbTest = mysql.createConnection({
  host: process.env.DATABASE1_HOST,
  user: process.env.DATABASE1_USER,
  password: process.env.DATABASE1_PASSWORD,
  database: process.env.DATABASE1,
});

/* pour vérifier que l'api signup post le contenu
const api = [
  {
    nom: 'conde',
    prenom: 'nicolas',
    email: '....',
    password: '.....'
    
  }
]

  exports.signup = async function(req,res){
    res.json(api)
  }; */

/*  On crée la logique du signup: l'inscription de nouveaux utilisateurs
 */
const users = []  //pour tester

exports.signup = async function (req, res) {
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);
  var user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: hashedPassword,
  };
  res.json(user);
  users.push(user); //on crée le user dans users
};

exports.login = async function (req, res) {
  const user = users.find((user) => (user.email = req.body.email));
  if (user == null) {
    return res.status(400).send("Utilisateur introuvable");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Utilisateur connecté");
    } else {
      res.send("Connexion impossible");
    }
  } catch {
    res.status(500).send();
  }
   
 
};
