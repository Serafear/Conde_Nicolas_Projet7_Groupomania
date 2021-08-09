'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
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
    body: {
      type: DataTypes.STRING,
      allowNull:true
    }, 
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    tableName: 'reactions',
    modelName: 'Reactions',
  });
  return Reactions;
};