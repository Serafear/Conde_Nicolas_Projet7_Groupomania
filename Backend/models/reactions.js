'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {  //could have called Likes instead of reactions
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post}) {
      // define association here
      Reactions.belongsTo(Post, { foreignKey: 'postId', as: 'post'}),
      Reactions.belongsTo(User, {foreignKey: 'userId', as: 'user'})
    }
  };
  Reactions.init({
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
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    isLike: {
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    tableName: 'reactions',
    modelName: 'Reactions',
  });
  return Reactions;
};