"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, User}) {
      // define association here
      Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post'}),
      Comment.belongsTo(User, {foreignKey: 'userId', as: 'user'})
    }
  }
  Comment.init(
    {
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
      body: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comments',
      modelName: "Comment",
    }
  );
  return Comment;
};
