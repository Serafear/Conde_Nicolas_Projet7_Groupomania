"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("reactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      uuid: {
        //for best practice : a uuid is a Universally Unique Identifier
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //the v4 is a randomly generated UUID
      },
      isLike: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("reactions");
  },
};
