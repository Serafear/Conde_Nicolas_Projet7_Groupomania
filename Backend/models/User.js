'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){  //this will hide the id from the users
      return { ...this.get(), id: undefined}
    }
  };
  User.init({
    //firstName: DataTypes.STRING, this is the firts appearance after creating user.js that we renamnes User.js
    //but we want another form and we want a UUID to hide the id value 
    uuid : {   //for best practice : a uuid is a Universally Unique Identifier
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4  //the v4 is a randomly generated UUID
    },
    nom : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    //if i want to change the name of the table i can put
    //tableName: 'Users', or 'users', so lets change it
    tableName: 'users', //we go to servers.js to put a force : true
    modelName: 'User',
  });
  return User;
};