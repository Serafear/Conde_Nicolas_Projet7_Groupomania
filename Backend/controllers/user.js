/* une fois les routes crées on mettra en place les controllers
 pour la sécurité. On commencera par installer bcrypt pour le hashage du password
 npm install -- save bcrypt
 */
const bcrypt = require("bcrypt");


/*  on importe jwt */
const jwt = require("jsonwebtoken");
require('dotenv').config({path : './config.env'});

const {sequelize, User} = require ('../models');  

const { Model } = require("sequelize"); 



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


/* version antérieure
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
};*/


exports.signup = async function (req,res) {
  const { nom, prenom, email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ nom, prenom, email, password:hash})
    return res.status(201).json(user)
 
  } catch (error){
    console.log(error)
    return res.status(500).json(error)
  }
}
/*exports.signup = (req,res) => {
bcrypt
  .hash(req.body.password, 10)
  .then((hash) => {
    models.User.create ({
      nom : req.body.nom,
      prenom : req.body.prenom,
      email : req.body.email,
      password: hash
    })
    .then(() => res.status(201).json({ message: "Utilisateur crée" }))
    .catch((error) => res.status(500).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
}*/

/* without database entry
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
   
 
};*/
/*exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ where : {email:req.body.email} });
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if(passwordCompare != false){
      res.status(200).json({ //ici je lui demande de me retourner le uuid et le token
        userId: user.uuid, //le token est crée ici 
        token: jwt.sign(
          { userId: user.uuid },
          "RANDOM_TOKEN_SECRET",
          { expiresIn: "24h" }
        ),
      });
    }else if(passwordCompare == false){
      return res.status(401).json({ error: "Utilisateur inconnu" });
    }
    // code if success ...
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
    // code if error ...
  }
}*/

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ where : {email:req.body.email} });
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
    if(passwordCompare != false){
      res.status(200).json({ //ici je lui demande de me retourner le uuid et le token
        userId: user.id, 
        token: accessToken //le token est crée ici 
        
      });

    }else if(passwordCompare === false){
      return res.status(401).json({ error: "Utilisateur inconnu" });
    }
    // code if success ...
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
    // code if error ...
  }
}
exports.getOneUser = async function(req,res){
  try {
    const user = await User.findOne({ where : {id: req.params.userId} })

    return res.status(200).json(user)
  } catch (error) {
    console.error(error);
    return res.status(404).json(error)
    // code if error ...
  }
}
exports.updateUser = async function(req,res){
  const { nom, prenom, email, password } = req.body
  try {
    const user = await User.findOne({ where : {id:req.params.userId} })
    const hash = await bcrypt.hash(password, 10)
    user.nom = nom
    user.prenom = prenom
    user.email = email
    user.password = hash

    await user.save()

    return res.status(201).json(user)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
exports.deleteUser = async function(req,res){
  try {
    const user = await User.findOne({ where : {id:req.params.userId} })
    await user.destroy()
    return res.status(200).json({message: 'User deleted !'})
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
  }
}
exports.getMeInfos = async function(req,res){
}
