"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment }) {
      //because we have a Post model
      // define association here
      //one user can have many posts so...
      User.hasMany(Post, { foreignKey: "userId", as: "post" }), //check the Post model
        User.hasMany(Comment, { foreignKey: "postId", as: "comment" });
    }

    /*toJSON(){  //this will hide the id from the users if need be
      return { ...this.get(), id: undefined}
    }*/
  }
  User.init(
    {
      //firstName: DataTypes.STRING, this is the firts appearance after creating user.js that we renamnes User.js
      //but we want another form and we want a UUID to hide the id value
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        //type: Sequelize.INTEGER  we change all sequelize to Datatypes
        type: DataTypes.INTEGER,
      },
      uuid: {
        //for best practice : a uuid is a Universally Unique Identifier
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //the v4 is a randomly generated UUID
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          is: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/gm
        }
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          is: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/gm
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
          is: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      //if i want to change the name of the table i can put
      //tableName: 'Users', or 'users', so lets change it
      tableName: "users", //we go to servers.js to put a force : true
      modelName: "User",
    }
  );
  return User;
};
