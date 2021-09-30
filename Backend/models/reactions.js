"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    static associate({ Post, User }) {
      Reactions.belongsTo(Post, { foreignKey: "postId", as: "post" }),
        Reactions.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  Reactions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      isLike: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reactions",
      modelName: "Reactions",
    }
  );
  return Reactions;
};
