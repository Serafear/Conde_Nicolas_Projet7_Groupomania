/* une fois les routes crées on mettra en place les controllers
 pour la sécurité. On commencera par installer bcrypt pour le hashage du password
 npm install -- save bcrypt
 */
const bcrypt = require("bcryptjs");

/*  on importe jwt */


const mysql = require("mysql");

const dbTest = mysql.createConnection({
  host: process.env.DATABASE1_HOST,
  user: process.env.DATABASE1_USER,
  password: process.env.DATABASE1_PASSWORD,
  database: process.env.DATABASE1,
});



/*  On crée la logique du signup: l'inscription de nouveaux utilisateurs
 */


  exports.signup = async function(req,res){
    const password = req.body.password;
    let saltRounds = 8;
    let encryptedPassword = await bcrypt.hash(password, saltRounds);
    var users={
       "nom":req.body.nom,
       "prenom":req.body.prenom,
       "email":req.body.email,
       "password":encryptedPassword
     }
    
    dbTest.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
        }
    })
  };
