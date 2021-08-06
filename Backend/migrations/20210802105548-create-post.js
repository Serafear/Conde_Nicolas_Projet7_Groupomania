'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid : {   //for best practice : a uuid is a Universally Unique Identifier
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4  //the v4 is a randomly generated UUID
      },
      body: {
        type: DataTypes.STRING,
        allowNull:true
      },
      image: {
        type: DataTypes.STRING,
        allowNull:true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('posts'); //dt forget to change from Posts to posts
  }
};