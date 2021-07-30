/* On installe sequelize : npm install --save sequelize
on installe mysql2 : npm install --save mysql2
on installe sequelize cli : npm install --save-dev sequelize-cli
on fait : sequelize init
Une fois que tout est installé et que config.json a été transformé en .js 
pour utiliser le process.env. On crée la base de donnée : sequelize db:create
pour voir toutes les commandes de sequelize on tape dans le termial bash : sequelize
on crée un modèle pour user : sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string 
ce qui va crée user.js dans models
*/

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env]; /* importe les config de config.js */
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
/* ici crée un type de connexion */
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
  /* cette partie va faire un loop dans models pour voir si une base de donnée existe
  et va l'initializer pour l'ajouter dans l'array dv[model.name] */

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
/* exporte la bd*/
db.sequelize = sequelize;


module.exports = db;
